import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Typography, Stack, IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import { LocationOnOutlined, Search, TuneOutlined } from '@mui/icons-material';

import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import { useGeoStore } from '@/store/geoStore';
import useUserStore from '@/store/userStore';
import useEventStore from '@/store/eventStore';
import { detectUserLocation } from '@/utils/geo';
import { UnifiedItem } from '@/store/eventStore';
import useItemsQuery from '@/hooks/useItemsQuery';
import FilterModal from '@/components/layout/FilterModal';

function MainPage1() {
    const navigate = useNavigate();
    const { city, country } = useGeoStore();
    const user = useUserStore(state => state.user);
    const { categories, categoryFilter, setCategoryFilter } = useEventStore();
    const [detecting, setDetecting] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const items = useEventStore(state => state.filteredAndSearchedItems)();
    const featuredItems = items.filter(item => item.featured);

    const { eventsError, meetupsError } = useItemsQuery();

    if (eventsError || meetupsError) {
        return <Typography>Error loading items.</Typography>;
    }
    const handleDetectLocation = async () => {
        setDetecting(true);
        await detectUserLocation();
        setTimeout(() => setDetecting(false), 2000);
    };

    const renderEventCard = (item: UnifiedItem, variant: 'horizontal' | 'vertical') => (
        <EventCard
            key={item.id}
            item={item}
            variant={variant}
            actionType='favorite'
            onAction={() => console.log(item.type === 'event' ? 'Join Event' : 'Join Meetup')}
        />
    );

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
                        onFocus={() => navigate('/search')}
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
                </Box>
                <Stack direction='row' spacing={1} className='no-scrollbar mb-4 overflow-x-auto'>
                    {categories.map(({ name, icon }) => (
                        <Chip
                            key={name}
                            label={name}
                            icon={<span className='text-[10px]'>{icon}</span>}
                            clickable
                            color={categoryFilter === name ? 'primary' : 'default'}
                            onClick={() => setCategoryFilter(categoryFilter === name ? '' : name)}
                            className='cursor-pointer'
                        />
                    ))}
                </Stack>
                {items.length > 0 && (
                    <>
                        <Typography variant='h4'>Featured Events</Typography>
                        <Stack direction='row' spacing={2} className='no-scrollbar overflow-x-auto py-4'>
                            {featuredItems.length > 0 &&
                                featuredItems[activeStep] &&
                                renderEventCard(featuredItems[activeStep], 'vertical')}
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
                <Typography variant='h4'>Upcoming Events</Typography>
                <Stack direction='column' spacing={2} className='no-scrollbar overflow-x-auto py-4'>
                    {items.length > 0 ? (
                        items.map(item => renderEventCard(item, 'horizontal'))
                    ) : (
                        <Typography variant='body2' className='py-4 text-center text-gray-500'>
                            No upcoming items found.
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
