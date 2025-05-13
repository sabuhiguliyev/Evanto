import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
    Avatar,
    AvatarGroup,
    IconButton,
    Divider,
} from '@mui/material';
import { CalendarTodayOutlined, LocationOnOutlined, Favorite, Star } from '@mui/icons-material';

type EventCardVariant = 'vertical-basic' | 'horizontal' | 'vertical-compact' | 'horizontal-mini';
type ActionType = 'join' | 'interest' | 'favorite' | 'cancel' | 'complete';

interface EventCardProps {
    variant: EventCardVariant;
    imageUrl: string;
    title: string;
    price?: number;
    dateRange?: string;
    location?: string;
    memberCount?: number;
    memberAvatars?: string[];
    actionType?: ActionType;
    onAction?: () => void;
    className?: string;
}

export const EventCard = ({
    variant = 'vertical-basic',
    imageUrl,
    title,
    dateRange,
    price,
    location,
    memberCount,
    memberAvatars = [],
    actionType = 'join',
    onAction,
    className = '',
}: EventCardProps) => {
    const renderContent = () => {
        switch (variant) {
            case 'vertical-basic':
                return (
                    <>
                        <Box className='relative h-[135px] w-[230px]'>
                            <CardMedia
                                component='img'
                                image={imageUrl}
                                alt={title}
                                className='h-full w-full rounded-xl'
                            />
                            <Chip
                                label='Event'
                                className='absolute left-2 top-2 h-5 w-12 bg-primary-1 text-[7px] text-white'
                            />
                        </Box>
                        <CardContent className='flex flex-col gap-3 p-0'>
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
                            <Box className='flex items-center justify-between'>
                                <AvatarGroup
                                    max={3}
                                    total={memberCount}
                                    sx={{
                                        '& .MuiAvatar-root': {
                                            width: 20,
                                            height: 20,
                                            fontSize: '0.5rem',
                                        },
                                    }}
                                >
                                    {memberAvatars.map((avatar, index) => (
                                        <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                    ))}
                                </AvatarGroup>
                                <Typography className='text-[10px] font-medium text-text-3'>Member joined</Typography>
                                <Button
                                    variant='contained'
                                    onClick={onAction}
                                    className='h-8 w-20 rounded-full bg-primary-1 font-header text-[10px] text-white'
                                >
                                    Join Now
                                </Button>
                            </Box>
                        </CardContent>
                    </>
                );

            case 'vertical-compact':
                return (
                    <>
                        <Box className='relative h-[90px] w-full'>
                            <CardMedia
                                component='img'
                                image={imageUrl}
                                alt={title}
                                className='h-full w-full rounded-xl object-cover'
                            />
                            <Chip
                                label='Event'
                                className='absolute left-2 top-2 h-5 bg-primary-1 text-[7px] text-white'
                            />
                        </Box>
                        <CardContent className='mt-2 p-0'>
                            <Typography variant='h6' className='mt-2 text-xs'>
                                {title}
                            </Typography>
                            {location && (
                                <Box className='mt-2 flex items-center gap-1 text-primary-1'>
                                    <LocationOnOutlined className='text-[8px]' />
                                    <Typography className='font-header text-[8px] font-medium text-primary-1'>
                                        {location}
                                    </Typography>
                                </Box>
                            )}
                            <Box className='mt-2 flex items-center justify-between'>
                                {memberCount && (
                                    <>
                                        <AvatarGroup
                                            max={3}
                                            total={memberCount}
                                            sx={{
                                                '& .MuiAvatar-root': {
                                                    width: 15,
                                                    height: 15,
                                                    fontSize: '0.4rem',
                                                },
                                            }}
                                        >
                                            {memberAvatars.map((avatar, index) => (
                                                <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                            ))}
                                        </AvatarGroup>
                                        <Typography className='text-[8px] font-normal text-text-3'>
                                            Member joined
                                        </Typography>
                                    </>
                                )}
                                {actionType === 'favorite' && (
                                    <IconButton size='small' onClick={onAction} className='bg-primary-1 text-white'>
                                        <Favorite className='text-xs' />
                                    </IconButton>
                                )}
                            </Box>
                        </CardContent>
                    </>
                );

            case 'horizontal':
                return (
                    <Box className='flex h-full gap-2'>
                        <CardMedia component='img' image={imageUrl} className='h-full w-20 rounded-xl' />
                        <Box className='flex w-full flex-col justify-between'>
                            <Typography variant='h6'>{title}</Typography>
                            <Box className='flex items-center justify-between'>
                                <Box className='flex items-center gap-1 text-primary-1'>
                                    <CalendarTodayOutlined className='text-[10px]' />
                                    <Typography className='font-header text-[10px] font-medium'>{dateRange}</Typography>
                                </Box>
                                <Button
                                    variant='contained'
                                    onClick={onAction}
                                    className='h-7 w-auto bg-primary-1 text-xs text-white'
                                >
                                    Join Now
                                </Button>
                            </Box>
                            <Typography variant='h6'>${price}</Typography>
                        </Box>
                    </Box>
                );

            case 'horizontal-mini':
                return (
                    <Box className='flex flex-col gap-3'>
                        <Box className='flex gap-3'>
                            <CardMedia component='img' image={imageUrl} className='h-24 w-24 rounded-lg' />
                            <Box className='flex h-24 w-full flex-col justify-between gap-1'>
                                <Chip
                                    label='Event'
                                    className='h-5 self-start bg-[#5D9BFC26] text-[7px] text-primary-1'
                                />
                                <Typography variant='h6'>{title}</Typography>
                                <Box className='flex gap-3 text-primary-1'>
                                    {dateRange && (
                                        <Box className='flex items-center gap-1'>
                                            <CalendarTodayOutlined className='text-[8px]' />
                                            <Typography className='font-header text-[8px] font-medium text-primary-1'>
                                                {dateRange}
                                            </Typography>
                                        </Box>
                                    )}
                                    {location && (
                                        <Box className='flex items-center gap-1'>
                                            <LocationOnOutlined className='text-[8px]' />
                                            <Typography className='font-header text-[8px] font-medium text-primary-1'>
                                                {location}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <Box className='flex items-center justify-between'>
                                    <Box className='flex items-center'>
                                        <AvatarGroup
                                            max={3}
                                            total={memberCount}
                                            sx={{
                                                '& .MuiAvatar-root': {
                                                    width: 15,
                                                    height: 15,
                                                    fontSize: '0.4rem',
                                                },
                                            }}
                                        >
                                            {memberAvatars.map((avatar, index) => (
                                                <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                            ))}
                                        </AvatarGroup>
                                        <Typography className='text-[8px] font-normal text-text-3'>
                                            Member joined
                                        </Typography>
                                    </Box>
                                    {actionType === 'favorite' && (
                                        <IconButton size='small' onClick={onAction} className='bg-primary-1 text-white'>
                                            <Favorite className='text-xs' />
                                        </IconButton>
                                    )}
                                    {actionType === 'interest' && (
                                        <Button
                                            variant='contained'
                                            className='h-6 w-auto gap-1 p-2 text-[10px] text-white'
                                        >
                                            <Star className='text-[10px]' /> Interested
                                        </Button>
                                    )}
                                    {actionType === 'cancel' && (
                                        <Button
                                            variant='contained'
                                            className='h-6 w-auto gap-1 bg-[#1C2039] p-3 text-[10px] text-white'
                                        >
                                            Canceled
                                        </Button>
                                    )}
                                    {actionType === 'complete' && (
                                        <Button
                                            variant='contained'
                                            className='h-6 w-auto gap-1 bg-[#1C2039] p-3 text-[10px] text-white'
                                        >
                                            Completed
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        {actionType === 'complete' && (
                            <>
                                <Divider />
                                <Box className='flex w-full items-center justify-between gap-3'>
                                    <Button variant='outlined' className='h-9'>
                                        Leave Review
                                    </Button>
                                    <Button variant='contained' className='h-9'>
                                        View Ticket
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Card
            className={`flex flex-col overflow-hidden rounded-xl bg-[#f8f8f8] p-2.5 ${variant === 'vertical-basic' && 'h-[280px] w-[250px] gap-3'} ${variant === 'horizontal' && 'h-[100px] w-full'} ${variant === 'vertical-compact' && 'h-[200px] w-40'} ${variant === 'horizontal-mini' ? (actionType === 'complete' ? 'h-[183px]' : 'h-[123px]') + ' w-full' : ''} ${className} `}
        >
            {renderContent()}
        </Card>
    );
};
export default EventCard;
