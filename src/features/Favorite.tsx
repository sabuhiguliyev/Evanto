import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import { EventCard3 } from '@/components/cards/EventCard3';
import IconMore from '@/components/icons/3dots.svg?react';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';

function Favorite() {
    return (
        <Container>
            <Box className={'mb-6 flex w-full items-center justify-between'}>
                <ArrowCircle />

                <Typography variant='h4'>Favorite</Typography>
                <IconMore />
            </Box>
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
                iconButton
            />{' '}
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
                iconButton
            />{' '}
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
                iconButton
            />{' '}
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
                iconButton
            />{' '}
            <EventCard3
                imageUrl='public/illustrations/eventcard.png'
                title='People Taking Videos During Concert'
                dateRange='12-13mar 2024'
                location='New York, USA'
                memberAvatars={['https://i.pravatar.cc/150?img=3\n', 'https://i.pravatar.cc/150?img=3\n']}
                memberCount={2}
                onJoin={() => console.log('Join Event')}
                iconButton
            />{' '}
        </Container>
    );
}

export default Favorite;
