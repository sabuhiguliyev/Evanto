import React from 'react';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';
import FavoriteCircle from '@/components/icons/favouritecircle.svg?react';
import IconAllOutlined from '@/components/icons/alloutlined.svg?react';
import IconEvent from '@/components/icons/event.svg?react';
import IconMusic from '@/components/icons/music.svg?react';
import IconEducation from '@/components/icons/education.svg?react';

const categories = [
    { icon: <IconAllOutlined />, label: 'All' },
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
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default UpcomingEvent;
