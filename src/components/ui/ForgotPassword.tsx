// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CircleArrowIcon from '../../styles/assets/icons/arrowcircle.svg?react';
import Container from '../Container';
import { Box, Typography } from '@mui/material';
import Input from '../Input';
import Button from '@mui/material/Button';

function ForgotPassword() {
    return (
        <Container className={'items-start justify-start'}>
            <Box className={'flex flex-row items-center gap-10'}>
                <CircleArrowIcon />
                <Typography variant={'h3'}>Forgot Password</Typography>
            </Box>
            <Typography variant={'body1'} className={'mt-20'}>
                Enter the email associated with your account and we’ll send an email with instructions to reset your
                password.
            </Typography>
            <Box className={'mt-20 flex w-full flex-col items-center gap-4'}>
                <Input label={'Email'} type='email' />
                <Button variant={'contained'}>Send</Button>
            </Box>
        </Container>
    );
}

export default ForgotPassword;
