import React from 'react';
import { Avatar, AvatarGroup, Box, Card, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EventCard5Props {
    imageUrl: string;
    title: string;
    dateRange: string;
    location: string;
    memberCount: number;
    memberAvatars: string[];
    onJoin: () => void;
    className?: string;
}

export default function EventCard5({ imageUrl, title, location, memberCount, memberAvatars }: EventCard5Props) {
    return (
        <Card className='flex h-[200px] w-40 flex-col gap-3 rounded-xl bg-[#f8f8f8] p-2'>
            <Box className='relative h-24 w-36'>
                <CardMedia component='img' image={imageUrl} alt={title} className='object-cover' />
                <Chip label='Event' className='w-112 absolute left-2 top-2 h-4 bg-blue-500 text-[7px] text-white' />
            </Box>{' '}
            <CardContent className='p-0'>
                <Box className='flex flex-col gap-1.5'>
                    <Typography className='font-header text-[11px] font-bold leading-4'>{title}</Typography>
                    <Box className='flex h-2.5 items-center gap-1 text-primary-1'>
                        <LocationOnOutlined className='text-[8px]' />
                        <Typography className='text-[8px]'>{location} </Typography>
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
