import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeft, MoreVertOutlined } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import EventCard from '@/components/cards/EventCard';
import { useFavoriteStore } from '@/store/favoriteStore';
import useUserStore from '@/store/userStore';
import { useFavoritesQuery } from '@/hooks/useFavoritesQuery';

function Favorite() {
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const { favorites } = useFavoriteStore();
    const { isLoading } = useFavoritesQuery(user?.id);

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
                <IconButton className='text-text-3' sx={{ border: '1px solid #eee' }}>
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            {favorites.length === 0 ? (
                <Typography>No favorites yet.</Typography>
            ) : (
                favorites.map(item => (
                    <EventCard key={item.id} item={item} actionType='favorite' variant='horizontal' />
                ))
            )}
        </Container>
    );
}

export default Favorite;
