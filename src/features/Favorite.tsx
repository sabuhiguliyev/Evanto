import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeft, MoreVertOutlined } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import EventCard from '@/components/cards/EventCard';
import { useFavoriteStore } from '@/store/favoriteStore';
import useUserStore from '@/store/userStore';

function Favorite() {
    const navigate = useNavigate();
    const { favorites } = useFavoriteStore();
    const user = useUserStore(state => state.user);

    useEffect(() => {
        if (user?.id) {
            void useFavoriteStore.getState().fetchFavorites(user.id);
        }
    }, [user?.id]);

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
