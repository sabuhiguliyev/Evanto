import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Container from '@/components/layout/Container';
import Welcome2 from '/illustrations/onboarding2.png';
import { useNavigate } from 'react-router-dom';

function WelcomeStep2() {
    const navigate = useNavigate();
    
    return (
        <Container className='justify-center'>
            <Box className='text-center'>
                <img src={Welcome2} alt='Welcome' className='mx-auto mb-8 h-64 w-64' />
                <Typography variant='h4' className='mb-4'>
                    Ready to Get Started?
                </Typography>
                <Typography variant='body1' className='mb-8 text-text-3'>
                    Create your account and start exploring events
                </Typography>
                <Button
                    variant='contained'
                    className='bg-primary-1 text-white'
                    onClick={() => navigate('/auth/sign-up')}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}

export default WelcomeStep2;
