import Container from '../../Container';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import CircleArrowIcon from '../../../styles/assets/icons/arrowcircleleft.svg?react';
import CircleCrossIcon from '../../../styles/assets/icons/crosscircle.svg?react';
import GroupUserIcon from '../../../styles/assets/icons/group.svg?react';
import CameraIcon from '../../../styles/assets/icons/video.svg?react';
import { EditOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Input from '../../Input';

function CreateMeetUp3() {
    return (
        <Container className='justify-around'>
            <Box className='mt-[-20px] flex items-center justify-between gap-14'>
                <CircleArrowIcon />
                <Typography variant='h4'>Create Meetup</Typography>
                <CircleCrossIcon />
            </Box>
            <Input label={'Meetup Name'} placeholder='Give a name to your meetup' startIcon={<GroupUserIcon />} />
            <Input
                label={'Online Meetup Platform'}
                placeholder='Give a name to your meetup'
                startIcon={<CameraIcon />}
            />
            <Input label={'Online Meetup Link'} placeholder='E.g.zoom.us/campusemeetupZA' startIcon={<CameraIcon />} />
            <Box className='flex h-20 w-[300px] items-center justify-center rounded-lg bg-[#5D9BFC26]'>
                <Typography variant='body2' className='w-56 text-primary-1'>
                    We recommend zoom for online meetups. Simply set up a meeting and paste the link in here.
                </Typography>
            </Box>
            <Box className='flex w-full flex-col gap-2'>
                <Typography className='text-sm font-bold text-black'>Meetup Description</Typography>
                <TextField
                    placeholder='What is your meetup about?'
                    multiline
                    rows={4}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start' className='self-start text-text-3'>
                                <EditOutlined fontSize='small' />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                        '& input::placeholder': {
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                />
            </Box>
            <Button variant='contained' className='w-full'>
                Continue
            </Button>
        </Container>
    );
}

export default CreateMeetUp3;
