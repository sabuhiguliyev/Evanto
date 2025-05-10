import React from 'react';
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, MoreVertOutlined } from '@mui/icons-material';
import Container from '@/components/Container';
import { EventCard3 } from '@/components/EventCard3';
import BottomAppBar from '@/components/BottomAppBar';

function Ticket() {
    return (
        <Container className='relative justify-start gap-4 overflow-hidden whitespace-nowrap'>
            <Box className={'mb-6 flex w-full items-center justify-between'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Ticket Details</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            <ButtonGroup className='w-full font-header font-semibold [&_.MuiButton-root]:text-sm'>
                <Button variant='contained'>Upcoming</Button>
                <Button variant='contained' className='bg-[#F8F8F8] text-text-3'>
                    Completed
                </Button>
                <Button variant='contained' className='bg-[#F8F8F8] text-text-3'>
                    Cancelled
                </Button>
            </ButtonGroup>
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
            />
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
            />
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
            />
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
            />
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default Ticket;
