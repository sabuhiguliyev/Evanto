import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, IconButton, TextField, InputAdornment, ToggleButton } from '@mui/material';
import { isSameDay } from 'date-fns';
import {
    KeyboardArrowLeft,
    SearchOutlined,
    TuneOutlined,
    MoreVertOutlined,
    ListOutlined,
    GridViewOutlined,
} from '@mui/icons-material';
import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import { useFiltersStore } from '@/store/filtersStore';
import { getCategoryIcon } from '@/utils/iconMap';
import { useQuery } from '@tanstack/react-query';
import { getEvents, getMeetups } from '@/services';
import FilterModal from '@/components/layout/FilterModal';

import { hasActiveFilters, resetAllFilters } from '@/utils/filterUtils';

function Search() {
    const [cardVariant, setCardVariant] = useState<'horizontal' | 'vertical-compact'>('horizontal');
    const [isFilterOpen, setFilterOpen] = useState(false);

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
        <Container className='relative justify-start'>
            <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton onClick={() => navigate(-1)} className="text-text-muted border border-gray-200">
                        <KeyboardArrowLeft />
                    </IconButton>
                    <Typography variant='h4'>Search</Typography>
                    <IconButton className="text-text-muted border border-gray-200">
                        <MoreVertOutlined />
                    </IconButton>
                </Box>
                <Box className='mb-6 flex w-full items-center gap-2'>
                    <TextField
                        className='text-input'
                        label='Search for events'
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
                        className='bg-primary text-white font-jakarta'
                        onClick={() => setFilterOpen(true)}
                    >
                        <TuneOutlined />
                    </IconButton>
                    {hasActiveFilters() && (
                        <IconButton
                            size='small'
                            onClick={resetAllFilters}
                            sx={{ 
                                border: '1px solid #ccc',
                                fontSize: '12px',
                                padding: '4px 8px'
                            }}
                        >
                            Clear
                        </IconButton>
                    )}
                </Box>
                
                {/* Active Filters Summary */}
                {hasActiveFilters() && (
                    <Box className='mb-4 p-3 bg-gray-50 rounded-lg'>
                        <Typography variant='body2' className='text-gray-600 mb-2'>
                            Active filters:
                        </Typography>
                        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                            {searchQuery && (
                                <ToggleButton
                                    value="search"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-poppins'
                                >
                                    Search: "{searchQuery}"
                                </ToggleButton>
                            )}
                            {categoryFilter !== 'All' && (
                                <ToggleButton
                                    value="category"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-poppins'
                                >
                                    {categoryFilter}
                                </ToggleButton>
                            )}
                            {(minPrice > 0 || maxPrice < 500) && (
                                <ToggleButton
                                    value="price"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-poppins'
                                >
                                    ${minPrice}-${maxPrice}
                                </ToggleButton>
                            )}
                            {eventType !== 'Any' && (
                                <ToggleButton
                                    value="type"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-poppins'
                                >
                                    {eventType}
                                </ToggleButton>
                            )}
                            {dateFilter !== 'Upcoming' && (
                                <ToggleButton
                                    value="date"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-poppins'
                                >
                                    {dateFilter}
                                </ToggleButton>
                            )}
                            {locationFilter && (
                                <ToggleButton
                                    value="location"
                                    selected={true}
                                    className='h-8 px-2 text-xs border border-primary text-primary bg-primary/10 font-poppins'
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
                                className='h-16 min-w-16 flex-col rounded-full border border-gray-200 text-[10px] font-poppins [&.Mui-selected]:bg-primary [&.Mui-selected]:text-white flex-shrink-0'
                            >
                                <span className='text-sm mb-1'>{getCategoryIcon(iconName)}</span>
                                <span className='text-[10px] leading-tight text-center'>{name}</span>
                            </ToggleButton>
                        ))}
                    </Stack>
                </Box>
                <Box className='flex w-full items-center justify-between'>
                    <Typography variant='body2' className='text-primary font-poppins'>
                        {filteredItems.length} results found
                        {filteredItems.length !== items.length && ` (of ${items.length} total)`}
                    </Typography>
                    <Stack direction='row'>
                        <IconButton
                            size='small'
                            onClick={() => setCardVariant('horizontal')}
                            className={cardVariant === 'horizontal' ? 'text-primary' : 'text-text-muted'}
                        >
                            <ListOutlined />
                        </IconButton>
                        <IconButton
                            size='small'
                            onClick={() => setCardVariant('vertical-compact')}
                            className={cardVariant === 'vertical-compact' ? 'text-primary' : 'text-text-muted'}
                        >
                            <GridViewOutlined />
                        </IconButton>
                    </Stack>
                </Box>
                <Box
                    className={`no-scrollbar mb-4 w-full gap-3 overflow-y-auto ${
                        cardVariant === 'vertical-compact' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'
                    }`}
                >
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                            <EventCard
                                key={item.id}
                                item={item}
                                variant={cardVariant}
                                actionType='favorite'
                                onAction={() => {}}
                            />
                        ))
                    ) : (
                        <Typography variant='body2' className='py-4 text-center text-gray-500'>
                            {hasActiveFilters()
                                ? 'No items match your current filters. Try adjusting your search criteria.'
                                : 'No upcoming events found.'
                            }
                        </Typography>
                    )}
                </Box>
            </Box>
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
            <FilterModal open={isFilterOpen} onClose={() => setFilterOpen(false)} />
        </Container>
    );
}

export default Search;
