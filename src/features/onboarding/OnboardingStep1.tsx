import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Button } from '@mui/material';
import { Container } from '@mui/material';
import Onboarding1 from '/illustrations/onboarding1.png';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '@/contexts/DarkModeContext';

function OnboardingStep1() {
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();
    
    return (
        <Container className="relative min-h-screen">
            
            {/* Main content area */}
            <Box className='flex-1 flex flex-col justify-center w-full'>
                {/* Illustration */}
                <Box className='flex justify-center mb-8 w-full'>
                    <img src={Onboarding1} alt='Onboarding' className='h-48 w-48' />
                </Box>
                
                {/* Heading */}
                <Typography 
                    variant="h4"
                    className="font-jakarta font-bold mb-4 text-left w-full text-primary"
                >
                    This is the perfect time to visit your favorite event!
                </Typography>
                
                {/* Body text */}
                <Typography 
                    variant="body1"
                    className="font-jakarta mb-6 text-left w-full text-muted"
                >
                    Take stock of your performance and inspire yourself to reach even greater heights.
                </Typography>
                
                {/* MUI Stepper - 3 steps total */}
                <Box className='flex justify-center mb-8 w-full'>
                    <Stepper 
                        activeStep={0} 
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
                    onClick={() => navigate('/onboarding/step2')}
                    className="bg-primary text-white font-jakarta font-semibold mb-4 h-12"
                >
                    Got it, Next
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

export default OnboardingStep1;
