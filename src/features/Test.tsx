import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Container from '@/components/layout/Container';
import { useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useNavigate } from 'react-router-dom';

// Clean Test component for feature review
function Test() {
  const { mode } = useTheme();
  const navigate = useNavigate();

  return (
    <Container className={`${mode === 'dark' ? 'bg-dark-bg' : 'bg-white'} min-h-screen`}>
      {/* Theme toggle for testing */}
      <Box className='absolute top-4 right-4'>
        <ThemeToggle />
      </Box>
      
      <Box className='py-8 text-center'>
        <Typography 
          variant='h4' 
          className={`font-poppins font-bold mb-8 ${
            mode === 'dark' ? 'text-dark-text-primary' : 'text-text-primary'
          }`}
        >
          Feature Review Test
        </Typography>
        
        <Typography 
          variant='body1' 
          className={`mb-8 ${
            mode === 'dark' ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}
        >
          This is a clean test environment for reviewing app features.
        </Typography>
        
        <Box className='flex flex-col gap-4 max-w-md mx-auto'>
          <Button
            variant='contained'
            onClick={() => navigate('/home')}
            className='font-jakarta h-12 text-base font-medium'
            fullWidth
          >
            Go to Home
          </Button>
          
          <Button
            variant='outlined'
            onClick={() => navigate('/onboarding/step1')}
            className='font-jakarta h-12 text-base font-medium'
            fullWidth
          >
            Test Onboarding Flow
          </Button>
          
          <Button
            variant='outlined'
            onClick={() => navigate('/auth/sign-in')}
            className='font-jakarta h-12 text-base font-medium'
            fullWidth
          >
            Test Authentication
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Test;
