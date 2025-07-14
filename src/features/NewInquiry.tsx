import React, { useState, useEffect, useRef } from 'react';
import { ToggleOn, ToggleOff } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import AddPlus from '@/components/icons/plus.svg?react';
import CircleArrowIcon from '@/components/icons/arrowcircleleft.svg?react';
import Input from '@/components/forms/Input';
import CustomMobileDatePicker from '@/components/forms/MobileDatePicker';
import Container from '@/components/layout/Container';
import useEventStore from '@/store/eventStore';
import { useNavigate } from 'react-router-dom';
import LocationInput from '@/components/forms/LocationInput';
import { handleEvent } from '@/utils/supabase';
import toast from 'react-hot-toast';

const NewInquiry: React.FC = () => {
    const inquiry = useEventStore(state => state.inquiry);
    const setInquiry = useEventStore(state => state.setInquiry);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [start_date, setStartDate] = useState(new Date());
    const [start_time, setStartTime] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [end_time, setEndTime] = useState(new Date());
    const [ticketPricingEnabled, setTicketPricingEnabled] = useState(false);

    const locationInitialized = useRef(false);

    useEffect(() => {
        if (inquiry) {
            setTitle(inquiry.title || '');
            setStartDate(inquiry.start_date ? new Date(inquiry.start_date) : new Date());
            setStartTime(inquiry.start_time ? new Date(inquiry.start_time) : new Date());
            setEndDate(inquiry.end_date ? new Date(inquiry.end_date) : new Date());
            setEndTime(inquiry.end_time ? new Date(inquiry.end_time) : new Date());
            setTicketPricingEnabled(inquiry.ticketPricingEnabled ?? false);

            if (!locationInitialized.current) {
                setLocation(inquiry.location || '');
                locationInitialized.current = true;
            }
        }
    }, [inquiry]);

    const handleCreate = async () => {
        try {
            const inquiryData = {
                ...inquiry,
                title,
                location,
                start_date: start_date.toISOString(),
                end_date: end_date.toISOString(),
                start_time: start_time.toISOString(),
                end_time: end_time.toISOString(),
                type: 'inquiry',
                status: 'draft',
            };

            const newInquiry = await handleEvent(inquiryData);
            setInquiry(newInquiry); // Store in Zustand
            navigate('/create-event');
        } catch {
            toast.error('Failed to save inquiry');
        }
    };

    return (
        <Container className='justify-start gap-20'>
            <Box className='flex w-full items-center justify-between'>
                <CircleArrowIcon />
                <Typography variant='h3'>New Inquiry</Typography>
                <Button onClick={handleCreate} variant='contained' size='small' className='h-8 w-20 normal-case'>
                    Create
                </Button>
            </Box>

            <Box className='flex w-full flex-col items-center justify-between gap-3'>
                <Input placeholder='Inquiry Title' value={title} onChange={e => setTitle(e.target.value)} />
                <LocationInput value={location} onChange={val => setLocation(val)} />{' '}
                <CustomMobileDatePicker
                    label='From'
                    date={start_date}
                    setDate={setStartDate}
                    time={start_time}
                    setTime={setStartTime}
                />
                <CustomMobileDatePicker
                    label='To'
                    date={end_date}
                    setDate={setEndDate}
                    time={end_time}
                    setTime={setEndTime}
                />
            </Box>

            <Box className='flex flex-col gap-5'>
                <Typography variant='h3' className='self-start'>
                    Profile image
                </Typography>
                <Box className='flex items-center gap-3'>
                    <AddPlus />
                    <Avatar src='https://i.pravatar.cc/150?img=1' className='h-20 w-20' />
                    <Avatar src='https://i.pravatar.cc/150?img=2' className='h-20 w-20' />
                    <Avatar src='https://i.pravatar.cc/150?img=3' className='h-20 w-20' />
                </Box>

                <Box
                    className='w-full cursor-pointer'
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '50px',
                        px: 2,
                        borderRadius: '30px',
                        border: '1px solid #EEE',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            borderColor: '#5D9BFC',
                        },
                    }}
                    onClick={() => setTicketPricingEnabled(prev => !prev)}
                    role='switch'
                    aria-checked={ticketPricingEnabled}
                    tabIndex={0}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setTicketPricingEnabled(prev => !prev);
                        }
                    }}
                >
                    <Box>
                        <Typography fontSize={14} fontWeight={600}>
                            Tickets
                        </Typography>
                        <Typography fontSize={12} color='text.secondary' lineHeight={1}>
                            You can set up price for tickets
                        </Typography>
                    </Box>
                    {ticketPricingEnabled ? (
                        <ToggleOn sx={{ color: '#5D9BFC' }} />
                    ) : (
                        <ToggleOff sx={{ color: '#AAA' }} />
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default NewInquiry;
