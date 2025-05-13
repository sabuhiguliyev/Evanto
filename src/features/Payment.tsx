import React from 'react';
import { Box, Button, IconButton, Radio, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, CropFree, AddCircleOutlineRounded } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import PayPalIcon from '@/components/icons/paypal.svg?react';
import MastercardIcon from '@/components/icons/mastercard.svg?react';
import AppleIcon from '@/components/icons/appleblack.svg?react';
import VisaIcon from '@/components/icons/visa.svg?react';
import AmazonIcon from '@/components/icons/amazon.svg?react';

function Payment() {
    return (
        <Container className='justify-start'>
            <Box className={'mb-8 flex w-full items-center justify-between'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <CropFree />
                </IconButton>
            </Box>
            <Typography variant='body2' className='self-start text-text-3'>
                Select the payment method you want to use.
            </Typography>
            <Button variant='contained' className='h-14 justify-between bg-[#f8f8f8] text-base text-text-3'>
                <div className='flex items-center gap-3 pl-3'>
                    <PayPalIcon />
                    Paypal
                </div>
                <Radio size='small' />
            </Button>{' '}
            <Button variant='contained' className='h-14 justify-between bg-[#f8f8f8] text-base text-text-3'>
                <div className='flex items-center gap-3 pl-3'>
                    <MastercardIcon />
                    Mastercard
                </div>
                <Radio size='small' />
            </Button>{' '}
            <Button variant='contained' className='h-14 justify-between bg-[#f8f8f8] text-base text-text-3'>
                <div className='flex items-center gap-3 pl-3'>
                    <AmazonIcon />
                    Amazon Pay
                </div>
                <Radio size='small' />
            </Button>{' '}
            <Button variant='contained' className='h-14 justify-between bg-[#f8f8f8] text-base text-text-3'>
                <div className='flex items-center gap-3 pl-3'>
                    <AppleIcon />
                    Apple Pay
                </div>
                <Radio size='small' />
            </Button>{' '}
            <Button variant='contained' className='h-14 justify-between bg-[#f8f8f8] text-base text-text-3'>
                <div className='flex items-center gap-3 pl-3'>
                    <VisaIcon />
                    Visa
                </div>
                <Radio size='small' />
            </Button>
            <Button variant='outlined' className='h-14 gap-2 border-dashed border-primary-1'>
                <AddCircleOutlineRounded className='h-8 w-8' /> Add New Card
            </Button>
            <Button variant='contained' className='mt-auto'>
                Continue
            </Button>
        </Container>
    );
}

export default Payment;
