import React, { useState } from 'react';
import { Avatar, Box, Typography, Button, Stack, Link, MobileStepper, IconButton } from '@mui/material';
import { LocationOnOutlined, TuneOutlined } from '@mui/icons-material';

import { detectUserLocation } from '@/hooks/geo';
import { useGeoStore } from '@/store/geoStore';
import Container from '@/components/layout/Container';
import Input from '@/components/forms/Input';
// import EventCard from '@/components/cards/EventCard';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import SearchIcon from '@/components/icons/search.svg?react';
import AllIcon from '@/components/icons/alloutlined.svg?react';
import IconEvent from '@/components/icons/event.svg?react';
import IconMusic from '@/components/icons/music.svg?react';
import IconEducation from '@/components/icons/education.svg?react';

const categories = [
    { icon: <AllIcon />, label: 'All' },
    { icon: <IconEvent />, label: 'Event' },
    { icon: <IconMusic />, label: 'Music' },
    { icon: <IconEducation />, label: 'Education' },
];

function MainPage1() {
    const { city, country } = useGeoStore();
    const [detecting, setDetecting] = useState(false);

    const handleDetectLocation = async () => {
        setDetecting(true);
        await detectUserLocation();
        setTimeout(() => setDetecting(false), 2000); // simulate end
    };

    return (
        <Container className='relative justify-start overflow-hidden pb-[80px]'>
            <Box className='flex w-full items-center justify-between'>
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
                <Avatar className='h-12 w-12' />
            </Box>
            <Typography variant='h2' className='mt-4 self-start'>
                Hello, !
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
                    return (
                        <Button
                            sx={{ border: '1px solid #EEE' }}
                            key={index}
                            className={`flex-shrink-0 whitespace-nowrap rounded-2xl px-3 text-xs normal-case`}
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
            {/*<Stack direction='row' spacing={2} className='no-scrollbar overflow-x-auto py-4'>*/}
            {/*    {filteredEvents().map((event: Event) => (*/}
            {/*        <EventCard*/}
            {/*            key={event.id}*/}
            {/*            variant='vertical-basic'*/}
            {/*            imageUrl={event.image_url}*/}
            {/*            title={event.title}*/}
            {/*            dateRange={formatRange(event.start_date, event.end_date)}*/}
            {/*            location={event.location}*/}
            {/*            memberAvatars={event.member_avatars}*/}
            {/*            memberCount={event.member_count}*/}
            {/*            onAction={() => console.log('Join Event')}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</Stack>*/}
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
