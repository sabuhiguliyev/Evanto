import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Container from '../Container';

import CircleArrowIcon from '../../styles/assets/icons/arrowcircle.svg?react';
import Input from '../Input';
import Button from '@mui/material/Button';

function CreatePassword() {
    return (
        <Container>
            <Box className={'mb-12 flex flex-row items-center gap-10 self-start py-4'}>
                <CircleArrowIcon />
                <Typography variant='h4'>Create New Password</Typography>
            </Box>
            <img
                src='../../../public/illustrations/lockillustration.png'
                className={'mb-12'}
                alt='lock illustration  '
            />
            <Typography variant={'h3'} className={'self-start'}>
                Create New Password
            </Typography>
            <Box className={'flex w-full flex-col gap-2'}>
                <Input label={'Password'} type='password' />
                <Input label={'Confirm Password'} type='password' />
                <FormControlLabel
                    control={<Checkbox size={'small'} />}
                    sx={{
                        padding: '4px',
                        color: '#AAAAAA',
                        '&.Mui-checked': {
                            color: '#007BFF',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '16px',
                        },
                    }}
                    label='Remember me'
                />
                <Button variant={'contained'}>Continue</Button>
            </Box>
        </Container>
    );
}

export default CreatePassword;
