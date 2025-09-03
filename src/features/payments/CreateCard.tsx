import React from 'react';
import { AddCircleOutlineRounded, KeyboardArrowLeftOutlined, CreditCard, Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography, CircularProgress, Chip, Divider } from '@mui/material';
import Container from '@/components/layout/Container';
import MasterCardIcon from '@/components/icons/mastercard.svg?react';
import VisaIcon from '@/components/icons/visa.svg?react';
import { usePaymentCards } from '@/hooks/usePaymentCards';
import { useDeletePaymentCard } from '@/hooks/usePaymentCards';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddCard() {
    const navigate = useNavigate();
    const { data: paymentCards, isLoading, refetch } = usePaymentCards();
    const { mutate: deleteCard } = useDeletePaymentCard();

    const handleDeleteCard = (cardId: string, cardNumber: string) => {
        if (window.confirm(`Are you sure you want to delete card ending in ${cardNumber.slice(-4)}?`)) {
            deleteCard(cardId, {
                onSuccess: () => {
                    toast.success('Card deleted successfully');
                    refetch();
                },
            });
        }
    };

    const getCardTypeIcon = (cardType: string) => {
        switch (cardType.toLowerCase()) {
            case 'mastercard':
                return <MasterCardIcon />;
            case 'visa':
                return <VisaIcon />;
            default:
                return <CreditCard />;
        }
    };

    if (isLoading) {
        return (
            <Container className='justify-start overflow-hidden'>
                <Box className={'mb-8 flex w-full items-center gap-20'}>
                    <IconButton
                        size='medium'
                        disableRipple
                        className='text-text-muted border border-gray-200'
                        onClick={() => navigate(-1)}
                    >
                        <KeyboardArrowLeftOutlined />
                    </IconButton>
                    <Typography variant='h4'>Payment Cards</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container className='justify-start overflow-hidden'>
            {/* Header */}
            <Box className={'mb-8 flex w-full items-center gap-20'}>
                <IconButton
                    size='medium'
                    disableRipple
                                          className="text-text-muted border border-gray-200"
                    onClick={() => navigate(-1)}
                >
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment Cards</Typography>
            </Box>

            {/* All Cards Section */}
            <Box sx={{ width: '100%', alignSelf: 'flex-start', mb: 4 }}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                    All Cards
                </Typography>

                {paymentCards && paymentCards.length > 0 ? (
                    <Box sx={{ width: '100%' }}>
                        {paymentCards.map((card, index) => (
                            <Box
                                key={card.id}
                                sx={{
                                    display: 'flex',
                                    cursor: 'pointer',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderRadius: 2,
                                    bgcolor: '#f8f8f8',
                                    p: 2,
                                    mb: 1.5,
                                    width: '100%',
                                    border: '1px solid transparent',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: '#f0f0f0',
                                        transform: 'translateY(-1px)',
                                        boxShadow: 1,
                                    },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    {getCardTypeIcon(card.card_type)}
                                    <Box>
                                        <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                            **** {card.last_four_digits}
                                        </Typography>
                                        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                                            {card.card_type.toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/payments/details?edit=${card.id}`);
                                        }}
                                        sx={{
                                            color: 'primary.main',
                                            '&:hover': { bgcolor: 'primary.light' }
                                        }}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteCard(card.id, card.last_four_digits);
                                        }}
                                        sx={{
                                            color: 'error.main',
                                            '&:hover': { bgcolor: 'error.light' }
                                        }}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ 
                        textAlign: 'center', 
                        py: 4, 
                        color: 'text.secondary',
                        width: '100%'
                    }}>
                        <CreditCard sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                        <Typography variant="body2">
                            No cards added yet
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Recently Used Card Section */}
            <Box sx={{ width: '100%', alignSelf: 'flex-start', mb: 4 }}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                    Recently Used Card
                </Typography>

                {paymentCards && paymentCards.length > 0 ? (
                    <Box sx={{ width: '100%' }}>
                        <Box
                            sx={{
                                height: 185,
                                width: '100%',
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: 3,
                            }}
                        >
                            {/* Card Content */}
                            <Box sx={{ 
                                position: 'relative', 
                                zIndex: 30, 
                                display: 'flex', 
                                height: '100%', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between', 
                                p: 3, 
                                gap: 2, 
                                color: 'white' 
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <Typography variant='body2' sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                        Credit
                                    </Typography>
                                    <Box sx={{ height: 32, width: 32 }}>
                                        {getCardTypeIcon(paymentCards[0].card_type)}
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                                            {paymentCards[0].card_type.toUpperCase()}
                                        </Typography>
                                        <Typography sx={{ 
                                            fontFamily: 'monospace', 
                                            letterSpacing: '0.05em',
                                            fontSize: '1rem'
                                        }}>
                                            **** **** **** {paymentCards[0].last_four_digits}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant='caption' sx={{ opacity: 0.8 }}>
                                            Valid date
                                        </Typography>
                                        <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                                            {paymentCards[0].expiry_date}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ 
                        textAlign: 'center', 
                        py: 4, 
                        color: 'text.secondary',
                        width: '100%'
                    }}>
                        <CreditCard sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                        <Typography variant="body2">
                            No recently used card
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Add New Card Button */}
            <Box sx={{ width: '100%', mt: 'auto', mb: 4 }}>
                <Button
                    variant='outlined'
                    fullWidth
                    sx={{
                        height: 56,
                        gap: 1,
                        border: '2px dashed',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        fontWeight: 500,
                        fontSize: '1rem',
                        '&:hover': {
                            borderColor: 'primary.dark',
                            backgroundColor: 'primary.light',
                            color: 'primary.dark',
                        },
                    }}
                    onClick={() => navigate('/payments/details')}
                >
                    <AddCircleOutlineRounded sx={{ height: 24, width: 24 }} />
                    Add New Card
                </Button>
            </Box>
        </Container>
    );
}

export default AddCard;
