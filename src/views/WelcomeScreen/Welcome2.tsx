import Container from '../../components/Container';
import Button from '@mui/material/Button';
import { Box, Divider } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from '../../styles/assets/icons/logo.svg?react';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { FacebookOutlined } from '@mui/icons-material';

function Welcome1() {
    return (
        <Container className='bg-primary-1'>
            <Logo className={'flex-grow'} />
            <Box className={'flex w-full flex-col gap-4'}>
                <Button variant={'contained'} className={'bg-[#FFFFFF26]'}>
                    Sign In
                </Button>
                <Button variant={'contained'} className={'bg-white text-primary-1'}>
                    Sign Up
                </Button>
                <Divider className='text-gray-200 before:bg-gray-200 after:bg-gray-200'>Or continue with</Divider>{' '}
                <Box className='flex justify-center gap-4'>
                    <Button variant='contained' className='h-10 bg-[#FFFFFF26] p-2'>
                        <AppleIcon />
                    </Button>
                    <Button variant='contained' className='h-10 bg-[#FFFFFF26] p-2'>
                        <GoogleIcon />
                    </Button>
                    <Button variant='contained' className='h-10 bg-[#FFFFFF26] p-2'>
                        <FacebookOutlined />
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Welcome1;
