import Container from '@/components/Container';
import PaymentCard from '@/components/PaymentCard';
import MasterCardIcon from '@/styles/assets/icons/mastercard.svg?react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { CreditCardOutlined, CropFree, KeyboardArrowLeftOutlined } from '@mui/icons-material';
import React from 'react';
import Input from '@/components/Input';

function PaymentDetails() {
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
            <PaymentCard
                variant='gradient-blue'
                cardHolder='Sabuhi Guliyev'
                cardNumber='1234 5678 9012 3456'
                expiryDate='09/29'
                ProcessingIcon={<MasterCardIcon />}
            />
            <Input label='Card Name' startIcon={<MasterCardIcon />} placeholder='Mastercard' />
            <Input label='Card Number' startIcon={<CreditCardOutlined />} placeholder='6011 - 7406 - 4763 - 8837' />
            <Box className='flex gap-2'>
                <Input label='CVV' placeholder='1334' startIcon={null} />
                <Input label='Exp Date' placeholder='06/25' startIcon={null} />
            </Box>
            <Button variant='contained' className='mt-auto'>
                Confirm
            </Button>
        </Container>
    );
}

export default PaymentDetails;
