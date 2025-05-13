import Container from '../../components/layout/Container';
import Input from '../../components/forms/Input';
import { Box, Typography, Button } from '@mui/material';
import CircleArrowIcon from '@/components/icons/arrowcircleleft.svg?react';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

function CreateEvent() {
    return (
        <Container className='items-start justify-start'>
            <Box className='mb-4 flex items-center justify-between gap-16'>
                <CircleArrowIcon />
                <Typography variant='h4'>Create Event</Typography>
            </Box>
            <Input placeholder='Inquiry Title' startIcon={null} />
            <Box className='flex w-full flex-col gap-2'>
                <Typography variant='h4'>Basic Info</Typography>
                <Input placeholder='Organize name' startIcon={null} endIcon={<KeyboardArrowRightRoundedIcon />} />
                <Input placeholder='Event location' startIcon={null} endIcon={<KeyboardArrowRightRoundedIcon />} />
                <Input placeholder='Event date' startIcon={null} endIcon={<KeyboardArrowRightRoundedIcon />} />
                <Input placeholder='Event time' startIcon={null} endIcon={<KeyboardArrowRightRoundedIcon />} />
            </Box>
            <Typography variant='h4'>Cover Image</Typography>
            <Box className='flex h-40 w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-primary-1 bg-[#5D9BFC26]'>
                <InsertPhotoOutlinedIcon className='text-primary-1' />
                <Typography variant='h3' className='text-primary-1'>
                    Add photo +
                </Typography>
            </Box>
            <Button variant='contained'>Save & Continue</Button>
        </Container>
    );
}

export default CreateEvent;
