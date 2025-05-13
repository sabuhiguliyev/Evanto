import Container from '../../components/layout/Container';
import Input from '../../components/forms/Input';
import Link from '../../components/navigation/Link';
import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { FacebookOutlined } from '@mui/icons-material';

function SignUp() {
    return (
        <Container>
            <Box className={'flex flex-col gap-4 text-start'}>
                <Typography variant='h1' className={'w-[193px]'}>
                    Create your account
                </Typography>
                <Typography variant={'body2'}>
                    Evanto virtual event organizing application that is described as a news mobile app.
                </Typography>
                <Input label='Full Name' />
                <Input label='Email' type='email' />
                <Input label='Password' type='password' />
                <Input label='Confirm Password' type='password' placeholder={'Confirm password'} />
                <Link href='/forgot-password' className={'text-text-gray3 mb-4 underline'}>
                    Forgot Password?
                </Link>
                <Box className={'flex w-full flex-col items-center gap-4'}>
                    <Button variant={'contained'}>Sign In</Button>
                    <Divider className='text-text-gray3 before:bg-[#E8E8E8] after:bg-[#E8E8E8]'>
                        Or continue with
                    </Divider>{' '}
                    <Box className='flex w-72 justify-center gap-4'>
                        <Button variant='outlined' className={'h-9'}>
                            <AppleIcon className={'text-primary-1'} />
                        </Button>
                        <Button variant='outlined' className={'h-9'}>
                            <GoogleIcon className={'text-primary-1'} />
                        </Button>
                        <Button variant='outlined' className={'h-9'}>
                            <FacebookOutlined className={'text-primary-1'} />
                        </Button>
                    </Box>
                    <Box className='w-full text-center'>
                        <Typography variant='body1'>
                            Don&#39;t have an account? <Link href={'/signup'}>Sign Up</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
