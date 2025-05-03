import React from 'react';
import { Avatar, AvatarGroup, Box, Button, Divider, IconButton, Typography } from '@mui/material';
import Container from '@/components/Container';
import ArrowCircleBlurred from '@/styles/assets/icons/arrowcircleleftblurred.svg?react';
import FavoriteCircleBlurred from '@/styles/assets/icons/favouritecircleblurred.svg?react';
import IconVideo from '@/styles/assets/icons/video.svg?react';
import { CalendarMonthOutlined, LocationOnOutlined, Star } from '@mui/icons-material';
import Link from '@/components/Link';

const memberAvatars = ['https://i.pravatar.cc/150?img=3', 'https://i.pravatar.cc/150?img=3'];
const memberCount = 2;

function EventDetails() {
    return (
        <Container>
            <Box className={'relative'}>
                <img src='public/illustrations/chairs.png' alt='A lot of black chairs' />
                <Box className={'absolute top-5 flex w-full items-center justify-between px-3'}>
                    <ArrowCircleBlurred className={'backdrop-blur-[5px]'} />
                    <Typography variant='h4' className='text-white'>
                        Event Details
                    </Typography>
                    <FavoriteCircleBlurred className={'backdrop-blur-[5px]'} />
                </Box>
            </Box>
            <Box className={'flex w-full items-center justify-between'}>
                <Box className={'flex h-6 gap-2'}>
                    <Button className='flex gap-2 p-3'>
                        <IconVideo className={'h-2.5 w-3 [&>*]:stroke-white'} />
                        <span className='font-header text-[11px] font-medium text-white'>Theatre</span>
                    </Button>
                    <Button className='p-3 font-header text-[11px] font-medium text-white'>Invite</Button>
                </Box>
                <Box className={'flex flex-col'}>
                    <Typography className='font-header text-[9px] font-medium text-text-3'>Per Person</Typography>
                    <Typography className='font-header text-base font-bold text-primary-1'>$10.99</Typography>
                </Box>
            </Box>
            <Typography variant='h3' className='self-start'>
                International Conference 2024
            </Typography>
            <Box className={'flex w-full items-center justify-between'}>
                <Box className={'flex items-center gap-2'}>
                    <Avatar src='https://i.pravatar.cc/150?img=1' className='h-5 w-5' />
                    <Typography className='font-header text-[10px] font-medium text-text-3'>Organized by</Typography>
                    <Typography className='font-header text-[11px] font-medium'>Alina Jason</Typography>
                </Box>
                <Button variant='contained' className='ml-2 h-6 w-[85px] gap-1 p-1 text-[10px]'>
                    <Star className='text-xs' />
                    Interested
                </Button>
            </Box>
            <Divider />
            <Box className={'flex items-center gap-2 self-start'}>
                <IconButton className='h-7 w-7 rounded-full bg-[#5D9BFC26] p-1'>
                    <CalendarMonthOutlined className='h-3 w-3 text-primary-1' />
                </IconButton>
                <Box>
                    <Typography variant='body2'>Sat - Sun, March 11 - 12, 2024</Typography>
                    <Typography className='font-header text-[11px] font-medium text-text-3'>
                        18:00 22:00 PM (GMT +07:00)
                    </Typography>
                </Box>
            </Box>
            <Button variant='contained' className='h-7 w-auto self-start font-header text-[11px] font-semibold'>
                Add to My Calendar
            </Button>
            <Box className={'flex items-center gap-2 self-start'}>
                <IconButton className='h-7 w-7 rounded-full bg-[#5D9BFC26] p-1'>
                    <LocationOnOutlined className='h-3 w-3 text-primary-1' />
                </IconButton>
                <Box>
                    <Typography variant='body2'>New York, USA</Typography>
                    <Typography className='font-header text-[11px] font-medium text-text-3'>
                        Chelsea Rd, Oceanside, New York, USA
                    </Typography>
                </Box>
            </Box>
            <Button variant='contained' className='h-7 w-auto self-start font-header text-[11px] font-semibold'>
                Get Location{' '}
            </Button>
            <Box className={'flex w-full items-center justify-between'}>
                <Box className={'flex items-center gap-2'}>
                    <AvatarGroup max={3}>
                        {memberAvatars.map((avatar, index) => (
                            <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} className='h-6 w-6' />
                        ))}
                    </AvatarGroup>
                    <Typography className='font-header text-[11px] font-medium text-text-3'>
                        {memberCount}+ Member Joined
                    </Typography>
                </Box>
                <Link href='/' className='font-header text-xs font-normal'>
                    See All
                </Link>
            </Box>
            <Typography variant='h4' className='self-start'>
                Description Event
            </Typography>
            <Typography variant='body2' className='overflow-scroll text-text-3'>
                Set Yourself Up For Success By Attending A Conference In USA 2024!. Conferences in USA 2024 is delighted
                to welcome industry experts, scientists, reputable keynote speakers...Read more
            </Typography>
        </Container>
    );
}

export default EventDetails;
