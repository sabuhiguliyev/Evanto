import React from 'react';
import { Box, Input, Stack, Typography, Button, IconButton } from '@mui/material';
import { SearchOutlined, TuneOutlined } from '@mui/icons-material';
import Container from '@/components/Container';
import BottomAppBar from '@/components/BottomAppBar';
import { EventCard3 } from '@/components/EventCard3';
import IconMore from '@/styles/assets/icons/3dots.svg?react';
import IconAll from '@/styles/assets/icons/all.svg?react';
import IconEvent from '@/styles/assets/icons/event.svg?react';
import IconMusic from '@/styles/assets/icons/music.svg?react';
import IconEducation from '@/styles/assets/icons/education.svg?react';
import IconSport from '@/styles/assets/icons/sport.svg?react';
import IconTour from '@/styles/assets/icons/tour.svg?react';
import ArrowCircle from '@/styles/assets/icons/arrowcircleleft.svg?react';
import IconFilterList from '@/styles/assets/icons/filterlist.svg?react';
import IconFilterIcons from '@/styles/assets/icons/filtericons.svg?react';
import FavoriteIcon from '@mui/icons-material/Favorite';

const categories = [
    { icon: <IconAll />, label: 'All' },
    { icon: <IconEvent />, label: 'Event' },
    { icon: <IconMusic />, label: 'Music' },
    { icon: <IconEducation />, label: 'Educa' },
    { icon: <IconSport />, label: 'Sports' },
    { icon: <IconTour />, label: 'Tour' },
];

function Search() {
    return (
        <Container className='relative overflow-hidden pb-[80px]'>
            {' '}
            <Box className={'mt-[-40px] flex w-full items-center justify-between'}>
                <ArrowCircle />

                <Typography variant='h4'>Search</Typography>
                <IconMore />
            </Box>
            <Box className={'flex w-full gap-2'}>
                <Input
                    className='h-12 w-full gap-2 rounded-3xl border px-4'
                    disableUnderline
                    startAdornment={<SearchOutlined color='disabled' />}
                    placeholder='Search your event...'
                />
                <IconButton size='large' disableRipple className='bg-primary-1 text-white'>
                    <TuneOutlined />
                </IconButton>
            </Box>
            <Stack direction={'row'} spacing={1}>
                {categories.map((item, index) => (
                    <Button
                        key={index}
                        className={'flex h-12 w-12 flex-col bg-white font-header text-[9px]'}
                        sx={{ border: '1px solid #EEE' }}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Button>
                ))}
            </Stack>
            <Box className='flex w-full items-center justify-between'>
                <Typography variant='body2' className='text-primary-1'>
                    243 founds
                </Typography>
                <Stack direction={'row'} spacing={1}>
                    <IconFilterList />
                    <IconFilterIcons />
                </Stack>
            </Box>
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
                iconButton
            />
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
                iconButton
            />
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
                iconButton
            />
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default Search;
