import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Button } from '@mui/material';
import { Container } from '@mui/material';
import Onboarding3 from '/illustrations/onboarding3.png';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '@/contexts/DarkModeContext';

function OnboardingStep3() {
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();
    
    return (
        <Container className="relative min-h-screen">
            
            {/* Main content area */}
            <Box className='flex-1 flex flex-col justify-center w-full'>
                {/* Illustration */}
                <Box className='flex justify-center mb-8 w-full'>
                    <img src={Onboarding3} alt='Onboarding' className='h-48 w-48' />
                </Box>
                
                {/* Heading */}
                <Typography 
                    variant="h4"
                    className="font-jakarta font-bold mb-4 text-left w-full text-primary"
                >
                    Seize every moment
while it's still in your
grasp.
                </Typography>
                
                {/* Body text */}
                <Typography 
                    variant="body1"
                    className="font-jakarta mb-6 text-left w-full text-muted"
                >
                    Now it's very easy to create, host and manage your event with collaboration.
                </Typography>
                
                {/* MUI Stepper - 3 steps total */}
                <Box className='flex justify-center mb-8 w-full'>
                <Stepper 
                    activeStep={2} 
                    alternativeLabel
                    sx={{
                        '& .MuiStepLabel-root': {
                            cursor: 'pointer',
                        },
                        '& .MuiStepLabel-iconContainer': {
                            cursor: 'pointer',
                        }
                    }}
                >
                    <Step onClick={() => navigate('/onboarding/step1')}>
                        <StepLabel />
                    </Step>
                    <Step onClick={() => navigate('/onboarding/step2')}>
                        <StepLabel />
                    </Step>
                    <Step onClick={() => navigate('/onboarding/step3')}>
                        <StepLabel />
                    </Step>
                </Stepper>
                </Box>
            </Box>
            
            {/* Bottom section with button and skip link */}
            <Box className='w-full pb-8'>
                {/* Primary button */}
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/welcome')}
                    className="bg-primary text-white font-jakarta font-semibold mb-4 h-12"
                >
                    Let's Go!
                </Button>
            
                {/* Skip link */}
                <Box className='text-center w-full'>
                    <Typography 
                        variant="caption"
                        className="font-jakarta cursor-pointer text-primary"
                        onClick={() => navigate('/home')}
                    >
                        Skip
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default OnboardingStep3;
