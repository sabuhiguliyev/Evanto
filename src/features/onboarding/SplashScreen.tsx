import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/material';
import Logo from '@/assets/icons/logo.svg?react';
import LogoDark from '@/assets/icons/logo-dark.svg?react';
import { useDarkMode } from '@/contexts/DarkModeContext';

export default function SplashScreen() {
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding/step1');
        }, 2500); // 2.5 seconds - more reasonable for splash screen

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container className="relative min-h-screen">
            
            <Box className='flex-1 flex items-center justify-center'>
                {isDarkMode ? (
                    <Logo className="w-24 h-24" />
                ) : (
                    <LogoDark className="w-24 h-24" />
                )}
            </Box>
            <Typography variant="h5" className="font-jakarta font-bold text-center text-primary">
                Welcome our event mobile app
            </Typography>
        </Container>
    );
}
