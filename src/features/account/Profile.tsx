import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Typography, Avatar, Badge, Divider, List, ListItem, ListItemIcon, ListItemText, Switch, ToggleButton, ToggleButtonGroup, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { KeyboardArrowLeftOutlined, MoreVertOutlined, Edit, PersonOutlineOutlined, ChevronRight, PaymentOutlined, NotificationsOutlined, StoreOutlined, Visibility, DarkModeOutlined, Brightness5Outlined, Save, Cancel, ImageOutlined } from '@mui/icons-material';
import Container from "@/components/layout/Container";
import BottomAppBar from "@/components/navigation/BottomAppBar";
import { fetchUserProfile, fetchUserStats, updateUserProfile } from "@/utils/supabaseService";
import { supabase } from "@/utils/supabase";
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
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        full_name: '',
        bio: '',
        location: '',
        avatar_url: ''
    });
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

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
        if (profile) {
            setEditForm({
                full_name: profile.full_name || '',
                bio: profile.bio || '',
                location: profile.location || '',
                avatar_url: profile.avatar_url || ''
            });
        }
        setEditDialogOpen(true);
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

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            
            let avatar_url = editForm.avatar_url;
            
            // Upload new photo if selected
            if (selectedPhoto && user) {
                try {
                    // First, try to list existing buckets to see what's available
                    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
                    
                    if (bucketsError) {
                        console.log('Could not list buckets, using base64 fallback');
                        avatar_url = await convertImageToBase64(selectedPhoto);
                    } else {
                        // Look for existing buckets we can use
                        const availableBucket = buckets.find(bucket => 
                            bucket.name === 'profile-photos' || 
                            bucket.name === 'avatars' || 
                            bucket.name === 'images' ||
                            bucket.name === 'public'
                        );

                        if (availableBucket) {
                            // Use existing bucket
                            const bucketName = availableBucket.name;
                            const safeFileName = selectedPhoto.name.replaceAll(/[^a-zA-Z0-9.-]/g, '_');
                            const filePath = `profile-photos/${user.id}/${Date.now()}_${safeFileName}`;

                            const { data: uploadData, error: uploadError } = await supabase.storage
                                .from(bucketName)
                                .upload(filePath, selectedPhoto, { upsert: true });

                            if (uploadError) {
                                console.log(`Upload to ${bucketName} failed, using base64 fallback:`, uploadError);
                                avatar_url = await convertImageToBase64(selectedPhoto);
                                toast.info('Photo saved as embedded image (upload failed)');
                            } else {
                                const { data: publicUrlData } = supabase.storage
                                    .from(bucketName)
                                    .getPublicUrl(uploadData.path);
                                avatar_url = publicUrlData.publicUrl;
                            }
                        } else {
                            // Try to create profile-photos bucket
                            console.log('No suitable bucket found, trying to create profile-photos...');
                            
                            const { error: createBucketError } = await supabase.storage.createBucket('profile-photos', {
                                public: true,
                                allowedMimeTypes: ['image/*'],
                                fileSizeLimit: 5242880 // 5MB limit
                            });

                            if (createBucketError) {
                                console.log('Could not create bucket, using base64 fallback');
                                avatar_url = await convertImageToBase64(selectedPhoto);
                            } else {
                                // Retry upload after creating bucket
                                const safeFileName = selectedPhoto.name.replaceAll(/[^a-zA-Z0-9.-]/g, '_');
                                const filePath = `profile-photos/${user.id}/${Date.now()}_${safeFileName}`;
                                
                                const { data: retryUploadData, error: retryError } = await supabase.storage
                                    .from('profile-photos')
                                    .upload(filePath, selectedPhoto, { upsert: true });

                                if (retryError) {
                                    console.log('Upload failed after bucket creation, using base64 fallback');
                                    avatar_url = await convertImageToBase64(selectedPhoto);
                                    toast.info('Photo saved as embedded image (bucket creation failed)');
                                } else {
                                    const { data: publicUrlData } = supabase.storage
                                        .from('profile-photos')
                                        .getPublicUrl(retryUploadData.path);
                                    avatar_url = publicUrlData.publicUrl;
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.log('Storage error, using base64 fallback:', error);
                    avatar_url = await convertImageToBase64(selectedPhoto);
                    toast.info('Photo saved as embedded image (storage unavailable)');
                }
            }

            // Update profile with new data including photo URL
            try {
                const updatedProfile = await updateUserProfile({
                    ...editForm,
                    avatar_url
                });
                
                setProfile(updatedProfile);
                setEditDialogOpen(false);
                setSelectedPhoto(null);
                setPhotoPreview(null);
                toast.success('Profile updated successfully!');
            } catch (profileError: any) {
                console.error('Profile update error:', profileError);
                
                // Check if it's a database schema issue
                if (profileError.message?.includes('avatar_url') || profileError.code === 'PGRST204') {
                    toast.error('Database schema needs update. Please run the migration script first.');
                    console.log('Database schema issue detected. Run the migration script in Supabase SQL Editor.');
                } else {
                    toast.error(`Failed to update profile: ${profileError?.message || 'Unknown error'}`);
                }
            }
        } catch (error: any) {
            console.error('Error updating profile:', error);
            toast.error(`Failed to update profile: ${error?.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditDialogOpen(false);
        setSelectedPhoto(null);
        setPhotoPreview(null);
    };

    const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedPhoto(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);
        }
    };

    const handleRemovePhoto = () => {
        setSelectedPhoto(null);
        setPhotoPreview(null);
        setEditForm(prev => ({ ...prev, avatar_url: '' }));
    };

    // Helper function to convert image to base64 as fallback
    const convertImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to convert image to base64'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
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

            {/* Edit Profile Dialog */}
            <Dialog 
                open={editDialogOpen} 
                onClose={handleCancelEdit}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <Box className="flex flex-col gap-4 mt-2">
                        <TextField
                            label="Full Name"
                            value={editForm.full_name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                        />
                        <TextField
                            label="Location"
                            value={editForm.location}
                            onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                            fullWidth
                            variant="outlined"
                            placeholder="City, Country"
                        />
                        {/* Profile Photo Upload */}
                        <Box className="flex flex-col items-center gap-4">
                            <Typography variant="subtitle1" className="self-start">
                                Profile Photo
                            </Typography>
                            
                            {/* Current Photo Display */}
                            {(photoPreview || editForm.avatar_url) && (
                                <Box className="relative">
                                    <Avatar
                                        src={photoPreview || editForm.avatar_url}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    {selectedPhoto && (
                                        <IconButton
                                            size="small"
                                            onClick={handleRemovePhoto}
                                            sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                bgcolor: 'error.main',
                                                color: 'white',
                                                '&:hover': { bgcolor: 'error.dark' }
                                            }}
                                        >
                                            <Cancel fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                            )}
                            
                            {/* Upload Button */}
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<ImageOutlined />}
                                className="w-full"
                            >
                                {selectedPhoto ? 'Change Photo' : 'Upload Photo'}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handlePhotoSelect}
                                />
                            </Button>
                            
                            {selectedPhoto && (
                                <Typography variant="caption" className="text-text-3">
                                    Selected: {selectedPhoto.name}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelEdit} startIcon={<Cancel />}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSaveProfile} 
                        variant="contained" 
                        startIcon={<Save />}
                        disabled={loading}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
        </Container>
    );
}

export default Profile;
