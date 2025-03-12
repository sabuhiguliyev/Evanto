import Container from '../../components/Container';
import Input from '../../components/Input';
import Link from '../../components/Link';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from '../../styles/assets/icons/logo-dark.svg?react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function SignIn1() {
    return (
        <Container>
            <Logo />
            <Input
                label='Email'
                placeholder='Enter your email'
                type='email'
                startIcon={<MailOutlineIcon color={'disabled'} />}
            />
            <Input
                label='Password'
                placeholder='Enter your password'
                type='password'
                startIcon={<LockOutlinedIcon color={'disabled'} />}
                endIcon={<VisibilityOutlinedIcon color={'disabled'} />}
            />
            <Link href='/forgot-password'>Forgot password?</Link>
        </Container>
    );
}

export default SignIn1;
