import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Button, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { BottomAppBar } from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { useFavorite } from '@/hooks/useFavorite';
import { useUnifiedItems } from '@/hooks/useUnifiedItems';
import { useDarkMode } from '@/contexts/DarkModeContext';

function Favorites() {
    const navigate = useNavigate();
    const { favorites, isLoading: favoritesLoading } = useFavorite();
    const { isDarkMode } = useDarkMode();
    
    // Get unified items (events + meetups)
    const { data: items = [], isLoading: itemsLoading } = useUnifiedItems();

    // Filter items that are in favorites AND not cancelled
    const favoritesArray = items.filter(item => 
        favorites.some(fav => fav.item_id === item.id) && 
        item.status !== 'cancelled'
    );
    
    const isLoading = favoritesLoading || itemsLoading;
    


    if (isLoading)
        return (
            <Container className="flex-center">
                <CircularProgress />
            </Container>
        );

    return (
        <>
            <Container className='relative min-h-screen'>
                <PageHeader 
                    title="Favorites"
                    showBackButton={true}
                    showMenuButton={false}
                />
                {favorites.length === 0 ? (
                    <Typography className="text-center text-muted">
                        No favorites yet.
                    </Typography>
                ) : (
                    <Box className="space-y-4">
                        {favoritesArray.map(item => {
                            // In favorites, we always want to show the favorite button
                            // The card will handle showing "Cancelled" status internally
                            return (
                                <EventCard 
                                    key={item.id} 
                                    item={item} 
                                    actionType="favorite" 
                                    variant='horizontal' 
                                />
                            );
                        })}
                    </Box>
                )}
                <BottomAppBar />
            </Container>
        </>
    );
}

export default Favorites;
