import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import EventCard from '@/components/cards/EventCard';
import { useFavorite } from '@/hooks/useFavorite';
import { useQuery } from '@tanstack/react-query';
import { getEvents, getMeetups } from '@/services';

function Favorite() {
    const navigate = useNavigate();
    const { favorites, isLoading } = useFavorite();
    
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
            <Container className='justify-center'>
                <CircularProgress />
            </Container>
        );

    return (
        <Container className='justify-start'>
            <Box className='mb-8 flex w-full items-center justify-between'>
                <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Favorite</Typography>
                <Box className='w-10' />
            </Box>
            {favorites.length === 0 ? (
                <Typography>No favorites yet.</Typography>
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
    );
}

export default Favorite;
