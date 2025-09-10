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
import { useDarkMode } from '@/contexts/DarkModeContext';

function UpcomingEvent() {
    const navigate = useNavigate();
    const { categoryFilter, setCategoryFilter, categories } = useFiltersStore();
    const { getVisibleItems, loadMore, hasMore, getRemainingCount } = usePagination();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    
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
        <>
            <Box className='absolute top-4 right-4 z-10 flex gap-2'>
                <Button
                    onClick={toggleDarkMode}
                    size="small"
                    variant="outlined"
                    className={`text-xs ${isDarkMode ? 'text-white border-gray-600' : 'text-gray-700 border-gray-300'}`}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </Button>
            </Box>
            
            <Container className={`justify-start no-scrollbar ${isDarkMode ? 'bg-[#1C2039]' : 'bg-white'}`}>
                <Box className='no-scrollbar w-full overflow-y-auto'>
                    <Box className='mb-8 flex w-full items-center justify-between'>
                        <IconButton 
                            onClick={() => navigate(-1)} 
                            className={`text-text-3 border border-neutral-200 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            <KeyboardArrowLeft />
                        </IconButton>
                        <Typography variant='h4' className={`font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Events</Typography>
                        <IconButton className={`text-text-3 border border-neutral-200 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
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
                            className={`cursor-pointer ${
                                categoryFilter === name 
                                    ? 'bg-primary text-white' 
                                    : isDarkMode 
                                        ? 'bg-white/20 text-white border border-white/20' 
                                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                            sx={{
                                '&.MuiChip-root': {
                                    backgroundColor: categoryFilter === name 
                                        ? '#5D9BFC' 
                                        : isDarkMode 
                                            ? 'rgba(255, 255, 255, 0.2)' 
                                            : '#F3F4F6',
                                    color: categoryFilter === name 
                                        ? 'white' 
                                        : isDarkMode 
                                            ? 'white' 
                                            : '#374151',
                                    borderColor: categoryFilter === name 
                                        ? '#5D9BFC' 
                                        : isDarkMode 
                                            ? 'rgba(255, 255, 255, 0.2)' 
                                            : '#D1D5DB',
                                    '&:hover': {
                                        backgroundColor: categoryFilter === name 
                                            ? '#4A8BFC' 
                                            : isDarkMode 
                                                ? 'rgba(255, 255, 255, 0.3)' 
                                                : '#E5E7EB',
                                    },
                                    '& .MuiChip-icon': {
                                        color: categoryFilter === name 
                                            ? 'white' 
                                            : isDarkMode 
                                                ? 'white' 
                                                : '#000000',
                                    }
                                }
                            }}
                        />
                    ))}
                </Stack>
                <Typography variant='h4' className={`self-start font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Event List
                </Typography>
                <Stack direction='column' spacing={2} className='py-4 pb-20'>
                    {filteredItems.length > 0 ? (
                        getVisibleItems(filteredItems).map(item => (
                            <EventCard key={item.id} item={item} variant='horizontal' actionType='favorite' />
                        ))
                    ) : (
                        <Typography variant='body2' className={`py-4 text-center font-jakarta ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
                                className={`${isDarkMode ? 'text-blue-400 border-blue-400 hover:bg-blue-400/10' : 'text-primary-1 border-primary-1'}`}
                                sx={{
                                    borderColor: isDarkMode ? '#5D9BFC' : '#5D9BFC',
                                    color: isDarkMode ? '#5D9BFC' : '#5D9BFC',
                                    '&:hover': {
                                        borderColor: isDarkMode ? '#4A8BFC' : '#4A8BFC',
                                        backgroundColor: isDarkMode ? 'rgba(93, 155, 252, 0.1)' : 'rgba(93, 155, 252, 0.04)',
                                    }
                                }}
                            >
                                Load More ({getRemainingCount(filteredItems.length)})
                            </Button>
                        </Box>
                    )}
                </Stack>
                </Box>
                <BottomAppBar className='fixed bottom-0 z-10 w-full' />
            </Container>
        </>
    );
}

export default UpcomingEvent;
