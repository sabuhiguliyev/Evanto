import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Container from '../components/layout/Container';
import Logo from '@/components/icons/logo.svg?react';

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding/1');
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container className='bg-primary-1'>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Logo />
            </Box>
            <Typography className={'font-header font-bold text-white'}>Welcome our event mobile app </Typography>
        </Container>
    );
}
