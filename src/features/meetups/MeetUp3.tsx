import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, InputAdornment, TextField, Typography, Button, MenuItem } from '@mui/material';
import { EditOutlined, KeyboardArrowLeft, CloseOutlined } from '@mui/icons-material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import Container from '../../components/layout/Container';
import Input from '../../components/forms/Input';
import GroupUserIcon from '@/components/icons/group.svg?react';
import CameraIcon from '@/components/icons/video.svg?react';
import useUserStore from '@/store/userStore';
import { supabase } from '@/utils/supabase';
import { showError, showSuccess } from '@/utils/notifications';
import useEventStore from '@/store/eventStore';

function MeetUp3() {
    const navigate = useNavigate();
    const userId = useUserStore(state => state.user?.id);
    const categories = useEventStore(state => state.categories);

    const [selectedPhoto, setSelectedPhoto] = React.useState('');
    const [meetupName, setMeetupName] = React.useState('');
    const [meetupDate, setMeetupDate] = React.useState<Date | null>(null);
    const [meetupLink, setMeetupLink] = React.useState('');
    const [meetupDescription, setMeetupDescription] = React.useState('');

    const [category, setCategory] = React.useState('');

    const onSubmit = async () => {
        if (!userId || !meetupName || !meetupLink || !meetupDescription || !selectedPhoto || !meetupDate) {
            console.log(userId, meetupName, meetupLink, meetupDescription, selectedPhoto, meetupDate);
            showError('Please fill in all fields before submitting.');
            return;
        }

        const { error } = await supabase.from('meetups').insert({
            user_id: userId,
            meetup_name: meetupName,
            meetup_date: meetupDate ? meetupDate.toISOString() : null,
            meetup_link: meetupLink,
            meetup_description: meetupDescription,
            image_url: selectedPhoto,
            category: category || 'All',
        });

        if (error) {
            showError('Failed to create meetup: ' + error.message);
        } else {
            showSuccess('Meetup created successfully!');
            navigate('/main-page-1');
        }
    };

    function handleClose() {
        setMeetupName('');
        setMeetupLink('');
        setMeetupDescription('');
        setSelectedPhoto('');
        setMeetupDate(null);
        setCategory('');
        navigate('/main-page-1');
    }

    return (
        <Container className='justify-around'>
            <Box className='mt-[-20px] flex items-center justify-between gap-14'>
                <IconButton onClick={() => navigate(-1)} className='text-text-3' sx={{ border: '1px solid #eee' }}>
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Create Meetup</Typography>
                <IconButton onClick={handleClose} className='text-text-3' sx={{ border: '1px solid #eee' }}>
                    <CloseOutlined onClick={handleClose} />
                </IconButton>
            </Box>
            <Input
                label='Meetup Name'
                placeholder='Give a name to your meetup'
                startIcon={<GroupUserIcon />}
                value={meetupName}
                onChange={e => setMeetupName(e.target.value)}
            />
            <MobileDateTimePicker
                label='Meetup Date & Time'
                value={meetupDate}
                onChange={date => date && setMeetupDate(date)}
                sx={{
                    '& .MuiInputBase-input': {
                        color: '#aaa',
                    },
                    '& .MuiInputBase-root': {
                        borderRadius: '100px',
                    },
                    width: '100%',
                }}
            />
            <TextField
                select
                label='Category'
                className='text-input'
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                {categories.map(category => (
                    <MenuItem key={category.name} value={category.name}>
                        {category.name}
                    </MenuItem>
                ))}
            </TextField>

            <Input
                label='Online Meetup Link'
                placeholder='E.g. zoom.us/campusemeetupZA'
                startIcon={<CameraIcon />}
                value={meetupLink}
                onChange={e => setMeetupLink(e.target.value)}
            />
            <Box className='flex h-20 w-[300px] items-center justify-center rounded-lg bg-[#5D9BFC26]'>
                <Typography variant='body2' className='w-56 text-primary-1'>
                    We recommend zoom for online meetups. Simply set up a meeting and paste the link in here.
                </Typography>
            </Box>
            <Box className='flex w-full flex-col gap-2'>
                <Typography className='text-sm font-bold text-black'>Meetup Description</Typography>
                <TextField
                    placeholder='What is your meetup about?'
                    multiline
                    rows={4}
                    value={meetupDescription}
                    onChange={e => setMeetupDescription(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start' className='self-start text-text-3'>
                                <EditOutlined fontSize='small' />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                        '& input::placeholder': {
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                />
            </Box>
            <Button variant='contained' className='w-full' onClick={onSubmit}>
                Continue
            </Button>
        </Container>
    );
}

export default MeetUp3;
