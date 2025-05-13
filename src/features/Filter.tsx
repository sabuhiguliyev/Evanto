import React from 'react';
import { Box, Button, Container, IconButton, Slider, Stack, Typography } from '@mui/material';
import { LocationOnOutlined, KeyboardArrowDownOutlined, MyLocationOutlined } from '@mui/icons-material';
import Input from '@/components/forms/Input';
import IconAll from '@/components/icons/all.svg?react';
import IconEvent from '@/components/icons/event.svg?react';
import IconMusic from '@/components/icons/music.svg?react';
import IconEducation from '@/components/icons/education.svg?react';
import IconSport from '@/components/icons/sport.svg?react';
import IconArt from '@/components/icons/art.svg?react';
import IconKnowledge from '@/components/icons/knowledge.svg?react';

const categories = [
    { icon: <IconAll />, label: 'All' },
    { icon: <IconEvent />, label: 'Event' },
    { icon: <IconMusic />, label: 'Music' },
    { icon: <IconEducation />, label: 'Education' },
    { icon: <IconSport />, label: 'Sports' },
    { icon: <IconArt />, label: 'Art' },
    { icon: <IconKnowledge />, label: 'Knowledge' },
];

function Filter() {
    return (
        <Container className='flex h-[665px] flex-col gap-4 rounded-t-3xl border-2 p-6'>
            <Typography variant='h4' className='mb-6'>
                Filter
            </Typography>
            <Typography variant='h6' className='-mb-4 self-start'>
                Location
            </Typography>
            <Box className={'flex items-center gap-2'}>
                <Input
                    startIcon={<LocationOnOutlined />}
                    endIcon={<KeyboardArrowDownOutlined />}
                    placeholder='New York, USA'
                    className='[&_.MuiOutlinedInput-root]:h-12'
                />
                <IconButton className='h-12 w-12 bg-primary-1 text-white' disableRipple>
                    <MyLocationOutlined />
                </IconButton>
            </Box>
            <Typography variant='h6' className='-mb-2 self-start'>
                Category
            </Typography>
            <Stack direction={'row'} spacing={1} className='flex-wrap gap-1.5'>
                {categories.map((item, index) => (
                    <Button
                        sx={{ border: '1px solid #EEE' }}
                        key={index}
                        className='h-[30px] bg-white px-2.5 text-[11px] text-text-3'
                        startIcon={item.icon}
                    >
                        {item.label}
                    </Button>
                ))}
            </Stack>
            <Typography variant='h4' className='mb-4 mt-4 self-start'>
                Ticket Price Range
            </Typography>
            <Slider
                value={[20, 40]}
                valueLabelDisplay={'on'}
                className='text-primary-1'
                sx={{
                    '& .MuiSlider-valueLabel': {
                        fontSize: 8,
                        fontWeight: 'normal',
                        borderRadius: '30px',
                        backgroundColor: '#5D9BFC',
                    },
                    '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16,
                        backgroundColor: '#fff',
                        border: '4px solid #5D9BFC',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                }}
            />
            <Typography variant='h6' className='-mb-2 self-start'>
                Meetup Type
            </Typography>
            <Stack direction={'row'} spacing={2} className='self-start'>
                <Button
                    variant='outlined'
                    className='h-9 whitespace-nowrap p-3 font-header text-[11px] font-medium text-text-3'
                >
                    In Person
                </Button>
                <Button
                    variant='outlined'
                    className='h-9 whitespace-nowrap p-3 font-header text-[11px] font-medium text-text-3'
                >
                    Online
                </Button>
                <Button variant='contained' className='h-9 whitespace-nowrap p-3 font-header text-[11px] font-medium'>
                    Any Type
                </Button>
            </Stack>
            <Typography variant='h6' className='-mb-2 self-start'>
                Meetup Day
            </Typography>
            <Stack direction={'row'} spacing={2} className='self-start'>
                <Button
                    variant='outlined'
                    className='h-9 whitespace-nowrap p-3 font-header text-[11px] font-medium text-text-3'
                >
                    Today
                </Button>
                <Button
                    variant='outlined'
                    className='h-9 whitespace-nowrap p-3 font-header text-[11px] font-medium text-text-3'
                >
                    Tomorrow
                </Button>
                <Button variant='contained' className='h-9 whitespace-nowrap p-3 font-header text-[11px] font-medium'>
                    This Week
                </Button>
            </Stack>
            <Stack direction={'row'} spacing={2} className='mt-6 w-full'>
                <Button variant='outlined' className='h-12 bg-[#5D9BFC26]'>
                    Reset
                </Button>
                <Button variant='contained' className='h-12'>
                    Done
                </Button>
            </Stack>
        </Container>
    );
}

export default Filter;
