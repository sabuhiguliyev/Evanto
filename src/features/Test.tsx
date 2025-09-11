import React from 'react';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import EventCard from '@/components/cards/EventCard';

function Test() {
  const { isDarkMode } = useDarkMode();

  const sampleEvent = {
    id: 1,
    title: 'React Conference 2024',
    start_date: '2024-03-15T09:00:00Z',
    end_date: '2024-03-15T17:00:00Z',
    location: 'San Francisco, CA',
    price: 299,
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    organizer_name: 'Tech Events Inc',
    attendees: ['user1', 'user2', 'user3'],
    category: 'Technology',
    type: 'event' as const,
    description: 'Learn about the latest in React development',
    max_attendees: 100,
    current_attendees: 45
  };

  return (
    <>
      <Box className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </Box>

      <Container>
        <Typography variant='h4' className={`mb-6 font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Card Variants
        </Typography>

        <Typography variant='h6' className={`mb-4 font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Vertical Card
        </Typography>
        <EventCard 
          item={sampleEvent} 
          variant="vertical" 
          className="mb-8"
        />

        <Typography variant='h6' className={`mb-4 font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Vertical Compact Card
        </Typography>
        <EventCard 
          item={sampleEvent} 
          variant="vertical-compact" 
          className="mb-8"
        />

        <Typography variant='h6' className={`mb-4 font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Horizontal Card
        </Typography>
        <EventCard 
          item={sampleEvent} 
          variant="horizontal" 
          className="mb-8"
        />

        <Typography variant='h6' className={`mb-4 font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Horizontal Compact Card
        </Typography>
        <EventCard 
          item={sampleEvent} 
          variant="horizontal-compact" 
          className="mb-8"
        />
      </Container>
    </>
  );
}

export default Test;