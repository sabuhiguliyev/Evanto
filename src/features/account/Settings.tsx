import Container from '@/components/layout/Container';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Typography,
} from '@mui/material';
import {
    ChevronRight,
    Edit,
    GroupOutlined,
    InfoOutlined,
    KeyboardArrowLeftOutlined,
    LanguageOutlined,
    LockOutlined,
    LogoutOutlined,
    NotificationsOutlined,
    PasswordOutlined,
    PaymentOutlined,
    PersonOutlineOutlined,
    ShieldOutlined,
} from '@mui/icons-material';
import React from 'react';

function Settings() {
    return (
        <Container className='justify-start gap-6'>
            <Box className={'mb-6 flex w-full items-center gap-20'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Settings</Typography>
            </Box>{' '}
            <Box className='flex h-20 w-full items-center justify-between rounded-2xl bg-[#f8f8f8] p-4'>
                <Avatar src='https://i.pravatar.cc/600' className='h-14 w-14' />
                <Box className='flex flex-col'>
                    <Typography variant='h4'>John Doe</Typography>
                    <Typography variant='body2' className='text-[11px] text-text-3'>
                        Prdouct Manager
                    </Typography>
                </Box>
                <IconButton
                    size='medium'
                    sx={{
                        bgcolor: '#5D9BFC',
                        '&:hover': { bgcolor: 'primary.dark' },
                        border: '2px solid white',
                    }}
                >
                    <Edit sx={{ fontSize: 14, color: 'white' }} />
                </IconButton>
            </Box>
            <Box className='w-full rounded-2xl bg-[#f8f8f8]'>
                <List>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <PersonOutlineOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Profile' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <GroupOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Friends List' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <PaymentOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Payment Method' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <NotificationsOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Notifications' />
                        <Switch size='small' className='[&_.MuiSwitch-thumb]:bg-primary-1' />
                    </ListItem>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <PasswordOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Change Password' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>{' '}
                    <ListItem component='button'>
                        <ListItemIcon>
                            <LanguageOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Language' />
                        <Typography variant='body2' className='mr-1 text-text-3'>
                            English(US)
                        </Typography>
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                </List>
            </Box>
            <Box className='w-full rounded-2xl bg-[#f8f8f8]'>
                <ListItem component='button'>
                    <ListItemIcon>
                        <InfoOutlined className='text-primary-1' />
                    </ListItemIcon>
                    <ListItemText primary='About Evanto' />
                    <ChevronRight className='text-text-3' />
                </ListItem>
                <ListItem component='button'>
                    <ListItemIcon>
                        <ShieldOutlined className='text-primary-1' />
                    </ListItemIcon>
                    <ListItemText primary='Help & Support' />
                    <ChevronRight className='text-text-3' />
                </ListItem>
                <ListItem component='button'>
                    <ListItemIcon>
                        <LockOutlined className='text-primary-1' />
                    </ListItemIcon>
                    <ListItemText primary='Privacy Policy' />
                    <ChevronRight className='text-text-3' />
                </ListItem>
            </Box>
            <Button variant='contained' className='mt-auto'>
                <LogoutOutlined />
                Log Out
            </Button>
        </Container>
    );
}

export default Settings;
