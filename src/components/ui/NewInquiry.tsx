import Container from '../Container';
import Input from '../Input';
import CustomMobileDatePicker from '../MobileDatePicker';
import CircleArrowIcon from '../../styles/assets/icons/arrowcircleleft.svg?react';
import AddPlus from '../../styles/assets/icons/plus.svg?react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Avatar, Box, Button, Typography } from '@mui/material';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ToggleOn } from '@mui/icons-material';

function NewInquiry() {
    return (
        <Container className='items-start justify-start gap-10'>
            <Box className='flex w-full items-center justify-between self-start'>
                <CircleArrowIcon />
                <Typography variant='h3'>New Inquiry</Typography>
                <Button variant='contained' size='small' className='h-8 w-20'>
                    Create
                </Button>
            </Box>
            <Box className='flex w-full flex-col items-center justify-between gap-3'>
                <Input placeholder='Inquiry Title' startIcon={null} />
                <Input
                    placeholder='Choose location'
                    startIcon={<LocationOnRoundedIcon />}
                    endIcon={<KeyboardArrowRightRoundedIcon />}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CustomMobileDatePicker />
                    <CustomMobileDatePicker />
                </LocalizationProvider>
            </Box>
            <Box className='mt-8 flex flex-col gap-5'>
                <Typography variant='h3' className='self-start'>
                    Profile image
                </Typography>
                <Box className='flex items-center gap-3'>
                    <AddPlus />
                    <Avatar src='https://i.pravatar.cc/150?img=1' className='h-20 w-20' />
                    <Avatar src='https://i.pravatar.cc/150?img=2' className='h-20 w-20' />
                    <Avatar src='https://i.pravatar.cc/150?img=3' className='h-20 w-20' />
                </Box>
                <Input startIcon={null} endIcon={<ToggleOn />} placeholder='Tickets' />
            </Box>
        </Container>
    );
}

export default NewInquiry;
