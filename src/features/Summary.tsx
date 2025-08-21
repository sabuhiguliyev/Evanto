import React from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import Subtract from '@/components/icons/subtract.svg?react';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';
import Input from '@/components/forms/Input';
import { ConfirmationNumberOutlined, CreditCardOutlined, LocationOnOutlined } from '@mui/icons-material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import useBookingStore from '@/store/bookingStore';
import useEventStore from '@/store/eventStore';
import { supabase } from '@/utils/supabase';
import toast from 'react-hot-toast';

function Summary() {
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingData, setBookingData } = useBookingStore();
    const { items } = useEventStore();

    // Get item data from URL params
    const itemId = new URLSearchParams(location.search).get('itemId');
    const item = items.find(i => i.id === itemId);

    const handlePayment = async () => {
        try {
            const bookingId = `BK${Date.now()}`.slice(-8);

            // Only store references, not duplicate data
            const bookingPayload = {
                first_name: bookingData.first_name,
                last_name: bookingData.last_name,
                email: bookingData.email,
                phone: bookingData.phone,
                gender: bookingData.gender,
                birth_date: bookingData.birth_date,
                country: bookingData.country,
                item_id: item?.id,
                item_type: item?.type,
                selected_seats: bookingData.selected_seats,
                total_price: bookingData.total_price,
                booking_id: bookingId,
                promo_code: bookingData.promo_code,
                payment_method: bookingData.payment_method,
                status: 'confirmed',
            };

            const { error } = await supabase.from('bookings').insert(bookingPayload);

            if (error) {
                throw new Error(error.message);
            }

            setBookingData({ booking_id: bookingId });
            toast.success('Booking confirmed!');
            navigate('/confirmation', { state: { bookingId } });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            toast.error('Payment failed: ' + errorMessage);
        }
    };

    const handleCopyBookingId = async () => {
        if (bookingData.booking_id) {
            try {
                await navigator.clipboard.writeText(bookingData.booking_id);
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
        if (!item) return bookingData.event_name || 'Event Name';
        if (item.type === 'event') return item.title;
        if (item.type === 'meetup') return item.meetup_name;
        return bookingData.event_name || 'Event Name';
    };

    const getItemImage = () => {
        if (!item) return '/illustrations/chairs.png';
        if (item.type === 'event') return item.event_image;
        if (item.type === 'meetup') return item.image_url;
        return '/illustrations/chairs.png';
    };

    const getItemLocation = () => {
        if (!item) return bookingData.event_location || 'Event Location';
        if (item.type === 'event') return item.location;
        if (item.type === 'meetup') return 'Online';
        return bookingData.event_location || 'Event Location';
    };

    const getItemDate = () => {
        if (!item) return bookingData.event_date;
        if (item.type === 'event') return item.start_date;
        if (item.type === 'meetup') return item.meetup_date;
        return bookingData.event_date;
    };

    const getItemCategory = () => {
        if (!item) return 'Event';
        return item.category || 'Event';
    };

    // Calculate event time if not set
    const eventTime =
        bookingData.event_time ||
        (getItemDate()
            ? new Date(getItemDate()!).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
              })
            : 'Time not set');

    return (
        <Container>
            <Box className='mb-4 flex w-full items-center gap-4'>
                <ArrowCircle onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                <Typography variant='h4'>Summary</Typography>
            </Box>

            <Box className='relative mb-4 h-[449px] w-full'>
                <Subtract className='absolute inset-0 z-0 h-full w-full object-cover' />
                <Box className='absolute left-5 top-10 flex gap-2'>
                    <img src={getItemImage()} alt='Event' className='h-16 w-16 rounded object-cover' />
                    <Box className='flex flex-col justify-between'>
                        <Chip
                            label={getItemCategory()}
                            className='h-5 w-auto bg-[#5D9BFC26] text-[7px] text-primary-1'
                        />
                        <Typography variant='h6' className='line-clamp-2'>
                            {getItemTitle()}
                        </Typography>
                        <Box className='flex h-2.5 items-center gap-1 text-primary-1'>
                            <LocationOnOutlined className='text-[11px]' />
                            <Typography className='line-clamp-1 text-[11px]'>{getItemLocation()}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className='absolute left-5 right-5 top-40 flex flex-col gap-2.5'>
                    <Box>
                        <Typography className='font-header text-[9px] font-medium text-text-3'>Name</Typography>
                        <Typography variant='h6' className='line-clamp-1'>
                            {bookingData.first_name} {bookingData.last_name}
                        </Typography>
                    </Box>
                    <Box className='flex justify-between'>
                        <Box className='flex-1'>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>Venue</Typography>
                            <Typography variant='h6' className='line-clamp-1'>
                                {getItemLocation()}
                            </Typography>
                        </Box>
                        <Box className='ml-2 flex-1'>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>Seat</Typography>
                            <Typography variant='h6' className='line-clamp-1'>
                                {bookingData.selected_seats.map(seat => seat.seat).join(', ') || 'No seats selected'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='flex justify-between'>
                        <Box className='flex-1'>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>Date</Typography>
                            <Typography variant='h6'>{formatDate(getItemDate())}</Typography>
                        </Box>
                        <Box className='ml-2 flex-1'>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>Time</Typography>
                            <Typography variant='h6'>{eventTime}</Typography>
                        </Box>
                    </Box>
                    <Box className='flex items-center justify-between'>
                        <Box>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>
                                Booking ID
                            </Typography>
                            <Typography variant='h6'>{bookingData.booking_id || 'Pending...'}</Typography>
                        </Box>
                        {bookingData.booking_id && (
                            <Box
                                className='flex items-center gap-2'
                                onClick={handleCopyBookingId}
                                style={{ cursor: 'pointer' }}
                            >
                                <ContentCopyOutlinedIcon className='text-[11px] text-primary-1' />
                                <Typography variant='h6' className='text-primary-1'>
                                    Copy
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box className='my-5 flex flex-col items-center gap-1'>
                        <Typography className='font-header text-[11px] font-medium text-text-3'>Total Price</Typography>
                        <Typography className='font-header text-[20px] font-bold text-primary-1'>
                            ${bookingData.total_price.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box className='flex w-full flex-col gap-2'>
                <Input
                    placeholder='Promo code'
                    value={bookingData.promo_code || ''}
                    startIcon={<ConfirmationNumberOutlined />}
                    endIcon={<KeyboardArrowDownOutlinedIcon />}
                    onChange={e => setBookingData({ promo_code: e.target.value })}
                />
                <Input
                    placeholder='Payment method'
                    value={bookingData.payment_method || ''}
                    startIcon={<CreditCardOutlined />}
                    endIcon={<KeyboardArrowDownOutlinedIcon />}
                    onChange={e => setBookingData({ payment_method: e.target.value })}
                />
                <Button variant='contained' onClick={handlePayment} disabled={!bookingData.payment_method}>
                    Pay Now
                </Button>
            </Box>
        </Container>
    );
}

export default Summary;
