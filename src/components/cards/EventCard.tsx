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
                                    size='small'
                                    sx={{
                                        position: 'absolute',
                                        left: '8px',
                                        top: '8px',
                                        height: '20px',
                                        fontSize: '10px',
                                        color: 'white',
                                        backgroundColor: theme.palette.primary.main
                                    }}
                                />
                            )}
                        </Box>
                        <CardContent className='flex flex-col gap-3 p-0'>
                            <Typography variant='h5' className={`mb-2 line-clamp-2 font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {title}
                            </Typography>
                            <Box className='flex sm:flex-row sm:justify-between'>
                                <Box className='flex items-center gap-2 text-primary'>
                                    <CalendarToday sx={{ fontSize: '12px' }} />
                                    <Typography className={`text-xs line-clamp-1 font-jakarta ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                                        {formatSmartDate(start_date, true)}
                                    </Typography>
                                </Box>
                                <Box className='flex items-center gap-2 text-primary'>
                                    <LocationOn sx={{ fontSize: '12px' }} />
                                    <Typography className={`text-xs line-clamp-1 font-jakarta ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>{location}</Typography>
                                </Box>
                            </Box>
                            <Box className='flex items-center justify-between'>
                                <AvatarGroup
                                    max={3}
                                    // total={memberCount}
                                    spacing={4}
                                    className="event-card-avatars-large"
                                >
                                    {memberAvatars.map((avatar: string, index: number) => (
                                        <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} sx={{ width: 20, height: 20, fontSize: '0.5rem' }} />
                                    ))}
                                </AvatarGroup>
                                <Typography className={`text-xs font-medium font-jakarta ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Member joined</Typography>
                                <Button
                                    variant='contained'
                                    size='small'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAction?.(e);
                                    }}
                                    disabled={disabled}
                                    sx={{
                                        borderRadius: '20px',
                                        fontFamily: 'Jakarta Sans',
                                        fontSize: '12px',
                                        textTransform: 'none',
                                        backgroundColor: actionType === 'full' ? 'gray.400' : theme.palette.primary.main,
                                        color: 'white',
                                        height: '24px',
                                        '&:disabled': {
                                            backgroundColor: 'gray.400',
                                            cursor: 'not-allowed'
                                        }
                                    }}
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
                                    size='small'
                                    sx={{
                                        position: 'absolute',
                                        left: '8px',
                                        top: '8px',
                                        height: '20px',
                                        fontSize: '10px',
                                        color: 'white',
                                        backgroundColor: theme.palette.primary.main
                                    }}
                                />
                            )}
                        </Box>
                        <CardContent className='mt-2 p-0'>
                            <Typography variant='h6' className={`mt-2 text-sm font-semibold line-clamp-2 font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {title}
                            </Typography>
                            {location && (
                                <Box className='mt-2 flex items-center gap-2 text-primary'>
                                    <LocationOn sx={{ fontSize: '12px' }} />
                                    <Typography className={`font-jakarta text-xs font-medium line-clamp-1 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
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
                                        className="event-card-avatars-medium"
                                    >
                                        {memberAvatars.map((avatar: string, index: number) => (
                                            <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} sx={{ width: 16, height: 16, fontSize: '0.4rem' }} />
                                        ))}
                                    </AvatarGroup>
                                )}
                                
                                <Box className='flex items-center gap-3'>
                                    {price !== undefined && (
                                        <Typography className={`text-xs font-semibold font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {price > 0 ? formatPrice(price) : 'Free'}
                                        </Typography>
                                    )}
                                    {actionType === 'favorite' && (
                                        <Box onClick={(e) => e.stopPropagation()}>
                                            <IconButton
                                                size='small'
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
                                                sx={{
                                                    backgroundColor: isFavorite ? 'red.100' : 'white',
                                                    borderColor: isFavorite ? 'red.300' : 'gray.300',
                                                    color: isFavorite ? 'red.600' : 'gray.600',
                                                    borderRadius: '8px',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '&:hover': {
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        transform: 'scale(1.05)'
                                                    },
                                                    '&:focus': {
                                                        outline: 'none',
                                                        ring: '2px',
                                                        ringColor: 'primary.main',
                                                        ringOpacity: 0.5
                                                    }
                                                }}
                                            >
                                                <Favorite sx={{ fontSize: '12px' }} />
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
                            <Typography variant='body2' className={`line-clamp-2 text-xs font-medium font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</Typography>
                            <Box className='flex items-center gap-2 text-primary'>
                                <CalendarToday sx={{ fontSize: '12px' }} />
                                <Typography className='font-jakarta text-xs font-medium line-clamp-1'>
                                    {formatSmartDate(start_date, true)}
                                </Typography>
                            </Box>
                            <Box className='flex items-center justify-between'>
                                <Typography variant='body2' className={`text-xs font-semibold font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {formatPrice(price)}
                                </Typography>
                                <Button
                                    variant='contained'
                                    size='small'
                                    onClick={onAction}
                                    disabled={disabled}
                                    sx={{
                                        borderRadius: '20px',
                                        fontFamily: 'Jakarta Sans',
                                        fontSize: '12px',
                                        textTransform: 'none',
                                        backgroundColor: actionType === 'full' ? 'gray.400' : theme.palette.primary.main,
                                        color: 'white',
                                        height: '24px',
                                        '&:disabled': {
                                            backgroundColor: 'gray.400',
                                            cursor: 'not-allowed'
                                        }
                                    }}
                                >
                                    {actionType === 'full' ? 'Full' : 'Join Now'}
                                </Button>
                            </Box>
                            {memberCount > 0 && (
                                <Box className='flex items-center gap-1'>
                                    <AvatarGroup
                                        max={3}
                                        total={memberCount}
                                        spacing={4}
                                        className="event-card-avatars-medium"
                                    >
                                        {memberAvatars.map((avatar: string, index: number) => (
                                            <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} sx={{ width: 16, height: 16, fontSize: '0.4rem' }} />
                                        ))}
                                    </AvatarGroup>
                                    <Typography className={`text-xs font-normal font-jakarta ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {memberCount} joined
                                    </Typography>
                                </Box>
                            )}
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
                                    <Typography variant='h6' className={`line-clamp-2 text-sm font-semibold leading-tight flex-1 font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</Typography>
                                    {category && (
                                        <Chip
                                            label={category}
                                            size='small'
                                            sx={{
                                                height: '20px',
                                                fontSize: '10px',
                                                backgroundColor: isDarkMode ? theme.palette.primary.main : `${theme.palette.primary.main}26`,
                                                color: isDarkMode ? 'white' : theme.palette.primary.main,
                                                flexShrink: 0
                                            }}
                                        />
                                    )}
                                </Box>
                                <Box className='flex gap-3 text-primary mt-2'>
                                    {start_date && (
                                        <Box className='flex items-center gap-2'>
                                            <CalendarToday sx={{ fontSize: '12px' }} />
                                            <Typography className={`font-jakarta text-xs font-medium line-clamp-1 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                                                {formatSmartDate(start_date, true)}
                                            </Typography>
                                        </Box>
                                    )}
                                    {location && (
                                        <Box className='flex items-center gap-2'>
                                            <LocationOn sx={{ fontSize: '12px' }} />
                                            <Typography className={`font-jakarta text-xs font-medium line-clamp-1 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                                                {location}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <Box className='flex items-center justify-between'>
                                    <Box className='flex items-center gap-3'>
                                        <Typography variant='body2' className={`text-xs font-semibold font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {formatPrice(price)}
                                        </Typography>
                                        <AvatarGroup
                                            max={3}
                                            total={memberCount}
                                            spacing={4}
                                            className="event-card-avatars-small"
                                        >
                                            {memberAvatars.map((avatar: string, index: number) => (
                                                <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} sx={{ width: 16, height: 16, fontSize: '0.4rem' }} />
                                            ))}
                                        </AvatarGroup>
                                        {memberCount > 0 && (
                                            <Typography className={`text-xs font-normal font-jakarta ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {memberCount} joined
                                            </Typography>
                                        )}
                                    </Box>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAction?.(e);
                                        }}
                                        disabled={disabled}
                                        sx={{
                                            fontFamily: 'Jakarta Sans',
                                            fontSize: '12px',
                                            textTransform: 'none',
                                            backgroundColor: theme.palette.primary.main,
                                            color: 'white',
                                            px: 3,
                                            py: 1,
                                            height: '24px'
                                        }}
                                    >
                                        Join now
                                    </Button>
                                    {actionType === 'favorite' && (
                                        <Box onClick={(e) => e.stopPropagation()} className="p-1">
                                            <IconButton
                                                size='small'
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
                                            >
                                                <Favorite sx={{ fontSize: '12px' }} />
                                            </IconButton>
                                        </Box>
                                    )}
                                    {actionType === 'interest' && (
                                        <Button
                                            variant='contained'
                                            size='small'
                                            onClick={(e) => e.stopPropagation()}
                                            sx={{
                                                borderRadius: '20px',
                                                fontFamily: 'Jakarta Sans',
                                                fontSize: '12px',
                                                textTransform: 'none',
                                                backgroundColor: theme.palette.primary.main,
                                                color: 'white',
                                                gap: 1,
                                                height: '24px'
                                            }}
                                        >
                                            <Star sx={{ fontSize: '12px' }} /> Interested
                                        </Button>
                                    )}
                                    {actionType === 'cancel' && (
                                        <Button
                                            variant='contained'
                                            size='small'
                                            onClick={(e) => e.stopPropagation()}
                                            sx={{
                                                borderRadius: '20px',
                                                fontFamily: 'Jakarta Sans',
                                                fontSize: '12px',
                                                textTransform: 'none',
                                                backgroundColor: isDarkMode ? 'gray.800' : 'gray.700',
                                                color: 'white',
                                                gap: 1,
                                                height: '24px'
                                            }}
                                        >
                                            Canceled
                                        </Button>
                                    )}
                                    {actionType === 'complete' && (
                                        <Button
                                            variant='contained'
                                            size='small'
                                            onClick={(e) => e.stopPropagation()}
                                            sx={{
                                                borderRadius: '20px',
                                                fontFamily: 'Jakarta Sans',
                                                fontSize: '12px',
                                                textTransform: 'none',
                                                backgroundColor: isDarkMode ? 'gray.800' : 'gray.700',
                                                color: 'white',
                                                gap: 1,
                                                height: '24px'
                                            }}
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
                                        size='small'
                                        sx={{
                                            borderRadius: '20px',
                                            fontFamily: 'Jakarta Sans',
                                            textTransform: 'none',
                                            height: '24px'
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Leave Review
                                    </Button>
                                    <Button 
                                        variant='contained' 
                                        size='small'
                                        sx={{
                                            borderRadius: '20px',
                                            fontFamily: 'Jakarta Sans',
                                            textTransform: 'none',
                                            height: '24px'
                                        }}
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
                className={`event-card flex flex-col overflow-hidden rounded-2xl p-2.5 ${variant === 'vertical' && 'h-[280px] w-[250px] gap-3'} ${variant === 'horizontal-compact' && 'h-[100px] w-full'} ${variant === 'vertical-compact' && 'h-[220px] w-40'} ${variant === 'horizontal' ? (actionType === 'complete' ? 'h-[183px]' : 'h-[123px]') + ' w-full' : ''} ${className} `}
            >
                {renderContent()}
            </Card>
        </Box>
    );
};
export default EventCard;
