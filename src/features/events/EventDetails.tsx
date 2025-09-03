import React from 'react';
import { Avatar, AvatarGroup, Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '@/components/layout/Container';
import ArrowCircleBlurred from '@/components/icons/arrowcircleleftblurred.svg?react';
import IconVideo from '@/components/icons/video.svg?react';
import { CalendarMonthOutlined, LocationOnOutlined, Favorite, KeyboardArrowLeft } from '@mui/icons-material';
import Link from '@/components/navigation/Link';
import { useFavorite } from '@/hooks/useFavorite';
import { fetchUserProfile } from '@/services';
import useUserStore from '@/store/userStore';
import toast from 'react-hot-toast';

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

const memberAvatars = ['https://i.pravatar.cc/150?img=3', 'https://i.pravatar.cc/150?img=3'];
const memberCount = 2;

function EventDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const event = location.state?.event;
    const { isFavorite, toggle, isLoading, isEnabled } = useFavorite(event?.id?.toString(), event?.type);
    const [organizerName, setOrganizerName] = useState<string>('Loading...');
    const currentUser = useUserStore(state => state.user);
    
    useEffect(() => {
        const fetchOrganizerName = async () => {
            if (event?.userId) {
                try {
                    const profile = await fetchUserProfile(event.userId);
                    if (profile?.full_name) {
                        setOrganizerName(profile.full_name);
                    } else {
                        // Fallback: try to get from current user or show a generic name
                        setOrganizerName(currentUser?.full_name || 'Event Organizer');
                    }
                } catch (error) {
                    console.error('Error fetching organizer profile:', error);
                    // Fallback: use current user name or generic name
                    setOrganizerName(currentUser?.full_name || 'Event Organizer');
                }
            } else {
                setOrganizerName(currentUser?.full_name || 'Event Organizer');
            }
        };

        fetchOrganizerName();
    }, [event?.userId, currentUser]);

    if (!event) {
        return (
            <Container>
                <Typography variant="h6" className="text-center text-text-3">
                    No event data found
                </Typography>
                <Button 
                    onClick={() => navigate(-1)}
                    variant="contained"
                    className="mt-4 bg-primary-1 text-white"
                    sx={{ textTransform: 'none' }}
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    return (
        <Container className="no-scrollbar">
            {/* Header at the top */}
            <Box className={'mb-6 flex w-full items-center justify-between'}>
                <IconButton 
                    onClick={() => navigate(-1)}
                                          className="text-text-3 border border-neutral-200"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Event Details</Typography>
                <Box className="w-10" /> {/* Spacer to keep title centered */}
            </Box>

            {/* Image below header */}
            <Box className={'mb-6'}>
                <img src={event.imageUrl} alt={event.title} className="w-full rounded-2xl" />
            </Box>
            <Box className={'flex w-full items-center justify-between'}>
                <Box className={'flex h-6 gap-2'}>
                    <Button className='flex gap-2 p-3'>
                        <IconVideo className={'h-2.5 w-3 [&>*]:stroke-white'} />
                        <span className='font-header text-[11px] font-medium text-white'>{event.category}</span>
                    </Button>
                    <Button className='p-3 font-header text-[11px] font-medium text-white'>Invite</Button>
                </Box>
                <Box className={'flex flex-col'}>
                    <Typography className='font-header text-[9px] font-medium text-text-3'>Per Person</Typography>
                    <Typography className='font-header text-base font-bold text-primary-1'>
                        {event.ticketPrice ? `$${event.ticketPrice}` : 'Free'}
                    </Typography>
                </Box>
            </Box>
            <Typography variant='h3' className='self-start'>
                {event.title}
            </Typography>
            <Box className={'flex w-full items-center justify-between'}>
                <Box className={'flex items-center gap-2'}>
                    <Avatar src='https://i.pravatar.cc/150?img=1' className='h-5 w-5' />
                    <Typography className='font-header text-[10px] font-medium text-text-3'>Organized by</Typography>
                    <Typography className='font-header text-[11px] font-medium'>
                        {organizerName}
                    </Typography>
                </Box>
                <IconButton
                    size='small'
                    onClick={() => isEnabled && toggle()}
                    disabled={!isEnabled || isLoading}
                    className='bg-primary-1 text-white'
                >
                    <Favorite className='text-xs' color={isFavorite ? 'error' : 'inherit'} />
                </IconButton>
            </Box>
            <Divider />
            <Box className={'flex items-center gap-2 self-start'}>
                <IconButton className='h-7 w-7 rounded-full bg-primary-500/10 p-1'>
                    <CalendarMonthOutlined className='h-3 w-3 text-primary-1' />
                </IconButton>
                <Box>
                    <Typography variant='body2'>
                        {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'Date not specified'}
                    </Typography>
                    <Typography className='font-header text-[11px] font-medium text-text-3'>
                        {event.startDate ? new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Time not specified'}
                    </Typography>
                </Box>
            </Box>
            <Button 
                variant='contained' 
                className='h-7 w-auto self-start font-header text-[11px] font-semibold'
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
                    <Box className={'flex items-center gap-2 self-start'}>
                        <IconButton className='h-7 w-7 rounded-full bg-primary-500/10 p-1'>
                            <LocationOnOutlined className='h-3 w-3 text-primary-1' />
                        </IconButton>
                        <Box>
                            <Typography variant='body2'>
                                {event.location}
                            </Typography>
                            <Typography className='font-header text-[11px] font-medium text-text-3'>
                                {event.location}
                            </Typography>
                        </Box>
                    </Box>

                    <Button variant='contained' className='h-7 w-auto self-start font-header text-[11px] font-semibold'>
                        Get Location
                    </Button>
                </>
            ) : (
                <>
                    <Box className={'flex items-center gap-2 self-start'}>
                        <IconButton className='h-7 w-7 rounded-full bg-primary-500/10 p-1'>
                            <IconVideo className='h-3 w-3 text-primary-1' />
                        </IconButton>
                        <Box>
                            <Typography variant='body2'>
                                Meetup Link
                            </Typography>
                            <Typography className='font-header text-[11px] font-medium text-text-3'>
                                {event.meetupLink || 'No link provided'}
                            </Typography>
                        </Box>
                    </Box>

                    <Button 
                        variant='contained' 
                        className='h-7 w-auto self-start font-header text-[11px] font-semibold'
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
            <Box className={'flex w-full items-center'}>
                <Box className={'flex items-center gap-2'}>
                    <AvatarGroup max={3}>
                        {memberAvatars.map((avatar, index) => (
                            <Avatar key={index} src={avatar} alt={`Member ${index + 1}`} className='h-6 w-6' />
                        ))}
                    </AvatarGroup>
                    <Typography className='font-header text-[11px] font-medium text-text-3'>
                        {memberCount}+ Member Joined
                    </Typography>
                </Box>
            </Box>
            <Typography variant='h4' className='self-start mb-3'>
                Description
            </Typography>
            <Box className="w-full bg-neutral-50 rounded-2xl p-4 border border-gray-200 min-h-[100px]">
                <Typography variant='body2' className='text-text-2 leading-relaxed whitespace-pre-wrap'>
                    {event.description}
                </Typography>
            </Box>
        </Container>
    );
}

export default EventDetails;
