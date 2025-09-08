import React from 'react';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import { useFiltersStore } from '@/store/filtersStore';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';
import { KeyboardArrowLeft, MoreVertOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EventCard from '@/components/cards/EventCard';
import { useQuery } from '@tanstack/react-query';
import { getEvents, getMeetups } from '@/services';
import { usePagination } from '@/hooks/usePagination';
import { Box, Button } from '@mui/material';
import { isAfter, isToday, startOfDay } from 'date-fns';

function UpcomingEvent() {
    const navigate = useNavigate();
    const { categoryFilter, setCategoryFilter, categories } = useFiltersStore();
    const { getVisibleItems, loadMore, hasMore, getRemainingCount } = usePagination();
    
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
    const allItems = [
        ...events.map(event => ({ ...event, type: 'event' as const })),
        ...meetups.map(meetup => ({ ...meetup, type: 'meetup' as const })),
    ];

    // Filter for upcoming events only (today or future)
    const today = startOfDay(new Date());
    const upcomingItems = allItems.filter(item => {
        const eventDate = item.type === 'event' 
            ? new Date(item.start_date) 
            : new Date(item.start_date);
        
        return isAfter(eventDate, today) || isToday(eventDate);
    });

    // Apply category filter
    const filteredItems = categoryFilter === 'All' 
        ? upcomingItems 
        : upcomingItems.filter(item => item.category === categoryFilter);

    return (
        <Container className='relative justify-start'>
            <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                        <KeyboardArrowLeft />
                    </IconButton>
                    <Typography variant='h4' className='dark:text-white'>Upcoming Events</Typography>
                    <IconButton className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                        <MoreVertOutlined />
                    </IconButton>
                </Box>
                <Stack direction='row' spacing={1} className='no-scrollbar mb-4 overflow-x-auto'>
                    {categories.map(({ name, iconName }) => (
                        <Chip
                            key={name}
                            label={name}
                            icon={<span className='text-[10px]'>{getCategoryIcon(iconName)}</span>}
                            clickable
                            color={categoryFilter === name ? 'primary' : 'default'}
                            onClick={() => setCategoryFilter(categoryFilter === name ? 'All' : name)}
                            className='cursor-pointer'
                        />
                    ))}
                </Stack>
                <Typography variant='h4' className='self-start dark:text-white'>
                    Event List
                </Typography>
                <Stack direction='column' spacing={2} className='py-4 pb-20'>
                    {filteredItems.length > 0 ? (
                        getVisibleItems(filteredItems).map(item => (
                            <EventCard key={item.id} item={item} variant='horizontal' actionType='favorite' />
                        ))
                    ) : (
                        <Typography variant='body2' className='py-4 text-center text-gray-500 dark:text-gray-400'>
                            {categoryFilter === 'All' 
                                ? 'No upcoming events found.' 
                                : `No upcoming ${categoryFilter.toLowerCase()} events found.`
                            }
                        </Typography>
                    )}

                    {hasMore(filteredItems.length) && (
                        <Box className='mt-4 flex justify-center'>
                            <Button
                                variant='outlined'
                                onClick={loadMore}
                                className='text-primary-1 border-primary-1'
                            >
                                Load More ({getRemainingCount(filteredItems.length)} remaining)
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Box>
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
        </Container>
    );
}

export default UpcomingEvent;
