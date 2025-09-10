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
    useTheme,
} from '@mui/material';
import { CalendarToday, LocationOn, Favorite, Star } from '@mui/icons-material';
import { formatEventRange, formatSmartDate, formatPrice } from '@/utils/format';
import type { UnifiedItem } from '@/utils/schemas';
import { useFavorite } from '@/hooks/useFavorite';
import { useDarkMode } from '@/contexts/DarkModeContext';
import toast from 'react-hot-toast';

type EventCardVariant = 'vertical' | 'horizontal' | 'vertical-compact' | 'horizontal-compact';
type ActionType = 'join' | 'interest' | 'favorite' | 'cancel' | 'complete' | 'full';

interface EventCardProps {
    item: UnifiedItem;
    variant: EventCardVariant;
    actionType?: ActionType;
    onAction?: (e?: React.MouseEvent) => void;
    disabled?: boolean;
    className?: string;
}

export const EventCard = ({
    item,
    variant = 'vertical',
    actionType = 'join',
    onAction,
    disabled = false,
    className = '',
}: EventCardProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { isDarkMode } = useDarkMode();
    const { isFavorite, toggle, isLoading, isEnabled } = useFavorite(item.id?.toString(), item.type);

    const handleCardClick = () => {
        const eventData = {
            id: item.id,
            type: item.type,
            title: item.title,
            description: item.type === 'event' ? item.description : item.description,
            category: item.category,
            location: item.type === 'event' ? item.location : 'Online',
            startDate: item.start_date,
            endDate: item.end_date,
            ticketPrice: item.type === 'event' ? item.ticket_price : undefined,
            imageUrl: item.image || '/illustrations/eventcard.png',
            online: item.type === 'meetup' ? item.online : false,
            featured: item.featured,
            meetupLink: item.type === 'meetup' ? item.meetup_link : undefined,
            userId: item.user_id
        };
        
        navigate(`/events/${item.id}`, { state: { event: eventData } });
    };

    const { type, category } = item;
    const member_avatars = item.member_avatars || [];
    const member_count = item.member_count || 0;
    const title = item.title;
    const imageUrl = item.image || '/illustrations/eventcard.png';
    const location = item.location || 'Online';
    const start_date = item.start_date;
    const end_date = item.end_date;
    const price = type === 'event' ? item.ticket_price : 0; // Meetups are always free for now
    const memberAvatars = member_avatars ?? [];
    const memberCount = member_count || 0;
    
    // Helper function to format price display
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
                                    className={`absolute left-2 top-2 h-5 w-auto text-[7px] text-white ${isDarkMode ? 'bg-[#5D9BFC]' : 'bg-[#5D9BFC]'}`}
                                />
                            )}
                        </Box>
                        <CardContent className='flex flex-col gap-3 p-0'>
                            <Typography variant='h5' className={`mb-1.5 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {title}
                            </Typography>
                            <Box className='flex sm:flex-row sm:justify-between'>
                                <Box className='flex h-2.5 items-center gap-1.5 sm:mb-0 text-primary'>
                                    <CalendarToday className='text-[10px]' />
                                    <Typography className={`text-[10px] line-clamp-1 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                                        {formatSmartDate(start_date, true)}
                                    </Typography>
                                </Box>
                                <Box className='flex h-2.5 items-center gap-1.5 text-primary'>
                                    <LocationOn className='text-sm' />
                                    <Typography className={`text-[10px] line-clamp-1 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>{location}</Typography>
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
                                            border: 'none',
                                        },
                                    }}
                                >
                                    {memberAvatars.map((avatar: string, index: number) => (
                                        <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                    ))}
                                </AvatarGroup>
                                <Typography className={`text-[10px] font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Member joined</Typography>
                                <Button
                                    variant='contained'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAction?.(e);
                                    }}
                                    disabled={disabled}
                                    className={`h-8 w-20 rounded-full font-jakarta text-[10px] normal-case text-white ${
                                        actionType === 'full' 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-[#5D9BFC]'
                                    }`}
                                >
                                    {actionType === 'full' ? 'Full' : 'Join Now'}
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
                                    className={`absolute left-2 top-2 h-5 text-[7px] text-white ${isDarkMode ? 'bg-[#5D9BFC]' : 'bg-[#5D9BFC]'}`}
                                />
                            )}
                        </Box>
                        <CardContent className='mt-2 p-0'>
                            <Typography variant='h6' className={`mt-2 text-sm font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {title}
                            </Typography>
                            {location && (
                                <Box className='mt-1 flex items-center gap-1 text-primary'>
                                    <LocationOn className='text-[10px]' />
                                    <Typography className={`font-jakarta text-[10px] font-medium line-clamp-1 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                                        {location}
                                    </Typography>
                                </Box>
                            )}
                            <Box className='mt-2 flex items-center justify-between'>
                                {memberCount > 0 && (
                                    <AvatarGroup
                                        max={3}
                                        total={memberCount}
                                        spacing={4}
                                        sx={{
                                            '& .MuiAvatar-root': {
                                                width: 15,
                                                height: 15,
                                                fontSize: '0.4rem',
                                                border: 'none',
                                            },
                                        }}
                                    >
                                        {memberAvatars.map((avatar: string, index: number) => (
                                            <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                        ))}
                                    </AvatarGroup>
                                )}
                                
                                <Box className='flex items-center gap-3'>
                                    {price !== undefined && (
                                        <Typography className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {price > 0 ? formatPrice(price) : 'Free'}
                                        </Typography>
                                    )}
                                    {actionType === 'favorite' && (
                                        <Box onClick={(e) => e.stopPropagation()}>
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
                            <Typography variant='body2' className={`line-clamp-2 text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</Typography>
                            <Box className='flex items-center justify-between'>
                                <Box className='flex items-center gap-1 text-primary'>
                                    <CalendarToday className='text-[10px]' />
                                    <Typography className='font-jakarta text-[10px] font-medium line-clamp-1'>
                                        {formatSmartDate(start_date, true)}
                                    </Typography>
                                </Box>
                                <Button
                                    variant='contained'
                                    onClick={onAction}
                                    disabled={disabled}
                                    className={`h-7 w-auto text-xs normal-case text-white ${
                                        actionType === 'full' 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-[#5D9BFC]'
                                    }`}
                                >
                                    {actionType === 'full' ? 'Full' : 'Join Now'}
                                </Button>
                            </Box>
                            <Box className='flex items-center justify-between'>
                                <Typography variant='body2' className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatPrice(price)}</Typography>
                                {memberCount > 0 && (
                                    <Box className='flex items-center gap-1'>
                                        <AvatarGroup
                                            max={3}
                                            total={memberCount}
                                            spacing={4}
                                            sx={{
                                                '& .MuiAvatar-root': {
                                                    width: 15,
                                                    height: 15,
                                                    fontSize: '0.4rem',
                                                    border: 'none',
                                                },
                                            }}
                                        >
                                            {memberAvatars.map((avatar: string, index: number) => (
                                                <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                            ))}
                                        </AvatarGroup>
                                        <Typography className={`text-[8px] font-normal ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {memberCount} joined
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                );

            case 'horizontal':
                return (
                    <Box className='flex flex-col gap-3'>
                        <Box className='flex gap-3'>
                            <CardMedia component='img' image={imageUrl} className='h-24 w-24 rounded-lg' />
                            <Box className='flex h-24 w-full flex-col justify-between gap-1'>
                                <Box className='flex items-start justify-between gap-2'>
                                    <Typography variant='h6' className={`line-clamp-2 text-sm font-semibold leading-tight flex-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</Typography>
                                    {category && (
                                        <Chip
                                            label={category}
                                            className={`h-5 text-[7px] flex-shrink-0 ${isDarkMode ? 'bg-[#5D9BFC] text-white' : 'bg-[#5D9BFC26] text-[#5D9BFC]'}`}
                                        />
                                    )}
                                </Box>
                                <Box className='flex gap-3 text-primary mt-1'>
                                    {start_date && (
                                        <Box className='flex items-center gap-1'>
                                            <CalendarToday className='text-[9px]' />
                                            <Typography className={`font-jakarta text-[9px] font-medium line-clamp-1 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                                                {formatSmartDate(start_date, true)}
                                            </Typography>
                                        </Box>
                                    )}
                                    {location && (
                                        <Box className='flex items-center gap-1'>
                                            <LocationOn className='text-[9px]' />
                                            <Typography className={`font-jakarta text-[9px] font-medium line-clamp-1 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                                                {location}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <Box className='flex items-center justify-between'>
                                    <Box className='flex items-center gap-3'>
                                        <Typography variant='body2' className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {formatPrice(price)}
                                        </Typography>
                                        <AvatarGroup
                                            max={3}
                                            total={memberCount}
                                            spacing={4}
                                            sx={{
                                                '& .MuiAvatar-root': {
                                                    width: 16,
                                                    height: 16,
                                                    fontSize: '0.5rem',
                                                    border: 'none',
                                                },
                                            }}
                                        >
                                            {memberAvatars.map((avatar: string, index: number) => (
                                                <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} />
                                            ))}
                                        </AvatarGroup>
                                        {memberCount > 0 && (
                                            <Typography className={`text-[8px] font-normal ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {memberCount} joined
                                            </Typography>
                                        )}
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
                                            className='h-6 w-auto gap-1 p-2 text-[10px] normal-case text-white bg-[#5D9BFC]'
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
                className={`flex flex-col overflow-hidden rounded-2xl p-2.5 ${isDarkMode ? 'bg-[#FFFFFF26]' : 'bg-[#F8F8F8]'} ${variant === 'vertical' && 'h-[280px] w-[250px] gap-3'} ${variant === 'horizontal-compact' && 'h-[100px] w-full'} ${variant === 'vertical-compact' && 'h-[220px] w-40'} ${variant === 'horizontal' ? (actionType === 'complete' ? 'h-[183px]' : 'h-[123px]') + ' w-full' : ''} ${className} `}
                sx={{
                    backgroundColor: isDarkMode ? '#FFFFFF26' : '#F8F8F8',
                    border: 'none',
                    boxShadow: 'none',
                    borderRadius: '15px',
                    '&.MuiCard-root': {
                        backgroundColor: isDarkMode ? '#FFFFFF26' : '#F8F8F8',
                        border: 'none',
                        boxShadow: 'none',
                        borderRadius: '15px',
                    }
                }}
            >
                {renderContent()}
            </Card>
        </Box>
    );
};
export default EventCard;
