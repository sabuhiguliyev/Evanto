import React from 'react';
import { Avatar, AvatarGroup, Box, Card, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { CalendarTodayOutlined, LocationOnOutlined } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EventCard4Props {
    imageUrl: string;
    title: string;
    dateRange: string;
    location: string;
    memberCount: number;
    memberAvatars: string[];
    onJoin: () => void;
    className?: string;
}

export default function EventCard4({
    imageUrl,
    title,
    dateRange,
    location,
    memberCount,
    memberAvatars,
}: EventCard4Props) {
    return (
        <Card className='flex h-[123px] w-full rounded-xl bg-[#f8f8f8] p-2.5'>
            <CardMedia component='img' image={imageUrl} alt={title} className='h-[100px] w-[100px] rounded-xl' />
            <CardContent className='p-0'>
                <Box className='flex w-56 flex-col gap-1.5 pl-2'>
                    <Chip label='Event' className='h-5 w-12 bg-[#5D9BFC26] text-[7px] text-primary-1' />

                    <Typography variant='h6' className='leading-4'>
                        {title}
                    </Typography>
                    <Box className='flex gap-3 text-primary-1'>
                        <Box className='flex h-2.5 items-center gap-1 sm:mb-0'>
                            <CalendarTodayOutlined className='text-[8px]' />
                            <Typography className='text-[8px]'>{dateRange}</Typography>
                        </Box>

                        <Box className='flex h-2.5 items-center gap-1'>
                            <LocationOnOutlined className='text-[8px]' />
                            <Typography className='text-[8px]'>{location} </Typography>
                        </Box>
                    </Box>
                    <Box className='flex items-center'>
                        <AvatarGroup max={3}>
                            {memberAvatars.map((avatar, index) => (
                                <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} className='h-3.5 w-3.5' />
                            ))}
                        </AvatarGroup>
                        <Typography className='font-body text-[8px] text-text-3'>
                            {memberCount}+ Member Joined
                        </Typography>
                        <IconButton size='small' className='ml-auto bg-primary-1' disableRipple>
                            <FavoriteIcon className='h-2.5 w-2.5 text-white' />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
