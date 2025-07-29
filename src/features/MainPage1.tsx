import React, { useState } from 'react';
import { Avatar, Box, Typography, Stack, Link, IconButton, Chip } from '@mui/material';
import { LocationOnOutlined, TuneOutlined } from '@mui/icons-material';
import { useEventsQuery } from '@/hooks/useEventsQuery';

import Container from '@/components/layout/Container';
import Input from '@/components/forms/Input';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import SearchIcon from '@/components/icons/search.svg?react';
import { useGeoStore } from '@/store/geoStore';
import useUserStore from '@/store/userStore';
import useEventStore from '@/store/eventStore';
import { detectUserLocation } from '@/utils/geo';

function MainPage1() {
    const { city, country } = useGeoStore();
    const user = useUserStore(state => state.user);
    const events = useEventStore(state => state.events);
    const { categories, categoryFilter, setCategoryFilter } = useEventStore();
    const [detecting, setDetecting] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const filteredFeaturedEvents = events
        .filter(event => event.featured)
        .filter(event => categoryFilter === 'All' || event.category === categoryFilter);

    useEventsQuery();

    const handleDetectLocation = async () => {
        setDetecting(true);
        await detectUserLocation();
        setTimeout(() => setDetecting(false), 2000); // simulate end
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
                    <Avatar src={user?.avatar_url ?? undefined} className='h-12 w-12' />
                </Box>
                <Typography variant='h2' className='mb-2 self-start'>
                    Hello, {user?.full_name?.split(' ')[0] ?? 'Guest'} !
                </Typography>
                <Typography variant='body2' className='mb-4 self-start text-text-3'>
                    Welcome back, hope your feeling good today!
                </Typography>
                <Box className='mb-6 flex w-full items-center gap-2'>
                    <Input
                        startIcon={<SearchIcon />}
                        placeholder='Search your event'
                        className='flex-grow'
                        onChange={e => {
                            const val = e.target.value;
                            console.log('Search input:', val);
                            useEventStore.getState().setSearchQuery(val);
                        }}
                    />{' '}
                    <IconButton size='large' disableRipple className='bg-primary-1 text-white'>
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
                {filteredFeaturedEvents.length > 0 && (
                    <>
                        <Box className='flex w-full items-center justify-between'>
                            <Typography variant='h4'>Featured Events</Typography>
                        </Box>
                        <Stack direction='row' spacing={2} className='no-scrollbar overflow-x-auto py-4'>
                            <EventCard
                                key={filteredFeaturedEvents[activeStep].id}
                                title={filteredFeaturedEvents[activeStep].title}
                                start_date={filteredFeaturedEvents[activeStep].start_date}
                                end_date={filteredFeaturedEvents[activeStep].end_date}
                                location={filteredFeaturedEvents[activeStep].location}
                                imageUrl={filteredFeaturedEvents[activeStep].event_image || '/placeholder.jpg'}
                                memberAvatars={filteredFeaturedEvents[activeStep].member_avatars ?? []}
                                memberCount={filteredFeaturedEvents[activeStep].member_count ?? 0}
                                onAction={() => console.log('Join Event')}
                                variant='vertical'
                                category={filteredFeaturedEvents[activeStep].category}
                            />
                        </Stack>
                    </>
                )}
                <Box className='flex justify-center gap-2 py-2'>
                    {filteredFeaturedEvents.map((_, index) => (
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
                                          border: '2px solid #5C6BC0', // primary-1
                                          backgroundColor: 'transparent',
                                      }
                                    : {
                                          width: 10,
                                          height: 10,
                                          borderRadius: '50%',
                                          backgroundColor: '#ccc',
                                      }),
                            }}
                        />
                    ))}
                </Box>
                <Box className='flex w-full items-center justify-between'>
                    <Typography variant='h4'>Upcoming Events</Typography>
                    <Link className='text-xs font-normal'>See All</Link>
                </Box>
                <Stack direction='column' spacing={2} className='no-scrollbar overflow-x-auto py-4'>
                    {useEventStore.getState().filteredAndSearchedEvents().length > 0 ? (
                        useEventStore
                            .getState()
                            .filteredAndSearchedEvents()
                            .map(event => (
                                <EventCard
                                    key={event.id}
                                    variant='horizontal'
                                    title={event.title}
                                    start_date={event.start_date}
                                    end_date={event.end_date}
                                    location={event.location}
                                    imageUrl={event.event_image || '/placeholder.jpg'}
                                    memberAvatars={event.member_avatars ?? []}
                                    memberCount={event.member_count ?? 0}
                                    onAction={() => console.log('Join Event')}
                                    category={event.category}
                                />
                            ))
                    ) : (
                        <Typography variant='body2' className='py-4 text-center text-gray-500'>
                            No upcoming events found.
                        </Typography>
                    )}
                </Stack>
            </Box>
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default MainPage1;
