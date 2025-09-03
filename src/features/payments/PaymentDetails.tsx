import React, { useEffect, useState } from 'react';
import { 
    CreditCardOutlined, 
    CropFree, 
    KeyboardArrowLeftOutlined,
    Visibility,
    VisibilityOff,
    CheckCircle,
    CreditCard
} from '@mui/icons-material';
import { 
    Box, 
    Button, 
    IconButton, 
    TextField, 
    Typography, 
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    InputAdornment
} from '@mui/material';
import Container from '@/components/layout/Container';
import PaymentCard from '@/components/cards/PaymentCard';
import MasterCardIcon from '@/components/icons/mastercard.svg?react';
import VisaIcon from '@/components/icons/visa.svg?react';
import { useCreatePaymentCard, useUpdatePaymentCard } from '@/hooks/usePaymentCards';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Form-specific schema for payment card input
const paymentCardFormSchema = z.object({
    card_holder: z.string().min(1, 'Card holder name is required'),
    card_number: z
        .string()
        .min(16, 'Card number must be 16 digits')
        .max(19, 'Card number too long')
        .regex(/^[0-9\s]+$/, 'Card number must contain only numbers'),
    expiry_date: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in MM/YY format'),
    cvv: z
        .string()
        .min(3, 'CVV must be 3 digits')
        .max(4, 'CVV must be 3-4 digits')
        .regex(/^[0-9]+$/, 'CVV must contain only numbers'),
    card_type: z.enum(['visa', 'mastercard', 'amex', 'discover', 'other']),
});

type PaymentCardFormData = z.infer<typeof paymentCardFormSchema>;
import { supabase } from '@/utils/supabase';
import toast from 'react-hot-toast';

