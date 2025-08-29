import React from 'react';
import { AddCircleOutlineRounded, KeyboardArrowLeftOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import PaymentCard from '@/components/cards/PaymentCard';
import MasterCardIcon from '@/components/icons/mastercard.svg?react';
import { usePaymentCards } from '@/hooks/usePaymentCards';
import { useNavigate } from 'react-router-dom';

function AddCard() {
    const navigate = useNavigate();
    const { data: paymentCards, isLoading } = usePaymentCards();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className='justify-start overflow-hidden'>
            <Box className={'mb-8 flex w-full items-center gap-20'}>
                <IconButton
                    size='medium'
                    disableRipple
                    className='text-text-3'
                    sx={{ border: '1px solid #EEEEEE' }}
                    onClick={() => navigate(-1)}
                >
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment Card</Typography>
            </Box>

            <Box className='o flex items-center'>
                <Button
                    variant='outlined'
                    className='mr-[-50px] h-14 w-48 -rotate-90 gap-2 whitespace-nowrap border-dashed border-primary-1'
                    onClick={() => navigate('/payment-details')}
                >
                    <AddCircleOutlineRounded className='h-8 w-8' />
                    Add New Card
                </Button>

                {/* Display the most recent card or empty state */}
                {paymentCards && paymentCards.length > 0 ? (
                    <PaymentCard
                        cardHolder={paymentCards[0].card_holder}
                        cardNumber={paymentCards[0].card_number}
                        expiryDate={paymentCards[0].expiry_date}
                        ProcessingIcon={<MasterCardIcon />}
                    />
                ) : (
                    <Box className='ml-4 flex h-[185px] w-[335px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300'>
                        <Typography variant='body2' className='text-text-3'>
                            No cards added yet
                        </Typography>
                    </Box>
                )}
            </Box>

            <Typography variant='h4' className='mt-6 self-start'>
                Recently Used Card(s)
            </Typography>

            {paymentCards && paymentCards.length > 0 ? (
                <Box className='relative -ml-4 w-[calc(100%+16px)] overflow-hidden'>
                    <Stack direction='row' spacing={2} className='pl-4'>
                        {paymentCards.map(card => (
                            <PaymentCard
                                key={card.id}
                                size='compact'
                                cardHolder={card.card_holder}
                                cardNumber={card.card_number}
                                expiryDate={card.expiry_date}
                                ProcessingIcon={<MasterCardIcon />}
                                className='flex-shrink-0'
                            />
                        ))}
                    </Stack>
                </Box>
            ) : (
                <Typography variant='body2' className='mt-2 self-start text-text-3'>
                    No recently used cards
                </Typography>
            )}
        </Container>
    );
}

export default AddCard;
