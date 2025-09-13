import { Box, Button, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, KeyboardArrowRight } from '@mui/icons-material';
import { Container } from '@mui/material';
import EvantoLogo from '@/components/icons/logo-dark.svg?react';

function About() {
    return (
        <Container className='gap-4'>
            <Box className={'mb-6 flex w-full items-center gap-20'}>
                <IconButton size='medium' disableRipple className="text-muted border border-neutral-200 rounded-full">
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h5' className="text-primary">About Evanto</Typography>
            </Box>
            <Box className='mb-6 flex flex-col items-center gap-4 text-muted'>
                <EvantoLogo />
                <Typography variant='h5'>Evanto Version 1.0.1</Typography>
            </Box>
            <Button
                variant='contained'
                className='justify-between bg-neutral-50 pl-6 font-jakarta text-sm font-normal text-black'
            >
                Job Vacancy
                <KeyboardArrowRight className='text-text-3' />
            </Button>
            <Button
                variant='contained'
                className='justify-between bg-neutral-50 pl-6 font-jakarta text-sm font-normal text-black'
            >
                Developer
                <KeyboardArrowRight className='text-text-3' />
            </Button>
            <Button
                variant='contained'
                className='justify-between bg-neutral-50 pl-6 font-jakarta text-sm font-normal text-black'
            >
                Partner
                <KeyboardArrowRight className='text-text-3' />
            </Button>
            <Button
                variant='contained'
                className='justify-between bg-neutral-50 pl-6 font-jakarta text-sm font-normal text-black'
            >
                Accessibility
                <KeyboardArrowRight className='text-text-3' />
            </Button>
            <Button
                variant='contained'
                className='justify-between bg-neutral-50 pl-6 font-jakarta text-sm font-normal text-black'
            >
                Terms of Use
                <KeyboardArrowRight className='text-text-3' />
            </Button>
            <Button
                variant='contained'
                className='justify-between bg-neutral-50 pl-6 font-jakarta text-sm font-normal text-black'
            >
                Feedback
                <KeyboardArrowRight className='text-text-3' />
            </Button>
            <Button
                variant='contained'
                className='justify-between bg-neutral-50 pl-6 font-jakarta text-sm font-normal text-black'
            >
                Rate Us
                <KeyboardArrowRight className='text-text-3' />
            </Button>
        </Container>
    );
}

export default About;