function PaymentDetails() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editCardId = searchParams.get('edit');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [cardType, setCardType] = useState('mastercard');

    const { mutate: createCard, isPending: isCreating } = useCreatePaymentCard();
    const { mutate: updateCard, isPending: isUpdating } = useUpdatePaymentCard();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
        setValue,
        trigger
    } = useForm({
        resolver: zodResolver(paymentCardFormSchema),
        defaultValues: {
            card_holder: '',
            card_number: '',
            expiry_date: '',
            cvv: '',
            card_type: 'mastercard' as const,
        },
        mode: 'onChange'
    });

    const formData = watch();

    // Auto-detect card type based on card number
    const detectCardType = (cardNumber: string) => {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        if (cleanNumber.startsWith('4')) {
            setCardType('visa');
            setValue('card_type', 'visa');
        } else if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) {
            setCardType('mastercard');
            setValue('card_type', 'mastercard');
        }
    };

    // Enhanced card number formatting
    const formatCardNumber = (value: string) => {
        const cleanValue = value.replace(/\D/g, '').slice(0, 16);
        const formatted = cleanValue.replace(/(.{4})/g, '$1 ').trim();
        return formatted;
    };

    // Enhanced expiry date formatting
    const formatExpiryDate = (value: string) => {
        const cleanValue = value.replace(/\D/g, '').slice(0, 4);
        if (cleanValue.length > 2) {
            return cleanValue.slice(0, 2) + '/' + cleanValue.slice(2, 4);
        }
        return cleanValue;
    };

    // Validate expiry date
    const validateExpiryDate = (expiry: string) => {
        if (!expiry) return true;
        const [month, year] = expiry.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        const cardMonth = parseInt(month);
        const cardYear = parseInt(year);
        
        if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
            return false;
        }
        return true;
    };

    // Fetch card data if editing
    useEffect(() => {
        if (editCardId) {
            setIsEditing(true);
            setIsLoading(true);
            
            const fetchCardData = async () => {
                try {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) {
                        toast.error('User not authenticated');
                        navigate('/auth/sign-in');
                        return;
                    }

                    const { data, error } = await supabase
                        .from('payment_cards')
                        .select('*')
                        .eq('id', editCardId)
                        .eq('user_id', user.id)
                        .single();

                    if (error) {
                        toast.error('Failed to fetch card data');
                        navigate('/payments/cards');
                        return;
                    }

                    if (data) {
                        setCardType(data.card_type);
                        reset({
                            card_holder: data.card_holder,
                            card_number: data.card_number,
                            expiry_date: data.expiry_date,
                            cvv: data.cvv,
                            card_type: data.card_type,
                        });
                    }
                } catch (error) {
                    toast.error('Failed to fetch card data');
                    navigate('/payments/cards');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCardData();
        }
    }, [editCardId, reset, navigate]);

    const onSubmit = (data: PaymentCardFormData) => {
        if (isEditing && editCardId) {
            updateCard(
                { 
                    id: editCardId, 
                    data: {
                        card_holder: data.card_holder,
                        expiry_date: data.expiry_date
                    }
                },
                {
                    onSuccess: () => {
                        toast.success('Card updated successfully');
                        navigate('/payments/cards');
                    },
                    onError: () => {
                        toast.error('Failed to update card');
                    },
                }
            );
        } else {
            // Transform form data to match createPaymentCard expectations
            const [expiryMonth, expiryYear] = data.expiry_date.split('/');
            const lastFourDigits = data.card_number.replace(/\s/g, '').slice(-4);
            
            const transformedData = {
                type: 'card', // Fixed value for card type
                card_type: data.card_type,
                last_four_digits: lastFourDigits,
                expiry_month: parseInt(expiryMonth),
                expiry_year: parseInt('20' + expiryYear), // Convert YY to YYYY
            };
            
            createCard(transformedData, {
                onSuccess: () => {
                        toast.success('Card added successfully');
                        navigate('/payments/cards');
                    },
                    onError: () => {
                        toast.error('Failed to add card');
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
                return <CreditCardOutlined />;
        }
    };

    const getCardTypeColor = (cardType: string) => {
        switch (cardType.toLowerCase()) {
            case 'mastercard':
                return '#FF5F00';
            case 'visa':
                return '#1A1F71';
            default:
                return '#666';
        }
    };

    if (isLoading) {
    return (
        <Container className='justify-start'>
            <Box className={'mb-8 flex w-full items-center justify-between'}>
                <IconButton
                    size='medium'
                    disableRipple
                                          className="text-text-muted border border-gray-200"
                    onClick={() => navigate(-1)}
                >
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment</Typography>
                <IconButton size='medium' disableRipple className="text-text-muted border border-gray-200">
                    <CropFree />
                </IconButton>
            </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container className='justify-start'>
            <Box className={'mb-8 flex w-full items-center justify-between'}>
                <IconButton
                    size='medium'
                    disableRipple
                                          className="text-text-muted border border-gray-200"
                    onClick={() => navigate(-1)}
                >
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>{isEditing ? 'Edit Card' : 'Add New Card'}</Typography>
                <IconButton 
                    size='medium' 
                    disableRipple 
                    sx={{ 
                        border: '1px solid #EEEEEE',
                        color: 'primary.main',
                        backgroundColor: 'primary.light',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderColor: 'primary.main',
                            transform: 'scale(1.05)'
                        },
                        transition: 'all 0.2s ease',
                        position: 'relative'
                    }}
                    onClick={() => {
                        // TODO: Implement card scanning functionality
                
                        toast.success('Card scanning feature coming soon!');
                    }}
                    title="Scan Card Details"
                >
                    <CropFree sx={{ fontSize: 20 }} />
                </IconButton>
            </Box>
            
            {/* Enhanced Preview Card */}
            <Box sx={{ width: '100%', mb: 4 }}>
                <Box
                    sx={{
                        height: 200,
                        width: '100%',
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${getCardTypeColor(cardType)} 0%, ${getCardTypeColor(cardType)}dd 100%)`,
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: 4,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 6,
                        },
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
                                {getCardTypeIcon(cardType)}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                                    {formData.card_holder || 'Card Holder'}
                                </Typography>
                                <Typography sx={{ 
                                    fontFamily: 'monospace', 
                                    letterSpacing: '0.05em',
                                    fontSize: '1rem'
                                }}>
                                    {formData.card_number || '•••• •••• •••• ••••'}
                                </Typography>
                            </Box>

                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant='caption' sx={{ opacity: 0.8 }}>
                                    Valid date
                                </Typography>
                                <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                                    {formData.expiry_date || 'MM/YY'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            
            <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
                
                {/* Card Type Selection */}
                <FormControl fullWidth>
                    <InputLabel>Card Type</InputLabel>
                    <Select
                        value={cardType}
                        label="Card Type"
                        onChange={(e) => {
                            setCardType(e.target.value);
                            setValue('card_type', e.target.value as 'mastercard' | 'visa');
                        }}
                        className="text-input"
                        sx={{
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }
                        }}
                    >
                        <MenuItem value="mastercard">
                            <MasterCardIcon style={{ height: 20, width: 20 }} />
                            Mastercard
                        </MenuItem>
                        <MenuItem value="visa">
                            <VisaIcon style={{ height: 20, width: 20 }} />
                            Visa
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Card Holder */}
                <TextField
                    label='Card Holder Name'
                    placeholder='John Doe'
                    {...register('card_holder')}
                    error={!!errors.card_holder}
                    helperText={errors.card_holder?.message}
                    className="text-input"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CreditCardOutlined sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Card Number */}
                <TextField
                    label='Card Number'
                    placeholder='1234 5678 9012 3456'
                    {...register('card_number')}
                    error={!!errors.card_number}
                    helperText={errors.card_number?.message}
                    className="text-input"
                    onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        e.target.value = formatted;
                        detectCardType(formatted);
                        setValue('card_number', formatted);
                        trigger('card_number');
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {getCardTypeIcon(cardType)}
                            </InputAdornment>
                        ),
                    }}
                />

                {/* CVV and Expiry Date Row */}
                <Box className='flex gap-2'>
                    <TextField
                        label='CVV'
                        placeholder='123'
                        type={showPassword ? 'text' : 'password'}
                        {...register('cvv')}
                        error={!!errors.cvv}
                        helperText={errors.cvv?.message}
                        className="text-input"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label='Expiry Date'
                        placeholder='MM/YY'
                        {...register('expiry_date')}
                        error={!!errors.expiry_date || !validateExpiryDate(formData.expiry_date)}
                        helperText={
                            errors.expiry_date?.message || 
                            (!validateExpiryDate(formData.expiry_date) && formData.expiry_date ? 'Card has expired' : '')
                        }
                        className="text-input"
                        onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            e.target.value = formatted;
                            setValue('expiry_date', formatted);
                            trigger('expiry_date');
                        }}
                    />
                </Box>

                {/* Validation Status */}
                {Object.keys(errors).length > 0 && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                        Please fix the errors above to continue
                    </Alert>
                )}

                {/* Security Info */}
                <Box sx={{ 
                    bgcolor: 'grey.50', 
                    p: 2, 
                    borderRadius: 2, 
                    border: '1px solid',
                    borderColor: 'grey.200'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            Secure Payment
                        </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Your card information is encrypted and secure. We never store your CVV.
                    </Typography>
                </Box>

                <Button 
                    variant='contained' 
                    type='submit' 
                    disabled={!isValid || isCreating || isUpdating}
                    className='mt-auto'
                >
                    {isCreating || isUpdating 
                        ? (isEditing ? 'Updating...' : 'Saving...') 
                        : (isEditing ? 'Update Card' : 'Add Card')
                    }
                </Button>
            </form>
        </Container>
    );
}

export default PaymentDetails;
