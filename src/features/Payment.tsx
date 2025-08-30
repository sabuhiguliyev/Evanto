import React from 'react';
import { Box, IconButton, Radio, Typography, Container, CircularProgress, Chip, Divider } from '@mui/material';
import { KeyboardArrowLeftOutlined, AddCircleOutlineRounded, CreditCard, Delete } from '@mui/icons-material';
import MastercardIcon from '@/components/icons/mastercard.svg?react';
import VisaIcon from '@/components/icons/visa.svg?react';
import { usePaymentCards } from '@/hooks/usePaymentCards';
import { useNavigate } from 'react-router-dom';
import { useSetDefaultPaymentCard, useDeletePaymentCard } from '@/hooks/usePaymentCards';
import toast from 'react-hot-toast';

function Payment() {
    const navigate = useNavigate();
    const { data: paymentCards, isLoading, refetch } = usePaymentCards();
    const { mutate: setDefaultCard } = useSetDefaultPaymentCard();
    const { mutate: deleteCard } = useDeletePaymentCard();

    // Sort cards to maintain original order (by created_at) instead of moving default to top
    const sortedCards = paymentCards?.sort((a, b) => 
        new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
    );

    const handleCardSelect = (cardId: string) => {
        setDefaultCard(cardId, {
            onSuccess: () => {
                toast.success('Default payment card updated');
                refetch();
            },
        });
    };

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
                return <MastercardIcon />;
            case 'visa':
                return <VisaIcon />;
            default:
                return <CreditCard />;
        }
    };

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container
            disableGutters
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                gap: '15px',
                width: '375px',
                height: '100vh',
                paddingX: '20px',
                paddingY: '35px',
                marginX: 5,
                marginTop: 5,
                border: '1px solid gray',
                overflowY: 'auto',
            }}
        >
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
                <IconButton onClick={() => navigate(-1)}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment Methods</Typography>
                <Box sx={{ width: 40, height: 40 }} /> {/* Spacer to maintain layout balance */}
            </Box>

            <Typography variant='body2' sx={{ mb: 4, alignSelf: 'flex-start', color: 'text.secondary' }}>
                Select a default payment card
            </Typography>

            {sortedCards && sortedCards.length > 0 ? (
                <>
                    {sortedCards.map((card, index) => (
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
                                border: card.is_default ? '2px solid' : '1px solid',
                                borderColor: card.is_default ? 'primary.main' : 'transparent',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: '#f0f0f0',
                                    transform: 'translateY(-1px)',
                                    boxShadow: 1,
                                },
                            }}
                            onClick={() => handleCardSelect(card.id)}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                {getCardTypeIcon(card.card_type)}
                                <Box>
                                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                        **** {card.card_number.slice(-4)}
                                    </Typography>
                                    <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                                        {card.card_holder}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {card.is_default && (
                                    <Chip 
                                        label="Default" 
                                        size="small" 
                                        color="primary" 
                                        variant="outlined"
                                        sx={{ fontSize: '0.7rem' }}
                                    />
                                )}
                                <Radio 
                                    checked={card.is_default} 
                                    onChange={() => handleCardSelect(card.id)}
                                    onClick={e => e.stopPropagation()} 
                                />
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCard(card.id, card.card_number);
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
                    
                    <Divider sx={{ my: 2, width: '100%' }} />
                </>
            ) : (
                <Box sx={{ 
                    textAlign: 'center', 
                    py: 4, 
                    color: 'text.secondary',
                    width: '100%'
                }}>
                    <CreditCard sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                    <Typography variant="body2">
                        No payment cards added yet
                    </Typography>
                </Box>
            )}

            <Box
                sx={{
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    p: 2,
                    mt: 2,
                    width: '100%',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        bgcolor: 'primary.light',
                        borderColor: 'primary.dark',
                        '& .MuiTypography-root': {
                            color: 'primary.dark',
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'primary.dark',
                        },
                    },
                }}
                onClick={() => navigate('/payment-card')}
            >
                <AddCircleOutlineRounded sx={{ mr: 1, height: 24, width: 24, color: 'primary.main' }} />
                <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Add New Card
                </Typography>
            </Box>
        </Container>
    );
}

export default Payment;
