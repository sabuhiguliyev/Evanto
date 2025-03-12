import Container from '../../components/Container';
import Button from '@mui/material/Button';
// import { Box } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from '../../styles/assets/icons/logo.svg?react';
import AppleIcon from '@mui/icons-material/Apple';

function WelcomeScreen1() {
    return (
        <Container className='bg-primary-1'>
            <Logo />
            <Button>
                {' '}
                <AppleIcon />
                <span>Connect With Apple</span>
            </Button>
        </Container>
    );
}

export default WelcomeScreen1;
