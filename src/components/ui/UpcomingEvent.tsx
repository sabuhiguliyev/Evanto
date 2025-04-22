import Container from '@/components/Container';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import ArrowCircle from '/src/styles/assets/icons/arrowcircleleft.svg?react';
import FavoriteCircle from '@/styles/assets/icons/favouritecircle.svg?react';
import AllIcon from '@/styles/assets/icons/all.svg?react';
import IconEvent from '@/styles/assets/icons/event.svg?react';
import IconMusic from '@/styles/assets/icons/music.svg?react';
import IconEducation from '@/styles/assets/icons/education.svg?react';
import { EventCardMedium } from '@/components/EventCardMedium';
import BottomAppBar from '@/components/BottomAppBar';

const categories = [
    { icon: <AllIcon />, label: 'All' },
    { icon: <IconEvent />, label: 'Event' },
    { icon: <IconMusic />, label: 'Music' },
    { icon: <IconEducation />, label: 'Education' },
];

function UpcomingEvent() {
    return (
        <Container className='relative overflow-hidden pb-[80px]'>
            <Box className={'mt-[-40px] flex w-full items-center justify-between'}>
                <ArrowCircle />

                <Typography variant='h4'>Upcoming Event</Typography>
                <FavoriteCircle />
            </Box>
            <Stack direction={'row'} spacing={1} className='h-6 w-full overflow-hidden'>
                {categories.map((item, index) => (
                    <Button
                        sx={{ border: '1px solid #EEE' }}
                        key={index}
                        className='flex-shrink-0 bg-white px-4 text-xs text-text-3'
                        startIcon={item.icon}
                    >
                        {item.label}
                    </Button>
                ))}
            </Stack>
            <Box className='flex w-full items-center justify-between'>
                <Typography variant='h4'>Event List</Typography>
                <Link className='text-xs font-normal'>See All</Link>
            </Box>
            <EventCardMedium
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
            />
            <EventCardMedium
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
            />
            <EventCardMedium
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
            />
            <EventCardMedium
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
            />
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default UpcomingEvent;
