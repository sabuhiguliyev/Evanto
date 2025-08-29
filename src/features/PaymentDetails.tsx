import React from 'react';
import { CreditCardOutlined, CropFree, KeyboardArrowLeftOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import PaymentCard from '@/components/cards/PaymentCard';
import MasterCardIcon from '@/components/icons/mastercard.svg?react';
import { useCreatePaymentCard } from '@/hooks/usePaymentCards';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentCardSchema } from '@/utils/schemas';
import { useNavigate } from 'react-router-dom';
import type { PaymentCard as PaymentCardType } from '@/utils/schemas';

function PaymentDetails() {
    const navigate = useNavigate();
    const { mutate: createCard, isPending } = useCreatePaymentCard();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(
            paymentCardSchema.omit({
                id: true,
                user_id: true,
                created_at: true,
                updated_at: true,
            }),
        ),
        defaultValues: {
            card_holder: 'Sabuhi Guliyev',
            card_number: '6011740647638837',
            expiry_date: '06/25',
            cvv: '1334',
            card_type: 'mastercard' as const,
        },
    });

    const formData = watch();

    const onSubmit = (data: Omit<PaymentCardType, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
        createCard(data, {
            onSuccess: () => {
                navigate('/payment');
            },
        });
    };

    return (
        <Container className='justify-start'>
            <Box className={'mb-8 flex w-full items-center justify-between'}>
                <IconButton
                    size='medium'
                    disableRipple
                    className='text-text-3'
                    sx={{ border: '1px solid #EEEEEE' }}
                    onClick={() => navigate(-1)}
                >
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <CropFree />
                </IconButton>
            </Box>
            {/* Preview Card */}
            <PaymentCard
                variant='gradient-blue'
                cardHolder={formData.card_holder}
                cardNumber={formData.card_number
                    .replace(/\s/g, '')
                    .replace(/(.{4})/g, '$1 ')
                    .trim()}
                expiryDate={formData.expiry_date}
                ProcessingIcon={<MasterCardIcon />}
            />
            <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
                {/* Card Type Display */}
                <div className='flex flex-col'>
                    <label className='text-sm text-text-3'>Card Name</label>
                    <div className='flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3'>
                        <MasterCardIcon className='h-5 w-5' />
                        <span className='text-gray-700'>{formData.card_type}</span>
                    </div>
                </div>

                <TextField
                    label='Card Holder'
                    placeholder='John Doe'
                    {...register('card_holder')}
                    error={!!errors.card_holder}
                    helperText={errors.card_holder?.message}
                    fullWidth
                />

                <TextField
                    label='Card Number'
                    placeholder='6011 7406 4763 8837'
                    {...register('card_number', {
                        onChange: e => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                            e.target.value = value.replace(/(.{4})/g, '$1 ').trim();
                        },
                    })}
                    error={!!errors.card_number}
                    helperText={errors.card_number?.message}
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: <CreditCardOutlined sx={{ mr: 1, color: 'text.secondary' }} />,
                        }
                    }}
                />

                <Box className='flex gap-2'>
                    <TextField
                        label='CVV'
                        placeholder='1334'
                        type='password'
                        {...register('cvv')}
                        error={!!errors.cvv}
                        helperText={errors.cvv?.message}
                        fullWidth
                    />

                    <TextField
                        label='Exp Date'
                        placeholder='06/25'
                        {...register('expiry_date', {
                            onChange: e => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 2) {
                                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                }
                                e.target.value = value;
                            },
                        })}
                        error={!!errors.expiry_date}
                        helperText={errors.expiry_date?.message}
                        fullWidth
                    />
                </Box>

                <Button variant='contained' type='submit' disabled={isPending} className='mt-auto'>
                    {isPending ? 'Saving...' : 'Confirm'}
                </Button>
            </form>
        </Container>
    );
}

export default PaymentDetails;
