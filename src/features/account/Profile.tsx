import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Typography, Avatar, Badge, Divider, List, ListItem, ListItemIcon, ListItemText, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { KeyboardArrowLeftOutlined, MoreVertOutlined, Edit, PersonOutlineOutlined, ChevronRight, PaymentOutlined, NotificationsOutlined, StoreOutlined, Visibility, DarkModeOutlined, Brightness5Outlined } from '@mui/icons-material';
import Container from "@/components/layout/Container";
import BottomAppBar from "@/components/navigation/BottomAppBar";
import { fetchUserProfile, fetchUserStats } from "@/utils/supabaseService";
import useUserStore from "@/store/userStore";
import toast from "react-hot-toast";

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
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [profile, setProfile] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfileData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                
                // Try to fetch profile first
                const profileData = await fetchUserProfile();
                
                // Try to fetch stats
                const statsData = await fetchUserStats();
                
                setProfile(profileData);
                setStats(statsData);
            } catch (error: any) {
                console.error('Error loading profile:', error);
                toast.error(`Failed to load profile data: ${error?.message || 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        };

        loadProfileData();
    }, [user]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleManageEvents = () => {
        navigate('/manage-events');
    };

    const handleProfileEdit = () => {
        navigate('/profile');
    };

    const handlePaymentMethod = () => {
        navigate('/payment');
    };

    const handleNotifications = () => {
        toast.success('Notifications setting updated!');
    };

    const handleDarkMode = (event: any, newMode: string | null) => {
        if (newMode !== null) {
            toast.success(`Theme changed to ${newMode} mode!`);
        }
    };

    if (loading) {
        return (
            <Container className='justify-center'>
                <Typography>Loading profile...</Typography>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className='justify-center'>
                <Typography>Please sign in to view profile</Typography>
                <Button onClick={() => navigate('/signin')} variant='contained'>
                    Sign In
                </Button>
            </Container>
        );
    }

    return (
        <Container className='justify-start'>
            <Box className={'mb-8 flex w-full items-center justify-between'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }} onClick={handleBack}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Profile</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            
            <Box className='flex w-full flex-col items-center justify-center'>
                <ProfileAvatar 
                    src={profile?.avatar_url || 'https://i.pravatar.cc/300'} 
                    size={100} 
                />
                <Typography variant='h4' className='mt-2'>
                    {profile?.full_name || user.email || 'User'}
                </Typography>
                <Typography variant='body2' className='text-text-3'>
                    {profile?.bio || 'No bio added yet'}
                </Typography>
                {profile?.location && (
                    <Typography variant='body2' className='text-text-3 mt-1'>
                        📍 {profile.location}
                    </Typography>
                )}
            </Box>

            <Box className='grid h-20 w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center rounded-2xl bg-[#F8F8F8]'>
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary-1'>
                        {stats?.events_created || 0}
                    </Typography>
                    <Typography variant='body2' className='text-text-3'>
                        Events
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary-1'>
                        {stats?.events_attending || 0}
                    </Typography>
                    <Typography variant='body2' className='text-text-3'>
                        Attending
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary-1'>
                        {profile?.user_interests?.length || 0}
                    </Typography>
                    <Typography variant='body2' className='text-text-3'>
                        Interests
                    </Typography>
                </Box>
            </Box>
            
            <Typography variant='h4' className='self-start'>
                Account
            </Typography>
            <Box className='w-full rounded-2xl bg-[#f8f8f8]'>
                <List>
                    <ListItem component='button' onClick={handleManageEvents}>
                        <ListItemIcon>
                            <StoreOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Manage Events' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                    <ListItem component='button' onClick={handleProfileEdit}>
                        <ListItemIcon>
                            <PersonOutlineOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Edit Profile' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <NotificationsOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Notifications' />
                        <Switch 
                            size='small' 
                            className='[&_.MuiSwitch-thumb]:bg-primary-1'
                            defaultChecked={true}
                            onChange={handleNotifications}
                        />
                    </ListItem>
                    <ListItem component='button' onClick={handlePaymentMethod}>
                        <ListItemIcon>
                            <PaymentOutlined className='text-primary-1' />
                        </ListItemIcon>
                        <ListItemText primary='Payment Method' />
                        <ChevronRight className='text-text-3' />
                    </ListItem>
                </List>
            </Box>

            {/* Dark Mode section - moved outside ListItem to avoid nested button issue */}
            <Box className='w-full rounded-2xl bg-[#f8f8f8] mt-4 p-4'>
                <Box className='flex items-center justify-between'>
                    <Box className='flex items-center'>
                        <Visibility className='text-primary-1 mr-3' />
                        <Typography>Dark Mode</Typography>
                    </Box>
                    <ToggleButtonGroup size='small' value='light' onChange={handleDarkMode}>
                        <ToggleButton value={'light'} className='rounded-3xl'>
                            <Brightness5Outlined className='h-4 w-4 text-primary-1' />
                        </ToggleButton>
                        <ToggleButton value={'dark'} className='rounded-3xl'>
                            <DarkModeOutlined className='h-4 w-4' />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
        </Container>
    );
}

export default Profile;
