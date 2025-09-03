import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Checkbox, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { EmailOutlined, FlagRounded, KeyboardArrowLeft, Search } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useBookingStore from '@/store/bookingStore';
import { useDataStore } from '@/store/dataStore';
import { showError } from '@/utils/notifications';
import { bookingFormSchema, type BookingFormData } from '@/utils/schemas';

function BookEvent() {
    const navigate = useNavigate();
    const { id: itemId } = useParams();
    const { bookingData } = useBookingStore();
    const setBookingData = useBookingStore(state => state.setBookingData);
    
    const [searchCountry, setSearchCountry] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [showCountryList, setShowCountryList] = useState(false);
    const countryDropdownRef = useRef<HTMLDivElement>(null);

    // Comprehensive country list with flags
    const countries = [
        { code: 'US', name: 'United States', flag: '🇺🇸' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦' },
        { code: 'AU', name: 'Australia', flag: '🇦🇺' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' },
        { code: 'FR', name: 'France', flag: '🇫🇷' },
        { code: 'IT', name: 'Italy', flag: '🇮🇹' },
        { code: 'ES', name: 'Spain', flag: '🇪🇸' },
        { code: 'JP', name: 'Japan', flag: '🇯🇵' },
        { code: 'CN', name: 'China', flag: '🇨🇳' },
        { code: 'IN', name: 'India', flag: '🇮🇳' },
        { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
        { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
        { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
        { code: 'NO', name: 'Norway', flag: '🇳🇴' },
        { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
        { code: 'FI', name: 'Finland', flag: '🇫🇮' },
        { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
        { code: 'AT', name: 'Austria', flag: '🇦🇹' },
        { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
        { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
        { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
        { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
        { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
        { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
        { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
        { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
        { code: 'PL', name: 'Poland', flag: '🇵🇱' },
        { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
        { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
        { code: 'RO', name: 'Romania', flag: '🇷🇴' },
        { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
        { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
        { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
        { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
        { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
        { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
        { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
        { code: 'GR', name: 'Greece', flag: '🇬🇷' },
        { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
        { code: 'RU', name: 'Russia', flag: '🇷🇺' },
        { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
        { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
        { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
        { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
        { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
        { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
        { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
        { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
        { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
        { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
        { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
        { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
        { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
        { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
        { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
        { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
        { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
        { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
        { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
        { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
        { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
        { code: 'LA', name: 'Laos', flag: '🇱🇦' },
        { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
        { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
        { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
        { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
        { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱' },
        { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
        { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
        { code: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
        { code: 'NC', name: 'New Caledonia', flag: '🇳🇨' },
        { code: 'PF', name: 'French Polynesia', flag: '🇵🇫' },
        { code: 'TO', name: 'Tonga', flag: '🇹🇴' },
        { code: 'WS', name: 'Samoa', flag: '🇼🇸' },
        { code: 'KI', name: 'Kiribati', flag: '🇰🇮' },
        { code: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
        { code: 'NR', name: 'Nauru', flag: '🇳🇷' },
        { code: 'PW', name: 'Palau', flag: '🇵🇼' },
        { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
        { code: 'FM', name: 'Micronesia', flag: '🇫🇲' },
        { code: 'CK', name: 'Cook Islands', flag: '🇨🇰' },
        { code: 'NU', name: 'Niue', flag: '🇳🇺' },
        { code: 'TK', name: 'Tokelau', flag: '🇹🇰' },
        { code: 'AS', name: 'American Samoa', flag: '🇦🇸' },
        { code: 'GU', name: 'Guam', flag: '🇬🇺' },
        { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵' },
        { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
        { code: 'VI', name: 'U.S. Virgin Islands', flag: '🇻🇮' },
        { code: 'AI', name: 'Anguilla', flag: '🇦🇮' },
        { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬' },
        { code: 'AW', name: 'Aruba', flag: '🇦🇼' },
        { code: 'BS', name: 'Bahamas', flag: '🇧🇸' },
        { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
        { code: 'BZ', name: 'Belize', flag: '🇧🇿' },
        { code: 'BM', name: 'Bermuda', flag: '🇧🇲' },
        { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
        { code: 'CL', name: 'Chile', flag: '🇨🇱' },
        { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
        { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
        { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
        { code: 'DM', name: 'Dominica', flag: '🇩🇲' },
        { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
        { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
        { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
        { code: 'GD', name: 'Grenada', flag: '🇬🇩' },
        { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
        { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
        { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
        { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
        { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
        { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
        { code: 'PA', name: 'Panama', flag: '🇵🇦' },
        { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
        { code: 'PE', name: 'Peru', flag: '🇵🇪' },
        { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
        { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
        { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
        { code: 'SR', name: 'Suriname', flag: '🇸🇷' },
        { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
        { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
        { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
        { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
        { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
        { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
        { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
        { code: 'CV', name: 'Cape Verde', flag: '🇨🇻' },
        { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
        { code: 'TD', name: 'Chad', flag: '🇹🇩' },
        { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
        { code: 'CG', name: 'Congo', flag: '🇨🇬' },
        { code: 'CD', name: 'Democratic Republic of the Congo', flag: '🇨🇩' },
        { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
        { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
        { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
        { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
        { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
        { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
        { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
        { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
        { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
        { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
        { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
        { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
        { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
        { code: 'LY', name: 'Libya', flag: '🇱🇾' },
        { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
        { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
        { code: 'ML', name: 'Mali', flag: '🇲🇱' },
        { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
        { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
        { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
        { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
        { code: 'NA', name: 'Namibia', flag: '🇲🇦' },
        { code: 'NE', name: 'Niger', flag: '🇳🇪' },
        { code: 'NG', name: 'Nigeria', flag: '🇫🇷' },
        { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
        { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹' },
        { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
        { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
        { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
        { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
        { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
        { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
        { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
        { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
        { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
        { code: 'TG', name: 'Togo', flag: '🇹🇬' },
        { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
        { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
        { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
        { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
        { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
        { code: 'AO', name: 'Angola', flag: '🇦🇴' },
        { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
        { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
        { code: 'CI', name: 'Cote d\'Ivoire', flag: '🇨🇮' },
        { code: 'EH', name: 'Western Sahara', flag: '🇪🇭' }
    ];

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
        country.code.toLowerCase().includes(searchCountry.toLowerCase())
    );

    useEffect(() => {
        if (itemId) {
            // Only clear data if this is a different event than what's currently stored
            const currentEventId = bookingData.event_id;
            if (currentEventId !== itemId) {
                // Clear previous booking data and only set the new event_id
                setBookingData({ 
                    event_id: itemId,
                    first_name: '',
                    last_name: '',
                    gender: 'male',
                    birth_date: new Date(),
                    email: '',
                    phone: '',
                    country: '',
                    accept_terms: false,
                    selected_seats: [], // Clear selected seats
                });
                // Reset local state
                setSelectedCountry('');
                setSearchCountry('');
                setShowCountryList(false);
            }
        }
    }, [itemId, setBookingData, bookingData.event_id]);

    // Click outside handler to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setShowCountryList(false);
                setSearchCountry('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            gender: 'male',
            birth_date: new Date(),
            email: '',
            phone: '',
            country: '',
            accept_terms: false,
        },
    });

    // Reset form when itemId changes (after form is declared)
    useEffect(() => {
        if (itemId) {
            // Only reset form if this is a different event
            const currentEventId = bookingData.event_id;
            if (currentEventId !== itemId) {
                reset({
                    first_name: '',
                    last_name: '',
                    gender: 'male',
                    birth_date: new Date(),
                    email: '',
                    phone: '',
                    country: '',
                    accept_terms: false,
                });
            }
        }
    }, [itemId, reset, bookingData.event_id]);

    // Populate form with existing bookingData when component mounts or bookingData changes
    useEffect(() => {
        if (bookingData && Object.keys(bookingData).length > 0) {
            // Only populate if we have data and it's not just the event_id
            if (bookingData.first_name || bookingData.last_name || bookingData.email) {
                reset({
                    first_name: bookingData.first_name || '',
                    last_name: bookingData.last_name || '',
                    gender: bookingData.gender || 'male',
                    birth_date: bookingData.birth_date || new Date(),
                    email: bookingData.email || '',
                    phone: bookingData.phone || '',
                    country: bookingData.country || '',
                    accept_terms: bookingData.accept_terms || false,
                });
                
                // Also update local state for country selection
                if (bookingData.country) {
                    setSelectedCountry(bookingData.country);
                }
            }
        }
    }, [bookingData, reset]);

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country.name);
        setValue('country', country.name);
        setShowCountryList(false);
        setSearchCountry('');
    };

    const onSubmit = (data: BookingFormData) => {
        setBookingData(data);
        // Set the event ID in the dataStore before navigating
        const { setEventId } = useDataStore.getState();
        if (itemId) {
            setEventId(itemId);
        }
        navigate('/bookings/select-seats');
    };

    const onError = () => {
        showError('Please fix the errors in the form before submitting.');
    };

    return (
        <Container className='justify-start'>
            <Box className='mb-10 flex w-full items-center justify-between'>
                <IconButton onClick={() => navigate(-1)} className="text-text-muted border border-gray-200">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4' className='mx-auto'>
                    Book Event
                </Typography>
            </Box>
            <Box
                component='form'
                className='flex w-full flex-col justify-start gap-4'
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <TextField
                    label='First name'
                    className='text-input'
                    {...register('first_name')}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                />
                <TextField
                    label='Last name'
                    className='text-input'
                    {...register('last_name')}
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                />
                <Controller
                    name='gender'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            select
                            label='Gender'
                            className='text-input'
                            {...field}
                            error={!!errors.gender}
                            helperText={errors.gender?.message}
                        >
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                        </TextField>
                    )}
                />
                <Controller
                    name='birth_date'
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            label='Birth Date'
                            value={field.value}
                            onChange={field.onChange}
                            slotProps={{
                                textField: {
                                    className: 'text-input w-full',
                                    error: !!errors.birth_date,
                                    helperText: errors.birth_date?.message,
                                },
                            }}
                        />
                    )}
                />
                <TextField
                    label='Email'
                    className='text-input'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    slotProps={{
                        input: {
                            startAdornment: <EmailOutlined sx={{ mr: 1, color: 'text.secondary' }} />,
                        },
                    }}
                />
                <TextField
                    label='Phone'
                    className='text-input'
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    slotProps={{
                        input: {
                            startAdornment: <FlagRounded sx={{ mr: 1, color: 'text.secondary' }} />,
                        },
                    }}
                />
                
                {/* Enhanced Country Selection */}
                <Box className="relative" ref={countryDropdownRef}>
                    <TextField
                        label='Country'
                        className='text-input'
                        placeholder="Search and select your country"
                        value={selectedCountry}
                        {...register('country')}
                        onChange={(e) => {
                            setSearchCountry(e.target.value);
                            setSelectedCountry(e.target.value);
                            setShowCountryList(true);
                        }}
                        onClick={() => setShowCountryList(true)}
                        onFocus={() => setShowCountryList(true)}
                        error={!!errors.country}
                        helperText={errors.country?.message}
                        slotProps={{
                            input: {
                                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                            },
                        }}
                    />
            
                    {showCountryList && (
                        <Box className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto no-scrollbar bg-white border border-gray-200 rounded-md shadow-lg">
                            <Box className="p-2 border-b border-gray-100">
                                <TextField
                                    placeholder="Search countries..."
                                    value={searchCountry}
                                    onChange={(e) => setSearchCountry(e.target.value)}
                                    size="small"
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                                        },
                                    }}
                                />
                            </Box>
                            <Box className="max-h-48 overflow-y-auto no-scrollbar">
                                {filteredCountries.slice(0, 20).map((country) => (
                                    <Box
                                        key={country.code}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                        onClick={() => handleCountrySelect(country)}
                                    >
                                        <span className="text-xl">{country.flag}</span>
                                        <Typography variant="body2">{country.name}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box className='flex items-start'>
                    <Checkbox 
                        {...register('accept_terms')}
                        size='small' 
                        color='primary' 
                    />
                    <Typography variant='body2' className='ml-2 text-text-muted font-poppins'>
                        I accept the evanto{' '}
                        <span className='text-primary'>Terms of services. Community guideline</span>, and{' '}
                        <span className='text-primary'> Privacy Policy</span> (Required)
                    </Typography>
                </Box>
                {errors.accept_terms && (
                    <Typography variant='caption' color='error'>
                        {errors.accept_terms.message}
                    </Typography>
                )}
                <Button variant='contained' type='submit' className='mt-4'>
                    Continue to Seats
                </Button>
            </Box>
        </Container>
    );
}

export default BookEvent;
