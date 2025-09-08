import React, { useState } from 'react';
import { Avatar, Typography, Stack, IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import { LocationOn, Search, Tune } from '@mui/icons-material';

import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import { useGeoStore } from '@/store/geoStore';
import useUserStore from '@/store/userStore';
import { useFiltersStore } from '@/store/filtersStore';
import { useDataStore } from '@/store/dataStore';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';

import { detectUserLocation } from '@/utils/geo';
import { useUnifiedItems } from '@/hooks/useUnifiedItems';
import type { UnifiedItem } from '@/utils/schemas';
import FilterModal from '@/components/layout/FilterModal';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '@/hooks/usePagination';
import { Box, Button } from '@mui/material';

function Home() {
    const navigate = useNavigate();
    const { city, country } = useGeoStore();
    const user = useUserStore(state => state.user);
    const { categoryFilter, setCategoryFilter, searchQuery, setSearchQuery, categories, getFilteredItems } = useFiltersStore();
    const dataStore = useDataStore();
    const [detecting, setDetecting] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const { getVisibleItems, loadMore, hasMore, getRemainingCount } = usePagination();
    // Use unified items hook for better data management
    const { 
        data: items = [], 
        isLoading: itemsLoading, 
        error: itemsError 
    } = useUnifiedItems();

    // Use centralized filtering from filtersStore
    const filteredItems = getFilteredItems(items);
    
    const featuredItems = filteredItems.filter((item: UnifiedItem) => item.featured);

    if (itemsError) {
        return <Typography>Error loading items.</Typography>;
    }
    const handleDetectLocation = async () => {
        setDetecting(true);
        await detectUserLocation();
        setTimeout(() => setDetecting(false), 2000);
    };


    const renderEventCard = (item: UnifiedItem, variant: 'horizontal-compact' | 'vertical') => (
        <Box 
            key={item.id} 
            onClick={() => {
                const eventData = {
                    id: item.id,
                    type: item.type,
                    title: item.title || 'Untitled',
                    description: item.type === 'event' ? item.description : item.description || 'No description available',
                    category: item.category || 'All',
                    location: item.location || 'Location not specified',
                    startDate: item.start_date,
                    endDate: item.type === 'event' ? item.end_date : undefined,
                    ticketPrice: item.type === 'event' ? item.ticket_price : undefined,
                    imageUrl: item.image || '/illustrations/eventcard.png',
                    online: item.online,
                    featured: item.featured,
                    meetupLink: item.type === 'meetup' ? item.meetup_link : undefined,
                    userId: item.user_id
                };
                
                navigate(`/events/${item.id}`, { 
                    state: { 
                        event: eventData
                    } 
                });
            }}
            sx={{ cursor: 'pointer' }}
        >
            <EventCard
                item={item}
                variant={variant}
                actionType='join'
                onAction={(e) => {
                    e?.stopPropagation(); // Prevent card click when action button is clicked
                    navigate(`/bookings/event/${item.id}`);
                }}
            />
        </Box>
    );

    return (
        <Container className='relative justify-start'>
            <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton
                        size='large'
                        className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700"
                        onClick={handleDetectLocation}
                    >
                        <LocationOn />
                    </IconButton>
                    <Typography variant='body1' className='text-text-3 dark:text-gray-400'>
                        {detecting ? 'Detecting...' : city && country ? `${city}, ${country}` : 'Tap to detect'}
                    </Typography>
                    <Avatar src={user?.avatar_url} className='h-12 w-12' />
                </Box>
                <Typography variant='h2' className='mb-2 self-start dark:text-white'>
                    Hello, {user?.full_name?.split(' ')[0] ?? 'Guest'}!
                </Typography>
                <Typography variant='body2' className='mb-4 self-start text-text-3 dark:text-gray-400'>
                    Welcome back, hope you&#39;re feeling good today!
                </Typography>
                <Box className='mb-6 flex w-full items-center gap-2'>
                    <TextField
                        className='text-input'
                        label='Search for events'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Search />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <IconButton
                        size='large'
                        disableRipple
                        className='bg-primary text-white'
                        onClick={() => setFilterOpen(true)}
                    >
                        <Tune />
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
                            className='cursor-pointer dark:bg-gray-700 dark:text-white dark:border-gray-600'
                        />
                    ))}
                </Stack>
                {filteredItems.length > 0 && (
                    <>
                        <Typography variant='h4' className='dark:text-white'>Featured Events</Typography>
                        <Box className='flex justify-center py-4'>
                            {featuredItems.length > 0 &&
                                featuredItems[activeStep] &&
                                renderEventCard(featuredItems[activeStep], 'vertical')}
                        </Box>
                    </>
                )}
                <Box className='flex justify-center gap-2 py-2'>
                    {featuredItems.map((_: UnifiedItem, index: number) => (
                        <Box
                            key={index}
                            onClick={() => setActiveStep(index)}
                            sx={{
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                ...(index === activeStep
                                    ? {
                                          width: 28,
                                          height: 8,
                                          borderRadius: 4,
                                          border: '2px solid #5C6BC0',
                                          backgroundColor: 'transparent',
                                      }
                                    : { width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ccc' }),
                            }}
                        />
                    ))}
                </Box>
                <Box className='flex justify-between'>
                    <Typography variant='h4' className='dark:text-white'>Upcoming Events</Typography>
                    <Link to={'/upcoming'} className='text-primary'>See All</Link>
                </Box>
                <Stack direction='column' spacing={2} className='py-4 pb-24'>
                    {filteredItems.length > 0 ? (
                        getVisibleItems(filteredItems).map((item: UnifiedItem) => renderEventCard(item, 'horizontal-compact'))
                    ) : (
                        <Typography variant='body2' className='py-4 text-center text-gray-500 dark:text-gray-400'>
                            No upcoming items found.
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
            <FilterModal open={isFilterOpen} onClose={() => setFilterOpen(false)} />
        </Container>
    );
}

export default Home;
