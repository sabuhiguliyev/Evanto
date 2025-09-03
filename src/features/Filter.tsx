import React from 'react';
import { Button, Chip, Container, Slider, Stack, Typography } from '@mui/material';

import { useAppStore } from '@/store/appStore';
import { getCategoryIcon } from '@/utils/iconMap';
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
        meetupType,
        setMeetupType,
        meetupDay,
        setMeetupDay,
        locationFilter,
        setLocationFilter,
    } = useAppStore();

    const handleReset = () => {
        setCategoryFilter('All');
        setMinPrice(0);
        setMaxPrice(500);
        setMeetupType('Any');
        setMeetupDay('Any');
        setLocationFilter('');
        setMeetupDay('Any');
    };

    return (
        <Container className='flex h-[665px] flex-col gap-4 rounded-t-3xl border-2 p-6'>
            <Typography variant='h4' className='mb-6'>
                Filter
            </Typography>
            <LocationPicker value={locationFilter} onChange={setLocationFilter} />
            <Typography variant='h6' className='-mb-2 self-start'>
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
                        size='medium'
                        key={name}
                        label={name}
                        icon={<span>{getCategoryIcon(iconName)}</span>}
                        clickable
                        color={categoryFilter === name ? 'primary' : 'default'}
                        onClick={() => setCategoryFilter(categoryFilter === name ? 'All' : name)}
                        className='cursor-pointer p-1'
                    />
                ))}
            </Stack>
            <Typography variant='h4' className='mb-4 mt-4 self-start'>
                Ticket Price Range
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
                        borderRadius: '30px',
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
            <Typography variant='h6' className='-mb-2 self-start'>
                Meetup Type
            </Typography>
            <Stack direction={'row'} spacing={2} className='self-start'>
                <Button
                    variant={meetupType === 'In Person' ? 'contained' : 'outlined'}
                    onClick={() => setMeetupType('In Person')}
                    className='h-9 whitespace-nowrap p-3 font-poppins text-xs font-medium text-text-muted'
                >
                    In Person
                </Button>
                <Button
                    variant={meetupType === 'Online' ? 'contained' : 'outlined'}
                    onClick={() => setMeetupType('Online')}
                    className='h-9 whitespace-nowrap p-3 font-poppins text-xs font-medium text-text-muted'
                >
                    Online
                </Button>
                <Button
                    variant={meetupType === 'Any' ? 'contained' : 'outlined'}
                    onClick={() => setMeetupType('Any')}
                    className='h-9 whitespace-nowrap p-3 font-poppins text-xs font-medium text-text-muted'
                >
                    Any Type
                </Button>
            </Stack>
            <Typography variant='h6' className='-mb-2 self-start'>
                Meetup Day
            </Typography>
            <Stack direction={'row'} spacing={2} className='self-start'>
                <Button
                    variant={meetupDay === 'Today' ? 'contained' : 'outlined'}
                    onClick={() => setMeetupDay('Today')}
                    className='h-9 whitespace-nowrap p-3 font-poppins text-xs font-medium text-text-muted'
                >
                    Today
                </Button>
                <Button
                    variant={meetupDay === 'Tomorrow' ? 'contained' : 'outlined'}
                    onClick={() => setMeetupDay('Tomorrow')}
                    className='h-9 whitespace-nowrap p-3 font-poppins text-xs font-medium text-text-muted'
                >
                    Tomorrow
                </Button>
                <Button
                    variant={meetupDay === 'This Week' ? 'contained' : 'outlined'}
                    onClick={() => setMeetupDay('This Week')}
                    className='h-9 whitespace-nowrap p-3 font-poppins text-xs font-medium'
                >
                    This Week
                </Button>
            </Stack>{' '}
            <Stack direction={'row'} spacing={2} className='mt-6 w-full'>
                <Button variant='outlined' className='h-12 bg-primary/10 font-jakarta' onClick={handleReset}>
                    Reset
                </Button>
                <Button variant='contained' className='h-12' onClick={onClose}>
                    Done
                </Button>
            </Stack>
        </Container>
    );
};

export default Filter;
