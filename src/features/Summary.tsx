import React from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import Subtract from '@/components/icons/subtract.svg?react';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';
import Input from '@/components/forms/Input';
import { ConfirmationNumberOutlined, CreditCardOutlined, LocationOnOutlined } from '@mui/icons-material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

function Summary() {
    return (
        <Container>
            <Box className={'mb-4 flex w-full items-center gap-20'}>
                <ArrowCircle />
                <Typography variant='h4'>Summary</Typography>
            </Box>

            <Box className='relative mb-4 h-[449px] w-full'>
                <Subtract className='absolute inset-0 z-0 h-full w-full object-cover' />
                <Box className='absolute left-5 top-10 flex gap-2'>
                    <img src='/illustrations/chairs.png' alt='Chairs' className='h-16 w-16' />
                    <Box className='flex flex-col justify-between'>
                        <Chip label='Event' className='h-5 w-12 bg-[#5D9BFC26] text-[7px] text-primary-1' />
                        <Typography variant='h6'>International Conference 2024</Typography>
                        <Box className='flex h-2.5 items-center gap-1 text-primary-1'>
                            <LocationOnOutlined className='text-[11px]' />
                            <Typography className='text-[11px]'>Baku, AZE </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className='absolute left-5 right-5 top-40 flex flex-col gap-2.5'>
                    <Box>
                        <Typography className='font-header text-[9px] font-medium text-text-3'>Name</Typography>
                        <Typography variant='h6'>Sabuhi Guliyev</Typography>
                    </Box>
                    <Box className='flex justify-between'>
                        <Box>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>
                                Event Mall
                            </Typography>
                            <Typography variant='h6'>Baku Crystal Hall</Typography>
                        </Box>
                        <Box>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>Seat</Typography>
                            <Typography variant='h6'>A5, A6, A7</Typography>
                        </Box>
                    </Box>{' '}
                    <Box className='flex justify-between'>
                        <Box>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>Date</Typography>
                            <Typography variant='h6'>Date Fri 25, Mar 2024</Typography>
                        </Box>
                        <Box>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>Time</Typography>
                            <Typography variant='h6'>12:30</Typography>
                        </Box>
                    </Box>
                    <Box className='flex items-center justify-between'>
                        <Box>
                            <Typography className='font-header text-[9px] font-medium text-text-3'>
                                Booking ID
                            </Typography>
                            <Typography variant='h6'>AsJ985BV</Typography>
                        </Box>
                        <Box className='flex items-center gap-2'>
                            <ContentCopyOutlinedIcon className='text-[11px] text-primary-1' />
                            <Typography variant='h6' className='text-primary-1'>
                                Copy
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={'my-5 flex flex-col items-center gap-1'}>
                        <Typography className='font-header text-[11px] font-medium text-text-3'>Price</Typography>
                        <Typography className='font-header text-[20px] font-bold text-primary-1'>$32.92</Typography>
                    </Box>
                </Box>
            </Box>

            <Box className='flex w-full flex-col gap-2'>
                <Input
                    placeholder='Sabuhi2025'
                    startIcon={<ConfirmationNumberOutlined />}
                    endIcon={<KeyboardArrowDownOutlinedIcon />}
                />
                <Input
                    placeholder='Payment method'
                    startIcon={<CreditCardOutlined />}
                    endIcon={<KeyboardArrowDownOutlinedIcon />}
                />
                <Button variant='contained'>Pay Now</Button>
            </Box>
        </Container>
    );
}

export default Summary;
