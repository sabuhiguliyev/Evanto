import { Avatar, Box, Typography, Button, Stack, Link, MobileStepper } from '@mui/material';
import Container from '@/components/Container';
import Input from '@/components/Input';
import EventCard from '@/components/EventCard';
import BottomAppBar from '@/components/BottomAppBar';
import LocationIcon from '@/styles/assets/icons/locationpin.svg?react';
import SearchIcon from '@/styles/assets/icons/search.svg?react';
import FilterIcon from '@/styles/assets/icons/filter.svg?react';
import AllIcon from '@/styles/assets/icons/all.svg?react';
import IconEvent from '@/styles/assets/icons/event.svg?react';
import IconMusic from '@/styles/assets/icons/music.svg?react';
import IconEducation from '@/styles/assets/icons/education.svg?react';

const categories = [
    { icon: <AllIcon />, label: 'All' },
    { icon: <IconEvent />, label: 'Event' },
    { icon: <IconMusic />, label: 'Music' },
    { icon: <IconEducation />, label: 'Education' },
];

function MainPage1() {
    return (
        <Container className='relative overflow-hidden pb-[80px]'>
            {' '}
            <Box className={'flex gap-12'}>
                <LocationIcon />
                <Box>
                    <Typography variant='body1' className='text-text-3'>
                        Current Location
                    </Typography>
                    <Typography variant='h5'>Baku, Azerbaijan</Typography>
                </Box>
                <Avatar src='https://i.pravatar.cc/500?img=3' className='h-12 w-12' />
            </Box>
            <Typography variant='h2' className='mt-4 self-start'>
                Hello, Sabuhi
            </Typography>
            <Typography variant='body2' className='self-start text-text-3'>
                Welcome back, hope your feeling good today!
            </Typography>
            <Box className='flex w-full items-center gap-2'>
                <Input startIcon={<SearchIcon />} placeholder='Search your event' className='mr-2' />
                <Button variant='contained' className='mr-2 h-12 w-12'>
                    <FilterIcon />
                </Button>
            </Box>
            <Stack direction={'row'} spacing={1} className='h-6'>
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
                <Typography variant='h4'>Features Event</Typography>
                <Link className='text-xs font-normal'>See All</Link>
            </Box>
            <Stack direction={'row'}>
                <EventCard
                    imageUrl='public/illustrations/eventcard.png'
                    title='People Taking Videos During Concert'
                    dateRange='12-13mar 2024'
                    location='New York, USA'
                    memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                    memberCount={2}
                    onJoin={() => console.log('Join Event')}
                />{' '}
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
