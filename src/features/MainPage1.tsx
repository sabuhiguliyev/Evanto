import { Avatar, Box, Typography, Button, Stack, Link, MobileStepper, IconButton } from '@mui/material';
import Container from '@/components/layout/Container';
import useUserStore from '@/store/userStore';
import Input from '@/components/forms/Input';
import EventCard from '@/components/cards/EventCard';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import LocationIcon from '@/components/icons/locationpin.svg?react';
import SearchIcon from '@/components/icons/search.svg?react';
import AllIcon from '@/components/icons/alloutlined.svg?react';
import IconEvent from '@/components/icons/event.svg?react';
import IconMusic from '@/components/icons/music.svg?react';
import IconEducation from '@/components/icons/education.svg?react';
import { useEffect, useState } from 'react';
import { reverseGeocode } from '@/utils/reverseGeocode';
import useGeoLocation from '@/hooks/useGeoLocation';
import { TuneOutlined } from '@mui/icons-material';
import useEventStore from '@/store/eventStore';
import { supabase } from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';
import type { Event } from '@/store/eventStore';
import { format, isSameMonth } from 'date-fns';

function formatRange(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    const sameMonth = isSameMonth(s, e);

    const startDay = format(s, 'd');
    const endDay = format(e, 'd');
    const startMonth = format(s, 'MMM');
    const endMonth = format(e, 'MMM');
    const year = format(s, 'yyyy');

    return `${startDay}-${endDay}${sameMonth ? startMonth : `${startMonth}-${endMonth}`} ${year}`;
}
const categories = [
    { icon: <AllIcon />, label: 'All' },
    { icon: <IconEvent />, label: 'Event' },
    { icon: <IconMusic />, label: 'Music' },
    { icon: <IconEducation />, label: 'Education' },
];

function MainPage1() {
    const user = useUserStore(state => state.user);
    const avatarUrl = user?.avatar_url ?? 'https://i.pravatar.cc/500?img=3';
    const userName = user?.full_name ?? user?.email ?? 'Guest';
    const { location, error } = useGeoLocation();
    const [address, setAddress] = useState<Record<string, string> | null>(null);

    useEffect(() => {
        if (location) {
            reverseGeocode(location.lat, location.lng).then(res => {
                if (res) setAddress(res);
            });
        }
    }, [location, error]);

    const { setEvents, setError, categoryFilter, setCategoryFilter, filteredEvents } = useEventStore();
    const query = useQuery({
        queryKey: ['events'],
        queryFn: async (): Promise<Event[]> => {
            const { data, error } = await supabase.from('events').select('*').order('start_date', { ascending: true });

            if (error) throw new Error(error.message);
            return data as Event[];
        },
    });
    useEffect(() => {
        if (query.data) {
            setEvents(query.data);
            setError(null);
        } else if (query.error) {
            setError(query.error.message);
        }
    }, [query.data, query.error, setEvents, setError]);

    return (
        <Container className='relative justify-start overflow-hidden pb-[80px]'>
            <Box className='flex w-full max-w-[500px] items-center gap-4'>
                <LocationIcon />
                <Box className='flex min-w-0 flex-grow flex-col'>
                    <Typography variant='body1' className='text-text-3'>
                        Current Location
                    </Typography>
                    <Typography variant='h5' className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
                        {error
                            ? 'Location unavailable'
                            : address
                              ? `${address.town || address.country || address.village || 'Unknown'}, ${address.country || ''}`
                              : 'Detecting location...'}
                    </Typography>
                </Box>
                <Avatar src={avatarUrl} alt={userName} className='h-12 w-12 flex-shrink-0' />
            </Box>
            <Typography variant='h2' className='mt-4 self-start'>
                Hello, {userName.split(' ')[0]}!
            </Typography>
            <Typography variant='body2' className='self-start text-text-3'>
                Welcome back, hope your feeling good today!
            </Typography>
            <Box className='flex w-full items-center gap-2'>
                <Input startIcon={<SearchIcon />} placeholder='Search your event' className='flex-grow' />
                <IconButton size='large' disableRipple className='bg-primary-1 text-white'>
                    <TuneOutlined />
                </IconButton>
            </Box>
            <Stack direction='row' spacing={1} className='no-scrollbar w-full flex-nowrap overflow-x-auto py-2'>
                {categories.map((item, index) => {
                    const isSelected = categoryFilter === item.label;
                    return (
                        <Button
                            sx={{ border: '1px solid #EEE' }}
                            key={index}
                            onClick={() => setCategoryFilter(item.label)}
                            className={`flex-shrink-0 whitespace-nowrap rounded-2xl px-3 text-xs normal-case ${isSelected ? 'bg-primary-1 text-white' : 'bg-white text-text-3'}`}
                            startIcon={item.icon}
                        >
                            {item.label}
                        </Button>
                    );
                })}
            </Stack>
            <Box className='flex w-full items-center justify-between'>
                <Typography variant='h4'>Features Event</Typography>
                <Link className='text-xs font-normal'>See All</Link>
            </Box>
            <Stack direction='row' spacing={2} className='no-scrollbar overflow-x-auto py-4'>
                {filteredEvents().map((event: Event) => (
                    <EventCard
                        key={event.id}
                        variant='vertical-basic'
                        imageUrl={event.image_url}
                        title={event.title}
                        dateRange={formatRange(event.start_date, event.end_date)}
                        location={event.location}
                        memberAvatars={event.member_avatars}
                        memberCount={event.member_count}
                        onAction={() => console.log('Join Event')}
                    />
                ))}
            </Stack>
            <MobileStepper
                steps={3}
                backButton={null}
                nextButton={null}
                className='static'
                activeStep={0}
                classes={{
                    dots: 'flex justify-center items-center gap-2 w-full',
                    dot: 'w-2.5 h-2.5 rounded-full bg-gray-300',
                    dotActive: 'bg-transparent border-solid border-primary-1 w-7 h-1 rounded-full border-2',
                }}
            />
            <Box className='flex w-full items-center justify-between'>
                <Typography variant='h4'>Popular Event</Typography>
                <Link className='text-xs font-normal'>See All</Link>
            </Box>
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default MainPage1;
