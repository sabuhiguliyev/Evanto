import React, { useState } from 'react';
import { Avatar, Typography, Stack, IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import { LocationOn, Search, Tune } from '@mui/icons-material';

import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import { useGeoStore } from '@/store/geoStore';
import { useUser } from '@/hooks/entityConfigs';
import useUserStore from '@/store/userStore';
import { useFiltersStore } from '@/store/filtersStore';
import { useDataStore } from '@/store/dataStore';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';

import { detectUserLocation } from '@/utils/geo';
import { useUnifiedItems } from '@/hooks/useUnifiedItems';
import type { UnifiedItem } from '@/utils/schemas';
import FilterModal from '@/components/layout/FilterModal';
import { getAvatarProps } from '@/utils/avatarUtils';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '@/hooks/usePagination';
import { Box, Button } from '@mui/material';
import { useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { hasActiveFilters, resetAllFilters } from '@/utils/filterUtils';

function Home() {
    const navigate = useNavigate();
    const { city, country } = useGeoStore();
    const { user: authUser } = useUserStore();
    const { data: user } = useUser(authUser?.id || '');
    const { 
        categoryFilter, 
        setCategoryFilter, 
        searchQuery, 
        setSearchQuery, 
        categories, 
        getFilteredItems,
        minPrice,
        maxPrice,
        eventType,
        dateFilter,
        locationFilter
    } = useFiltersStore();
    const dataStore = useDataStore();
    const [detecting, setDetecting] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const { mode } = useTheme();
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
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            
            <Container className={`relative justify-start ${mode === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton
                        size='large'
                        className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700"
                        onClick={handleDetectLocation}
                    >
                        <LocationOn />
                    </IconButton>
                    <Typography variant='body1' className={`font-poppins ${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
                        {detecting ? 'Detecting...' : city && country ? `${city}, ${country}` : 'Tap to detect'}
                    </Typography>
                    <Avatar {...getAvatarProps(user, authUser, 48)} />
                </Box>
                <Typography variant='h2' className={`mb-2 self-start font-poppins font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Hello, {user?.full_name?.split(' ')[0] ?? 'Guest'}!
                </Typography>
                <Typography variant='body2' className={`mb-4 self-start font-poppins ${mode === 'dark' ? 'text-gray-300' : 'text-text-3'}`}>
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

                {/* Active Filters Summary */}
                {hasActiveFilters() && (
                    <Box className='mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                        <Box className='flex items-center justify-between mb-2'>
                            <Typography variant='body2' className={`font-poppins ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                Active filters:
                            </Typography>
                            <Button
                                size='small'
                                onClick={resetAllFilters}
                                className='text-xs px-2 py-1'
                                sx={{ 
                                    border: '1px solid #ccc',
                                    fontSize: '12px',
                                    padding: '4px 8px',
                                    minWidth: 'auto'
                                }}
                            >
                                Clear all
                            </Button>
                        </Box>
                        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                            {searchQuery && (
                                <Chip
                                    label={`Search: "${searchQuery}"`}
                                    onDelete={() => setSearchQuery('')}
                                    size='small'
                                    className={`${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {categoryFilter !== 'All' && (
                                <Chip
                                    label={`Category: ${categoryFilter}`}
                                    onDelete={() => setCategoryFilter('All')}
                                    size='small'
                                    className={`${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {eventType !== 'Any' && (
                                <Chip
                                    label={`Type: ${eventType}`}
                                    size='small'
                                    className={`${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {dateFilter !== 'Upcoming' && (
                                <Chip
                                    label={`Date: ${dateFilter}`}
                                    size='small'
                                    className={`${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {locationFilter && (
                                <Chip
                                    label={`Location: ${locationFilter}`}
                                    size='small'
                                    className={`${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {(minPrice > 0 || maxPrice < 500) && (
                                <Chip
                                    label={`Price: $${minPrice} - $${maxPrice}`}
                                    size='small'
                                    className={`${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                        </Stack>
                    </Box>
                )}

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
                                    : mode === 'dark' 
                                        ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                            sx={{
                                '&.MuiChip-root': {
                                    backgroundColor: categoryFilter === name 
                                        ? '#5D9BFC' 
                                        : mode === 'dark' 
                                            ? '#374151' 
                                            : '#F3F4F6',
                                    color: categoryFilter === name 
                                        ? 'white' 
                                        : mode === 'dark' 
                                            ? 'white' 
                                            : '#374151',
                                    borderColor: categoryFilter === name 
                                        ? '#5D9BFC' 
                                        : mode === 'dark' 
                                            ? '#4B5563' 
                                            : '#D1D5DB',
                                    '&:hover': {
                                        backgroundColor: categoryFilter === name 
                                            ? '#4A8BFC' 
                                            : mode === 'dark' 
                                                ? '#4B5563' 
                                                : '#E5E7EB',
                                    }
                                }
                            }}
                        />
                    ))}
                </Stack>
                {filteredItems.length > 0 && (
                    <>
                        <Typography variant='h4' className={`font-poppins font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Featured Events</Typography>
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
                        <Typography variant='body2' className={`py-4 text-center ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {hasActiveFilters()
                                ? 'No items match your current filters. Try adjusting your search criteria.'
                                : 'No upcoming events found.'
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
            <FilterModal open={isFilterOpen} onClose={() => setFilterOpen(false)} />
            </Container>
        </>
    );
}

export default Home;
