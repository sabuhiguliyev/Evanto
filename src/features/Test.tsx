import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import BottomAppBar from '@/components/navigation/BottomAppBar';

function Test() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Box className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </Box>

      <Container sx={{ border: '2px solid red', position: 'relative', minHeight: '100vh' }}>
        <Typography variant="h6" className="text-center py-8">
          BottomAppBar Functionality Test
        </Typography>
        
        <Typography variant="body1" className="text-center py-4">
          Test the navigation by clicking on different tabs below:
        </Typography>
        
        <Box className="space-y-4 p-4">
          <Typography variant="body2" className="text-center">
            • Click "Home" to navigate to /home
          </Typography>
          <Typography variant="body2" className="text-center">
            • Click "Favorites" to navigate to /favorites  
          </Typography>
          <Typography variant="body2" className="text-center">
            • Click the blue discovery button to navigate to /search
          </Typography>
          <Typography variant="body2" className="text-center">
            • Click "Tickets" to navigate to /tickets
          </Typography>
          <Typography variant="body2" className="text-center">
            • Click "Profile" to navigate to /profile
          </Typography>
        </Box>
        
        <BottomAppBar />
      </Container>
    </>
  );
}

export default Test;