import React from 'react';
import { Box, Button, Chip, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Container from '@/components/layout/Container';
import Subtract from '@/components/icons/subtract.svg?react';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';
import { ConfirmationNumber, CreditCard, LocationOn } from '@mui/icons-material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '@/store/bookingStore';
import { useDataStore } from '@/store/dataStore';
import { createBooking, getEvents, getMeetups, getUserBookings } from '@/services';
import { formatSmartDate } from '@/utils/format';
import toast from 'react-hot-toast';
import useUserStore from '@/store/userStore';
import { usePaymentCards } from '@/hooks/usePaymentCards';

function Summary() {
    const navigate = useNavigate();
    const { bookingData: bookingFlow, setBookingData } = useBookingStore();
    const { items, setItems } = useDataStore();
    const { user } = useUserStore();
    const { data: paymentCards, isLoading: cardsLoading, error: cardsError } = usePaymentCards();

    const item = items.find(i => i.id === bookingFlow.event_id);

    // Fetch events and meetups data
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [events, meetups] = await Promise.all([
                    getEvents(),
                    getMeetups()
                ]);
                
                // Combine events and meetups into unified items
                const unifiedItems = [
                    ...events.map(event => ({ ...event, type: 'event' as const })),
                    ...meetups.map(meetup => ({ ...meetup, type: 'meetup' as const }))
                ];
                
                setItems(unifiedItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        if (items.length === 0) {
            fetchData();
        }
    }, [items.length, setItems]);

    // Auto-select default payment method when component loads
    React.useEffect(() => {
        if (cardsError) {
            console.error('Payment cards error:', cardsError);
        }
        
        if (paymentCards && !bookingFlow.payment_method) {
            const defaultCard = paymentCards.find(card => card.is_default);
            if (defaultCard) {
                setBookingData({ payment_method: `card_${defaultCard.id}` });
            }
        }
    }, [paymentCards, bookingFlow.payment_method, setBookingData, cardsError]);

    const handlePayment = async () => {
        try {
            if (!user) {
                toast.error('Please sign in to complete booking');
                navigate('/auth/sign-in');
                return;
            }

            // Check if user has already booked this event
            const existingBookings = await getUserBookings();
            const eventId = item?.type === 'event' ? item?.id : undefined;
            const meetupId = item?.type === 'meetup' ? item?.id : undefined;
            
            const existingBooking = existingBookings.find(booking => 
                (eventId && booking.event_id === eventId)
            );
            
            if (existingBooking) {
                toast.error('You have already booked this event!');
                return;
            }

            const bookingId = `BK${Date.now()}`.slice(-8);

            // Generate more unique order number with user ID and timestamp
            const orderNumber = `ORD-${user.id.slice(-8)}-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
            
            // Only store references, not duplicate data
            const bookingPayload = {
                user_id: user.id,
                event_id: eventId || undefined,
                order_number: orderNumber,
                total_amount: bookingFlow.total_price || 0,
                status: 'confirmed' as const,
                payment_status: 'paid' as const,
                payment_method_id: bookingFlow.payment_method?.replace('card_', '') || undefined,
            };
            
            try {
                await createBooking(bookingPayload);
                setBookingData({ booking_id: bookingId });
                toast.success('Booking confirmed!');
                navigate('/onboarding/congratulations', { state: { context: 'booking', bookingId } });
            } catch (bookingError: any) {
                // Handle duplicate booking scenario
                if (bookingError?.code === '23505' && bookingError?.message?.includes('bookings_user_id_event_id_key')) {
                    toast.error('You have already booked this event!');
                    return;
                }
                // Re-throw other errors
                throw bookingError;
            }
        } catch (error: unknown) {
            console.error('Booking creation error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            toast.error('Payment failed: ' + errorMessage);
        }
    };

    const handleCopyBookingId = async () => {
        if (bookingFlow.booking_id) {
            try {
                await navigator.clipboard.writeText(bookingFlow.booking_id);
                toast.success('Booking ID copied!');
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to copy';
                toast.error('Copy failed: ' + errorMessage);
            }
        }
    };

    const formatDate = (dateString?: string | Date) => {
        if (!dateString) return 'Date not set';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    // Helper functions to safely access item properties
    const getItemTitle = () => {
        if (!item) return bookingFlow.event_name || 'Event Name';
        if (item.type === 'event') return item.title;
        if (item.type === 'meetup') return item.meetup_name;
        return bookingFlow.event_name || 'Event Name';
    };

    const getItemImage = () => {
        if (!item) return '/illustrations/chairs.png';
        if (item.type === 'event') return item.image;
        if (item.type === 'meetup') return item.meetup_image || '/illustrations/eventcard.png';
        return '/illustrations/chairs.png';
    };

    const getItemLocation = () => {
        if (!item) return bookingFlow.event_location || 'Event Location';
        if (item.type === 'event') return item.location;
        if (item.type === 'meetup') return 'Online';
        return bookingFlow.event_location || 'Event Location';
    };

    const getItemDate = () => {
        if (!item) return bookingFlow.event_date;
        if (item.type === 'event') return formatSmartDate(item.start_date, true);
        if (item.type === 'meetup') return formatSmartDate(item.meetup_date, true);
        return bookingFlow.event_date;
    };

    const getItemCategory = () => {
        if (!item) return 'Event';
        return item.category || 'Event';
    };

    // Calculate event time if not set
    const eventTime =
        bookingFlow.event_time ||
        (getItemDate()
            ? new Date(getItemDate()!).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
              })
            : 'Time not set');

    return (
        <Container className='justify-start'>
            <Box className='mb-10 flex w-full items-center justify-between'>
                <ArrowCircle onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                <Typography variant='h4' className='mx-auto'>
                    Summary
                </Typography>
            </Box>

            <Box className='relative mb-4 h-96 w-full'>
                <Subtract className='absolute inset-0 z-0 h-full w-full object-cover' />
                <Box className='absolute left-4 top-8 flex gap-2'>
                    <img src={getItemImage()} alt='Event' className='h-16 w-16 rounded object-cover' />
                    <Box className='flex flex-col justify-between'>
                        <Chip
                            label={getItemCategory()}
                            className='h-5 w-auto bg-blue-100 text-xs text-blue-600'
                        />
                        <Typography variant='h6' className='line-clamp-2'>
                            {getItemTitle()}
                        </Typography>
                        <Box className='flex h-6 items-center gap-1 text-blue-600'>
                            <LocationOn className='text-xs' />
                            <Typography className='line-clamp-1 text-xs'>{getItemLocation()}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className='absolute left-5 right-5 top-40 flex flex-col gap-2.5'>
                    <Box>
                        <Typography className='text-xs font-medium text-gray-600'>Name</Typography>
                        <Typography variant='h6' className='line-clamp-1'>
                            {bookingFlow.first_name} {bookingFlow.last_name}
                        </Typography>
                    </Box>
                    <Box className='flex justify-between'>
                        <Box className='flex-1'>
                            <Typography className='text-xs font-medium text-gray-600'>Venue</Typography>
                            <Typography variant='h6' className='line-clamp-1'>
                                {getItemLocation()}
                            </Typography>
                        </Box>
                        <Box className='ml-2 flex-1'>
                            <Typography className='font-poppins text-xs font-medium text-text-muted'>Seat</Typography>
                            <Typography variant='h6' className='line-clamp-1'>
                                {bookingFlow.selected_seats.map(seat => `${String.fromCharCode(65 + seat.row)}${seat.column + 1}`).join(', ') || 'No seats selected'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='flex justify-between'>
                        <Box className='flex-1'>
                            <Typography className='font-poppins text-xs font-medium text-text-muted'>Date</Typography>
                            <Typography variant='h6'>{formatDate(getItemDate())}</Typography>
                        </Box>
                        <Box className='ml-2 flex-1'>
                            <Typography className='font-poppins text-xs font-medium text-text-muted'>Time</Typography>
                            <Typography variant='h6'>{eventTime}</Typography>
                        </Box>
                    </Box>
                    <Box className='flex items-center justify-between'>
                        <Box>
                            <Typography className='font-poppins text-xs font-medium text-text-muted'>
                                Booking ID
                            </Typography>
                            <Typography variant='h6'>{bookingFlow.booking_id || 'Pending...'}</Typography>
                        </Box>
                        {bookingFlow.booking_id && (
                            <Box
                                className='flex items-center gap-2'
                                onClick={handleCopyBookingId}
                                style={{ cursor: 'pointer' }}
                            >
                                <ContentCopyIcon className='text-xs text-primary' />
                                <Typography variant='h6' className='text-primary font-poppins'>
                                    Copy
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box className='my-5 flex flex-col items-center gap-1'>
                        <Typography className='font-poppins text-xs font-medium text-text-muted'>Total Price</Typography>
                        <Typography className='font-poppins text-xl font-bold text-primary'>
                            ${bookingFlow.total_price.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box className='flex w-full flex-col gap-4 flex-1'>
                <TextField
                    placeholder='Promo code'
                    className='text-input'
                    value={bookingFlow.promo_code || ''}
                    onChange={e => setBookingData({ promo_code: e.target.value })}
                    InputProps={{
                        startAdornment: <ConfirmationNumber sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel>Payment method</InputLabel>
                    <Select
                        className='text-input'
                        value={bookingFlow.payment_method || (paymentCards?.find(card => card.is_default) ? `card_${paymentCards.find(card => card.is_default)?.id}` : '')}
                        onChange={e => setBookingData({ payment_method: e.target.value })}
                        startAdornment={<CreditCard sx={{ mr: 1, color: 'text.secondary' }} />}
                        label='Payment method'
                    >
                        <MenuItem value=''>Select payment method</MenuItem>
                        {paymentCards?.map(card => (
                            <MenuItem key={card.id} value={`card_${card.id}`}>
                                {card.card_type.toUpperCase()} ****{card.last_four_digits}
                                {card.is_default && ' (Default)'}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box className='mt-8' style={{ width: '100%' }}>
                <Button
                    variant='contained'
                    onClick={handlePayment}
                    disabled={!bookingFlow.payment_method || cardsLoading}
                    style={{ 
                        width: '100%',
                        minWidth: '100%',
                        maxWidth: '100%'
                    }}
                >
                    Pay Now
                </Button>
            </Box>
        </Container>
    );
}

export default Summary;
