import React from 'react';
import { Box, IconButton, Radio, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, CropFree, AddCircleOutlineRounded } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import MastercardIcon from '@/components/icons/mastercard.svg?react';
import VisaIcon from '@/components/icons/visa.svg?react';
import { usePaymentCards } from '@/hooks/usePaymentCards';
import { useNavigate } from 'react-router-dom';
import { useSetDefaultPaymentCard } from '@/hooks/usePaymentCards';
import toast from 'react-hot-toast';

function Payment() {
    const navigate = useNavigate();
    const { data: paymentCards, isLoading, refetch } = usePaymentCards();
    const { mutate: setDefaultCard } = useSetDefaultPaymentCard();

    const handleCardSelect = (cardId: string) => {
        setDefaultCard(cardId, {
            onSuccess: () => {
                toast.success('Default payment card updated');
                refetch();
            },
        });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container className='justify-start'>
            <Box className={'mb-8 flex w-full items-center justify-between'}>
                <IconButton onClick={() => navigate(-1)}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment Methods</Typography>
                <IconButton>
                    <CropFree />
                </IconButton>
            </Box>

            <Typography variant='body2' className='mb-4 self-start text-text-3'>
                Select a default payment card
            </Typography>

            {paymentCards?.map(card => (
                <Box
                    key={card.id}
                    className='mb-3 flex cursor-pointer items-center justify-between rounded-lg bg-[#f8f8f8] p-4'
                    onClick={() => handleCardSelect(card.id)}
                >
                    <div className='flex items-center gap-3'>
                        {card.card_type === 'mastercard' ? <MastercardIcon /> : <VisaIcon />}
                        <Typography variant='body2'>**** {card.card_number.slice(-4)}</Typography>
                    </div>
                    <Radio checked={card.is_default} onClick={e => e.stopPropagation()} />
                </Box>
            ))}

            <Box
                className='mt-4 flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-primary-1 p-4'
                onClick={() => navigate('/payment-details')}
            >
                <AddCircleOutlineRounded className='mr-2 h-6 w-6 text-primary-1' />
                <Typography variant='body2' className='text-primary-1'>
                    Add New Card
                </Typography>
            </Box>
        </Container>
    );
}

export default Payment;
