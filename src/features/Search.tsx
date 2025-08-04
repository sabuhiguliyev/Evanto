import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, IconButton, TextField, InputAdornment, ToggleButton } from '@mui/material';
import {
    KeyboardArrowLeft,
    SearchOutlined,
    TuneOutlined,
    MoreVertOutlined,
    ListOutlined,
    GridViewOutlined,
} from '@mui/icons-material';
import { z } from 'zod';
import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import EventCard from '@/components/cards/EventCard';
import useEventStore from '@/store/eventStore';
import { eventSchema, meetupSchema } from '@/utils/schemas';
import useItemsQuery from '@/hooks/useItemsQuery';

type EventType = z.infer<typeof eventSchema>;
type MeetupType = z.infer<typeof meetupSchema>;
type UnifiedItem = (EventType & { type: 'event' }) | (MeetupType & { type: 'meetup' });

function Search() {
    const [cardVariant, setCardVariant] = useState<'horizontal' | 'vertical-compact'>('horizontal');
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, categories, filteredAndSearchedItems } =
        useEventStore();
    const items = filteredAndSearchedItems();
    useItemsQuery();

    const renderEventCard = (item: UnifiedItem) => (
        <EventCard
            key={item.id}
            item={item}
            variant={cardVariant}
            onAction={() => console.log(item.type === 'event' ? 'Join Event' : 'Join Meetup')}
        />
    );

    return (
        <Container className='relative justify-start'>
            <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton onClick={() => navigate(-1)} className='text-text-3' sx={{ border: '1px solid #eee' }}>
                        <KeyboardArrowLeft />
                    </IconButton>
                    <Typography variant='h4'>Search</Typography>
                    <IconButton className='text-text-3' sx={{ border: '1px solid #eee' }}>
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
                    <IconButton size='large' disableRipple className='bg-primary-1 text-white'>
                        <TuneOutlined />
                    </IconButton>
                </Box>
                <Stack direction='row' spacing={1} mb={2}>
                    {categories.map(({ icon, name }) => (
                        <ToggleButton
                            key={name}
                            value={name}
                            selected={categoryFilter === name}
                            onChange={() => setCategoryFilter(name)}
                            className='h-12 w-12 flex-col rounded-full border border-[#EEE] text-[8px] [&.Mui-selected]:bg-primary-1 [&.Mui-selected]:text-white'
                        >
                            {icon}
                            <span>{name}</span>
                        </ToggleButton>
                    ))}
                </Stack>
                <Box className='flex w-full items-center justify-between'>
                    <Typography variant='body2' className='text-primary-1'>
                        {filteredAndSearchedItems().length} results found
                    </Typography>
                    <Stack direction='row'>
                        <IconButton
                            size='small'
                            onClick={() => setCardVariant('horizontal')}
                            className={cardVariant === 'horizontal' ? 'text-primary-1' : 'text-text-3'}
                        >
                            <ListOutlined />
                        </IconButton>
                        <IconButton
                            size='small'
                            onClick={() => setCardVariant('vertical-compact')}
                            className={cardVariant === 'vertical-compact' ? 'text-primary-1' : 'text-text-3'}
                        >
                            <GridViewOutlined />
                        </IconButton>
                    </Stack>
                </Box>
                <Box
                    className={`no-scrollbar mb-4 w-full gap-4 overflow-y-auto ${
                        cardVariant === 'vertical-compact' ? 'grid grid-cols-2' : 'flex flex-col'
                    }`}
                >
                    {items.length > 0 ? (
                        items.map(item => renderEventCard(item as UnifiedItem))
                    ) : (
                        <Typography variant='body2' className='py-4 text-center text-gray-500'>
                            No upcoming events found.
                        </Typography>
                    )}
                </Box>
            </Box>
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
        </Container>
    );
}

export default Search;
