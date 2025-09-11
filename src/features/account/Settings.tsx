import { Container } from '@mui/material';
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
import PageHeader from '@/components/layout/PageHeader';
import { useUser } from '@/hooks/entityConfigs';
import { getAvatarProps } from '@/utils/avatarUtils';
import useUserStore from '@/store/userStore';

function Settings() {
    const { user: authUser } = useUserStore();
    const { data: user } = useUser(authUser?.id || '');
    
    return (
        <Container className='gap-6'>
            <PageHeader 
                title="Settings"
                showBackButton={true}
                showMenuButton={false}
            />
            <Box className='flex h-20 w-full items-center justify-between rounded-2xl bg-neutral-50 p-4'>
                <Avatar {...getAvatarProps(user, authUser, 56)} />
                <Box className='flex flex-col'>
                    <Typography variant='h4'>{user?.full_name || 'User'}</Typography>
                    <Typography variant='body2' className='text-[11px] text-text-3'>
                        {user?.email || 'user@example.com'}
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
            <Box className='w-full rounded-2xl bg-neutral-50'>
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
            <Box className='w-full rounded-2xl bg-neutral-50'>
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
