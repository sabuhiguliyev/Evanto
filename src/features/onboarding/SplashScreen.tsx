import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import Logo from '@/assets/icons/logo.svg?react';
import { useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function SplashScreen() {
    const navigate = useNavigate();
    const { mode } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding/step1');
        }, 2500); // 2.5 seconds - more reasonable for splash screen

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container className={`${mode === 'dark' ? 'bg-dark-bg' : 'bg-primary'}`}>
            {/* Theme toggle for testing */}
            <Box className='absolute top-4 right-4'>
                <ThemeToggle />
            </Box>
            
            <Box className='flex-1 flex items-center justify-center'>
                <Logo />
            </Box>
            <Typography className={`font-poppins font-bold text-center ${mode === 'dark' ? 'text-white' : 'text-white'}`}>
                Welcome our event mobile app
            </Typography>
        </Container>
    );
}
