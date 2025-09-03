import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Container from '@/components/layout/Container';
import Onboarding1 from '/illustrations/onboarding1.png';
import { useNavigate } from 'react-router-dom';

function OnboardingStep1() {
    const navigate = useNavigate();
    
    return (
        <Container className='justify-center'>
            <Box className='text-center'>
                <img src={Onboarding1} alt='Onboarding' className='mx-auto mb-8 h-64 w-64' />
                <Typography variant='h4' className='mb-4'>
                    Welcome to Evanto
                </Typography>
                <Typography variant='body1' className='mb-8 text-text-3'>
                    Discover amazing events and meetups happening around you
                </Typography>
                <Button
                    variant='contained'
                    className='bg-primary-1 text-white'
                    onClick={() => navigate('/onboarding/step2')}
                >
                    Get Started
                </Button>
            </Box>
        </Container>
    );
}

export default OnboardingStep1;
