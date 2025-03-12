// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ArrowIcon from '/src/styles/assets/icons/arrow.svg?react';
import { MobileStepper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import Button from '@mui/material/Button';

const Step1 = () => {
    const { step } = useParams<{ step: string }>();
    const navigate = useNavigate();
    const currentStop = Number(step) || 1;

    const handleNext = () => {
        navigate(`/onboarding/${currentStop + 1}`);
    };

    return (
        <Container>
            <img src='/assets/onboarding1.png' alt='onboarding screen 1' className='w-64' />

            <Typography variant='h1'>This is the perfect time to visit your favorite event!</Typography>

            <Typography variant='body2'>
                Take stock of your performance and inspire yourself to reach even greater heights.
            </Typography>

            <MobileStepper
                variant='dots'
                steps={3}
                position='static'
                activeStep={0}
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
                <ArrowIcon className={'absolute left-2'} /> <span>Got it, Next</span>
            </Button>
        </Container>
    );
};

export default Step1;
