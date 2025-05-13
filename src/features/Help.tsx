import Container from '@/components/layout/Container';
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
import { ExpandMore, KeyboardArrowLeftOutlined, Search, TuneOutlined } from '@mui/icons-material';
import React from 'react';
import Input from '@/components/forms/Input';

function Help() {
    return (
        <Container className='justify-start gap-4'>
            <Box className={'mb-6 flex w-full items-center gap-20'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Help center</Typography>
            </Box>
            <Stack direction={'row'} spacing={1} className='w-full overflow-hidden'>
                <Button variant='contained' className='h-9 font-header text-xs font-bold'>
                    General
                </Button>
                <Button variant='contained' className='h-9 font-header text-xs font-bold'>
                    Account
                </Button>
                <Button variant='contained' className='h-9 font-header text-xs font-bold'>
                    Services
                </Button>
                <Button variant='contained' className='h-9 font-header text-xs font-bold'>
                    Payment
                </Button>
            </Stack>
            <Box className='flex w-full items-center gap-2'>
                <Input startIcon={<Search />} placeholder='Search your event...' />
                <IconButton size='large' disableRipple className='w-912 h-12 bg-primary-1 text-white'>
                    <TuneOutlined />
                </IconButton>
            </Box>
            <Accordion className='overflow-hidden !rounded-3xl bg-[#f8f8f8]'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-[13px] font-bold'>
                        What is Evanto?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-[11px] font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
            <Accordion className='overflow-hidden !rounded-3xl bg-[#f8f8f8]'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-[13px] font-bold'>
                        How to make a payment?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-[11px] font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
            <Accordion className='overflow-hidden !rounded-3xl bg-[#f8f8f8]'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-[13px] font-bold'>
                        How do I can cancel booking?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-[11px] font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
            <Accordion className='overflow-hidden !rounded-3xl bg-[#f8f8f8]'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-[13px] font-bold'>
                        How do I can delete my account?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-[11px] font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>{' '}
            <Accordion className='overflow-hidden !rounded-3xl bg-[#f8f8f8]'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-[13px] font-bold'>
                        How do I exit the app?
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-[11px] font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>{' '}
            <Accordion className='overflow-hidden !rounded-3xl bg-[#f8f8f8]'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-[13px] font-bold'>
                        Why are the evanto price different
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-[11px] font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
            <Accordion className='overflow-hidden !rounded-3xl bg-[#f8f8f8]'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component={'span'} className='font-header text-[13px] font-bold'>
                        Why I can’t add a new payment method
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className='font-header text-[11px] font-medium text-text-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s.
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}

export default Help;
