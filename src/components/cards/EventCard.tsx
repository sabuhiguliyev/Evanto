import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { formatEventRange } from '@/utils/format';
import type { UnifiedItem } from '@/types/UnifiedItem';
import { useFavorite } from '@/hooks/useFavorite';
import toast from 'react-hot-toast';

type EventCardVariant = 'vertical' | 'horizontal' | 'vertical-compact' | 'horizontal-compact';
type ActionType = 'join' | 'interest' | 'favorite' | 'cancel' | 'complete';

interface EventCardProps {
    item: UnifiedItem;
    variant: EventCardVariant;
    actionType?: ActionType;
    onAction?: (e?: React.MouseEvent) => void;
    className?: string;
}

export const EventCard = ({
    item,
    variant = 'vertical',
    actionType = 'join',
    onAction,
    className = '',
}: EventCardProps) => {
    const navigate = useNavigate();
    const { isFavorite, toggle, isLoading, isEnabled } = useFavorite(item.id?.toString());

    const handleCardClick = () => {
        const eventData = {
            id: item.id,
            type: item.type,
            title: item.type === 'event' ? item.title : item.meetup_name,
            description: item.type === 'event' ? item.description : item.meetup_description,
            category: item.category,
            location: item.type === 'event' ? item.location : 'Online',
            startDate: item.type === 'event' ? item.start_date : item.meetup_date,
            endDate: item.type === 'event' ? item.end_date : item.meetup_date,
            ticketPrice: item.type === 'event' ? item.ticket_price : undefined,
            imageUrl: item.type === 'event' ? item.event_image : item.image_url,
            online: item.type === 'meetup' ? item.online : false,
            featured: item.featured,
            meetupLink: item.type === 'meetup' ? item.meetup_link : undefined,
            userId: item.user_id
        };
        
        navigate('/event-details', { state: { event: eventData } });
    };

    const { type, category } = item;
    const member_avatars = type === 'event' ? item.member_avatars : [];
    const member_count = type === 'event' ? item.member_count : 0;
    const title = type === 'event' ? item.title : item.meetup_name;
    const imageUrl = type === 'event' ? item.event_image : item.image_url;
    const location = type === 'event' ? item.location : 'Online';
    const start_date = type === 'event' ? item.start_date : item.meetup_date;
    const end_date = type === 'event' ? item.end_date : item.meetup_date;
    const price = type === 'event' ? item.ticket_price : undefined;
    const memberAvatars = member_avatars ?? [];
    const memberCount = member_count;
    
    // Helper function to format price display
    const formatPrice = (price: number | undefined) => {
        if (price === undefined || price === null) return 'Free';
        if (price === 0) return 'Free';
        return `$${price}`;
    };
    const renderContent = () => {
        switch (variant) {
            case 'vertical':
                return (
                    <>
                        <Box className='relative h-[135px] w-[230px]'>
                            <CardMedia
                                component='img'
                                image={imageUrl}
                                alt={title}
                                className='h-full w-full rounded-xl'
                            />
                            {category && (
                                <Chip
                                    label={category}
                                    className='absolute left-2 top-2 h-5 w-auto bg-primary-1 text-[7px] text-white'
                                />
                            )}
                        </Box>
                        <CardContent className='flex flex-col gap-3 p-0'>
                            <Typography variant='h5' className='mb-1.5 line-clamp-2'>
                                {title}
                            </Typography>
                            <Box className='flex text-primary-1 sm:flex-row sm:justify-between'>
                                <Box className='flex h-2.5 items-center gap-1.5 sm:mb-0'>
                                    <CalendarTodayOutlined className='text-[10px]' />
                                    <Typography className='text-[10px] line-clamp-1'>
                                        {formatEventRange(start_date, end_date)}
                                    </Typography>
                                </Box>
                                <Box className='flex h-2.5 items-center gap-1.5'>
                                    <LocationOnOutlined className='text-sm' />
                                    <Typography className='text-[10px] line-clamp-1'>{location}</Typography>
                                </Box>
                            </Box>
                            <Box className='flex items-center justify-between'>
                                <AvatarGroup
                                    max={3}
                                    // total={memberCount}
                                    spacing={4}
                                    sx={{
                                        '& .MuiAvatar-root': {
                                            width: 20,
                                            height: 20,
                                            fontSize: '0.5rem',
                                        },
                                    }}
                                >
                                    {memberAvatars.map((avatar: string, index: number) => (
                                        <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                    ))}
                                </AvatarGroup>
                                <Typography className='text-[10px] font-medium text-text-3'>Member joined</Typography>
                                <Button
                                    variant='contained'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAction?.(e);
                                    }}
                                    className='h-8 w-20 rounded-full bg-primary-1 font-header text-[10px] normal-case text-white'
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
                            {category && (
                                <Chip
                                    label={category}
                                    className='absolute left-2 top-2 h-5 bg-primary-1 text-[7px] text-white'
                                />
                            )}
                        </Box>
                        <CardContent className='mt-2 p-0'>
                            <Typography variant='h6' className='mt-2 text-xs line-clamp-2'>
                                {title}
                            </Typography>
                            {location && (
                                <Box className='mt-2 flex items-center gap-1 text-primary-1'>
                                    <LocationOnOutlined className='text-[8px]' />
                                    <Typography className='font-header text-[8px] font-medium text-primary-1 line-clamp-1'>
                                        {location}
                                    </Typography>
                                </Box>
                            )}
                            <Box className='mt-2 flex items-center justify-between'>
                                <Box className='flex items-center gap-2'>
                                    {memberCount > 0 && (
                                        <>
                                            <AvatarGroup
                                                max={3}
                                                // total={memberCount}
                                                spacing={4}
                                                sx={{
                                                    '& .MuiAvatar-root': {
                                                        width: 15,
                                                        height: 15,
                                                        fontSize: '0.4rem',
                                                    },
                                                }}
                                            >
                                                {memberAvatars.map((avatar: string, index: number) => (
                                                    <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                                ))}
                                            </AvatarGroup>
                                            <Typography className='text-[8px] font-normal text-text-3'>
                                                Member joined
                                            </Typography>
                                        </>
                                    )}
                                </Box>
                                <Box className='flex items-center gap-2'>
                                    {actionType === 'favorite' && (
                                        <Box onClick={(e) => e.stopPropagation()} className="p-1">
                                            <IconButton
                                                size='small'
                                                sx={{ 
                                                    width: 32, 
                                                    height: 32,
                                                    minWidth: 32,
                                                    minHeight: 32
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (isEnabled) {
                                                        toggle();
                                                        const action = isFavorite ? 'removed from' : 'added to';
                                                        toast.success(`Item ${action} favorites!`);
                                                    }
                                                }}
                                                disabled={!isEnabled || isLoading}
                                                className={`${isFavorite ? 'bg-red-100 border-red-300 text-red-600' : 'bg-white border-gray-300 text-gray-600'} border rounded-lg transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-1 focus:ring-opacity-50 ${isFavorite ? 'animate-pulse-once' : ''}`}
                                            >
                                                <Favorite className='text-xs' />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </CardContent>
                    </>
                );

            case 'horizontal-compact':
                return (
                    <Box className='flex h-full gap-2'>
                        <CardMedia component='img' image={imageUrl} className='h-full w-20 rounded-xl' />
                        <Box className='flex w-full flex-col justify-between'>
                            <Typography variant='h6' className='line-clamp-2'>{title}</Typography>
                            <Box className='flex items-center justify-between'>
                                <Box className='flex items-center gap-1 text-primary-1'>
                                    <CalendarTodayOutlined className='text-[10px]' />
                                    <Typography className='font-header text-[10px] font-medium line-clamp-1'>
                                        {formatEventRange(start_date, end_date)}
                                    </Typography>
                                </Box>
                                <Button
                                    variant='contained'
                                    onClick={onAction}
                                    className='h-7 w-auto bg-primary-1 text-xs normal-case text-white'
                                >
                                    Join Now
                                </Button>
                            </Box>
                            <Typography variant='h6'>{formatPrice(price)}</Typography>
                        </Box>
                    </Box>
                );

            case 'horizontal':
                return (
                    <Box className='flex flex-col gap-3'>
                        <Box className='flex gap-3'>
                            <CardMedia component='img' image={imageUrl} className='h-24 w-24 rounded-lg' />
                            <Box className='flex h-24 w-full flex-col justify-between gap-1'>
                                {category && (
                                    <Chip
                                        label={category}
                                        className='h-5 self-start bg-[#5D9BFC26] text-[7px] text-primary-1'
                                    />
                                )}
                                <Typography variant='h6' className='line-clamp-2'>{title}</Typography>
                                <Box className='flex gap-3 text-primary-1'>
                                    {start_date && (
                                        <Box className='flex items-center gap-1'>
                                            <CalendarTodayOutlined className='text-[8px]' />
                                            <Typography className='font-header text-[8px] font-medium text-primary-1 line-clamp-1'>
                                                {formatEventRange(start_date, end_date)}
                                            </Typography>
                                        </Box>
                                    )}
                                    {location && (
                                        <Box className='flex items-center gap-1'>
                                            <LocationOnOutlined className='text-[8px]' />
                                            <Typography className='font-header text-[8px] font-medium text-primary-1 line-clamp-1'>
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
                                            spacing={4}
                                            sx={{
                                                '& .MuiAvatar-root': {
                                                    width: 15,
                                                    height: 15,
                                                    fontSize: '0.4rem',
                                                },
                                            }}
                                        >
                                            {memberAvatars.map((avatar: string, index: number) => (
                                                <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                            ))}
                                        </AvatarGroup>
                                        <Typography className='text-[8px] font-normal text-text-3'>
                                            Member joined
                                        </Typography>
                                    </Box>
                                    {actionType === 'favorite' && (
                                        <Box onClick={(e) => e.stopPropagation()} className="p-1">
                                            <IconButton
                                                size='small'
                                                sx={{ 
                                                    width: 32, 
                                                    height: 32,
                                                    minWidth: 32,
                                                    minHeight: 32
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (isEnabled) {
                                                        toggle();
                                                        const action = isFavorite ? 'removed from' : 'added to';
                                                        toast.success(`Item ${action} favorites!`);
                                                    }
                                                }}
                                                disabled={!isEnabled || isLoading}
                                                className={`${isFavorite ? 'bg-red-100 border-red-300 text-red-600' : 'bg-white border-gray-300 text-gray-600'} border rounded-lg transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-1 focus:ring-opacity-50 ${isFavorite ? 'animate-pulse-once' : ''}`}
                                            >
                                                <Favorite className='text-xs' />
                                            </IconButton>
                                        </Box>
                                    )}
                                    {actionType === 'interest' && (
                                        <Button
                                            variant='contained'
                                            onClick={(e) => e.stopPropagation()}
                                            className='h-6 w-auto gap-1 p-2 text-[10px] normal-case text-white'
                                        >
                                            <Star className='text-[10px]' /> Interested
                                        </Button>
                                    )}
                                    {actionType === 'cancel' && (
                                        <Button
                                            variant='contained'
                                            onClick={(e) => e.stopPropagation()}
                                            className='h-6 w-auto gap-1 bg-[#1C2039] p-3 text-[10px] normal-case text-white'
                                        >
                                            Canceled
                                        </Button>
                                    )}
                                    {actionType === 'complete' && (
                                        <Button
                                            variant='contained'
                                            onClick={(e) => e.stopPropagation()}
                                            className='h-6 w-auto gap-1 bg-[#1C2039] p-3 text-[10px] normal-case text-white'
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
                                    <Button 
                                        variant='outlined' 
                                        className='h-9 normal-case'
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Leave Review
                                    </Button>
                                    <Button 
                                        variant='contained' 
                                        className='h-9 normal-case'
                                        onClick={(e) => e.stopPropagation()}
                                    >
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
        <Box onClick={handleCardClick} className="cursor-pointer">
            <Card
                className={`flex flex-col overflow-hidden rounded-xl bg-[#f8f8f8] p-2.5 ${variant === 'vertical' && 'h-[280px] w-[250px] gap-3'} ${variant === 'horizontal-compact' && 'h-[100px] w-full'} ${variant === 'vertical-compact' && 'h-[220px] w-40'} ${variant === 'horizontal' ? (actionType === 'complete' ? 'h-[183px]' : 'h-[123px]') + ' w-full' : ''} ${className} `}
            >
                {renderContent()}
            </Card>
        </Box>
    );
};
export default EventCard;
