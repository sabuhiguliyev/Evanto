import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import EventCard from '@/components/cards/EventCard';
import { useDataStore } from '@/store/dataStore';
import useItemsQuery from '@/hooks/useItemsQuery';

function Test() {
    const { items } = useDataStore();
    useItemsQuery();
    
    // Create mock data with rich information for testing
    const sampleItem = {
        id: 'test-event-1',
        type: 'event' as const,
        title: 'Amazing Tech Conference 2024',
        description: 'Join us for the most exciting tech conference of the year with amazing speakers and networking opportunities.',
        category: 'Technology',
        location: 'San Francisco Convention Center',
        start_date: new Date('2024-03-15T09:00:00'),
        end_date: new Date('2024-03-15T18:00:00'),
        ticket_price: 150,
        event_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        featured: true,
        online: false,
        member_count: 50,
        member_avatars: [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        ],
        user_id: 'user-123',
        created_at: new Date().toISOString()
    };
    
    const variants = [
        { key: 'vertical', label: 'Vertical' },
        { key: 'horizontal', label: 'Horizontal' },
        { key: 'vertical-compact', label: 'Vertical Compact' },
        { key: 'horizontal-compact', label: 'Horizontal Compact' }
    ] as const;

    return (
        <Container className='justify-start'>
            <Typography variant='h4' className='mb-6'>
                EventCard Variants
            </Typography>
            
            {sampleItem ? (
                <Box className='space-y-8 w-full'>
                    {variants.map(({ key, label }) => (
                        <Box key={key} className='w-full'>
                            <Typography variant='h6' className='mb-4 text-center font-bold text-blue-600'>
                                {label} Variant
                            </Typography>
                            <EventCard
                                item={sampleItem}
                                variant={key}
                                actionType='favorite'
                                onAction={(e) => {
                                    console.log('Action clicked:', key, e);
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant='body2' className='text-center text-red-500'>
                    No data to display
                </Typography>
            )}
        </Container>
    );
}

export default Test;
