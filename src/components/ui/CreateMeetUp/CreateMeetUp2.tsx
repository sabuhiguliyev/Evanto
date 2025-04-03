import Container from '../../Container';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import CircleArrowIcon from '../../../styles/assets/icons/arrowcircle.svg?react';
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
function CreateMeetUp2() {
    return (
        <Container className='justify-around'>
            <Box className='mt-[-20px] flex items-center justify-between gap-14'>
                <CircleArrowIcon />
                <Typography variant='h4'>Create Meetup</Typography>
                <CircleCrossIcon />
            </Box>
            <img src=' https://i.pravatar.cc/1500?img=5' alt='choosen photo' className='h-full w-full rounded-xl' />

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

export default CreateMeetUp2;
