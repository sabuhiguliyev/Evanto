import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Grid, Typography, Button, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import CircleCrossIcon from '@/components/icons/crosscircle.svg?react';
import { useDataStore } from '@/store/dataStore';

const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=6',
    'https://i.pravatar.cc/150?img=7',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=9',
    'https://i.pravatar.cc/150?img=10',
    'https://i.pravatar.cc/150?img=11',
    'https://i.pravatar.cc/150?img=12',
    'https://i.pravatar.cc/150?img=13',
    'https://i.pravatar.cc/150?img=14',
    'https://i.pravatar.cc/150?img=15',
    'https://i.pravatar.cc/150?img=16',
];
function MeetUp2() {
    const navigate = useNavigate();
    const selectedPhoto = useDataStore(state => state.meetupCreation.selectedPhoto);
    const setMeetupName = useDataStore(state => state.setMeetupName);
    const setMeetupDate = useDataStore(state => state.setMeetupDate);
    const setMeetupLink = useDataStore(state => state.setMeetupLink);
    const setMeetupDescription = useDataStore(state => state.setMeetupDescription);
    
    const [meetupName, setLocalMeetupName] = React.useState('');
    const [meetupDate, setLocalMeetupDate] = React.useState<Date | null>(null);
    const [meetupLink, setLocalMeetupLink] = React.useState('');
    const [meetupDescription, setLocalMeetupDescription] = React.useState('');

    const handleContinue = () => {
        if (!meetupName || !meetupDate || !meetupLink || !meetupDescription) {
            return; // Don't proceed if fields are empty
        }
        
        // Save to dataStore
        setMeetupName(meetupName);
        setMeetupDate(meetupDate);
        setMeetupLink(meetupLink);
        setMeetupDescription(meetupDescription);
        
        navigate('/create-meetup-3');
    };

    const handleBack = () => {
        navigate('/create-meetup-1');
    };

    return (
        <Container className='justify-around'>
            <Box className='mt-[-20px] flex items-center justify-between gap-14'>
                <IconButton onClick={handleBack} className='text-text-3' sx={{ border: '1px solid #eee' }}>
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Create Meetup</Typography>
                <CircleCrossIcon />
            </Box>
            
            {selectedPhoto && (
                <img src={selectedPhoto} alt='selected photo' className='h-1/3 w-full rounded-xl' />
            )}

            <Box className='flex flex-col gap-4 w-full'>
                <input
                    type='text'
                    placeholder='Meetup Name'
                    value={meetupName}
                    onChange={(e) => setLocalMeetupName(e.target.value)}
                    className='w-full p-3 border border-gray-300 rounded-lg'
                />
                
                <input
                    type='datetime-local'
                    value={meetupDate ? meetupDate.toISOString().slice(0, 16) : ''}
                    onChange={(e) => setLocalMeetupDate(new Date(e.target.value))}
                    className='w-full p-3 border border-gray-300 rounded-lg'
                />
                
                <input
                    type='url'
                    placeholder='Meetup Link (Zoom, Google Meet, etc.)'
                    value={meetupLink}
                    onChange={(e) => setLocalMeetupLink(e.target.value)}
                    className='w-full p-3 border border-gray-300 rounded-lg'
                />
                
                <textarea
                    placeholder='Meetup Description'
                    value={meetupDescription}
                    onChange={(e) => setLocalMeetupDescription(e.target.value)}
                    className='w-full p-3 border border-gray-300 rounded-lg h-24'
                />
            </Box>

            <Button 
                variant='contained' 
                className='w-full' 
                disabled={!meetupName || !meetupDate || !meetupLink || !meetupDescription}
                onClick={handleContinue}
            >
                Continue
            </Button>
        </Container>
    );
}

export default MeetUp2;
