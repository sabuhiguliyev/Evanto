import { Box, Typography } from '@mui/material';

import CongratulationIcon from '@/components/icons/congratulationsillustrations.svg?react';
import Button from '@mui/material/Button';

function Congratulation() {
    return (
        <Box className='fixed inset-0 bg-black/30 backdrop-blur-md'>
            <Box className={'relative w-80 rounded-3xl border border-gray-200 bg-white p-4'}>
                <Box className={'m-6 flex flex-col items-center space-y-6 text-center'}>
                    <CongratulationIcon className={'mx-auto'} />
                    <Typography variant='h2'>Congratulations!</Typography>
                    <Typography variant='body2'>
                        Your account is ready to use. You will be redirected to the home page in a few seconds.
                    </Typography>
                    <Button variant='contained'>Back To Home</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Congratulation;
