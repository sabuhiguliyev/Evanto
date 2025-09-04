import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import TicketCard from "../../components/cards/TicketCard";
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';

import Container from "../../components/layout/Container";
import BottomAppBar from "../../components/navigation/BottomAppBar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUserBookings, getEvents, getMeetups, updateBookingStatus, type Booking, type Event, type Meetup } from "@/services";
import { formatSmartDate } from "@/utils/format";


function Tickets() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');

    // Direct data fetching with React Query
    const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
        queryKey: ['bookings'],
        queryFn: getUserBookings,
    });

    const { data: events = [], isLoading: eventsLoading } = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: getEvents,
    });

    const { data: meetups = [], isLoading: meetupsLoading } = useQuery<Meetup[]>({
        queryKey: ['meetups'],
        queryFn: getMeetups,
    });

    // Simple data merging
    const matchedItems = useMemo(() => {
        if (!bookings.length) return [];

        return bookings.map(booking => {
            const event = events.find(e => e.id === booking.event_id);
            const meetup = meetups.find(m => m.id === booking.event_id);
            const item = event || meetup;
            
            if (!item) return null;

            return {
                ...item,
                type: event ? 'event' : 'meetup',
                title: event ? event.title : meetup?.meetup_name,
                booking: booking
            };
        }).filter(Boolean);
    }, [bookings, events, meetups]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleTicketClick = (item: any) => {
        const ticketId = item.booking.booking_id || item.booking.id;
        navigate(`/tickets/${ticketId}`, { 
            state: { 
                ticket: {
                    id: ticketId,
                    imageUrl: item.event_image || item.image_url || '/illustrations/eventcard.png',
                    eventName: item.title || item.meetup_name || 'Event Name',
                    eventLocation: item.location || 'Location TBD',
                    seatNumber: item.booking?.selected_seats?.length > 0 ? 
                        item.booking.selected_seats.map((seat: any) => seat.seat).join(', ') : 
                        'Seat selection pending',
                    eventDate: item.start_date ? 
                        formatSmartDate(item.start_date) : 'Date TBD',
                    eventTime: item.start_date ? 
                        formatSmartDate(item.start_date, true).split(' • ')[1] || 'Time TBD' : 'Time TBD',
                    status: activeTab // Use the current active tab instead of item.booking.status
                }
            } 
        });
    };

    const handleCancelTicket = async (bookingId: string) => {
        try {
            await updateBookingStatus(bookingId, 'cancelled');
            toast.success('Ticket cancelled successfully!');
        } catch (error) {
            console.error('Error cancelling ticket:', error);
            toast.error('Failed to cancel ticket. Please try again.');
        }
    };

    const getTicketsByStatus = (status: string) => {
        if (status === 'upcoming') {
            return matchedItems.filter(item => item?.booking?.status !== 'cancelled' && item?.booking?.status !== 'refunded');
        } else if (status === 'cancelled') {
            return matchedItems.filter(item => item?.booking?.status === 'cancelled');
        } else if (status === 'completed') {
            return matchedItems.filter(item => item?.booking?.status === 'refunded');
        }
        return matchedItems;
    };

    const isLoading = bookingsLoading || eventsLoading || meetupsLoading;

    return (
        <Container className='relative justify-start gap-4 overflow-hidden whitespace-nowrap'>
            <Box className={'mb-6 flex w-full items-center justify-center'}>
                <Typography variant='h4'>My Tickets</Typography>
            </Box>
            
            <ButtonGroup className='w-full font-header font-semibold'>
                <Button 
                    variant={activeTab === 'upcoming' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('upcoming')}
                    className={activeTab === 'upcoming' ? 'bg-primary-1' : 'bg-neutral-50 text-text-2'}
                >
                    Upcoming ({getTicketsByStatus('upcoming').length})
                </Button>
                <Button 
                    variant={activeTab === 'completed' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('completed')}
                    className={activeTab === 'completed' ? 'bg-primary-1' : 'bg-neutral-50 text-text-2'}
                >
                    Completed ({getTicketsByStatus('completed').length})
                </Button>
                <Button 
                    variant={activeTab === 'cancelled' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('cancelled')}
                    className={activeTab === 'cancelled' ? 'bg-primary-1' : 'bg-neutral-50 text-text-2'}
                >
                    Cancelled ({getTicketsByStatus('cancelled').length})
                </Button>
            </ButtonGroup>

            <Box className='flex-1 overflow-y-auto no-scrollbar'>
                {getTicketsByStatus(activeTab).length > 0 ? (
                    getTicketsByStatus(activeTab).map(item => (
                        <Box key={item?.id} className='mb-4 cursor-pointer' onClick={() => handleTicketClick(item)}>
                            <Box className='-mx-5 w-[375px]'>
                                <Box className='overflow-hidden px-5 relative'>
                                    <TicketCard
                                        imageUrl={item?.type === 'event' ? (item as any)?.image : ((item as any)?.meetup_image || '/illustrations/eventcard.png')}
                                        eventName={item?.type === 'event' ? item?.title : (item as any)?.meetup_name || 'Event Name'}
                                        eventLocation={item?.location || 'Location TBD'}
                                        seatNumber={(item?.booking as any)?.selected_seats?.length > 0 ? 
                                            (item?.booking as any).selected_seats.map((seat: any) => seat.seat).join(', ') : 
                                            'Seat selection pending'}
                                        eventDate={item?.type === 'event' ? 
                                            ((item as any)?.start_date ? formatSmartDate((item as any).start_date) : 'Date TBD') :
                                            ((item as any)?.meetup_date ? formatSmartDate((item as any).meetup_date) : 'Date TBD')}
                                        eventTime={item?.type === 'event' ? 
                                            ((item as any)?.start_date ? formatSmartDate((item as any).start_date, true).split(' • ')[1] || 'Time TBD' : 'Time TBD') :
                                            ((item as any)?.meetup_date ? formatSmartDate((item as any).meetup_date, true).split(' • ')[1] || 'Time TBD' : 'Time TBD')}
                                    />
                                    
                                    <Box className='absolute top-2 right-6 z-10'>
                                        <Box className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            item?.booking?.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            item?.booking?.status === 'refunded' ? 'bg-green-100 text-green-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {item?.booking?.status === 'cancelled' ? 'Cancelled' :
                                             item?.booking?.status === 'refunded' ? 'Completed' :
                                             'Upcoming'}
                                        </Box>
                                    </Box>

                                    {/* Cancel button for upcoming events only */}
                                    {item?.booking?.status !== 'cancelled' && item?.booking?.status !== 'refunded' && (
                                        <Box className='absolute top-2 left-6 z-10'>
                                            <Button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCancelTicket(item?.booking?.id || '');
                                                }}
                                                size='small'
                                                variant='outlined'
                                                className='bg-white/95 hover:bg-white text-red-600 border-red-300 hover:border-red-500 hover:text-red-700'
                                                sx={{ 
                                                    fontSize: '10px',
                                                    padding: '2px 8px',
                                                    minWidth: 'auto',
                                                    height: '24px'
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Box className='text-center py-12'>
                        <Typography variant='h6' className='text-text-3 mb-4'>
                            No {activeTab} tickets found
                        </Typography>
                    </Box>
                )}
            </Box>

            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
        </Container>
    );
}

export default Tickets;