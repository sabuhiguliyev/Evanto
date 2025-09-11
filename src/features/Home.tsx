import React, { useState } from 'react';
import { Avatar, Typography, Stack, IconButton, Chip, TextField, InputAdornment, useTheme } from '@mui/material';
import { LocationOn, Search, Tune } from '@mui/icons-material';

import { Container } from '@mui/material';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import { useGeoStore } from '@/store/geoStore';
import { useUser } from '@/hooks/entityConfigs';
import useUserStore from '@/store/userStore';
import { useFiltersStore } from '@/store/filtersStore';
import { useDataStore } from '@/store/dataStore';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';

import { detectUserLocation } from '@/utils/geo';
import { useUnifiedItems } from '@/hooks/useUnifiedItems';
import type { UnifiedItem } from '@/utils/schemas';
import FilterModal from '@/components/layout/FilterModal';
import { getAvatarProps } from '@/utils/avatarUtils';
import { Link } from 'react-router-dom';
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
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const theme = useTheme();
    const [isFilterOpen, setFilterOpen] = useState(false);
    const { getVisibleItems, loadMore, hasMore, getRemainingCount } = usePagination();
    // Use unified items hook for better data management
    const { 
        data: items = [], 
        isLoading: itemsLoading, 
        error: itemsError,
        refetch: refetchItems
    } = useUnifiedItems();

        // Use centralized filtering from filtersStore
        const filteredItems = getFilteredItems(items);
    
    const featuredItems = filteredItems.filter((item: UnifiedItem) => item.featured);

    if (itemsError) {
        return <Typography>Error loading items.</Typography>;
    }
    const handleDetectLocation = async () => {
        setDetecting(true);
        await detectUserLocation();
        setTimeout(() => setDetecting(false), 2000);
    };


    const ItemCardWithAvailability = ({ item, variant }: { item: UnifiedItem, variant: 'horizontal-compact' | 'vertical' }) => {
        const { data: availability } = useQuery({
            queryKey: ['itemAvailability', item.id],
            queryFn: () => getSeatAvailability(item.id, item.max_participants),
            enabled: !!item.max_participants,
        });

        const isFullyBooked = availability?.isFullyBooked || false;
        const availableSeats = availability?.availableSeats || (item.max_participants || 0);

        const handleCardClick = () => {
            const eventData = {
                id: item.id,
                type: item.type,
                title: item.title || 'Untitled',
                description: item.type === 'event' ? item.description : item.description || 'No description available',
                category: item.category || 'All',
                location: item.location || 'Location not specified',
                startDate: item.start_date,
                endDate: item.type === 'event' ? item.end_date : undefined,
                ticketPrice: item.type === 'event' ? item.ticket_price : undefined,
                imageUrl: item.image || '/illustrations/eventcard.png',
                online: item.online,
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

        const handleActionClick = (e: React.MouseEvent) => {
            e?.stopPropagation(); // Prevent card click when action button is clicked
            
            if (isFullyBooked) {
                return; // Don't navigate if fully booked
            }

            if (item.type === 'meetup') {
                navigate(`/meetups/join/${item.id}`);
            } else {
                navigate(`/bookings/event/${item.id}`);
            }
        };

        return (
            <Box 
                key={item.id} 
                onClick={handleCardClick}
                sx={{ cursor: 'pointer' }}
            >
                <EventCard
                    item={item}
                    variant={variant}
                    actionType={isFullyBooked ? 'full' : 'join'}
                    onAction={handleActionClick}
                    disabled={isFullyBooked}
                />
            </Box>
        );
    };

    const renderEventCard = (item: UnifiedItem, variant: 'horizontal-compact' | 'vertical') => (
        <ItemCardWithAvailability key={item.id} item={item} variant={variant} />
    );

    return (
        <>
            <Box className='absolute top-4 right-4 z-10 flex gap-2'>
                <Button 
                    onClick={() => refetchItems()} 
                    size="small" 
                    variant="outlined"
                    className={`text-xs ${isDarkMode ? 'text-white border-gray-600' : 'text-gray-700 border-gray-300'}`}
                >
                    Refresh
                </Button>
                <Button
                    onClick={toggleDarkMode}
                    size="small"
                    variant="outlined"
                    className={`text-xs ${isDarkMode ? 'text-white border-gray-600' : 'text-gray-700 border-gray-300'}`}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </Button>
            </Box>
            
            <Container className={`justify-start no-scrollbar `}>
                <Box className='no-scrollbar w-full overflow-y-auto '>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton
                        size='large'
                        className={`text-text-3 border border-neutral-200 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
                        onClick={handleDetectLocation}
                    >
                        <LocationOn 
                            sx={{
                                fontSize: '24px'
                            }}
                        />
                    </IconButton>
                    <Typography variant='body1' className={`font-jakarta`} sx={{ color: theme.palette.custom.mutedText }}>
                        {detecting ? 'Detecting...' : city && country ? `${city}, ${country}` : 'Tap to detect'}
                    </Typography>
                    <Avatar {...getAvatarProps(user, authUser, 50)} />
                </Box>
                <Typography variant='h2' className={`mb-2 self-start font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Hello, {(user?.full_name || authUser?.full_name)?.split(' ')[0] ?? 'Guest'}!
                </Typography>
                <Typography variant='body2' className={`mb-4 self-start font-jakarta`} sx={{ color: theme.palette.custom.mutedText }}>
                    Welcome back, hope you&#39;re feeling good today!
                </Typography>
                <Box className='mb-6 flex w-full items-center gap-2'>
                    <TextField
                        className='text-input'
                        placeholder='Search for events'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: theme.palette.custom.inputBackground,
                                border: isDarkMode ? `1px solid ${theme.palette.custom.borderDark}` : `1px solid ${theme.palette.custom.borderLight}`,
                                borderRadius: '12px',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: theme.palette.custom.mutedText,
                            },
                            '& .MuiInputBase-input': {
                                color: isDarkMode ? 'white' : theme.palette.text.primary,
                                '&::placeholder': {
                                    color: theme.palette.custom.mutedText,
                                },
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Search className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <IconButton
                        size='large'
                        disableRipple
                        className={`${isDarkMode ? 'bg-blue-500' : 'bg-primary'} text-white`}
                        onClick={() => setFilterOpen(true)}
                    >
                        <Tune />
                    </IconButton>
                </Box>

                {/* Active Filters Summary */}
                {hasActiveFilters() && (
                    <Box className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                        <Box className='flex items-center justify-between mb-2'>
                            <Typography variant='body2' className={`font-jakarta`} sx={{ color: theme.palette.custom.mutedText }}>
                                Active filters:
                            </Typography>
                            <Button
                                size='small'
                                onClick={resetAllFilters}
                                className='text-xs px-2 py-1'
                                sx={{ 
                                    border: '1px solid #ccc',
                                    fontSize: '12px',
                                    padding: '4px 8px',
                                    minWidth: 'auto'
                                }}
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
                                    className={`${isDarkMode ? 'bg-white/20 text-white border border-white/20' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {categoryFilter !== 'All' && (
                                <Chip
                                    label={`Category: ${categoryFilter}`}
                                    onDelete={() => setCategoryFilter('All')}
                                    size='small'
                                    className={`${isDarkMode ? 'bg-white/20 text-white border border-white/20' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {eventType !== 'Any' && (
                                <Chip
                                    label={`Type: ${eventType}`}
                                    size='small'
                                    className={`${isDarkMode ? 'bg-white/20 text-white border border-white/20' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {dateFilter !== 'Upcoming' && (
                                <Chip
                                    label={`Date: ${dateFilter}`}
                                    size='small'
                                    className={`${isDarkMode ? 'bg-white/20 text-white border border-white/20' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {locationFilter && (
                                <Chip
                                    label={`Location: ${locationFilter}`}
                                    size='small'
                                    className={`${isDarkMode ? 'bg-white/20 text-white border border-white/20' : 'bg-gray-200 text-gray-700'}`}
                                />
                            )}
                            {(minPrice > 0 || maxPrice < 500) && (
                                <Chip
                                    label={`Price: $${minPrice} - $${maxPrice}`}
                                    size='small'
                                    className={`${isDarkMode ? 'bg-white/20 text-white border border-white/20' : 'bg-gray-200 text-gray-700'}`}
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
                            icon={<span className={`text-[10px] ${isDarkMode && categoryFilter !== name ? 'text-white' : ''}`}>{getCategoryIcon(iconName)}</span>}
                            clickable
                            color={categoryFilter === name ? 'primary' : 'default'}
                            onClick={() => setCategoryFilter(categoryFilter === name ? 'All' : name)}
                            className={`cursor-pointer ${
                                categoryFilter === name 
                                    ? 'bg-primary text-white' 
                                    : isDarkMode 
                                        ? 'bg-white/20 text-white border border-white/20' 
                                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                            sx={{
                                '&.MuiChip-root': {
                                    backgroundColor: categoryFilter === name 
                                        ? theme.palette.primary.main
                                        : theme.palette.custom.chipBackground,
                                    color: categoryFilter === name 
                                        ? 'white' 
                                        : isDarkMode 
                                            ? 'white' 
                                            : theme.palette.text.primary,
                                    borderColor: categoryFilter === name 
                                        ? theme.palette.primary.main
                                        : isDarkMode 
                                            ? theme.palette.custom.borderDark
                                            : theme.palette.custom.borderLight,
                                    '&:hover': {
                                        backgroundColor: categoryFilter === name 
                                            ? theme.palette.primary.light
                                            : theme.palette.custom.chipHover,
                                    },
                                    '& .MuiChip-icon': {
                                        color: categoryFilter === name 
                                            ? 'white' 
                                            : isDarkMode 
                                                ? 'white' 
                                                : 'inherit',
                                    }
                                }
                            }}
                        />
                    ))}
                </Stack>
                {filteredItems.length > 0 && (
                    <>
                        <Typography variant='h4' className={`font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Featured Events</Typography>
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
                            sx={{
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                ...(index === activeStep
                                    ? {
                                          width: 28,
                                          height: 8,
                                          borderRadius: 4,
                                          border: `2px solid ${theme.palette.primary.main}`,
                                          backgroundColor: 'transparent',
                                      }
                                    : { 
                                        width: 10, 
                                        height: 10, 
                                        borderRadius: '50%', 
                                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#ccc' 
                                    }),
                            }}
                        />
                    ))}
                </Box>
                <Box className='flex justify-between'>
                    <Typography variant='h4' className={`font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Events</Typography>
                    <Link to={'/upcoming'} className={`${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>See All</Link>
                </Box>
                <Stack direction='column' spacing={2} className='py-4 pb-24'>
                    {filteredItems.length > 0 ? (
                        getVisibleItems(filteredItems).map((item: UnifiedItem) => renderEventCard(item, 'horizontal-compact'))
                    ) : (
                        <Typography variant='body2' className={`py-4 text-center font-jakarta ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
                                className={`${isDarkMode ? 'text-blue-400 border-blue-400 hover:bg-blue-400/10' : 'text-primary-1 border-primary-1'}`}
                                sx={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.light,
                                        backgroundColor: isDarkMode ? 'rgba(93, 155, 252, 0.1)' : 'rgba(93, 155, 252, 0.04)',
                                    }
                                }}
                            >
                                Load More ({getRemainingCount(filteredItems.length)} remaining)
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Box>
            <BottomAppBar />
            <FilterModal open={isFilterOpen} onClose={() => setFilterOpen(false)} />
            </Container>
        </>
    );
}

export default Home;
