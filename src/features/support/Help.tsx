import { Container } from '@mui/material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import { ExpandMore, Search, TuneOutlined, Settings } from '@mui/icons-material';
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { PageHeader } from '@/components/layout/PageHeader';

function Help() {
    return (
        <Container className='gap-4'>
            <PageHeader 
                title="Help center"
                showBackButton={true}
                showMenuButton={false}
                rightIcon={<Settings />}
                onRightIconClick={() => console.log('Settings clicked')}
            />
            <Stack direction={'row'} spacing={1} className='w-full overflow-hidden'>
                <Button variant='contained' className='h-9 font-jakarta text-xs font-bold'>
                    General
                </Button>
                <Button variant='contained' className='h-9 font-jakarta text-xs font-bold'>
                    Account
                </Button>
                <Button variant='contained' className='h-9 font-jakarta text-xs font-bold'>
                    Services
                </Button>
                <Button variant='contained' className='h-9 font-jakarta text-xs font-bold'>
                    Payment
                </Button>
            </Stack>
            <Box className='flex w-full items-center gap-2'>
                <TextField
                    placeholder='Search your event...'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    className='text-input'
                />
                <IconButton size='medium' disableRipple className='w-912 h-12 bg-primary-1 text-white'>
                    <TuneOutlined />
                </IconButton>
            </Box>
            <Accordion className='overflow-hidden !rounded-3xl bg-neutral-50'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-sm font-bold'>
                        What is Evanto?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-xs font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
            <Accordion className='overflow-hidden !rounded-3xl bg-neutral-50'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-sm font-bold'>
                        How to make a payment?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-xs font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
            <Accordion className='overflow-hidden !rounded-3xl bg-neutral-50'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-sm font-bold'>
                        How do I can cancel booking?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-xs font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
            <Accordion className='overflow-hidden !rounded-3xl bg-neutral-50'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-sm font-bold'>
                        How do I can delete my account?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-xs font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>{' '}
            <Accordion className='overflow-hidden !rounded-3xl bg-neutral-50'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-sm font-bold'>
                        How do I exit the app?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-xs font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>{' '}
            <Accordion className='overflow-hidden !rounded-3xl bg-neutral-50'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-sm font-bold'>
                        Why are the evanto price different
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-xs font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
            <Accordion className='overflow-hidden !rounded-3xl bg-neutral-50'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-sm font-bold'>
                        Why I can’t add a new payment method
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-xs font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}

export default Help;
