import React, { useState } from 'react';
import { Avatar, Typography, Stack, IconButton, Chip, TextField, InputAdornment, useTheme } from '@mui/material';
import { LocationOn, Search, Tune } from '@mui/icons-material';

import { Container } from '@mui/material';
import { BottomAppBar } from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import { useGeoStore } from '@/store/geoStore';
import { useUser, useBookings, useUpdateBooking } from '@/hooks/entityConfigs';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useUserStore } from '@/store/userStore';
import { useFiltersStore } from '@/store/filtersStore';
import { useDataStore } from '@/store/dataStore';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';

import { detectUserLocation } from '@/utils/geo';
import { useUnifiedItems } from '@/hooks/useUnifiedItems';
import type { UnifiedItem } from '@/utils/schemas';
import { FilterModal } from '@/components/layout/FilterModal';
import { getAvatarProps } from '@/utils/avatarUtils';
import { Link } from 'react-router-dom';
import CancelEventDialog from '@/components/dialogs/CancelEventDialog';
import { useCancelEvent } from '@/hooks/useCancelEvent';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '@/hooks/usePagination';
import { Box, Button } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { hasActiveFilters, resetAllFilters } from '@/utils/filterUtils';
import { useQuery } from '@tanstack/react-query';
import { getSeatAvailability } from '@/services/dataService';

