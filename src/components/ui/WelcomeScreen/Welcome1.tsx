import Container from '../../Container';
import Button from '@mui/material/Button';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { Box } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from '../../../styles/assets/icons/logo.svg?react';
import { Email } from '@mui/icons-material';

function Welcome1() {
    return (
        <Container className='bg-primary-1'>
            <Logo className={'flex-grow'} />
            <Box className={'flex w-full flex-col gap-4'}>
                <Button variant={'contained'} className={'bg-[#FFFFFF26]'} startIcon={<AppleIcon />}>
                    Connect With Apple
                </Button>
                <Button variant={'contained'} className={'bg-[#FFFFFF26]'} startIcon={<GoogleIcon />}>
                    Connect With Google
                </Button>
                <Button variant={'contained'} className={'bg-white text-primary-1'} startIcon={<Email />}>
                    Connect With Email
                </Button>
            </Box>
        </Container>
    );
}

export default Welcome1;
