import React from 'react';
import { AddCircleOutlineRounded, KeyboardArrowLeftOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import PaymentCard from '@/components/cards/PaymentCard';
import MasterCardIcon from '@/components/icons/mastercard.svg?react';

function AddCard() {
    return (
        <Container className='justify-start overflow-hidden'>
            <Box className={'mb-8 flex w-full items-center gap-20'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment Card</Typography>
            </Box>

            <Box className='o flex items-center'>
                {' '}
                <Button
                    variant='outlined'
                    className='mr-[-50px] h-14 w-48 -rotate-90 gap-2 whitespace-nowrap border-dashed border-primary-1'
                >
                    <AddCircleOutlineRounded className='h-8 w-8' />
                    Add New Card
                </Button>
                <PaymentCard
                    // variant='gradient-blue'
                    cardHolder='Sabuhi Guliyev'
                    cardNumber='1234 5678 9012 3456'
                    expiryDate='09/29'
                    ProcessingIcon={<MasterCardIcon />}
                />
            </Box>
            <Typography variant='h4' className='self-start'>
                Recently Used Card(s)
            </Typography>
            <Box className='relative -ml-4 w-[calc(100%+16px)] overflow-hidden'>
                {' '}
                {/* Key fix */}
                <Stack direction='row' spacing={2} className='pl-4'>
                    <PaymentCard
                        // variant='gradient-blue'
                        size='compact'
                        cardHolder='Sabuhi Guliyev'
                        cardNumber='1234 5678 9012 3456'
                        expiryDate='09/29'
                        ProcessingIcon={<MasterCardIcon />}
                        className='flex-shrink-0' // Prevent card squishing
                    />
                    <PaymentCard
                        // variant='gradient-blue'
                        size='compact'
                        cardHolder='Sabuhi Guliyev'
                        cardNumber='1234 5678 9012 3456'
                        expiryDate='09/29'
                        ProcessingIcon={<MasterCardIcon />}
                        className='flex-shrink-0'
                    />
                </Stack>
            </Box>
        </Container>
    );
}

export default AddCard;
