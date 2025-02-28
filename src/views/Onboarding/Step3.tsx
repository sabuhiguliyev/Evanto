// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ArrowIcon from '/src/styles/assets/icons/arrow.svg?react';
import { MobileStepper, Button, Typography, Box } from '@mui/material';
import { useOnboardingStore } from '../../store/useOnboardingStore'; // Import the Zustand store
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const Step3 = () => {
    const { nextStep } = useOnboardingStore();
    const navigate = useNavigate();

    const handleNext = () => {
        nextStep(); // Update Zustand state
        navigate('/onboarding/3'); // Navigate to next screen
    };

    return (
        <Box className='mx-2rem flex w-375 flex-col bg-white'>
            <img src='/assets/onboarding3.png' alt='onboarding screen 3' className='mx-auto mt-[10.9rem] w-[25.8rem]' />

            <Typography variant='h3' className='mt-[6.7rem] font-header font-bold leading-[3.6rem] text-secondary-1'>
                Seize every moment while it&apos;s still in your grasp.
            </Typography>

            <Typography
                variant='body1'
                className='text-text-secondary mt-[3rem] font-body text-[1.3rem] text-text-gray3'
            >
                Now it&apos;s very easy to create, host and manage your event with collaboration.{' '}
            </Typography>

            <MobileStepper
                variant='dots'
                steps={3}
                position='static'
                activeStep={2}
                classes={{
                    dots: 'flex justify-center items-center gap-2 my-5 w-full',
                    dot: 'w-2.5 h-2.5 rounded-full bg-gray-300',
                    dotActive: 'bg-transparent border-solid border-primary-1 w-7 h-1 rounded-full',
                }}
                sx={{
                    flexGrow: 1,
                }}
                nextButton={null}
                backButton={null}
            />

            <Button
                variant='contained'
                className='mt-[2rem] flex items-center justify-center gap-2 rounded-full bg-primary-1 px-2 py-2 text-white'
                onClick={handleNext} // Move to next step
            >
                <ArrowIcon />
                <span className='flex-grow font-header text-h5 normal-case'>Get Started</span>
            </Button>

            <Button
                variant='text'
                className='mb-[3.7rem] mt-[1.5rem] text-center text-h5 normal-case text-primary-1'
                sx={{ '&:hover': { backgroundColor: 'inherit', boxShadow: 'none' } }}
                onClick={() => navigate('/home')} // Handle skip action
            >
                Skip
            </Button>
        </Box>
    );
};

export default Step3;
