import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import Container from '@/components/layout/Container';
import { useDarkMode } from '@/contexts/DarkModeContext';
import EventCard from '@/components/cards/EventCard';

// Sample data for testing
const sampleEvent = {
    id: '1',
    type: 'event',
    title: 'Sample Event Title',
    description: 'This is a sample event description for testing purposes.',
    category: 'Technology',
    location: 'New York, USA',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 86400000).toISOString(),
    ticket_price: 25,
    image: '/illustrations/eventcard.png',
    online: false,
    featured: true,
    user_id: 'user1',
    member_count: 15,
    member_avatars: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3'
    ]
};

const sampleMeetup = {
    id: '2',
    type: 'meetup',
    title: 'Sample Meetup Title',
    description: 'This is a sample meetup description for testing purposes.',
    category: 'Networking',
    location: 'Online',
    start_date: new Date().toISOString(),
    meetup_link: 'https://meetup.com/sample',
    image: '/illustrations/eventcard.png',
    online: true,
    featured: false,
    user_id: 'user2',
    member_count: 8,
    member_avatars: [
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5'
    ]
};

function Test() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
        <>
            <Box className='absolute top-4 right-4 z-10 flex gap-2'>
      <Button 
                    onClick={toggleDarkMode}
                    size="small"
                    variant="outlined"
                    className={`text-xs ${isDarkMode ? 'text-white border-gray-600' : 'text-gray-700 border-gray-300'}`}
                >
                    {isDarkMode ? '☀️' : '🌙'}
      </Button>
            </Box>
            
            <Container className={`justify-start no-scrollbar ${isDarkMode ? 'bg-[#1C2039]' : 'bg-white'}`}>
                <Typography variant='h4' className={`mb-6 font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Event Card Variants
              </Typography>
              
                {/* Vertical Card */}
                <Box className='mb-8'>
                    <Typography variant='h6' className={`mb-4 font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Vertical Card
                    </Typography>
                    <Box className='flex justify-center'>
                        <EventCard
                            item={sampleEvent}
                            variant='vertical'
                            actionType='join'
                        />
                    </Box>
                </Box>

                {/* Vertical Compact Card */}
                <Box className='mb-8'>
                    <Typography variant='h6' className={`mb-4 font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Vertical Compact Card
                    </Typography>
                    <Box className='flex justify-center'>
                        <EventCard
                            item={sampleEvent}
                            variant='vertical-compact'
                            actionType='favorite'
                        />
                    </Box>
                </Box>

                {/* Horizontal Card */}
                <Box className='mb-8'>
                    <Typography variant='h6' className={`mb-4 font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Horizontal Card
                    </Typography>
                    <Box className='flex justify-center'>
                        <EventCard
                            item={sampleEvent}
                            variant='horizontal'
                            actionType='favorite'
                        />
                    </Box>
            </Box>

                {/* Horizontal Compact Card */}
                <Box className='mb-8'>
                    <Typography variant='h6' className={`mb-4 font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Horizontal Compact Card
      </Typography>
                    <Box className='flex justify-center'>
                        <EventCard
                            item={sampleEvent}
                            variant='horizontal-compact'
                            actionType='join'
                        />
                    </Box>
    </Box>
            </Container>
        </>
  );
}

export default Test;