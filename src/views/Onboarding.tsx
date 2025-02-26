// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ArrowIcon from '/src/styles/assets/icons/arrow.svg?react';
import { MobileStepper, Button, Typography, Box } from '@mui/material';

const Onboarding = () => {
    return (
        <Box className='mx-2rem flex w-375 flex-col justify-center bg-white'>
            <img src='/assets/onboarding.svg' alt='onboarding' className='mx-auto mt-[10.9rem] w-[25.8rem]' />
            <Typography variant='h4' className='text-secondary-1 mt-[6.7rem] font-header font-bold'>
                This is the perfect time to visit your favorite event!
            </Typography>
            <Typography variant='body1' className='mt-[3rem] font-body text-text-secondary'>
                Take stock of your performance and inspire yourself to reach even greater heights.
            </Typography>
            {/* Reusable MobileStepper */}

            <MobileStepper
                variant='dots'
                steps={3}
                position='static'
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
                className='bg-primary-1 mt-[2rem] flex items-center justify-center gap-2 rounded-full px-2 py-2 text-white'
            >
                <ArrowIcon />
                <span className='flex-grow text-center font-header text-h6'>Got it, Next</span>
            </Button>

            <Button
                variant='text'
                className='text-primary-1 mb-[3.7rem] mt-[1.5rem] text-center text-h5'
                sx={{ textTransform: 'none' }}
            >
                Skip
            </Button>
        </Box>
    );
};

export default Onboarding;
