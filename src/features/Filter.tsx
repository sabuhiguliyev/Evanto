import React from 'react';
import { Button, Chip, Container, Slider, Stack, Typography } from '@mui/material';

import { useFiltersStore } from '@/store/filtersStore';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';
import LocationPicker from '@/components/forms/LocationPicker';

interface FilterProps {
    onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ onClose }) => {
    const {
        categories,
        categoryFilter,
        setCategoryFilter,
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        eventType,
        setEventType,
        locationFilter,
        setLocationFilter,
        dateFilter,
        setDateFilter,
    } = useFiltersStore();

    const handleReset = () => {
        setCategoryFilter('All');
        setMinPrice(0);
        setMaxPrice(500);
        setEventType('Any');
        setLocationFilter('');
        setDateFilter('Upcoming');
    };

    return (
        <Container className='flex flex-col gap-6 p-6'>
            <LocationPicker value={locationFilter} onChange={setLocationFilter} />
            
            <Typography variant='h6' className='self-start text-text-1 dark:text-white font-poppins font-semibold'>
                Date
            </Typography>
            <Stack
                direction='row'
                spacing={1}
                flexWrap='wrap'
                useFlexGap
                alignItems='flex-start'
                justifyContent='flex-start'
                rowGap={1}
            >
                {['Upcoming', 'All', 'Today', 'Tomorrow', 'This Week', 'Past'].map((date) => (
                    <Chip
                        size='small'
                        key={date}
                        label={date}
                        clickable
                        color={dateFilter === date ? 'primary' : 'default'}
                        onClick={() => setDateFilter(date as any)}
                        className={`cursor-pointer text-xs font-poppins rounded-lg ${
                            dateFilter === date 
                                ? 'bg-primary-1 text-white' 
                                : 'bg-gray-100 dark:bg-gray-700 text-text-2 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        sx={{
                            height: '28px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '0.5rem',
                            '& .MuiChip-label': {
                                px: 1.5
                            }
                        }}
                    />
                ))}
            </Stack>
            
            <Typography variant='h6' className='self-start text-text-1 dark:text-white font-poppins font-semibold'>
                Category
            </Typography>
            <Stack
                direction='row'
                spacing={1}
                flexWrap='wrap'
                useFlexGap
                alignItems='flex-start'
                justifyContent='flex-start'
                rowGap={1}
            >
                {categories.map(({ name, iconName }) => (
                    <Chip
                        size='small'
                        key={name}
                        label={name}
                        icon={<span className='text-xs'>{getCategoryIcon(iconName)}</span>}
                        clickable
                        color={categoryFilter === name ? 'primary' : 'default'}
                        onClick={() => setCategoryFilter(categoryFilter === name ? 'All' : name)}
                        className={`cursor-pointer text-xs font-poppins rounded-lg ${
                            categoryFilter === name 
                                ? 'bg-primary-1 text-white' 
                                : 'bg-gray-100 dark:bg-gray-700 text-text-2 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        sx={{
                            height: '28px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '0.5rem',
                            '& .MuiChip-label': {
                                px: 1.5
                            },
                            '& .MuiChip-icon': {
                                fontSize: '0.75rem',
                                ml: 0.5
                            }
                        }}
                    />
                ))}
            </Stack>
            <Typography variant='h6' className='self-start text-text-1 dark:text-white font-poppins font-semibold'>
                Price Range
            </Typography>
            <Slider
                value={[minPrice, maxPrice]}
                onChange={(_, newValue) => {
                    const [newMin, newMax] = newValue as number[];
                    setMinPrice(newMin);
                    setMaxPrice(newMax);
                }}
                valueLabelDisplay='on'
                min={0}
                max={500}
                className='text-primary'
                sx={{
                    '& .MuiSlider-valueLabel': {
                        fontSize: 8,
                        fontWeight: 'normal',
                        borderRadius: '8px',
                        backgroundColor: '#5D9BFC',
                    },
                    '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16,
                        backgroundColor: '#fff',
                        border: '4px solid #5D9BFC',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                }}
            />
            <Typography variant='h6' className='self-start text-text-1 dark:text-white font-poppins font-semibold'>
                Event Type
            </Typography>
            <Stack direction={'row'} spacing={1} flexWrap='wrap' useFlexGap rowGap={1} className='self-start'>
                <Button
                    variant={eventType === 'Events' ? 'contained' : 'outlined'}
                    onClick={() => setEventType('Events')}
                                                   className={`h-8 whitespace-nowrap px-3 font-poppins text-xs font-medium ${
                                   eventType === 'Events'
                                       ? 'bg-primary-1 text-white'
                                       : 'border-gray-300 dark:border-gray-600 text-text-2 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                               }`}
                    sx={{ minWidth: 'auto' }}
                >
                    Events
                </Button>
                <Button
                    variant={eventType === 'Meetups' ? 'contained' : 'outlined'}
                    onClick={() => setEventType('Meetups')}
                                                   className={`h-8 whitespace-nowrap px-3 font-poppins text-xs font-medium ${
                                   eventType === 'Meetups'
                                       ? 'bg-primary-1 text-white'
                                       : 'border-gray-300 dark:border-gray-600 text-text-2 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                               }`}
                    sx={{ minWidth: 'auto' }}
                >
                    Meetups
                </Button>
                <Button
                    variant={eventType === 'Any' ? 'contained' : 'outlined'}
                    onClick={() => setEventType('Any')}
                                                   className={`h-8 whitespace-nowrap px-3 font-poppins text-xs font-medium ${
                                   eventType === 'Any'
                                       ? 'bg-primary-1 text-white'
                                       : 'border-gray-300 dark:border-gray-600 text-text-2 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                               }`}
                    sx={{ minWidth: 'auto' }}
                >
                    All Types
                </Button>
            </Stack>
            <Stack direction={'row'} spacing={2} className='mt-8 w-full' sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', pt: 3 }}>
                                           <Button
                               variant='outlined'
                               className='h-11 font-poppins flex-1 border-gray-300 dark:border-gray-600 text-text-2 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                               onClick={handleReset}
                           >
                               Reset
                           </Button>
                           <Button
                               variant='contained'
                               className='h-11 flex-1 bg-primary-1 font-poppins hover:bg-primary-1/90'
                               onClick={onClose}
                           >
                               Apply Filters
                           </Button>
            </Stack>
        </Container>
    );
};

export default Filter;
