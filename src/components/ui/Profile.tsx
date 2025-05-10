import Container from '@/components/Container';
import {
    Avatar,
    Badge,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import {
    Edit,
    KeyboardArrowLeftOutlined,
    SettingsOutlined,
    PersonOutlineOutlined,
    ChevronRight,
    PaymentOutlined,
    NotificationsOutlined,
    StoreOutlined,
    Visibility,
    DarkModeOutlined,
    Brightness5Outlined,
} from '@mui/icons-material';
import React from 'react';

interface ProfileAvatarProps {
    src?: string;
    size?: number;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ src, size }) => (
    <Badge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
            <IconButton
                size='small'
                sx={{
                    bgcolor: '#5D9BFC',
                    '&:hover': { bgcolor: 'primary.dark' },
                    border: '2px solid white',
                }}
            >
                <Edit sx={{ fontSize: 14, color: 'white' }} />
            </IconButton>
        }
    >
        <Avatar
            src={src}
            sx={{
                width: size,
                height: size,
                bgcolor: 'grey.300',
            }}
        />
    </Badge>
);

function Profile() {
    return (
        <Container className='justify-start'>
            <Box className={'mb-8 flex w-full items-center justify-between'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Payment</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <SettingsOutlined />
                </IconButton>
            </Box>
            <Box className='flex w-full flex-col items-center justify-center'>
                <ProfileAvatar src='https://i.pravatar.cc/300' size={100} />
                <Typography variant='h4' className='mt-2'>
                    John Doe
                </Typography>
                <Typography variant='body2' className='text-text-3'>
                    Product Designer
                </Typography>
            </Box>

            <Box className='grid h-20 w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center rounded-2xl bg-[#F8F8F8]'>
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary-1'>
                        10
                    </Typography>
                    <Typography variant='body2' className='text-text-3'>
                        Events
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary-1'>
                        3,540
                    </Typography>
                    <Typography variant='body2' className='text-text-3'>
                        Followers
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary-1'>
                        125
                    </Typography>
                    <Typography variant='body2' className='text-text-3'>
                        Following
                    </Typography>
                </Box>
            </Box>
            <Typography variant='h4' className='self-start'>
                Account
            </Typography>
            <Box className='w-full rounded-2xl bg-[#f8f8f8]'>
                <List>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <StoreOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Manage Events' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <PersonOutlineOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Profile' />
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
                            <PaymentOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Payment Method' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <Visibility className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Dark Mode' />
                        <ToggleButtonGroup size='small'>
                            <ToggleButton value={'light'} className='rounded-3xl'>
                                <Brightness5Outlined className='h-4 w-4 text-primary-1' />
                            </ToggleButton>{' '}
                            <ToggleButton value={'dark'} className='rounded-3xl'>
                                <DarkModeOutlined className='h-4 w-4' />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ListItem>
                </List>
            </Box>
        </Container>
    );
}

export default Profile;
