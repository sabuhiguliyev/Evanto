import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip, Avatar, AvatarGroup } from '@mui/material';
import { CalendarTodayOutlined, LocationOnOutlined } from '@mui/icons-material';

interface EventCardProps {
    imageUrl: string;
    title: string;
    dateRange: string;
    location: string;
    memberCount: number;
    memberAvatars: string[];
    onJoin: () => void;
    className?: string;
}

const EventCard1: React.FC<EventCardProps> = ({
    imageUrl,
    title,
    dateRange,
    location,
    memberCount,
    memberAvatars,
    onJoin,
}) => {
    return (
        <Card className='h-64 w-64 max-w-md overflow-hidden rounded-xl bg-gray-50 p-2'>
            <Box className='relative mb-1 h-36 w-60'>
                <CardMedia component='img' image={imageUrl} alt={title} className='object-cover' />
                <Chip label='Event' className='w-112 absolute left-2 top-2 h-4 bg-blue-500 text-[7px] text-white' />
            </Box>

            <CardContent className='p-0'>
                <Typography variant='h5' className='mb-1.5'>
                    {title}
                </Typography>

                <Box className='flex text-primary-1 sm:flex-row sm:justify-between'>
                    <Box className='flex h-2.5 items-center gap-1.5 sm:mb-0'>
                        <CalendarTodayOutlined className='text-[10px]' />
                        <Typography className='text-[10px]'>{dateRange}</Typography>
                    </Box>

                    <Box className='flex h-2.5 items-center gap-1.5'>
                        <LocationOnOutlined className='text-sm' />
                        <Typography className='text-[10px]'>{location}</Typography>
                    </Box>
                </Box>

                <Box className='mt-1.5 flex h-8 items-center justify-between'>
                    <Box className='flex items-center'>
                        <AvatarGroup max={3}>
                            {memberAvatars.map((avatar, index) => (
                                <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} className='h-5 w-5' />
                            ))}
                        </AvatarGroup>
                        <Typography className='font-body text-[10px] text-text-3'>
                            {memberCount}+ Member Joined
                        </Typography>
                    </Box>

                    <Button
                        variant='contained'
                        onClick={onJoin}
                        className='h-8 w-20 rounded-full bg-primary-1 font-header text-[10px] text-white'
                    >
                        Join Now
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default EventCard1;
