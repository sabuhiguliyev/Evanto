import React from 'react';
import { Box, IconButton, Input, Link, Stack, Typography } from '@mui/material';
import { SearchOutlined, TuneOutlined } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import LocationIcon from '@/components/icons/locationpin.svg?react';
import NotificationIcon from '@/components/icons/notification.svg?react';

function MainPage2() {
    return (
        <Container className='relative gap-6'>
            <Box className={'mt-[-40px] flex w-full items-center justify-between'}>
                <LocationIcon />
                <Box className={''}>
                    <Typography variant='body1' className='text-text-3'>
                        Current Location
                    </Typography>
                    <Typography variant='h5'>Baku, Azerbaijan</Typography>
                </Box>
                <NotificationIcon />
            </Box>
            <Box className={'flex w-full gap-2'}>
                <Input
                    className='h-12 w-full rounded-3xl border px-4'
                    disableUnderline
                    startAdornment={<SearchOutlined color='disabled' />}
                />
                <IconButton size='large' disableRipple className='bg-primary-1 text-white'>
                    <TuneOutlined />
                </IconButton>
            </Box>
            <Box className='flex w-full items-center justify-between'>
                <Typography variant='h4'>Recommended</Typography>
                <Link className='text-xs font-normal'>See All</Link>
            </Box>
            <Stack direction='column' spacing={2}></Stack>
            <Box className='flex w-full items-center justify-between'>
                <Typography variant='h4'>Upcoming Events</Typography>
                <Link className='text-xs font-normal'>See All</Link>
            </Box>
            <Stack direction='row' spacing={2}></Stack>
            <BottomAppBar />
        </Container>
    );
}

export default MainPage2;
