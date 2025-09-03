import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Container from '@/components/layout/Container';
import Onboarding3 from '/illustrations/onboarding3.png';
import { useNavigate } from 'react-router-dom';

function OnboardingStep3() {
    const navigate = useNavigate();
    
    return (
        <Container className='justify-center'>
            <Box className='text-center'>
                <img src={Onboarding3} alt='Onboarding' className='mx-auto mb-8 h-64 w-64' />
                <Typography variant='h4' className='mb-4'>
                    Connect & Network
                </Typography>
                <Typography variant='body1' className='mb-8 text-text-3'>
                    Meet new people and build meaningful connections
                </Typography>
                <Button
                    variant='contained'
                    className='bg-primary-1 text-white'
                    onClick={() => navigate('/welcome/step1')}
                >
                    Let's Go!
                </Button>
            </Box>
        </Container>
    );
}

export default OnboardingStep3;
