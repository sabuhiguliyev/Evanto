import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Container from '@/components/layout/Container';
import Welcome1 from '/illustrations/onboarding1.png';
import { useNavigate } from 'react-router-dom';

function WelcomeStep1() {
    const navigate = useNavigate();
    
    return (
        <Container className='justify-center'>
            <Box className='text-center'>
                <img src={Welcome1} alt='Welcome' className='mx-auto mb-8 h-64 w-64' />
                <Typography variant='h4' className='mb-4'>
                    Welcome to Evanto
                </Typography>
                <Typography variant='body1' className='mb-8 text-text-3'>
                    Your journey to amazing events starts here
                </Typography>
                <Button
                    variant='contained'
                    className='bg-primary-1 text-white'
                    onClick={() => navigate('/welcome/step2')}
                >
                    Continue
                </Button>
            </Box>
        </Container>
    );
}

export default WelcomeStep1;
