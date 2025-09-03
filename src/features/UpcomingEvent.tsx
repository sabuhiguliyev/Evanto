import React from 'react';
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import { useAppStore } from '@/store/appStore';
import { getCategoryIcon } from '@/utils/iconMap';
import { KeyboardArrowLeft, MoreVertOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EventCard from '@/components/cards/EventCard';
import { useQuery } from '@tanstack/react-query';
import { getEvents, getMeetups } from '@/services';

function UpcomingEvent() {
    const navigate = useNavigate();
    const { categories, categoryFilter, setCategoryFilter } = useAppStore();
    
    // Fetch events and meetups
    const { data: events = [] } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });
    
    const { data: meetups = [] } = useQuery({
        queryKey: ['meetups'],
        queryFn: getMeetups,
    });

    // Merge events and meetups into unified items
    const items = [
        ...events.map(event => ({ ...event, type: 'event' as const })),
        ...meetups.map(meetup => ({ ...meetup, type: 'meetup' as const })),
    ];

    return (
        <Container className='relative h-screen overflow-hidden'>
            <Box className='mb-8 flex w-full items-center justify-between'>
                <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Upcoming Events</Typography>
                <IconButton className="text-text-3 border border-neutral-200">
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            <Stack
                direction='row'
                spacing={1}
                className='no-scrollbar mb-4 overflow-x-auto'
                sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}
            >
                {categories.map(({ name, iconName }) => (
                    <Chip
                        key={name}
                        label={name}
                        icon={<span className='text-[10px]'>{getCategoryIcon(iconName)}</span>}
                        clickable
                        color={categoryFilter === name ? 'primary' : 'default'}
                        onClick={() => setCategoryFilter(categoryFilter === name ? 'All' : name)}
                        className='cursor-pointer'
                        sx={{ minWidth: 'max-content' }}
                    />
                ))}
            </Stack>
            <Typography variant='h4' className='self-start'>
                Event List
            </Typography>
            <Box className='no-scrollbar flex-1 overflow-y-auto py-4'>
                <Stack direction='column' spacing={2}>
                    {items.length > 0 ? (
                        items.map(item => (
                            <EventCard key={item.id} item={item} variant='horizontal' actionType='favorite' />
                        ))
                    ) : (
                        <Typography variant='body2' className='py-4 text-center text-gray-500'>
                            No upcoming items found.
                        </Typography>
                    )}
                </Stack>
            </Box>
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default UpcomingEvent;
