import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '@/utils/supabase';
import { Box, Link, Typography, Button, CircularProgress } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Container from '../../components/layout/Container';
import CircleArrowIcon from '@/components/icons/arrowcircleleft.svg?react';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function ResetPassword() {
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
    const navigate = useNavigate();
    const email = localStorage.getItem('reset_email')?.replace(/(.{2})(.*)(@.*)/, '$1***$3') || 'ex***@gmail.com';

    // Handle cooldown timer
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleVerify = async () => {
        if (otp.length !== OTP_LENGTH) return;

        setIsSubmitting(true);
        const { error } = await supabase.auth.verifyOtp({
            email: localStorage.getItem('reset_email') || '',
            token: otp,
            type: 'email',
        });

        setIsSubmitting(false);
        if (error) {
            toast.error(error.message);
        } else {
            navigate('/create-password');
        }
    };

    const handleResend = async () => {
        if (cooldown > 0) return;

        const email = localStorage.getItem('reset_email');
        if (!email) return;

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: false },
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('New OTP sent!');
            setCooldown(RESEND_COOLDOWN);
        }
    };

    return (
        <Container className='items-start justify-start'>
            <Box className='flex items-center gap-10'>
                <CircleArrowIcon onClick={() => navigate(-1)} className='cursor-pointer' />
                <Typography variant='h3'>Reset Password</Typography>
            </Box>

            <Typography className='mt-20' variant='body1'>
                Please enter the verification code we sent to your email <Link>{email}</Link>
            </Typography>

            <Box className='mt-20 flex w-full flex-col items-center gap-6'>
                <MuiOtpInput
                    value={otp}
                    onChange={setOtp}
                    length={OTP_LENGTH}
                    TextFieldsProps={{
                        sx: {
                            width: '35px',
                            height: '35px',
                            '& input': {
                                fontSize: '12px',
                                color: 'rgba(93, 155, 252, 1)',
                            },
                            '& .MuiOutlinedInput-root': {
                                '&:focus-within': { backgroundColor: '#5D9BFC45' },
                            },
                        },
                    }}
                    autoFocus
                />

                <Typography variant='body1'>
                    Didn&apos;t receive it?{' '}
                    <Link
                        onClick={handleResend}
                        sx={{
                            cursor: cooldown <= 0 ? 'pointer' : 'default',
                            pointerEvents: cooldown > 0 ? 'none' : 'auto',
                        }}
                    >
                        {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
                    </Link>
                </Typography>

                <Button
                    variant='contained'
                    onClick={handleVerify}
                    disabled={isSubmitting || otp.length !== OTP_LENGTH}
                    fullWidth
                >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Verify'}
                </Button>
            </Box>
        </Container>
    );
}

export default ResetPassword;
