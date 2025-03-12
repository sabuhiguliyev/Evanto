// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ArrowIcon from '/src/styles/assets/icons/arrow.svg?react';
import { MobileStepper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import Button from '@mui/material/Button';

const Step3 = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/welcome/1`);
    };

    return (
        <Container>
            <img src='/assets/onboarding3.png' alt='onboarding screen 3' className='w-64' />

            <Typography variant='h5' className='font-header text-h1 font-bold text-secondary-1'>
                Seize every moment while it's still in your grasp.{' '}
            </Typography>

            <Typography variant='body1' className='font-body text-h6 text-text-gray3'>
                Now it's very easy to create, host and manage your event with collaboration.
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

            <Button
                variant={'contained'}
                className={'relative h-12 w-full rounded-full bg-primary-1'}
                onClick={handleNext}
            >
                <ArrowIcon className={'absolute left-2'} /> <span>Get Started</span>
            </Button>
        </Container>
    );
};

export default Step3;
