import React, { useState } from 'react';
import { Avatar, Box, Typography, Stack, IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import { LocationOnOutlined, Search, TuneOutlined } from '@mui/icons-material';
import { isSameDay } from 'date-fns';

import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import useUserStore from '@/store/userStore';
import { useAppStore } from '@/store/appStore';
import { useDataStore } from '@/store/dataStore';
import { detectUserLocation } from '@/utils/geo';
import useItemsQuery from '@/hooks/useItemsQuery';
import FilterModal from '@/components/layout/FilterModal';
import { UnifiedItem } from '@/types/UnifiedItem';
import Link from '@/components/navigation/Link';
import { useNavigate } from 'react-router-dom';
import { getCategoryIcon } from '@/utils/iconMap';

function MainPage1() {
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const { 
        categories, 
        categoryFilter, 
        setCategoryFilter, 
        city, 
        country,
        minPrice,
        maxPrice,
        meetupType,
        meetupDay,
        locationFilter,
        searchQuery,
        setSearchQuery
    } = useAppStore();
    const { items } = useDataStore();
    const [detecting, setDetecting] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isFilterOpen, setFilterOpen] = useState(false);
    
    // Apply all filters to items
    const filteredItems = items.filter(item => {
        // Search filter
        if (searchQuery && searchQuery.trim() !== '') {
            const title = item.type === 'event' ? item.title : item.meetup_name || '';
            const description = item.type === 'event' ? item.description : item.meetup_description || '';
            const searchLower = searchQuery.toLowerCase().trim();
            if (!title.toLowerCase().includes(searchLower) && 
                !(description || '').toLowerCase().includes(searchLower)) {
                return false;
            }
        }
        
        // Category filter
        if (categoryFilter && categoryFilter !== 'All') {
            const categoryMatch = item.category && item.category.toLowerCase() === categoryFilter.toLowerCase();
            if (!categoryMatch) return false;
        }
        
        // Price filter
        const price = item.type === 'event' ? (item.ticket_price || 0) : 0;
        if (price < minPrice || price > maxPrice) return false;
        
        // Meetup type filter
        if (meetupType !== 'Any') {
            if (meetupType === 'Online' && item.type !== 'meetup') return false;
            if (meetupType === 'In Person' && item.type !== 'event') return false;
        }
        
        // Meetup day filter
        if (meetupDay !== 'Any') {
            const itemDate = item.type === 'event' ? item.start_date : item.meetup_date;
            if (!itemDate) return false;
            
            const date = new Date(itemDate);
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const thisWeek = new Date(today);
            thisWeek.setDate(thisWeek.getDate() + 7);
            
            switch (meetupDay) {
                case 'Today':
                    if (!isSameDay(date, today)) return false;
                    break;
                case 'Tomorrow':
                    if (!isSameDay(date, tomorrow)) return false;
                    break;
                case 'This Week':
                    if (date < today || date > thisWeek) return false;
                    break;
            }
        }
        
        // Location filter
        if (locationFilter && locationFilter.trim() !== '') {
            const itemLocation = item.type === 'event' ? item.location || '' : '';
            if (!itemLocation.toLowerCase().includes(locationFilter.toLowerCase().trim())) {
                return false;
            }
        }
        
        return true;
    });
    
    const featuredItems = filteredItems.filter(item => item.featured);

    const { eventsError, meetupsError } = useItemsQuery();

    if (eventsError || meetupsError) {
        return <Typography>Error loading items.</Typography>;
    }
    const handleDetectLocation = async () => {
        setDetecting(true);
        await detectUserLocation();
        setTimeout(() => setDetecting(false), 2000);
    };



    return (
        <Container className='relative justify-start'>
            <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton
                        size='large'
                        className='text-text-3'
                        sx={{ border: '1px solid #eee' }}
                        onClick={handleDetectLocation}
                    >
                        <LocationOnOutlined />
                    </IconButton>
                    <Typography variant='body1' className='text-text-3'>
                        {detecting ? 'Detecting...' : city && country ? `${city}, ${country}` : 'Tap to detect'}
                    </Typography>
                    <Avatar src={user?.avatar_url} className='h-12 w-12' />
                </Box>
                <Typography variant='h2' className='mb-2 self-start'>
                    Hello, {user?.full_name?.split(' ')[0] ?? 'Guest'}!
                </Typography>
                <Typography variant='body2' className='mb-4 self-start text-text-3'>
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
                        className='bg-primary-1 text-white'
                        onClick={() => setFilterOpen(true)}
                    >
                        <TuneOutlined />
                    </IconButton>
                    {(searchQuery || categoryFilter !== 'All' || minPrice > 0 || maxPrice < 500 || meetupType !== 'Any' || meetupDay !== 'Any' || locationFilter) && (
                        <IconButton
                            size='small'
                            onClick={() => {
                                setSearchQuery('');
                                setCategoryFilter('All');
                                // Reset other filters to defaults
                                useAppStore.getState().setMinPrice(0);
                                useAppStore.getState().setMaxPrice(500);
                                useAppStore.getState().setMeetupType('Any');
                                useAppStore.getState().setMeetupDay('Any');
                                useAppStore.getState().setLocationFilter('');
                            }}
                            sx={{ 
                                border: '1px solid #ccc',
                                fontSize: '12px',
                                padding: '4px 8px'
                            }}
                        >
                            Clear
                        </IconButton>
                    )}
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
                        className='cursor-pointer'
                    />
                ))}
                </Stack>
                
                {/* Active Filters Summary */}
                {(searchQuery || categoryFilter !== 'All' || minPrice > 0 || maxPrice < 500 || meetupType !== 'Any' || meetupDay !== 'Any' || locationFilter) && (
                    <Box className='mb-4 p-3 bg-gray-50 rounded-lg'>
                        <Typography variant='body2' className='text-gray-600 mb-2'>
                            Active filters:
                        </Typography>
                        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                            {searchQuery && (
                                <Chip 
                                    label={`Search: "${searchQuery}"`} 
                                    size='small' 
                                    color='primary' 
                                    variant='outlined'
                                />
                            )}
                            {categoryFilter !== 'All' && (
                                <Chip 
                                    label={`Category: ${categoryFilter}`} 
                                    size='small' 
                                    color='primary' 
                                    variant='outlined'
                                />
                            )}
                            {(minPrice > 0 || maxPrice < 500) && (
                                <Chip 
                                    label={`Price: $${minPrice} - $${maxPrice}`} 
                                    size='small' 
                                    color='primary' 
                                    variant='outlined'
                                />
                            )}
                            {meetupType !== 'Any' && (
                                <Chip 
                                    label={`Type: ${meetupType}`} 
                                    size='small' 
                                    color='primary' 
                                    variant='outlined'
                                />
                            )}
                            {meetupDay !== 'Any' && (
                                <Chip 
                                    label={`Day: ${meetupDay}`} 
                                    size='small' 
                                    color='primary' 
                                    variant='outlined'
                                />
                            )}
                            {locationFilter && (
                                <Chip 
                                    label={`Location: ${locationFilter}`} 
                                    size='small' 
                                    color='primary' 
                                    variant='outlined'
                                />
                            )}
                        </Stack>
                    </Box>
                )}
                
                {filteredItems.length > 0 && (
                    <>
                        <Typography variant='h4'>Featured Events</Typography>
                        <Stack direction='row' spacing={2} className='no-scrollbar overflow-x-auto py-4'>
                            {featuredItems.length > 0 &&
                                featuredItems[activeStep] && (
                                    <EventCard
                                        key={featuredItems[activeStep].id}
                                        item={featuredItems[activeStep]}
                                        variant='vertical'
                                        actionType='join'
                                        onAction={() => navigate(`/book-event?itemId=${featuredItems[activeStep].id}`)}
                                    />
                                )}
                        </Stack>
                    </>
                )}
                <Box className='flex justify-center gap-2 py-2'>
                    {featuredItems.map((_, index) => (
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
                    <Typography variant='h4'>Upcoming Events</Typography>
                    <Link href={'/upcoming'}>See All</Link>
                </Box>
                <Stack direction='column' spacing={2} className='no-scrollbar overflow-x-auto py-4'>
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                            <EventCard
                                key={item.id}
                                item={item}
                                variant='horizontal-compact'
                                actionType='join'
                                onAction={() => navigate(`/book-event?itemId=${item.id}`)}
                            />
                        ))
                    ) : (
                        <Typography variant='body2' className='py-4 text-center text-gray-500'>
                            {searchQuery || categoryFilter !== 'All' || minPrice > 0 || maxPrice < 500 || meetupType !== 'Any' || meetupDay !== 'Any' || locationFilter
                                ? 'No items match your current filters. Try adjusting your search criteria.'
                                : 'No upcoming items found.'
                            }
                        </Typography>
                    )}
                </Stack>
            </Box>
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
            <FilterModal open={isFilterOpen} onClose={() => setFilterOpen(false)} />
        </Container>
    );
}

export default MainPage1;
