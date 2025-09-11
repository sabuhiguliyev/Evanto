import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/material';
import Logo from '@/assets/icons/logo.svg?react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

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
        <Container className={`${isDarkMode ? 'bg-dark-bg' : 'bg-primary'}`}>
            {/* Theme toggle for testing */}
            <Box className='absolute top-4 right-4'>
                <ThemeToggle />
            </Box>
            
            <Box className='flex-1 flex items-center justify-center'>
                <Logo />
            </Box>
            <Typography className={`font-jakarta font-bold text-center text-white`}>
                Welcome our event mobile app
            </Typography>
        </Container>
    );
}
