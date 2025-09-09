import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ButtonGroup, IconButton, Typography, Box } from '@mui/material';
import { useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

import Container from "../../components/layout/Container";
import BottomAppBar from "../../components/navigation/BottomAppBar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUserBookings, getEvents, getMeetups, type Booking, type Event, type Meetup } from "@/services";
import { useUpdateBookingStatus } from "@/hooks/entityConfigs";
import { formatSmartDate } from "@/utils/format";
import { usePagination } from "@/hooks/usePagination";
import { Button } from '@mui/material';
import TicketCard from "../../components/cards/TicketCard";


function Tickets() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');
    const { getVisibleItems, loadMore, hasMore, getRemainingCount, reset } = usePagination();
    const queryClient = useQueryClient();
    const updateBookingStatusMutation = useUpdateBookingStatus();
    const { mode } = useTheme();

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
                title: event ? event.title : meetup?.title,
                booking: booking
            };
        }).filter(Boolean);
    }, [bookings, events, meetups]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        reset(); // Reset pagination when switching tabs
    };

    const handleEventClick = (item: any) => {
        const ticketId = item.booking.booking_id || item.booking.id;
        navigate(`/tickets/${ticketId}`, { 
            state: { 
                ticket: {
                    id: ticketId,
                    imageUrl: item.event_image || item.image_url || '/illustrations/eventcard.png',
                    eventName: item.title || 'Event Name',
                    eventLocation: item.location || 'Location TBD',
                    seatNumber: item.booking?.selected_seats?.length > 0 ? 
                        item.booking.selected_seats.map((seat: any) => seat.seat).join(', ') : 
                        'Seat selection completed',
                    eventDate: item.start_date ? 
                        formatSmartDate(item.start_date) : 'Date TBD',
                    eventTime: item.start_date ? 
                        formatSmartDate(item.start_date, true).split(' • ')[1] || 'Time TBD' : 'Time TBD',
                    status: activeTab,
                    booking: item.booking,
                    event: item
                }
            } 
        });
    };

    const handleCancelTicket = async (bookingId: string) => {
        updateBookingStatusMutation.mutate(
            { bookingId, status: 'cancelled' },
            {
                onSuccess: () => {
                    toast.success('Ticket cancelled successfully!');
                },
                onError: (error) => {
                    console.error('Error cancelling ticket:', error);
                    toast.error('Failed to cancel ticket. Please try again.');
                }
            }
        );
    };

    const getTicketsByStatus = (status: string) => {
        const now = new Date();
        
        if (status === 'upcoming') {
            return matchedItems.filter(item => {
                if (item?.booking?.status === 'cancelled' || item?.booking?.status === 'refunded') return false;
                
                // Check if event date is in the future
                const eventDate = item?.start_date;
                if (!eventDate) return false;
                
                return new Date(eventDate) > now;
            });
        } else if (status === 'cancelled') {
            return matchedItems.filter(item => item?.booking?.status === 'cancelled');
        } else if (status === 'completed') {
            return matchedItems.filter(item => {
                if (item?.booking?.status === 'cancelled' || item?.booking?.status === 'refunded') return false;
                
                // Check if event date has passed
                const eventDate = item?.start_date;
                if (!eventDate) return false;
                
                return new Date(eventDate) <= now;
            });
        } else if (status === 'refunded') {
            return matchedItems.filter(item => item?.booking?.status === 'refunded');
        }
        return matchedItems;
    };

    const isLoading = bookingsLoading || eventsLoading || meetupsLoading;

    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            <Container className={`relative justify-start gap-4 overflow-hidden whitespace-nowrap ${mode === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                {/* Header with "Your Ticket" title */}
                <Box className='mb-6 flex w-full items-center justify-center'>
                    <Typography variant='h4' className={`font-poppins font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Ticket</Typography>
                </Box>
            
            {/* Status Tabs */}
            <Box className='w-full overflow-x-auto no-scrollbar mb-6'>
                <ButtonGroup className='w-full font-header font-semibold' sx={{ '& .MuiButton-root': { fontSize: '0.75rem', px: 1, py: 0.5 } }}>
                    <Button 
                        variant={activeTab === 'upcoming' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('upcoming')}
                        className={activeTab === 'upcoming' ? 'bg-primary-1' : 'bg-neutral-50 dark:bg-gray-800 text-text-2 dark:text-gray-300'}
                        size='small'
                    >
                        Upcoming ({getTicketsByStatus('upcoming').length})
                    </Button>
                    <Button 
                        variant={activeTab === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('completed')}
                        className={activeTab === 'completed' ? 'bg-primary-1' : 'bg-neutral-50 dark:bg-gray-800 text-text-2 dark:text-gray-300'}
                        size='small'
                    >
                        Completed ({getTicketsByStatus('completed').length})
                    </Button>
                    <Button 
                        variant={activeTab === 'refunded' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('refunded')}
                        className={activeTab === 'refunded' ? 'bg-primary-1' : 'bg-neutral-50 dark:bg-gray-800 text-text-2 dark:text-gray-300'}
                        size='small'
                    >
                        Refunded ({getTicketsByStatus('refunded').length})
                    </Button>
                    <Button 
                        variant={activeTab === 'cancelled' ? 'contained' : 'outlined'}
                        onClick={() => handleTabChange('cancelled')}
                        className={activeTab === 'cancelled' ? 'bg-primary-1' : 'bg-neutral-50 dark:bg-gray-800 text-text-2 dark:text-gray-300'}
                        size='small'
                    >
                        Cancelled ({getTicketsByStatus('cancelled').length})
                    </Button>
                </ButtonGroup>
            </Box>
            
            {/* Scrollable ticket cards list */}
            <Box className='flex-1 overflow-y-auto no-scrollbar'>
                {getTicketsByStatus(activeTab).length > 0 ? (
                    getVisibleItems(getTicketsByStatus(activeTab)).map(item => (
                        <Box key={item?.id} className='mb-6 cursor-pointer' onClick={() => handleEventClick(item)}>
                            <Box className='flex justify-center'>
                                <Box className='relative scale-90 origin-center'>
                                    <TicketCard
                                        imageUrl={item?.image || '/illustrations/eventcard.png'}
                                        eventName={item?.title || 'Event Name'}
                                        eventLocation={item?.location || 'Location TBD'}
                                        seatNumber={(item?.booking as any)?.selected_seats?.length > 0 ? 
                                            (item?.booking as any).selected_seats.map((seat: any) => seat.seat).join(', ') : 
                                            'Seat selection completed'}
                                        eventDate={item?.type === 'event' ? 
                                            ((item as any)?.start_date ? formatSmartDate((item as any).start_date) : 'Date TBD') :
                                            (item?.start_date ? formatSmartDate(item.start_date) : 'Date TBD')}
                                        eventTime={item?.type === 'event' ? 
                                            ((item as any)?.start_date ? formatSmartDate((item as any).start_date, true).split(' • ')[1] || 'Time TBD' : 'Time TBD') :
                                            (item?.start_date ? formatSmartDate(item.start_date, true).split(' • ')[1] || 'Time TBD' : 'Time TBD')}
                                    />
                                    
                                    {/* Status indicator */}
                                    <Box className='absolute top-2 right-6 z-10 scale-90 origin-top-right'>
                                        <Box className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            item?.booking?.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                            item?.booking?.status === 'refunded' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        }`}>
                                            {item?.booking?.status === 'cancelled' ? 'Cancelled' :
                                             item?.booking?.status === 'refunded' ? 'Completed' :
                                             'Upcoming'}
                                        </Box>
                                    </Box>

                                    {/* Cancel button for upcoming events only */}
                                    {item?.booking?.status !== 'cancelled' && item?.booking?.status !== 'refunded' && (
                                        <Box className='absolute top-2 left-6 z-10 scale-90 origin-top-left'>
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
                        <Typography variant='h6' className='text-text-3 mb-4 dark:text-gray-300'>
                            No tickets found
                        </Typography>
                    </Box>
                )}

                {hasMore(getTicketsByStatus(activeTab).length) && (
                    <Box className='mt-4 flex justify-center'>
                        <Button
                            variant='outlined'
                            onClick={loadMore}
                            className='text-primary-1 border-primary-1'
                        >
                            Load More ({getRemainingCount(getTicketsByStatus(activeTab).length)} remaining)
                        </Button>
                    </Box>
                )}
            </Box>

            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
            </Container>
        </>
    );
}

export default Tickets;