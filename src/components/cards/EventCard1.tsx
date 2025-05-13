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
        <Card className='h-[280px] w-[250px] max-w-md overflow-hidden rounded-2xl bg-[#f8f8f8] p-3'>
            <Box className='relative mb-4 h-[135px] w-[230px]'>
                <CardMedia component='img' image={imageUrl} alt={title} className='h-full w-full rounded-xl' />
                <Chip label='Event' className='absolute left-2 top-2 h-5 w-12 bg-primary-1 text-[7px] text-white' />
            </Box>
            <CardContent className='flex flex-col gap-2 p-0'>
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
                        <Typography className='whitespace-nowrap font-body text-[10px] text-text-3'>
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
