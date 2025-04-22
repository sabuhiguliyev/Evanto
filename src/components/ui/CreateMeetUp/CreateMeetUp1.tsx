import Container from '../../Container';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import CircleArrowIcon from '../../../styles/assets/icons/arrowcircleleft.svg?react';
import CircleCrossIcon from '../../../styles/assets/icons/crosscircle.svg?react';
import Button from '@mui/material/Button';

const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=6',
    'https://i.pravatar.cc/150?img=7',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=9',
    'https://i.pravatar.cc/150?img=10',
    'https://i.pravatar.cc/150?img=11',
    'https://i.pravatar.cc/150?img=12',
    'https://i.pravatar.cc/150?img=13',
    'https://i.pravatar.cc/150?img=14',
    'https://i.pravatar.cc/150?img=15',
    'https://i.pravatar.cc/150?img=16',
];
function CreateMeetUp1() {
    return (
        <Container className='justify-around'>
            <Box className='mt-[-20px] flex items-center justify-between gap-14'>
                <CircleArrowIcon />
                <Typography variant='h4'>Create Meetup</Typography>
                <CircleCrossIcon />
            </Box>
            <Box className='mt-10 flex flex-col items-center gap-2'>
                <Typography variant='h3'>Choose a Photo</Typography>
                <Typography variant='body1'>Select a cover photo for your meetup</Typography>
            </Box>
            <Box className='flex h-20 w-[300px] items-center justify-center rounded-lg bg-[#5D9BFC26] text-center'>
                <Typography variant='body2' className='w-56 text-primary-1'>
                    Photo that show people participating in the meetup get the most views.
                </Typography>
            </Box>
            <Grid container spacing={1}>
                {avatars.map((src, index) => (
                    <Grid item xs={3} key={index}>
                        <Avatar src={src} className='h-[75px] w-[75px]' />
                    </Grid>
                ))}
            </Grid>
            <Button variant='contained' className='w-full'>
                Continue
            </Button>
        </Container>
    );
}

export default CreateMeetUp1;
