import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/material';

import LogoDark from '@/assets/icons/logo-dark.svg?react';


export const SplashScreen = () => {
    const navigate = useNavigate();


    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding/step1');
        }, 2500); // 2.5 seconds - more reasonable for splash screen

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container className="relative min-h-screen bg-[#5D9BFC]">
            <Box className="flex flex-col items-center justify-center min-h-screen">
                <Box className="flex flex-col items-center gap-2 mb-16">

                    <LogoDark className="w-32 h-32" />

                </Box>
                <Typography
                    variant="body1"
                    className="font-medium text-white text-center absolute bottom-8"
                >
                    Welcome our event mobile app
                </Typography>
            </Box>
        </Container>
    );
};
