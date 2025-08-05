import React from 'react';
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, MoreVertOutlined } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';

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
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default Ticket;
