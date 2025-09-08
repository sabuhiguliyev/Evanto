import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, IconButton, ToggleButton, Divider, Box, Button } from '@mui/material';
import {
    KeyboardArrowLeft,
    Add,
    ListOutlined,
    GridViewOutlined,
    Edit,
    Delete,
} from '@mui/icons-material';
import Container from '@/components/layout/Container';
import EventCard from '@/components/cards/EventCard';
import { useQuery } from '@tanstack/react-query';
import { getEvents, getMeetups } from '@/services';
import { usePagination } from '@/hooks/usePagination';
import type { UnifiedItem } from '@/utils/schemas';
import useUserStore from '@/store/userStore';
import { useDeleteEvent } from '@/hooks/useEvents';
import { useDeleteMeetup } from '@/hooks/useMeetups';
import toast from 'react-hot-toast';

function ManageEvents() {
    const [cardVariant, setCardVariant] = useState<'horizontal' | 'vertical-compact'>('horizontal');
    const { getVisibleItems, loadMore, hasMore, getRemainingCount } = usePagination();
    
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const deleteEventMutation = useDeleteEvent();
    const deleteMeetupMutation = useDeleteMeetup();
    
    // Fetch events and meetups
    const { data: events = [] } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });
    
    const { data: meetups = [] } = useQuery({
        queryKey: ['meetups'],
        queryFn: getMeetups,
    });

    // Merge events and meetups into unified items
    const items = [
        ...events.map(event => ({ ...event, type: 'event' as const })),
        ...meetups.map(meetup => ({ ...meetup, type: 'meetup' as const })),
    ];
    
    // Filter to show only user's events
    const userEvents = useMemo(() => {
        if (!user?.id) return [];
        return items.filter(item => item.user_id === user.id);
    }, [items, user?.id]);
    
    const loading = !events.length && !meetups.length;

    const handleCreateEvent = () => {
        navigate('/events/create');
    };

    const handleCreateMeetup = () => {
        navigate('/meetups/create/step-1');
    };

    const handleEditEvent = async (item: UnifiedItem) => {
        try {
            // Navigate to edit page with item data and type
            navigate(`/events/${item.id}/edit`, { state: { item, itemType: item.type } });
        } catch (error) {
            toast.error('Failed to edit item');
        }
    };



    const handleDeleteEvent = async (item: any) => {
        if (item.type === 'event') {
            deleteEventMutation.mutate(item.id as string, {
                onSuccess: () => {
                    toast.success('Event deleted successfully');
                },
                onError: (error) => {
                    console.error('Delete error:', error);
                    toast.error('Failed to delete event');
                }
            });
        } else if (item.type === 'meetup') {
            deleteMeetupMutation.mutate(item.id as string, {
                onSuccess: () => {
                    toast.success('Meetup deleted successfully');
                },
                onError: (error) => {
                    console.error('Delete error:', error);
                    toast.error('Failed to delete meetup');
                }
            });
        }
    };



    if (!user) {
        return (
            <Container className="justify-center">
                <Typography variant="h6" className="text-center text-text-3">
                    Please sign in to manage your events
                </Typography>
            </Container>
        );
    }

    return (
        <Container className="relative justify-start">
            <Box className="no-scrollbar w-full overflow-y-auto">
                {/* Header */}
                <Box className="mb-8 flex flex-col w-full items-center ">
                    <Box className="flex items-center  mb-8 w-full mx-auto">
                        <IconButton 
                            onClick={() => navigate(-1)} 
                            className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700"
                        >
                            <KeyboardArrowLeft />
                        </IconButton>
                        <Typography variant="h4" className='mx-auto'>Manage Events</Typography>
                    </Box>
                    <Box className="flex gap-3 w-full">
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleCreateEvent}
                            className="bg-primary-1 text-white flex-1"
                            size="small"
                            sx={{ 
                                textTransform: 'none',
                                fontSize: '1rem',
                                padding: '2px 8px',
                                height: '50px'
                            }}
                        >
                            Event
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleCreateMeetup}
                            className="bg-primary-1 text-white flex-1"
                            size="small"
                            sx={{ 
                                textTransform: 'none',
                                fontSize: '1rem',
                                padding: '2px 8px',
                                height: '50px'
                            }}
                        >
                            Meetup
                        </Button>
                    </Box>
                </Box>

                {/* Stats */}
                <Box className="grid h-20 w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center rounded-2xl bg-neutral-50">
                    <Box className="text-center">
                        <Typography variant="h4" className="text-primary-1">
                            {userEvents.length}
                        </Typography>
                        <Typography variant="body2" className="text-text-3">
                            Events
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem className="h-[40%] self-center" />
                    <Box className="text-center">
                        <Typography variant="h4" className="text-primary-1">
                            {userEvents.filter(e => e.featured).length}
                        </Typography>
                        <Typography variant="body2" className="text-text-3">
                            Featured
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem className="text-text-3" />
                    <Box className="text-center">
                        <Typography variant="h4" className="text-primary-1">
                            {userEvents.filter(e => e.type === 'meetup' ? e.online : false).length}
                        </Typography>
                        <Typography variant="body2" className="text-text-3">
                            Online
                        </Typography>
                    </Box>
                </Box>

                {/* View Toggle */}
                <Box className="mb-4 flex w-full items-center justify-between">
                    <Typography variant="body2" className="text-primary-1">
                        {userEvents.length} events found
                    </Typography>
                    <Stack direction="row">
                        <IconButton
                            size="small"
                            onClick={() => setCardVariant('horizontal')}
                            className={cardVariant === 'horizontal' ? 'text-primary-1' : 'text-text-3'}
                        >
                            <ListOutlined />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => setCardVariant('vertical-compact')}
                            className={cardVariant === 'vertical-compact' ? 'text-primary-1' : 'text-text-3'}
                        >
                            <GridViewOutlined />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Events Grid/List */}
                {loading ? (
                    <Box className="flex justify-center py-8">
                        <Typography variant="body2" className="text-text-3">
                            Loading your events...
                        </Typography>
                    </Box>
                ) : userEvents.length > 0 ? (
                    <Box
                        className={`no-scrollbar mb-4 w-full gap-4 overflow-y-auto flex-1 ${
                            cardVariant === 'vertical-compact' ? 'grid grid-cols-2' : 'flex flex-col'
                        }`}
                    >
                        {getVisibleItems(userEvents).map(item => (
                            <Box key={item.id} className="relative">
                                <EventCard
                                    item={item}
                                    variant={cardVariant}
                                    actionType="favorite"
                                    onAction={() => {}}
                                />
                                <Box className="absolute top-2 right-2 flex gap-2">
                                    <IconButton
                                        size="small"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            handleEditEvent(item);
                                        }}
                                        className="bg-white/90 hover:bg-white"
                                        sx={{ width: 32, height: 32 }}
                                    >
                                        <Edit sx={{ fontSize: 16 }} />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            handleDeleteEvent(item);
                                        }}
                                        className="bg-white/90 hover:bg-white"
                                        sx={{ width: 32, height: 32 }}
                                    >
                                        <Delete sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}

                        {hasMore(userEvents.length) && (
                            <Box className='mt-4 flex justify-center'>
                                <Button
                                    variant='outlined'
                                    onClick={loadMore}
                                    className='text-primary-1 border-primary-1'
                                >
                                    Load More ({getRemainingCount(userEvents.length)} remaining)
                                </Button>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box className="rounded-2xl bg-neutral-50 p-8 text-center">
                        <Typography variant="h6" className="mb-2 text-text-3">
                            No events yet
                        </Typography>
                        <Typography variant="body2" className="mb-4 text-text-3">
                            Start creating your first event to get started
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleCreateEvent}
                            className="bg-primary-1 text-white"
                            sx={{ textTransform: 'none' }}
                        >
                            Create Your First Event
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default ManageEvents;
