import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { Container } from '@mui/material';
import Onboarding3 from '/illustrations/onboarding3.png';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

function OnboardingStep3() {
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();
    
    return (
        <Container className="relative min-h-screen">
            {/* Theme toggle for testing */}
            <Box className='absolute top-4 right-4'>
                <ThemeToggle />
            </Box>
            
            {/* Main content area */}
            <Box className='flex-1 flex flex-col justify-center w-full'>
                {/* Illustration */}
                <Box className='flex justify-center mb-8 w-full'>
                    <img src={Onboarding3} alt='Onboarding' className='h-64 w-64' />
                </Box>
                
                {/* Heading */}
                <Typography 
                    className={`text-h4 font-poppins font-bold mb-4 text-left w-full ${
                        isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'
                    }`}
                >
                    Seize every moment
while it's still in your
grasp.
                </Typography>
                
                {/* Body text */}
                <Typography 
                    className={`text-body font-poppins mb-6 text-left w-full ${
                        isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
                    }`}
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
                <Box 
                    className='relative w-button-primary h-button-primary bg-primary rounded-button-primary cursor-pointer mx-auto mb-4'
                    onClick={() => navigate('/welcome')}
                >
                {/* Arrow container */}
                <Box 
                    className='absolute flex items-center justify-center bg-white bg-opacity-15 rounded-full'
                    style={{
                        left: '5px',
                        top: '5px',
                        width: '80px',
                        height: '40px',
                        padding: '14px 28px',
                        gap: '4px'
                    }}
                >
                    {/* Three arrow elements with decreasing opacity */}
                    <Box 
                        className='border border-white rounded-sm'
                        style={{
                            width: '6.5px',
                            height: '13px',
                            opacity: 1.0
                        }}
                    />
                    <Box 
                        className='border border-white rounded-sm'
                        style={{
                            width: '5.5px',
                            height: '11px',
                            opacity: 0.7
                        }}
                    />
                    <Box 
                        className='border border-white rounded-sm'
                        style={{
                            width: '4.5px',
                            height: '9px',
                            opacity: 0.4
                        }}
                    />
                </Box>
                
                {/* Title text */}
                <Box 
                    className='absolute flex items-center justify-center text-white font-bold'
                    style={{
                        width: '84px',
                        height: '19px',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '15px',
                        lineHeight: '19px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1
                    }}
                >
                    Let's Go!
                </Box>
            </Box>
                
                {/* Skip link */}
                <Box className='text-center w-full'>
                    <Typography 
                        className={`text-caption font-poppins cursor-pointer ${
                            isDarkMode ? 'text-primary' : 'text-primary'
                        }`}
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
