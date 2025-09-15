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
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    
    // Get unified items (events + meetups)
    const { data: items = [], isLoading: itemsLoading } = useUnifiedItems();

    // Filter items that are in favorites
    const favoritesArray = items.filter(item => favorites.some(fav => fav.item_id === item.id));
    
    const isLoading = favoritesLoading || itemsLoading;
    


    if (isLoading)
        return (
            <Container className="flex-center">
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
                    className="text-xs text-secondary border-primary"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </Button>
            </Box>
            
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
                            // Determine action type based on status
                            const isCancelled = item.status === 'cancelled';
                            const actionType = isCancelled ? 'cancel' : 'favorite';
                            
                            return (
                                <EventCard 
                                    key={item.id} 
                                    item={item} 
                                    actionType={actionType} 
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
