import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Container from '@/components/layout/Container';
import Onboarding2 from '/illustrations/onboarding2.png';
import { useNavigate } from 'react-router-dom';

function OnboardingStep2() {
    const navigate = useNavigate();
    
    return (
        <Container className='justify-center'>
            <Box className='text-center'>
                <img src={Onboarding2} alt='Onboarding' className='mx-auto mb-8 h-64 w-64' />
                <Typography variant='h4' className='mb-4'>
                    Create Your Own Events
                </Typography>
                <Typography variant='body1' className='mb-8 text-text-3'>
                    Host amazing events and meetups for your community
                </Typography>
                <Button
                    variant='contained'
                    className='bg-primary-1 text-white'
                    onClick={() => navigate('/onboarding/step3')}
                >
                    Continue
                </Button>
            </Box>
        </Container>
    );
}

export default OnboardingStep2;
