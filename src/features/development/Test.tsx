import React from 'react';
import { 
  Box, 
  Typography, 
  Paper
} from '@mui/material';
import { EventCard } from '@/components/cards/EventCard';
import { RefactoredEventCard } from './RefactoredEventCard';
import Home from '@/features/Home';
import SignIn from '@/features/auth/SignIn';

const Test: React.FC = () => {
  return (
    <Box className="p-6 space-y-8">
      <Typography variant="h4" className="text-center mb-8">
        Component Refactoring Test
      </Typography>
      
      {/* Real App Component Example */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Home Component (Real App Component)</Typography>
        <Typography className="text-sm text-gray-600 mb-6">
          This is the actual Home component from your app. Please review and provide feedback on styling consistency.
        </Typography>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Typography className="text-yellow-800 mb-2">
              ⚠️ Home component may have dependencies that cause issues in test environment
            </Typography>
            <Typography className="text-sm text-yellow-700">
              If you see a white page, the Home component likely has missing context providers or store dependencies.
              Please check the browser console for errors.
            </Typography>
          </div>
          <div className="mt-4">
            <Home />
          </div>
        </div>
      </Paper>

      {/* Alternative: SignIn Component */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">SignIn Component (Alternative Example)</Typography>
        <Typography className="text-sm text-gray-600 mb-6">
          This is the SignIn component which might have fewer dependencies and work better in the test environment.
        </Typography>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <SignIn />
        </div>
      </Paper>

      {/* Component Refactoring Example */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Component Refactoring Example</Typography>
        <Typography className="text-sm text-gray-600 mb-6">
          Before and after comparison of EventCard component using the new design system
        </Typography>
        
        <div className="space-y-8">
          {/* Original Component */}
          <div>
            <Typography variant="h6" className="mb-4 text-red-600">Original EventCard (Before)</Typography>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <Typography className="text-sm text-red-700 mb-4">
                Issues: Hardcoded colors, inconsistent spacing, custom CSS classes, mixed styling approaches
              </Typography>
              <div className="flex gap-4">
                <EventCard
                  item={{
                    id: '1',
                    type: 'event',
                    title: 'Music Festival 2024',
                    description: 'Amazing music festival',
                    category: 'Music',
                    location: 'Central Park, NY',
                    start_date: '2024-12-25',
                    end_date: '2024-12-25',
                    ticket_price: 75,
                    event_image: 'https://via.placeholder.com/300x200',
                    member_avatars: ['https://via.placeholder.com/40', 'https://via.placeholder.com/40'],
                    member_count: 25,
                    user_id: 'user1',
                    featured: false,
                    online: false
                  }}
                  variant="vertical"
                  actionType="join"
                />
                <EventCard
                  item={{
                    id: '2',
                    type: 'event',
                    title: 'Tech Conference',
                    description: 'Latest tech trends',
                    category: 'Technology',
                    location: 'Convention Center',
                    start_date: '2024-12-30',
                    end_date: '2024-12-30',
                    ticket_price: 150,
                    event_image: 'https://via.placeholder.com/300x200',
                    member_avatars: ['https://via.placeholder.com/40'],
                    member_count: 12,
                    user_id: 'user2',
                    featured: false,
                    online: false
                  }}
                  variant="vertical-compact"
                  actionType="favorite"
                />
              </div>
            </div>
          </div>

          {/* Refactored Component */}
          <div>
            <Typography variant="h6" className="mb-4 text-green-600">Refactored EventCard (After)</Typography>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <Typography className="text-sm text-green-700 mb-4">
                Improvements: Uses design system colors, consistent typography, MUI defaults, Tailwind utilities, proper button styling
              </Typography>
              <div className="flex gap-4">
                <RefactoredEventCard
                  item={{
                    id: '1',
                    type: 'event',
                    title: 'Music Festival 2024',
                    description: 'Amazing music festival',
                    category: 'Music',
                    location: 'Central Park, NY',
                    start_date: '2024-12-25',
                    end_date: '2024-12-25',
                    ticket_price: 75,
                    event_image: 'https://via.placeholder.com/300x200',
                    member_avatars: ['https://via.placeholder.com/40', 'https://via.placeholder.com/40'],
                    member_count: 25,
                    user_id: 'user1',
                    featured: false,
                    online: false
                  }}
                  variant="vertical"
                  actionType="join"
                />
                <RefactoredEventCard
                  item={{
                    id: '2',
                    type: 'event',
                    title: 'Tech Conference',
                    description: 'Latest tech trends',
                    category: 'Technology',
                    location: 'Convention Center',
                    start_date: '2024-12-30',
                    end_date: '2024-12-30',
                    ticket_price: 150,
                    event_image: 'https://via.placeholder.com/300x200',
                    member_avatars: ['https://via.placeholder.com/40'],
                    member_count: 12,
                    user_id: 'user2',
                    featured: false,
                    online: false
                  }}
                  variant="vertical-compact"
                  actionType="favorite"
                />
              </div>
            </div>
          </div>

          {/* Key Improvements */}
          <div>
            <Typography variant="h6" className="mb-4">Key Improvements</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Typography variant="h6" className="text-blue-800 mb-2">Styling Consistency</Typography>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Uses design system colors (#5D9BFC, #1C2039, etc.)</li>
                  <li>• Consistent typography (Poppins for text, Jakarta for buttons)</li>
                  <li>• Proper spacing using Tailwind utilities</li>
                  <li>• MUI theme defaults with minimal overrides</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Typography variant="h6" className="text-purple-800 mb-2">Code Quality</Typography>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Removed hardcoded colors and magic numbers</li>
                  <li>• Simplified className strings</li>
                  <li>• Better component structure</li>
                  <li>• Consistent button styling from Figma specs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* Design System Reference Link */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Design System Reference</Typography>
        <Typography className="text-sm text-gray-600 mb-4">
          Complete design system reference has been saved to a separate file for future use.
        </Typography>
        <Typography className="text-sm text-blue-600">
          📁 File: <code>src/features/development/DesignSystemReference.tsx</code>
        </Typography>
        <Typography className="text-sm text-gray-500 mt-2">
          This file contains all design system elements: colors, typography, buttons, navigation, components, and spacing examples.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Test;
