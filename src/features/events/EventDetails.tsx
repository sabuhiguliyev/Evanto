import React from 'react';
import { Avatar, AvatarGroup, Box, Button, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { ArrowCircleLeft, PlayArrow } from '@mui/icons-material';
import { CalendarMonth, LocationOn, Favorite, ArrowBack } from '@mui/icons-material';
import { PageHeader } from '@/components/layout/PageHeader';
import { Link } from 'react-router-dom';
import { useFavorite } from '@/hooks/useFavorite';
import { useUserStore } from '@/store/userStore';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/entityConfigs';
import { getAvatarProps } from '@/utils/avatarUtils';
import { useDarkMode } from '@/contexts/DarkModeContext';

// Calendar functionality
const generateICalFile = (eventData: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location?: string;
}) => {
    const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Evanto//Event Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@evanto.com`,
        `DTSTAMP:${formatDate(new Date())}`,
        `DTSTART:${formatDate(eventData.startDate)}`,
        `DTEND:${formatDate(eventData.endDate)}`,
        `SUMMARY:${eventData.title}`,
        `DESCRIPTION:${eventData.description.replace(/\n/g, '\\n')}`,
        eventData.location ? `LOCATION:${eventData.location}` : '',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
    ].filter(line => line !== '').join('\r\n');

    return icsContent;
};

const downloadCalendarFile = (icsContent: string, filename: string) => {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
};

// Member avatars and count will be taken from event data

function EventDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const event = location.state?.event;
    const { isFavorite, toggle, isLoading, isEnabled } = useFavorite(event?.id?.toString(), event?.type);
    const [organizerName, setOrganizerName] = useState<string>('Loading...');
    const currentUser = useUserStore(state => state.user);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const theme = useTheme();
    
    // Use TanStack Query hook to fetch organizer profile
    const { data: organizerProfile } = useUser(event?.userId || '');
    
    useEffect(() => {
        if (organizerProfile?.full_name) {
            setOrganizerName(organizerProfile.full_name);
        } else {
            setOrganizerName(currentUser?.full_name || 'Event Organizer');
        }
    }, [organizerProfile?.full_name, currentUser?.full_name]);

    if (!event) {
        return (
            <Container>
                <Typography variant="h6" className="text-center text-text-muted font-jakarta">
                    No event data found
                </Typography>
                <Button 
                    onClick={() => navigate(-1)}
                    variant="contained"
                    className="mt-4 bg-primary text-white font-jakarta normal-case"
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    return (
        <>
            <Container className='relative min-h-screen'>
                <Box className={`no-scrollbar w-full overflow-y-auto`}>
                    <PageHeader 
                        title="Event Details"
                        showBackButton={true}
                        showMenuButton={false}
                    />

            {/* Image below header */}
            <Box className={'mb-6'}>
                <img src={event.imageUrl} alt={event.title} className="w-full rounded-2xl" />
            </Box>
            <Box className={'flex w-full items-center justify-between'}>
                <Button 
                    onClick={() => {
                        const eventUrl = `${window.location.origin}/events/${event.id}`;
                        navigator.clipboard.writeText(eventUrl);
                        toast.success('Event link copied to clipboard!');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 font-jakarta text-sm font-medium bg-primary text-white normal-case  hover:bg-primary-light`}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.35064 15.0602 5.68722 15.1707 6M18 8C17.6494 8 17.3128 7.93984 17 7.82929M18 8C18.3506 8 18.6872 8.06016 19 8.17071M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15ZM18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22ZM6 15C6.35064 15 6.68722 14.9398 7 14.8293M6 15C5.64936 15 5.31278 14.9398 5 14.8293M18 22C17.6494 22 17.3128 21.9398 17 21.8293M18 22C18.3506 22 18.6872 21.9398 19 21.8293" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Share Event
                </Button>
                <Box className={'flex flex-col'}>
                    <Typography variant='caption' className={`font-jakarta text-muted-dark`}>Per Person</Typography>
                    <Typography variant='h6' className={`font-jakarta text-primary`}>
                        {event.ticketPrice ? `$${event.ticketPrice}` : 'Free'}
                    </Typography>
                </Box>
            </Box>
            <Typography variant='h2' className={`self-start font-jakarta mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {event.title}
            </Typography>
            <Box className={'flex w-full items-center justify-between mb-6'}>
                <Box className={'flex items-center gap-2'}>
                    <Avatar {...getAvatarProps(undefined, currentUser, 20)} />
                    <Typography variant='caption' className={`font-jakarta text-muted-dark`}>Organized by</Typography>
                    <Typography variant='caption' className={`font-jakarta font-medium ${isDarkMode ? 'text-white' : 'text-primary-dark'}`}>
                        {organizerName}
                    </Typography>
                </Box>
                <IconButton
                    size='large'
                    onClick={() => isEnabled && toggle()}
                    disabled={!isEnabled || isLoading}
                    className='font-jakarta bg-primary text-white w-12 h-12 hover:bg-primary-light'
                >
                    <Favorite className='text-lg' color={isFavorite ? 'error' : 'inherit'} />
                </IconButton>
            </Box>
            <Divider className='my-6' />
            <Box className={'flex items-center gap-2 self-start mb-4'}>
                <IconButton className={`h-7 w-7  p-1 ${isDarkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
                    <CalendarMonth className={`h-3 w-3 text-primary`} />
                </IconButton>
                <Box>
                    <Typography variant='body1' className={`font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'Date not specified'}
                    </Typography>
                    <Typography variant='caption' className={`font-jakarta text-muted-dark`}>
                        {event.startDate ? new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Time not specified'}
                    </Typography>
                </Box>
            </Box>
            <Button 
                variant='contained' 
                className='h-7 w-auto self-start font-header text-xs font-semibold bg-primary text-white normal-case mb-6'
                onClick={() => {
                    const eventData = {
                        title: event.title,
                        description: event.description || 'Event description',
                        startDate: event.startDate ? new Date(event.startDate) : new Date(),
                        endDate: event.endDate ? new Date(event.endDate) : new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours later if no end date
                        location: event.location
                    };
                    
                    const icsContent = generateICalFile(eventData);
                    const filename = `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
                    downloadCalendarFile(icsContent, filename);
                    
                    toast.success('Calendar file downloaded! Add it to your calendar app.');
                }}
            >
                Add to My Calendar
            </Button>
            {/* Location for Events, Meetup Link for Meetups */}
            {event.type === 'event' ? (
                <>
                    <Box className={'flex items-center gap-2 self-start mb-4'}>
                        <IconButton className={`h-7 w-7  p-1 ${isDarkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
                            <LocationOn className={`h-3 w-3 text-primary`} />
                        </IconButton>
                        <Box>
                            <Typography variant='body1' className={`font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {event.location}
                            </Typography>
                            <Typography variant='caption' className={`font-jakarta text-muted-dark`}>
                                {event.location}
                            </Typography>
                        </Box>
                    </Box>

                    <Button 
                        variant='contained' 
                        className='h-7 w-auto self-start font-header text-xs font-semibold bg-primary text-white normal-case mb-6'
                    >
                        Get Location
                    </Button>
                </>
            ) : (
                <>
                    <Box className={'flex items-center gap-2 self-start mb-4'}>
                        <IconButton className={`h-7 w-7  p-1 ${isDarkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
                            <PlayArrow className={`h-3 w-3 text-primary`} />
                        </IconButton>
                        <Box>
                            <Typography variant='body1' className={`font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Meetup Link
                            </Typography>
                            <Typography variant='caption' className={`font-jakarta text-muted-dark`}>
                                {event.meetupLink || 'No link provided'}
                            </Typography>
                        </Box>
                    </Box>

                    <Button 
                        variant='contained' 
                        className='h-7 w-auto self-start font-header text-xs font-semibold bg-primary text-white normal-case mb-6'
                        onClick={() => {
                            if (event.meetupLink) {
                                navigator.clipboard.writeText(event.meetupLink);
                                // You can add a toast notification here if you want
                            }
                        }}
                    >
                        Copy Link
                    </Button>
                </>
            )}
            <Box className={'flex w-full items-center mb-6'}>
                <Box className={'flex items-center gap-2'}>
                    {event?.member_avatars && event.member_avatars.length > 0 && (
                        <>
                            <AvatarGroup max={3}>
                                {event.member_avatars.map((avatar: string, index: number) => (
                                    <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} className='h-6 w-6' />
                                ))}
                            </AvatarGroup>
                            <Typography variant='caption' className={`font-jakarta text-muted-dark`}>
                                {event.member_count || 0}+ Member Joined
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>
            <Typography variant='h4' className={`self-start mb-4 font-jakarta ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Description
            </Typography>
            <Box className={`w-full rounded-2xl p-4 min-h-24 ${isDarkMode ? 'bg-white/15 border border-white/20' : 'bg-neutral-50 border border-gray-200'}`}>
                <Typography variant='body1' className={`font-jakarta leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    {event.description}
                </Typography>
            </Box>
                </Box>
            </Container>
        </>
    );
}

export default EventDetails;
