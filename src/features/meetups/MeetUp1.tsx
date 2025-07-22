import { Avatar, Box, Grid, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useMeetupStore } from '@/store/meetupStore';
import Container from '@/components/layout/Container';
import CircleCrossIcon from '@/components/icons/crosscircle.svg?react';
import { KeyboardArrowLeft } from '@mui/icons-material';
import React from 'react';

function MeetUp1() {
    const { selectedPhoto, setSelectedPhoto, photos } = useMeetupStore();
    const navigate = useNavigate();

    const handleContinue = () => {
        if (!selectedPhoto) return;
        navigate('/create-meetup-3');
    };

    return (
        <Container className='justify-around'>
            <Box className='mt-[-20px] flex items-center justify-between gap-14'>
                <IconButton onClick={() => navigate(-1)} className='text-text-3' sx={{ border: '1px solid #eee' }}>
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Create Meetup</Typography>
                <CircleCrossIcon />
            </Box>
            {!selectedPhoto ? (
                <>
                    <Box className='mt-10 flex flex-col items-center gap-2'>
                        <Typography variant='h3'>Choose a Photo</Typography>
                        <Typography variant='body1'>Select a cover photo for your meetup</Typography>
                    </Box>
                    <Box className='flex h-20 w-[300px] items-center justify-center rounded-lg bg-[#5D9BFC26] text-center'>
                        <Typography variant='body2' className='w-56 text-primary-1'>
                            Photo that show people participating in the meetup get the most views.
                        </Typography>
                    </Box>{' '}
                </>
            ) : (
                <img src={selectedPhoto} alt='choosen photo' className='h-1/3 w-full rounded-xl' />
            )}
            <Grid container spacing={1}>
                {photos.map((src, index) => (
                    <Grid item xs={3} key={index}>
                        <Avatar
                            src={src}
                            className='h-[75px] w-[75px]'
                            onClick={() => {
                                setSelectedPhoto(src);
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button variant='contained' className='w-full' disabled={!selectedPhoto} onClick={handleContinue}>
                Continue
            </Button>
        </Container>
    );
}

export default MeetUp1;
