import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, IconButton, TextField, InputAdornment, ToggleButton } from '@mui/material';
import { isSameDay } from 'date-fns';
import {
    SearchOutlined,
    TuneOutlined,
    ListOutlined,
    GridViewOutlined,
} from '@mui/icons-material';
import { Container } from '@mui/material';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import PageHeader from '@/components/layout/PageHeader';
import { useFiltersStore } from '@/store/filtersStore';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';
import { usePagination } from '@/hooks/usePagination';
import { Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getEvents, getMeetups } from '@/services';
import FilterModal from '@/components/layout/FilterModal';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

import { hasActiveFilters, resetAllFilters } from '@/utils/filterUtils';

function Search() {
    const [cardVariant, setCardVariant] = useState<'horizontal' | 'vertical-compact'>('horizontal');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const { getVisibleItems, loadMore, hasMore, getRemainingCount } = usePagination();
    const { isDarkMode } = useDarkMode();

    const navigate = useNavigate();
    const { 
        searchQuery, 
        setSearchQuery, 
        categoryFilter, 
        setCategoryFilter, 
        categories,
        minPrice,
        maxPrice,
        eventType,
        dateFilter,
        setDateFilter,
        locationFilter
    } = useFiltersStore();
    
    // Fetch events and meetups
    const { data: events = [] } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });
    
    const { data: meetups = [] } = useQuery({
        queryKey: ['meetups'],
        queryFn: getMeetups,
    });

        // Merge events and meetups into unified items
    const items = [
        ...events.map(event => ({ ...event, type: 'event' as const })),
        ...meetups.map(meetup => ({ ...meetup, type: 'meetup' as const })),
    ];
    
    // Use centralized filtering logic from store
    const { getFilteredItems } = useFiltersStore();
    const filteredItems = getFilteredItems(items);



    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            
            <Container className='relative min-h-screen'>
                <Box className='no-scrollbar w-full overflow-y-auto'>
                    <PageHeader 
                        title="Search"
                        showBackButton={true}
                        showMenuButton={true}
                    />
                <Box className='mb-6 flex w-full items-center gap-2'>
                    <TextField
                        fullWidth
                        placeholder='Search for events'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchOutlined />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <IconButton
                        size='large'
                        disableRipple
                        className='bg-primary text-white font-jakarta flex-shrink-0'
                        onClick={() => setFilterOpen(true)}
                    >
                        <TuneOutlined />
                    </IconButton>
                    {hasActiveFilters() && (
                        <IconButton
                            size='small'
                            onClick={resetAllFilters}
                            className='border border-gray-300 text-xs px-2 py-1'
                        >
                            Clear
                        </IconButton>
                    )}
                </Box>
                
                {/* Active Filters Summary */}
                {hasActiveFilters() && (
                    <Box className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                        <Typography variant='body2' className={`mb-2 font-jakarta ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Active filters:
                        </Typography>
                        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                            {searchQuery && (
                                <ToggleButton
                                    value="search"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-jakarta'
                                >
                                    Search: "{searchQuery}"
                                </ToggleButton>
                            )}
                            {categoryFilter !== 'All' && (
                                <ToggleButton
                                    value="category"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-jakarta'
                                >
                                    {categoryFilter}
                                </ToggleButton>
                            )}
                            {(minPrice > 0 || maxPrice < 500) && (
                                <ToggleButton
                                    value="price"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-jakarta'
                                >
                                    ${minPrice}-${maxPrice}
                                </ToggleButton>
                            )}
                            {eventType !== 'Any' && (
                                <ToggleButton
                                    value="type"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-jakarta'
                                >
                                    {eventType}
                                </ToggleButton>
                            )}
                            {dateFilter !== 'Upcoming' && (
                                <ToggleButton
                                    value="date"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-jakarta'
                                >
                                    {dateFilter}
                                </ToggleButton>
                            )}
                            {locationFilter && (
                                <ToggleButton
                                    value="location"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-jakarta'
                                >
                                    {locationFilter}
                                </ToggleButton>
                            )}
                        </Stack>
                    </Box>
                )}
                
                <Box className='mb-4 w-full'>
                    <Stack direction='row' spacing={1} className='no-scrollbar overflow-x-auto'>
                        {categories.map(({ iconName, name }) => (
                            <ToggleButton
                                key={name}
                                value={name}
                                selected={categoryFilter === name}
                                onChange={() => setCategoryFilter(categoryFilter === name ? 'All' : name)}
                                className={`h-16 min-w-16 flex-col rounded-full text-xs font-jakarta flex-shrink-0 ${
                                    categoryFilter === name 
                                        ? 'bg-primary text-white border-primary' 
                                        : isDarkMode 
                                            ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                }`}
                            >
                                <span className='text-sm mb-1'>{getCategoryIcon(iconName)}</span>
                                <span className='text-xs leading-tight text-center'>{name}</span>
                            </ToggleButton>
                        ))}
                    </Stack>
                </Box>
                <Box className='flex w-full items-center justify-between'>
                    <Typography variant='body2' className={`text-primary font-jakarta ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        {filteredItems.length} results found
                        {filteredItems.length !== items.length && ` (of ${items.length} total)`}
                    </Typography>
                    <Stack direction='row'>
                        <IconButton
                            size='small'
                            onClick={() => setCardVariant('horizontal')}
                            className={cardVariant === 'horizontal' ? 'text-primary' : `${isDarkMode ? 'text-gray-400' : 'text-text-muted'}`}
                        >
                            <ListOutlined />
                        </IconButton>
                        <IconButton
                            size='small'
                            onClick={() => setCardVariant('vertical-compact')}
                            className={cardVariant === 'vertical-compact' ? 'text-primary' : `${isDarkMode ? 'text-gray-400' : 'text-text-muted'}`}
                        >
                            <GridViewOutlined />
                        </IconButton>
                    </Stack>
                </Box>
                <Box
                    className={`no-scrollbar mb-4 w-full gap-3 overflow-y-auto ${
                        cardVariant === 'vertical-compact' ? 'grid grid-cols-2 gap-3 pb-24' : 'flex flex-col gap-3 pb-24'
                    }`}
                >
                    {filteredItems.length > 0 ? (
                        getVisibleItems(filteredItems).map(item => (
                            <EventCard
                                key={item.id}
                                item={item}
                                variant={cardVariant}
                                actionType={cardVariant === 'horizontal' ? 'join' : 'favorite'}
                                onAction={() => {}}
                            />
                        ))
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
                                className='text-primary border-primary hover:border-primary-light hover:bg-primary/10'
                            >
                                More ({getRemainingCount(filteredItems.length)})
                            </Button>
                        </Box>
                    )}
                </Box>
                </Box>
                <BottomAppBar />
                <FilterModal open={isFilterOpen} onClose={() => setFilterOpen(false)} />
            </Container>
        </>
    );
}

export default Search;
