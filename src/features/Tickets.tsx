import useEventStore from "../store/eventStore";
import useItemsQuery from "../hooks/useItemsQuery";
import { fetchUserBookings } from "../utils/supabaseService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TicketCard from "../components/cards/TicketCard";
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, MoreVertOutlined } from '@mui/icons-material';
import Container from "../components/layout/Container";
import BottomAppBar from "../components/navigation/BottomAppBar";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Tickets() {
    const navigate = useNavigate();
    const [matchedItems, setMatchedItems] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    useItemsQuery();
    const { items } = useEventStore();

    const usequery = useQuery({
        queryKey: ['bookings'],
        queryFn: fetchUserBookings,
    });

    useEffect(() => {
        if (items.length > 0 && usequery.data) {
            const matched = items.map(item => {
                const booking = usequery.data.find(booking => 
                    item.id === booking.item_id
                );
                
                if (booking) {
                    return {
                        ...item,
                        booking: booking
                    };
                }
                return null;
            }).filter(Boolean);
            
            setMatchedItems(matched);
        }
    }, [items, usequery.data]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleTicketClick = (item: any) => {
        navigate('/ticket-details', { 
            state: { 
                ticket: {
                    id: item.booking.booking_id || item.booking.id,
                    imageUrl: item.event_image || item.image_url || '/illustrations/eventcard.png',
                    eventName: item.title || item.meetup_name || 'Event Name',
                    eventLocation: item.location || 'Location TBD',
                    seatNumber: item.booking?.selected_seats?.length > 0 ? 
                        item.booking.selected_seats.map((seat: any) => seat.seat).join(', ') : 
                        'Seat selection pending',
                    eventDate: item.start_date ? 
                        new Date(item.start_date).toLocaleDateString() : 'Date TBD',
                    eventTime: item.start_date ? 
                        new Date(item.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Time TBD',
                    status: activeTab // Use the current active tab instead of item.booking.status
                }
            } 
        });
    };

    const handleCancelTicket = async (bookingId: string) => {
        try {
            // Update the booking status to cancelled in the database
            const { error } = await supabase
                .from('bookings')
                .update({ status: 'cancelled' })
                .eq('booking_id', bookingId);

            if (error) {
                throw error;
            }

            toast.success('Ticket cancelled successfully!');
            // Refetch the data to update the UI
            usequery.refetch();
        } catch (error) {
            console.error('Error cancelling ticket:', error);
            toast.error('Failed to cancel ticket. Please try again.');
        }
    };

    const getTicketsByStatus = (status: string) => {
        if (status === 'upcoming') {
            return matchedItems.filter(item => item.booking.status !== 'cancelled' && item.booking.status !== 'completed');
        } else if (status === 'cancelled') {
            return matchedItems.filter(item => item.booking.status === 'cancelled');
        } else if (status === 'completed') {
            return matchedItems.filter(item => item.booking.status === 'completed');
        }
        return matchedItems;
    };

    return (
        <Container className='relative justify-start gap-4 overflow-hidden whitespace-nowrap'>
            <Box className={'mb-6 flex w-full items-center justify-between'}>
                <IconButton 
                    size='medium' 
                    disableRipple 
                    className='text-text-3' 
                    sx={{ border: '1px solid #EEEEEE' }}
                >
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>My Tickets</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            
            <ButtonGroup className='w-full font-header font-semibold'>
                <Button 
                    variant={activeTab === 'upcoming' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('upcoming')}
                    className={activeTab === 'upcoming' ? 'bg-primary-1' : 'bg-[#F8F8F8] text-text-2'}
                >
                    Upcoming ({getTicketsByStatus('upcoming').length})
                </Button>
                <Button 
                    variant={activeTab === 'completed' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('completed')}
                    className={activeTab === 'completed' ? 'bg-primary-1' : 'bg-[#F8F8F8] text-text-2'}
                >
                    Completed ({getTicketsByStatus('completed').length})
                </Button>
                <Button 
                    variant={activeTab === 'cancelled' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('cancelled')}
                    className={activeTab === 'cancelled' ? 'bg-primary-1' : 'bg-[#F8F8F8] text-text-2'}
                >
                    Cancelled ({getTicketsByStatus('cancelled').length})
                </Button>
            </ButtonGroup>

            <Box className='flex-1 overflow-y-auto no-scrollbar'>
                {getTicketsByStatus(activeTab).length > 0 ? (
                    getTicketsByStatus(activeTab).map(item => (
                        <Box key={item.id} className='mb-4 cursor-pointer' onClick={() => handleTicketClick(item)}>
                            <Box className='-mx-5 w-[375px]'>
                                <Box className='overflow-hidden px-5 relative'>
                                    <TicketCard
                                        imageUrl={item.event_image || item.image_url || '/illustrations/eventcard.png'}
                                        eventName={item.title || item.meetup_name || 'Event Name'}
                                        eventLocation={item.location || 'Location TBD'}
                                        seatNumber={item.booking?.selected_seats?.length > 0 ? 
                                            item.booking.selected_seats.map((seat: any) => seat.seat).join(', ') : 
                                            'Seat selection pending'}
                                        eventDate={item.start_date ? 
                                            new Date(item.start_date).toLocaleDateString() : 'Date TBD'}
                                        eventTime={item.start_date ? 
                                            new Date(item.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Time TBD'}
                                    />
                                    
                                    <Box className='absolute top-2 right-6 z-10'>
                                        <Box className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            item.booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            item.booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {item.booking.status === 'cancelled' ? 'Cancelled' :
                                             item.booking.status === 'completed' ? 'Completed' :
                                             'Upcoming'}
                                        </Box>
                                    </Box>

                                    {/* Cancel button for upcoming events only */}
                                    {item.booking.status !== 'cancelled' && item.booking.status !== 'completed' && (
                                        <Box className='absolute top-2 left-6 z-10'>
                                            <Button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCancelTicket(item.booking.booking_id || item.booking.id);
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