import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, IconButton, Typography, Button } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import EventCard from '@/components/cards/EventCard';
import { useFavorite } from '@/hooks/useFavorite';
import { useQuery } from '@tanstack/react-query';
import { getEvents, getMeetups } from '@/services';
import { useDarkMode } from '@/contexts/DarkModeContext';

function Favorites() {
    const navigate = useNavigate();
    const { favorites, isLoading } = useFavorite();
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
    const items = [
        ...events.map(event => ({ ...event, type: 'event' as const })),
        ...meetups.map(meetup => ({ ...meetup, type: 'meetup' as const })),
    ];

    // Filter items that are in favorites
    const favoritesArray = items.filter(item => favorites.some(fav => fav.item_id === item.id));
    


    if (isLoading)
        return (
            <Container className={`justify-center ${isDarkMode ? 'bg-[#1C2039]' : 'bg-white'}`}>
                <CircularProgress />
            </Container>
        );

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
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton 
                        onClick={() => navigate(-1)} 
                        className={`text-text-3 border border-neutral-200 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                        <KeyboardArrowLeft />
                    </IconButton>
                    <Typography variant='h4' className={`font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Favorites
                    </Typography>
                    <Box className='w-10' />
                </Box>
                {favorites.length === 0 ? (
                    <Typography className={`text-center font-jakarta ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No favorites yet.
                    </Typography>
                ) : (
                    <Box className="w-full space-y-4">
                        {favoritesArray.map(item => (
                            <Box key={item.id} className="w-full">
                                <EventCard key={item.id} item={item} actionType='favorite' variant='horizontal' />
                            </Box>
                        ))}
                    </Box>
                )}
            </Container>
        </>
    );
}

export default Favorites;
