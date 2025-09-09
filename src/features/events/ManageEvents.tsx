import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, IconButton, ToggleButton, Divider, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
import { useDeleteEvent } from '@/hooks/entityConfigs';
import { useDeleteMeetup } from '@/hooks/entityConfigs';
import toast from 'react-hot-toast';
import { useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

function ManageEvents() {
    const [cardVariant, setCardVariant] = useState<'horizontal' | 'vertical-compact'>('horizontal');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<UnifiedItem | null>(null);
    const { getVisibleItems, loadMore, hasMore, getRemainingCount } = usePagination();
    const { mode } = useTheme();
    
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



    const handleDeleteClick = (item: UnifiedItem) => {
        setItemToDelete(item);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        if (itemToDelete.type === 'event') {
            deleteEventMutation.mutate(itemToDelete.id as string, {
                onSuccess: () => {
                    toast.success('Event deleted successfully');
                    setDeleteDialogOpen(false);
                    setItemToDelete(null);
                },
                onError: (error) => {
                    console.error('Delete error:', error);
                    toast.error('Failed to delete event');
                }
            });
        } else if (itemToDelete.type === 'meetup') {
            deleteMeetupMutation.mutate(itemToDelete.id as string, {
                onSuccess: () => {
                    toast.success('Meetup deleted successfully');
                    setDeleteDialogOpen(false);
                    setItemToDelete(null);
                },
                onError: (error) => {
                    console.error('Delete error:', error);
                    toast.error('Failed to delete meetup');
                }
            });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };



    if (!user) {
        return (
            <>
                <Box className='absolute top-4 right-4 z-10'>
                    <ThemeToggle />
                </Box>
                <Container className={`justify-center ${mode === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                    <Typography variant="h6" className={`text-center ${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
                        Please sign in to manage your events
                    </Typography>
                </Container>
            </>
        );
    }

    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            <Container className={`relative justify-start ${mode === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
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
                        <Typography variant="h4" className={`mx-auto font-poppins font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Manage Events</Typography>
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
                <Box className={`grid h-20 w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center rounded-2xl ${mode === 'dark' ? 'bg-gray-800' : 'bg-neutral-50'}`}>
                    <Box className="text-center">
                        <Typography variant="h4" className="text-primary">
                            {userEvents.length}
                        </Typography>
                        <Typography variant="body2" className={`${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
                            Events
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem className="h-[40%] self-center" />
                    <Box className="text-center">
                        <Typography variant="h4" className="text-primary">
                            {userEvents.filter(e => e.featured).length}
                        </Typography>
                        <Typography variant="body2" className={`${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
                            Featured
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem className="h-[40%] self-center" />
                    <Box className="text-center">
                        <Typography variant="h4" className="text-primary">
                            {userEvents.filter(e => e.type === 'meetup' ? e.online : false).length}
                        </Typography>
                        <Typography variant="body2" className={`${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
                            Online
                        </Typography>
                    </Box>
                </Box>

                {/* View Toggle */}
                <Box className="mb-4 flex w-full items-center justify-between">
                    <Typography variant="body2" className={`text-primary ${mode === 'dark' ? 'text-primary' : 'text-primary'}`}>
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
                        <Typography variant="body2" className={`${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
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
                                <Box className="absolute top-2 left-2 flex gap-2">
                                    <IconButton
                                        size="small"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            handleEditEvent(item);
                                        }}
                                        sx={{ 
                                            width: 32, 
                                            height: 32,
                                            backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                                            color: mode === 'dark' ? '#f3f4f6' : '#374151',
                                            '&:hover': {
                                                backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 1)',
                                            },
                                        }}
                                    >
                                        <Edit sx={{ fontSize: 16 }} />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            handleDeleteClick(item);
                                        }}
                                        sx={{ 
                                            width: 32, 
                                            height: 32,
                                            backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                                            color: mode === 'dark' ? '#f3f4f6' : '#374151',
                                            '&:hover': {
                                                backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 1)',
                                            },
                                        }}
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
                    <Box className={`rounded-2xl p-8 text-center ${mode === 'dark' ? 'bg-gray-800' : 'bg-neutral-50'}`}>
                        <Typography variant="h6" className={`mb-2 ${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
                            No events yet
                        </Typography>
                        <Typography variant="body2" className={`mb-4 ${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
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

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    maxWidth="sm"
                    fullWidth
                    disablePortal={true}
                    sx={{
                        position: 'absolute',
                        zIndex: 1300,
                        '& .MuiBackdrop-root': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        },
                        '& .MuiDialog-paper': {
                            position: 'relative',
                            margin: '16px',
                        },
                    }}
                >
                    <DialogTitle className={`font-poppins font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Confirm Deletion
                    </DialogTitle>
                    <DialogContent>
                        <Typography className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Are you sure you want to delete "{itemToDelete?.title}"? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleDeleteCancel}
                            variant="outlined"
                            className="font-jakarta"
                            sx={{
                                borderColor: mode === 'dark' ? '#374151' : '#d1d5db',
                                color: mode === 'dark' ? '#9ca3af' : '#6b7280',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            variant="contained"
                            className="font-jakarta"
                            sx={{
                                backgroundColor: '#ef4444',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#dc2626',
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            </Container>
        </>
    );
}

export default ManageEvents;
