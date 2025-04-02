import ArrowIcon from '/src/styles/assets/icons/arrow.svg?react';
import { MobileStepper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Container from '../../Container';
import Button from '@mui/material/Button';

const Step3 = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/welcome/1`);
    };

    return (
        <Container>
            <img src='/illustrations/onboarding3.png' alt='onboarding screen 3' className='w-64' />

            <Typography variant='h1'>Seize every moment while it&#39;s still in your grasp. </Typography>

            <Typography variant='body2'>
                Now it&#39;s very easy to create, host and manage your event with collaboration.
            </Typography>

            <MobileStepper
                variant='dots'
                steps={3}
                position='static'
                activeStep={2}
                classes={{
                    dots: 'flex justify-center items-center gap-2 w-full',
                    dot: 'w-2.5 h-2.5 rounded-full bg-gray-300',
                    dotActive: 'bg-transparent border-solid border-primary-1 w-7 h-1 rounded-full border-2',
                }}
                className={'my-2'}
                nextButton={null}
                backButton={null}
            />

            <Button variant={'contained'} className={'relative'} onClick={handleNext}>
                <ArrowIcon className={'absolute left-2'} /> <span>Get Started</span>
            </Button>
        </Container>
    );
};

export default Step3;
