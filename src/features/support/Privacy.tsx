import { Box, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined } from '@mui/icons-material';
import React from 'react';
import { Container } from '@mui/material';

function Privacy() {
    return (
        <Container className='gap-4'>
            <Box className={'mb-6 flex w-full items-center gap-20'}>
                <IconButton size='medium' disableRipple className="text-muted border border-neutral-200">
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h5' className="text-primary">Privacy policy</Typography>
            </Box>
            <Box className={'flex flex-col gap-2 overflow-y-auto no-scrollbar'}>
                <Typography variant='body1' className='mb-4 text-muted'>
                    Welcome to <strong className='text-black'>Evanto</strong> your all-in-one solution for hosting and
                    attending virtual events. Whether you're an organizer looking to create memorable experiences or an
                    attendee seeking engaging content, we've got you covered.
                </Typography>
                <Typography variant='h4'>Key Features:</Typography>
                <Typography variant='body1' className='text-muted'>
                    <strong className='text-black'> 1. Versatile Event Formats:</strong> From webinars and conferences
                    to workshops and networking sessions, our platform supports a variety of event types, ensuring
                    there's something for everyone.
                </Typography>
                <Typography variant='body1' className='text-muted'>
                    <strong className='text-black'> 2. Interactive Tools:</strong> Engage your audience with live polls,
                    Q&A sessions, virtual breakout rooms, and more. Foster real-time collaboration and participation to
                    enhance the overall event experience.
                </Typography>
                <Typography variant='body1' className='text-muted'>
                    <strong className='text-black'> 3. Customizable Branding:</strong> Tailor your event space to
                    reflect your brand identity. With customizable themes, logos, and branding options, make every event
                    feel uniquely yours.
                </Typography>
                <Typography variant='body1' className='text-muted'>
                    <strong className='text-black'> 4.Seamless Integration:</strong> Integrate with popular tools and
                    platforms such as Zoom, Microsoft Teams, Slack, and more, to streamline event management and enhance
                    user accessibility.
                </Typography>{' '}
                <Typography variant='body1' className='text-muted'>
                    <strong className='text-black'> 5.Analytics and Insights:</strong> Gain valuable insights into
                    attendee engagement, feedback, and performance metrics. Use this data to refine future events and
                    maximize impact. Whether you're hosting a small team meeting or a large-scale conference, [App Name]
                    is here to elevate your virtual events to new heights. Join us in redefining the future of
                    gatherings, one virtual event at a time.
                </Typography>
            </Box>
        </Container>
    );
}

export default Privacy;
