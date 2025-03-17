import Container from '../components/Container';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CircleArrowIcon from '../styles/assets/icons/arrowcircle.svg?react';
import { Box, Link, Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useState } from 'react';
import Button from '@mui/material/Button';

function ResetPassword() {
    const [otp, setOtp] = useState('');

    return (
        <Container className={'items-start justify-start'}>
            <Box className={'flex flex-row items-center gap-10'}>
                <CircleArrowIcon />
                <Typography variant='h3'>Reset Password</Typography>
            </Box>
            <Typography className={'mt-20'} variant={'body1'}>
                Please enter the verification code we sent to your email <Link>ex***@gmail.com</Link>
            </Typography>
            <Box className={'mt-20 flex w-full flex-col items-center gap-6'}>
                <MuiOtpInput
                    value={otp}
                    onChange={setOtp}
                    length={5}
                    TextFieldsProps={{
                        sx: {
                            width: '35px',
                            height: '35px',
                            textAlign: 'center',
                            '& input': {
                                textAlign: 'center',
                                fontSize: '12px',
                                color: 'rgba(93, 155, 252, 1)',
                                height: '100%',
                            },
                            '& .MuiOutlinedInput-root': {
                                '&:focus-within': {
                                    backgroundColor: '#5D9BFC45',
                                },
                            },
                        },
                    }}
                />
                <Typography variant={'body1'}>
                    {' '}
                    Not get yet? <Link>Resend OTP</Link>
                </Typography>
                <Button variant={'contained'}>Verify</Button>
                <Typography>
                    <span className={'text-primary-1'}>00:30</span> sec left
                </Typography>
            </Box>
        </Container>
    );
}

export default ResetPassword;
