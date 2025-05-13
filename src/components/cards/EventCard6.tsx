import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CalendarTodayOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import React from 'react';

const imageURL = 'public/illustrations/eventcardsmall.png';
const title = 'Man holding something in the hand.';

export default function EventCard6() {
    return (
        <Card className='flex h-24 rounded-xl p-2'>
            <CardMedia component='img' image={imageURL} alt={title} className='h-20 w-20 object-cover' />
            <CardContent className='relative p-0'>
                <Box className='flex w-56 flex-col gap-1 pl-2'>
                    <Typography variant='h5'>International Conference Artificial Intelligence</Typography>
                    <Box className='flex h-2.5 items-center gap-1.5 text-primary-1'>
                        <CalendarTodayOutlined className='text-[10px]' />
                        <Typography className='text-[10px]'>12-13mar 2024</Typography>
                    </Box>
                    <Typography>$7.99</Typography>
                </Box>
                <Button type='button' variant='contained' className='absolute right-1 top-6 h-8 w-20 text-[10px]'>
                    Join Now
                </Button>
            </CardContent>
        </Card>
    );
}
