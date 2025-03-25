// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ArrowIcon from '/src/styles/assets/icons/arrow.svg?react';
import { MobileStepper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../Container';
import Button from '@mui/material/Button';

const Step2 = () => {
    const { step } = useParams<{ step: string }>();
    const navigate = useNavigate();
    const currentStop = Number(step) || 2;

    const handleNext = () => {
        navigate(`/onboarding/${currentStop + 1}`);
    };

    return (
        <Container>
            <img src='/assets/onboarding2.png' alt='onboarding screen 2' className='w-64' />

            <Typography variant='h1'>Evanto app is the most reliable and secure </Typography>

            <Typography variant='body2'>
                Send out invitations to your family, friends, and even your parents! Creating a guest list is simple
                with Evanto Planner.{' '}
            </Typography>

            <MobileStepper
                variant='dots'
                steps={3}
                position='static'
                activeStep={1}
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
                <ArrowIcon className={'absolute left-2'} /> <span>Cool Next</span>
            </Button>
        </Container>
    );
};

export default Step2;
