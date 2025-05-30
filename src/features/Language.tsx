import Container from '@/components/layout/Container';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Radio, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, MoreVertOutlined } from '@mui/icons-material';
import React from 'react';

function Language() {
    return (
        <Container className='justify-start'>
            <Box className={'mb-6 flex w-full items-center justify-between'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Language</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            <Typography variant='h4' className='self-start'>
                Suggested
            </Typography>
            <Box className='w-full rounded-2xl bg-[#f8f8f8]'>
                <List dense>
                    <ListItem>
                        <ListItemText>English (US)</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>English (UK)</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Box>
            <Typography variant='h4' className='self-start'>
                Language
            </Typography>
            <Box className='w-full rounded-2xl bg-[#f8f8f8]'>
                <List dense>
                    <ListItem>
                        <ListItemText>Azerbaijani</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Mandarin</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Russian</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Spanish</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>French</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Arabic</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Bengali</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Indonesian</ListItemText>
                        <ListItemIcon>
                            <Radio size='small' className='text-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Box>
        </Container>
    );
}

export default Language;
