import Container from '@/components/Container';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Radio, Switch, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, MoreVertOutlined } from '@mui/icons-material';
import React from 'react';

function Notification() {
    return (
        <Container className='justify-start'>
            <Box className={'mb-6 flex w-full items-center justify-between'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Notification</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            <Box className='w-full rounded-2xl bg-[#f8f8f8]'>
                <List>
                    <ListItem>
                        <ListItemText>Enable Sound & Vibrate</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Purchased Tickets</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Linked Events</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Followed Organiser</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Special Offers</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Payments</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Reminders</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Recommendations</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>App Updates</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>New Services Available</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemText>New Tips Available</ListItemText>
                        <ListItemIcon>
                            <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Box>
        </Container>
    );
}

export default Notification;