function Home() {
    const navigate = useNavigate();
    const { city, country } = useGeoStore();
    const { user: authUser } = useUserStore();
    const { data: user } = useUser(authUser?.id || '');
    const { data: userBookings = [] } = useBookings();
    const { mutate: updateBookingStatus, isPending: isLeaving } = useUpdateBooking();
    const queryClient = useQueryClient();
    
    const hasUserJoined = (item: UnifiedItem) => {
        if (!authUser?.id) return false;
        return userBookings.some(booking => 
            booking.event_id === item.id && 
            ['pending', 'confirmed'].includes(booking.status)
        );
    };

    const getUserBooking = (item: UnifiedItem) => {
        if (!authUser?.id) return null;
        return userBookings.find(booking => 
            booking.event_id === item.id && 
            ['pending', 'confirmed'].includes(booking.status)
        );
    };
    
    const { 
        categoryFilter, 
        setCategoryFilter, 
        searchQuery, 
        setSearchQuery, 
        categories, 
        getFilteredItems,
        minPrice,
        maxPrice,
        eventType,
        dateFilter,
        locationFilter
    } = useFiltersStore();
    const dataStore = useDataStore();
    const [detecting, setDetecting] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const { isDarkMode } = useDarkMode();
    const theme = useTheme();
    const [isFilterOpen, setFilterOpen] = useState(false);
    const { getVisibleItems, loadMore, hasMore, getRemainingCount } = usePagination();
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<UnifiedItem | null>(null);
    const { cancelEvent, isLoading: isCancelling } = useCancelEvent();
    const { 
        data: items = [], 
        isLoading: itemsLoading, 
        error: itemsError,
        refetch: refetchItems
    } = useUnifiedItems();

        const filteredItems = getFilteredItems(items);
    
    const featuredItems = filteredItems.filter((item: UnifiedItem) => item.featured);


    if (itemsError) {
        return (
            <Container className="relative min-h-screen flex items-center justify-center">
                <Typography variant="h6" className="text-center text-red-500">
                    Error loading items: {itemsError.message}
                </Typography>
            </Container>
        );
    }

    if (itemsLoading) {
        return (
            <Container className="relative min-h-screen flex items-center justify-center">
                <Typography variant="h6" className="text-center text-muted">
                    Loading events and meetups...
                </Typography>
            </Container>
        );
    }
    const handleDetectLocation = async () => {
        setDetecting(true);
        await detectUserLocation();
        setTimeout(() => setDetecting(false), 2000);
    };

    const handleCancelClose = () => {
        setCancelDialogOpen(false);
        setSelectedItem(null);
    };

    const handleCancelConfirm = async () => {
        if (selectedItem) {
            await cancelEvent(selectedItem);
            setCancelDialogOpen(false);
            setSelectedItem(null);
        }
    };



    const ItemCardWithAvailability = ({ item, variant }: { item: UnifiedItem; variant: 'horizontal-compact' | 'vertical' }) => {
        const isFullyBooked = item.type === 'event' ? 
            (item.max_participants && (item.member_count || 0) >= item.max_participants) : 
            false;

        const handleCardClick = () => {
            const eventData = {
                id: item.id,
                title: item.title,
                description: item.description,
                location: item.location,
                category: item.category,
                startDate: item.start_date,
                endDate: item.type === 'event' ? item.end_date : undefined,
                ticketPrice: item.type === 'event' ? item.ticket_price : undefined,
                imageUrl: item.image || '/illustrations/eventcard.png',
                featured: item.featured,
                meetupLink: item.type === 'meetup' ? item.meetup_link : undefined,
                userId: item.user_id
            };
            
            navigate(`/events/${item.id}`, { 
                state: { 
                    event: eventData
                } 
            });
        };

        const handleActionClick = (e?: React.MouseEvent<Element, MouseEvent>) => {
            e?.stopPropagation();
            
            if (isFullyBooked) {
                return;
            }

            if (item.type === 'meetup') {
                navigate(`/meetups/join/${item.id}`);
            } else {
                navigate(`/bookings/event/${item.id}`);
            }
        };

        const handleCancelClick = (e?: React.MouseEvent<Element, MouseEvent>) => {
            e?.stopPropagation();
            setSelectedItem(item);
            setCancelDialogOpen(true);
        };

        const handleLeaveClick = (e?: React.MouseEvent<Element, MouseEvent>) => {
            e?.stopPropagation();
            
            const userBooking = getUserBooking(item);
            if (!userBooking) {
                console.error('No booking found for this event/meetup');
                return;
            }

            updateBookingStatus(
                { id: userBooking.id!, data: { status: 'cancelled' } },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['userBookings'] });
                        queryClient.invalidateQueries({ queryKey: ['events'] });
                        queryClient.invalidateQueries({ queryKey: ['meetups'] });
                        queryClient.invalidateQueries({ queryKey: ['unifiedItems'] });
                        queryClient.invalidateQueries({ queryKey: ['userStats'] });
                        
                        if (item.type === 'event') {
                            queryClient.invalidateQueries({ queryKey: ['seatAvailability', item.id] });
                        }
                        
                        toast.success(`Successfully left ${item.type === 'meetup' ? 'meetup' : 'event'}!`);
                    },
                    onError: (error: any) => {
                        console.error('Error leaving event/meetup:', error);
                        toast.error(error.message || 'Failed to leave event/meetup');
                    }
                }
            );
        };

        const isCreator = authUser?.id && item.user_id === authUser.id;
        const isCancelled = item.status === 'cancelled';
        const hasJoined = hasUserJoined(item);
        
        let actionType: 'join' | 'favorite' | 'cancel' | 'full' | 'leave' = 'join';
        if (isCancelled) {
            actionType = 'cancel';
        } else if (isCreator && !isCancelled) {
            actionType = 'cancel';
        } else if (hasJoined) {
            actionType = 'leave';
        } else if (isFullyBooked) {
            actionType = 'full';
        } else {
            actionType = 'join';
        }

        return (
            <Box 
                key={item.id} 
                onClick={handleCardClick}
                className="cursor-pointer"
            >
                <EventCard
                    item={item}
                    variant={variant}
                    actionType={actionType}
                    onAction={isCreator ? handleCancelClick : (hasJoined ? handleLeaveClick : handleActionClick)}
                    disabled={Boolean(isFullyBooked && !isCreator && !hasJoined)}
                />
            </Box>
        );
    };

    const renderEventCard = (item: UnifiedItem, variant: 'horizontal-compact' | 'vertical') => (
        <ItemCardWithAvailability key={item.id} item={item} variant={variant} />
    );

    return (
        <>
            <Container className='relative min-h-screen'>
                <Box className='no-scrollbar w-full overflow-y-auto '>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton
                        size='large'
                        className="text-text-3 border border-neutral-200 bg-primary text-white"
                        onClick={handleDetectLocation}
                    >
                        <LocationOn className="text-2xl" />
                    </IconButton>
                    <Typography variant='body1' className="font-jakarta text-muted-dark">
                        {detecting ? 'Detecting...' : city && country ? `${city}, ${country}` : 'Tap to detect'}
                    </Typography>
                    <Avatar {...getAvatarProps(user, authUser, 48)} />
                </Box>
                <Typography variant='h1' className="mb-2 self-start font-jakarta font-semibold text-primary">
                    Hello, {(user?.full_name || authUser?.full_name)?.split(' ')[0] ?? 'Guest'}!
                </Typography>
                <Typography variant='body2' className="mb-4 self-start font-jakarta text-muted-dark">
                    Welcome back, hope you&#39;re feeling good today!
                </Typography>
                <Box className='mb-6 flex w-full items-center gap-2'>
                    <TextField
                        fullWidth
                        placeholder='Search for events'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Search className="text-muted-dark" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <IconButton
                        size='large'
                        className="bg-primary text-white flex-shrink-0"
                        onClick={() => setFilterOpen(true)}
                    >
                        <Tune />
                    </IconButton>
                </Box>

                {hasActiveFilters() && (
                    <Box className="mb-4 p-3 rounded-lg bg-surface-dark">
                        <Box className='flex items-center justify-between mb-2'>
                            <Typography variant='body2' className="font-jakarta text-muted-dark">
                                Active filters:
                            </Typography>
                            <Button
                                size='small'
                                onClick={resetAllFilters}
                                className='border border-gray-300 text-xs px-2 py-1 min-w-0'
                            >
                                Clear all
                            </Button>
                        </Box>
                        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                            {searchQuery && (
                                <Chip
                                    label={`Search: "${searchQuery}"`}
                                    onDelete={() => setSearchQuery('')}
                                    size='small'
                                    className="bg-chip-dark text-chip-dark border-chip-dark"
                                />
                            )}
                            {categoryFilter !== 'All' && (
                                <Chip
                                    label={`Category: ${categoryFilter}`}
                                    onDelete={() => setCategoryFilter('All')}
                                    size='small'
                                    className="bg-chip-dark text-chip-dark border-chip-dark"
                                />
                            )}
                            {eventType !== 'Any' && (
                                <Chip
                                    label={`Type: ${eventType}`}
                                    size='small'
                                    className="bg-chip-dark text-chip-dark border-chip-dark"
                                />
                            )}
                            {dateFilter !== 'Upcoming' && (
                                <Chip
                                    label={`Date: ${dateFilter}`}
                                    size='small'
                                    className="bg-chip-dark text-chip-dark border-chip-dark"
                                />
                            )}
                            {locationFilter && (
                                <Chip
                                    label={`Location: ${locationFilter}`}
                                    size='small'
                                    className="bg-chip-dark text-chip-dark border-chip-dark"
                                />
                            )}
                            {(minPrice > 0 || maxPrice < 500) && (
                                <Chip
                                    label={`Price: $${minPrice} - $${maxPrice}`}
                                    size='small'
                                    className="bg-chip-dark text-chip-dark border-chip-dark"
                                />
                            )}
                        </Stack>
                    </Box>
                )}

                <Stack direction='row' spacing={1} className='no-scrollbar mb-4 overflow-x-auto'>
                    {categories.map(({ name, iconName }) => (
                        <Chip
                            key={name}
                            label={name}
                            icon={<span className="text-xs">{getCategoryIcon(iconName)}</span>}
                            clickable
                            color={categoryFilter === name ? 'primary' : 'default'}
                            onClick={() => setCategoryFilter(categoryFilter === name ? 'All' : name)}
                            className={`cursor-pointer ${
                                categoryFilter === name 
                                    ? 'bg-primary text-white border-primary hover:bg-primary-light' 
                                    : 'bg-chip-dark text-chip-dark border-chip-dark hover:bg-chip-hover'
                            }`}
                        />
                    ))}
                </Stack>
                {filteredItems.length > 0 && (
                    <>
                        <Typography variant='h4' className="font-jakarta font-semibold text-primary">Featured Events</Typography>
                        <Box className='flex justify-center py-4'>
                            {featuredItems.length > 0 &&
                                featuredItems[activeStep] &&
                                renderEventCard(featuredItems[activeStep], 'vertical')}
                        </Box>
                    </>
                )}
                <Box className='flex justify-center gap-2 py-2'>
                    {featuredItems.map((_: UnifiedItem, index: number) => (
                        <Box
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={`cursor-pointer transition-all duration-300 ${
                                index === activeStep 
                                    ? 'w-7 h-2 rounded border-2 border-primary bg-transparent' 
                                    : 'w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-white/30'
                            }`}
                        />
                    ))}
                </Box>
                <Box className='flex justify-between'>
                    <Typography variant='h4' className="font-jakarta font-semibold text-primary">Upcoming Events</Typography>
                    <Link to={'/upcoming'} className="text-link-dark">See All</Link>
                </Box>
                <Stack direction='column' spacing={2} className='py-4 pb-24'>
                    {filteredItems.length > 0 ? (
                        getVisibleItems(filteredItems).map((item: UnifiedItem) => renderEventCard(item, 'horizontal-compact'))
                    ) : (
                        <Typography variant='body2' className="py-4 text-center font-jakarta text-muted-dark">
                            {hasActiveFilters()
                                ? 'No items match your current filters. Try adjusting your search criteria.'
                                : 'No upcoming events found.'
                            }
                        </Typography>
                    )}

                    {hasMore(filteredItems.length) && (
                        <Box className='mt-4 flex justify-center'>
                            <Button
                                variant='outlined'
                                onClick={loadMore}
                                className='border-primary text-primary hover:border-primary-light hover:bg-primary/10'
                            >
                                More ({getRemainingCount(filteredItems.length)})
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Box>
            <FilterModal open={isFilterOpen} onClose={() => setFilterOpen(false)} />
            <CancelEventDialog
                open={cancelDialogOpen}
                onClose={handleCancelClose}
                onConfirm={handleCancelConfirm}
                eventTitle={selectedItem?.title || ''}
                eventType={selectedItem?.type || 'event'}
                loading={isCancelling}
            />
            <BottomAppBar />
            </Container>
        </>
    );
}

export default Home;
