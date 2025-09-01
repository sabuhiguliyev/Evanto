import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import EventCard from '@/components/cards/EventCard';
import { useFavorite } from '@/hooks/useFavorite';
import { useDataStore } from '@/store/dataStore';
import useItemsQuery from '@/hooks/useItemsQuery';

function Favorite() {
    const navigate = useNavigate();
    const { favorites, isLoading } = useFavorite();
    const { items } = useDataStore();
    
    // Ensure items are loaded
    useItemsQuery();

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
                <IconButton onClick={() => navigate(-1)} className='text-text-3' sx={{ border: '1px solid #eee' }}>
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
