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

/**
 * Refactored EventCard Component
 * 
 * This component demonstrates the new design system implementation:
 * - Uses MUI theme defaults with minimal customizations
 * - Leverages Tailwind utility classes for spacing and layout
 * - Follows the 5-color palette and typography scale
 * - Uses Plus Jakarta Sans for buttons and Poppins for text
 * - Implements proper button sizing and border radius from Figma specs
 */
export const RefactoredEventCard = ({
    item,
    variant = 'vertical',
    actionType = 'join',
    onAction,
    className = '',
}: EventCardProps) => {
    const navigate = useNavigate();
    const { isFavorite, toggle, isLoading, isEnabled } = useFavorite(item.id?.toString(), item.type);

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
        
        navigate(`/events/${item.id}`, { state: { event: eventData } });
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
                        <Box className='relative h-32 w-full'>
                            <CardMedia
                                component='img'
                                image={imageUrl}
                                alt={title}
                                className='h-full w-full rounded-lg object-cover'
                            />
                            {category && (
                                <Chip
                                    label={category}
                                    size="small"
                                    className='absolute left-2 top-2 bg-primary text-white'
                                />
                            )}
                        </Box>
                        <CardContent className='flex flex-col gap-3 p-4'>
                            <Typography variant='h6' className='font-poppins line-clamp-2'>
                                {title}
                            </Typography>
                            <Box className='flex flex-col gap-2 text-text-secondary'>
                                <Box className='flex items-center gap-2'>
                                    <CalendarTodayOutlined className='text-sm' />
                                    <Typography variant='caption' className='font-poppins'>
                                        {formatEventRange(start_date, end_date)}
                                    </Typography>
                                </Box>
                                <Box className='flex items-center gap-2'>
                                    <LocationOnOutlined className='text-sm' />
                                    <Typography variant='caption' className='font-poppins'>{location}</Typography>
                                </Box>
                            </Box>
                            <Box className='flex items-center justify-between'>
                                <Box className='flex items-center gap-2'>
                                    <AvatarGroup
                                        max={3}
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
                                    <Typography variant='caption' className='font-poppins text-text-muted'>
                                        {memberCount} joined
                                    </Typography>
                                </Box>
                                <Button
                                    variant='contained'
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAction?.(e);
                                    }}
                                    className='font-jakarta'
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
                        <Box className='relative h-20 w-full'>
                            <CardMedia
                                component='img'
                                image={imageUrl}
                                alt={title}
                                className='h-full w-full rounded-lg object-cover'
                            />
                            {category && (
                                <Chip
                                    label={category}
                                    size="small"
                                    className='absolute left-2 top-2 bg-primary text-white'
                                />
                            )}
                        </Box>
                        <CardContent className='p-3'>
                            <Typography variant='h6' className='font-poppins line-clamp-2 mb-2'>
                                {title}
                            </Typography>
                            {location && (
                                <Box className='flex items-center gap-2 text-text-secondary mb-2'>
                                    <LocationOnOutlined className='text-sm' />
                                    <Typography variant='caption' className='font-poppins'>
                                        {location}
                                    </Typography>
                                </Box>
                            )}
                            <Box className='flex items-center justify-between'>
                                <Box className='flex items-center gap-2'>
                                    {memberCount > 0 && (
                                        <>
                                            <AvatarGroup
                                                max={3}
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
                                            <Typography variant='caption' className='font-poppins text-text-muted'>
                                                {memberCount} joined
                                            </Typography>
                                        </>
                                    )}
                                </Box>
                                <Box className='flex items-center gap-2'>
                                    {actionType === 'favorite' && (
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
                                            className={`${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                                        >
                                            <Favorite className='text-sm' />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>
                        </CardContent>
                    </>
                );

            case 'horizontal-compact':
                return (
                    <Box className='flex h-full gap-3 p-3'>
                        <CardMedia 
                            component='img' 
                            image={imageUrl} 
                            className='h-16 w-16 rounded-lg object-cover' 
                        />
                        <Box className='flex w-full flex-col justify-between'>
                            <Typography variant='h6' className='font-poppins line-clamp-2'>{title}</Typography>
                            <Box className='flex items-center justify-between'>
                                <Box className='flex items-center gap-2 text-text-secondary'>
                                    <CalendarTodayOutlined className='text-sm' />
                                    <Typography variant='caption' className='font-poppins'>
                                        {formatEventRange(start_date, end_date)}
                                    </Typography>
                                </Box>
                                <Button
                                    variant='contained'
                                    size="small"
                                    onClick={onAction}
                                    className='font-jakarta'
                                >
                                    Join Now
                                </Button>
                            </Box>
                            <Typography variant='body2' className='font-poppins text-text-secondary'>
                                {formatPrice(price)}
                            </Typography>
                        </Box>
                    </Box>
                );

            case 'horizontal':
                return (
                    <Box className='flex flex-col gap-3 p-3'>
                        <Box className='flex gap-3'>
                            <CardMedia 
                                component='img' 
                                image={imageUrl} 
                                className='h-20 w-20 rounded-lg object-cover' 
                            />
                            <Box className='flex h-20 w-full flex-col justify-between gap-1'>
                                {category && (
                                    <Chip
                                        label={category}
                                        size="small"
                                        className='self-start bg-primary/20 text-primary'
                                    />
                                )}
                                <Typography variant='h6' className='font-poppins line-clamp-2'>{title}</Typography>
                                <Box className='flex gap-3 text-text-secondary'>
                                    {start_date && (
                                        <Box className='flex items-center gap-1'>
                                            <CalendarTodayOutlined className='text-sm' />
                                            <Typography variant='caption' className='font-poppins'>
                                                {formatEventRange(start_date, end_date)}
                                            </Typography>
                                        </Box>
                                    )}
                                    {location && (
                                        <Box className='flex items-center gap-1'>
                                            <LocationOnOutlined className='text-sm' />
                                            <Typography variant='caption' className='font-poppins'>
                                                {location}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <Box className='flex items-center justify-between'>
                                    <Box className='flex items-center gap-2'>
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
                                        <Typography variant='caption' className='font-poppins text-text-muted'>
                                            {memberCount} joined
                                        </Typography>
                                    </Box>
                                    {actionType === 'favorite' && (
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
                                            className={`${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                                        >
                                            <Favorite className='text-sm' />
                                        </IconButton>
                                    )}
                                    {actionType === 'interest' && (
                                        <Button
                                            variant='contained'
                                            size="small"
                                            onClick={(e) => e.stopPropagation()}
                                            className='font-jakarta'
                                        >
                                            <Star className='text-sm mr-1' /> Interested
                                        </Button>
                                    )}
                                    {actionType === 'cancel' && (
                                        <Button
                                            variant='contained'
                                            size="small"
                                            onClick={(e) => e.stopPropagation()}
                                            className='bg-secondary font-jakarta'
                                        >
                                            Canceled
                                        </Button>
                                    )}
                                    {actionType === 'complete' && (
                                        <Button
                                            variant='contained'
                                            size="small"
                                            onClick={(e) => e.stopPropagation()}
                                            className='bg-secondary font-jakarta'
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
                                        size="small"
                                        onClick={(e) => e.stopPropagation()}
                                        className='font-jakarta'
                                    >
                                        Leave Review
                                    </Button>
                                    <Button 
                                        variant='contained' 
                                        size="small"
                                        onClick={(e) => e.stopPropagation()}
                                        className='font-jakarta'
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
                className={`flex flex-col overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200 ${variant === 'vertical' && 'h-80 w-64'} ${variant === 'horizontal-compact' && 'h-20 w-full'} ${variant === 'vertical-compact' && 'h-48 w-40'} ${variant === 'horizontal' ? (actionType === 'complete' ? 'h-48' : 'h-32') + ' w-full' : ''} ${className}`}
            >
                {renderContent()}
            </Card>
        </Box>
    );
};

export default RefactoredEventCard;
