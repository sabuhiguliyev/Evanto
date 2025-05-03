import React from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import { CalendarMonthOutlined, EmailOutlined, FlagRounded, KeyboardArrowDownOutlined } from '@mui/icons-material';
import Container from '@/components/Container';
import Input from '@/components/Input';
import ArrowCircle from '@/styles/assets/icons/arrowcircleleft.svg?react';
import FavoriteCircle from '@/styles/assets/icons/favouritecircle.svg?react';

function BookEvent() {
    return (
        <Container className='gap-2.5'>
            <Box className={'mb-10 flex w-full items-center justify-between'}>
                <ArrowCircle />
                <Typography variant='h4'>Upcoming Event</Typography>
                <FavoriteCircle />
            </Box>

            <Input startIcon={null} placeholder='Sabuhi' label='Contact Information' />
            <Input startIcon={null} placeholder='Guliyev' />
            <Input placeholder='Male' endIcon={<KeyboardArrowDownOutlined />} />
            <Input
                placeholder='01 March 2025'
                startIcon={<CalendarMonthOutlined />}
                endIcon={<KeyboardArrowDownOutlined />}
            />
            <Input startIcon={<EmailOutlined />} placeholder='sabuhiguliyev@gmail.com' />
            <Input startIcon={<FlagRounded />} placeholder='+17468448575' />
            <Input startIcon={null} placeholder='United States' endIcon={<KeyboardArrowDownOutlined />} />
            <Box className='flex'>
                <Checkbox size='small' color='default' disableRipple />
                <Typography variant='body2' className='text-text-3'>
                    I accept the evanto <span className='text-primary-1'>Terms of services. Community guideline</span>,
                    and
                    <span className='text-primary-1'> Privacy Policy</span> (Required)
                </Typography>
            </Box>
            <Button variant='contained' className='mt-10'>
                Continue
            </Button>
        </Container>
    );
}

export default BookEvent;
