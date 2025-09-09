import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '@/utils/supabase';
import { Box, Link, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Container from '../../components/layout/Container';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function VerifyCode() {
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
            navigate('/auth/reset-password');
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
            toast.success('New verification code sent!');
            setCooldown(RESEND_COOLDOWN);
        }
    };

    return (
        <Container className='relative justify-start'>
            <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                        <KeyboardArrowLeft />
                    </IconButton>
                    <Typography variant='h4' className='font-poppins font-semibold'>Verify Code</Typography>
                    <Box className='w-10' />
                </Box>
                
                <Box className='auth-container'>
                    <Typography variant='body1' className='mb-8 text-center'>
                        Please enter the verification code we sent to your email <span className='text-primary font-medium'>{email}</span>
                    </Typography>

                    <Box className='flex flex-col space-y-6'>
                        <MuiOtpInput
                            value={otp}
                            onChange={setOtp}
                            length={OTP_LENGTH}
                            TextFieldsProps={{
                                sx: {
                                    width: '100%',
                                    height: '56px',
                                    '& input': {
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: '#5D9BFC',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        '&:focus-within': { 
                                            backgroundColor: 'rgba(93, 155, 252, 0.1)',
                                            borderColor: '#5D9BFC'
                                        },
                                    },
                                },
                            }}
                            autoFocus
                        />

                        <Typography variant='body2' className='text-center'>
                            Didn't receive it?{' '}
                            <Link
                                onClick={handleResend}
                                className={`text-primary cursor-pointer ${cooldown > 0 ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
                            </Link>
                        </Typography>

                        <Button
                            variant='contained'
                            onClick={handleVerify}
                            disabled={isSubmitting || otp.length !== OTP_LENGTH}
                            size='large'
                            className='w-full h-12'
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : 'Verify'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default VerifyCode;
