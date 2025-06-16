import Container from '../components/layout/Container';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '../components/navigation/Link';
import { useNavigate } from 'react-router-dom';

function CheckEmail() {
    const navigate = useNavigate();
    function handleClick() {}
    return (
        <Container>
            <img src='../../public/illustrations/checkemail.png' alt='Check email illustration' className={'mb-20'} />
            <Box className={'flex flex-col gap-5 self-start'}>
                <Typography variant={'h2'}>Check your email</Typography>
                <Typography variant={'body2'}>We have sent a password recover instructions to your email.</Typography>
                <Button variant={'contained'} onClick={() => navigate('/reset-password')}>
                    Go to Verification
                </Button>
                <Link href={'/signin'} className={'text-center text-xs font-normal text-text-4'}>
                    Skip, I&#39;ll confirm later
                </Link>
                <Typography variant={'body2'}>
                    Did not receive the email? Check your Spam folder or{' '}
                    <Link href={'/forgot-password'}>try another email address.</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default CheckEmail;
