import Container from '../Container';
import { Box, Button, Typography } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CircleArrowIcon from '../../styles/assets/icons/arrowcircle.svg?react';
import Input from '../Input';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomMobileDatePicker from './MobileDatePicker';

function NewInquiry() {
    return (
        <Container>
            <Box className='flex w-full items-center justify-between'>
                <CircleArrowIcon />
                <Typography variant='h3'>New Inquiry</Typography>
                <Button variant='contained' size='small' className='h-8 w-20'>
                    Create
                </Button>
            </Box>
            <Input placeholder='Inquiry Title' startIcon={null} />
            <Input
                placeholder='Choose location'
                startIcon={<LocationOnRoundedIcon />}
                endIcon={<KeyboardArrowRightRoundedIcon />}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CustomMobileDatePicker />
            </LocalizationProvider>
        </Container>
    );
}

export default NewInquiry;
