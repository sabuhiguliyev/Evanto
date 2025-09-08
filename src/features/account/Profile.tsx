import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Typography, Avatar, Badge, Divider, List, ListItem, ListItemIcon, ListItemText, Switch, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Menu, MenuItem } from '@mui/material';
import { KeyboardArrowLeftOutlined, MoreVertOutlined, Edit, PersonOutlineOutlined, ChevronRight, PaymentOutlined, NotificationsOutlined, StoreOutlined, Visibility, Save, Cancel, ImageOutlined, LogoutOutlined } from '@mui/icons-material';
import Container from "@/components/layout/Container";
import BottomAppBar from "@/components/navigation/BottomAppBar";
import { fetchUserStats } from "@/services";
import { supabase } from "@/utils/supabase";
import useUserStore from "@/store/userStore";
import toast from "react-hot-toast";
import { useUser, useUpdateUser } from '@/hooks/entityConfigs';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface ProfileAvatarProps {
    src?: string;
    size?: number;
    onEditClick?: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ src, size, onEditClick }) => (
    <Badge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
            <IconButton
                size='small'
                onClick={onEditClick}
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
    const { user, setUser } = useUserStore();
    const { data: profileData, isLoading: profileLoading, error: profileError } = useUser(user?.id || '');
    const updateUserMutation = useUpdateUser();
    const [profile, setProfile] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [photoEditDialogOpen, setPhotoEditDialogOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        full_name: '',
        bio: '',
        location: '',
        avatar_url: '',
        user_interests: [] as string[]
    });
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    // Sync profile data from TanStack Query or use auth user data as fallback
    useEffect(() => {
        if (profileData) {
            setProfile(profileData);
        } else if (user && !profileLoading && profileError) {
            // If no profile data found, use auth user data as fallback
            setProfile({
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                avatar_url: user.avatar_url,
                bio: '',
                location: '',
                notifications_enabled: true,
                language: 'en',
                dark_mode: false
            });
        }
    }, [profileData, user, profileLoading, profileError]);

    useEffect(() => {
        // Check session on mount
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user && !user) {
                const userData = {
                    id: session.user.id,
                    email: session.user.email || '',
                    full_name: session.user.user_metadata?.full_name,
                    avatar_url: session.user.user_metadata?.avatar_url,
                };
                setUser(userData);
            }
        };
        
        checkSession();
    }, [setUser, user]);

    useEffect(() => {
        const loadProfileData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                
                // Profile data is now fetched via TanStack Query hook above
                
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
        navigate('/events/manage');
    };

    const handleProfileEdit = () => {
        if (profile) {
            setEditForm({
                full_name: profile.full_name || '',
                bio: profile.bio || '',
                location: profile.location || '',
                avatar_url: profile.avatar_url || '',
                user_interests: profile.user_interests || []
            });
        }
        setEditDialogOpen(true);
    };

    const handlePhotoEdit = () => {
        setPhotoEditDialogOpen(true);
    };

    const handlePaymentMethod = () => {
        navigate('/payments');
    };

    const handleNotifications = () => {
        toast.success('Notifications setting updated!');
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
                                avatar_url = await convertImageToBase64(selectedPhoto);
                                toast.success('Photo saved as embedded image (upload failed)');
                            } else {
                                const { data: publicUrlData } = supabase.storage
                                    .from(bucketName)
                                    .getPublicUrl(uploadData.path);
                                avatar_url = publicUrlData.publicUrl;
                            }
                        } else {
                            // Try to create profile-photos bucket
                            
                            const { error: createBucketError } = await supabase.storage.createBucket('profile-photos', {
                                public: true,
                                allowedMimeTypes: ['image/*'],
                                fileSizeLimit: 5242880 // 5MB limit
                            });

                            if (createBucketError) {
                                avatar_url = await convertImageToBase64(selectedPhoto);
                            } else {
                                // Retry upload after creating bucket
                                const safeFileName = selectedPhoto.name.replaceAll(/[^a-zA-Z0-9.-]/g, '_');
                                const filePath = `profile-photos/${user.id}/${Date.now()}_${safeFileName}`;
                                
                                const { data: retryUploadData, error: retryError } = await supabase.storage
                                    .from('profile-photos')
                                    .upload(filePath, selectedPhoto, { upsert: true });

                                if (retryError) {
                                    avatar_url = await convertImageToBase64(selectedPhoto);
                                    toast.success('Photo saved as embedded image (bucket creation failed)');
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
                    avatar_url = await convertImageToBase64(selectedPhoto);
                    toast.success('Photo saved as embedded image (storage unavailable)');
                }
            }

            // Update profile with new data including photo URL using TanStack Query mutation
            if (user?.id) {
                updateUserMutation.mutate({
                    id: user.id,
                    updates: {
                        ...editForm,
                        avatar_url
                    }
                }, {
                    onSuccess: (updatedProfile) => {
                        setProfile(updatedProfile);
                        setEditDialogOpen(false);
                        setPhotoEditDialogOpen(false);
                        setSelectedPhoto(null);
                        setPhotoPreview(null);
                        toast.success('Profile updated successfully!');
                    },
                    onError: (profileError: any) => {
                        console.error('Profile update error:', profileError);
                        
                        // Check if it's a database schema issue
                        if (profileError.message?.includes('avatar_url') || profileError.code === 'PGRST204') {
                            toast.error('Database schema needs update. Please run the migration script first.');
                        } else {
                            toast.error(`Failed to update profile: ${profileError?.message || 'Unknown error'}`);
                        }
                    }
                });
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

    const handleCancelPhotoEdit = () => {
        setPhotoEditDialogOpen(false);
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

    // Menu handlers
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    // Logout function
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Logout error:', error);
                toast.error('Failed to logout');
            } else {
                setUser(null);
                toast.success('Logged out successfully');
                navigate('/');
            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout');
        }
        handleMenuClose();
    };

    if (profileLoading && !user) {
        return (
            <Container className='justify-center'>
                <Typography>Loading profile...</Typography>
            </Container>
        );
    }

    if (updateUserMutation.isPending) {
        return (
            <Container className='justify-center'>
                <Typography>Updating profile...</Typography>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className='justify-center'>
                <Typography>Please sign in to view profile</Typography>
                <Button onClick={() => navigate('/auth/sign-in')} variant='contained'>
                    Sign In
                </Button>
            </Container>
        );
    }

    return (
        <Container className='justify-start'>
            <Box className={'mb-8 flex w-full items-center justify-between'}>
                <IconButton onClick={handleBack} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Profile</Typography>
                <IconButton 
                    className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700"
                    onClick={handleMenuOpen}
                >
                    <MoreVertOutlined />
                </IconButton>
            </Box>
            
            <Box className='flex w-full flex-col items-center justify-center'>
                <ProfileAvatar 
                    src={profile?.avatar_url || user?.avatar_url || 'https://i.pravatar.cc/300'} 
                    size={100}
                    onEditClick={handlePhotoEdit}
                />
                <Typography variant='h4' className='mt-2'>
                    {profile?.full_name || user.email || 'User'}
                </Typography>
                <Typography variant='body2' className='text-text-muted font-poppins'>
                    {profile?.bio || 'No bio added yet'}
                </Typography>
                {profile?.location && (
                    <Typography variant='body2' className='text-text-muted mt-1 font-poppins'>
                        📍 {profile.location}
                    </Typography>
                )}
            </Box>

            <Box className='grid h-20 w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center rounded-2xl bg-neutral-50 dark:bg-gray-800'>
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary font-poppins'>
                        {stats?.events_created || 0}
                    </Typography>
                    <Typography variant='body2' className='text-text-muted dark:text-gray-400 font-poppins'>
                        Events
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary font-poppins'>
                        {stats?.events_attending || 0}
                    </Typography>
                    <Typography variant='body2' className='text-text-muted dark:text-gray-400 font-poppins'>
                        Attending
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary font-poppins'>
                        {profile?.user_interests?.length || 0}
                    </Typography>
                    <Typography variant='body2' className='text-text-muted dark:text-gray-400 font-poppins'>
                        Interests
                    </Typography>
                </Box>
            </Box>
            
            <Typography variant='h4' className='self-start'>
                Account
            </Typography>
            <Box className='w-full rounded-2xl bg-neutral-50 dark:bg-gray-800'>
                <List>
                    <ListItem component='button' onClick={handleManageEvents}>
                        <ListItemIcon>
                            <StoreOutlined className='text-primary' />
                        </ListItemIcon>
                        <ListItemText primary='Manage Events' />
                        <ChevronRight className='text-text-muted' />
                    </ListItem>
                    <ListItem component='button' onClick={handleProfileEdit}>
                        <ListItemIcon>
                            <PersonOutlineOutlined className='text-primary' />
                        </ListItemIcon>
                        <ListItemText primary='Edit Profile' />
                        <ChevronRight className='text-text-muted' />
                    </ListItem>
                    <ListItem component='button'>
                        <ListItemIcon>
                            <NotificationsOutlined className='text-primary' />
                        </ListItemIcon>
                        <ListItemText primary='Notifications' />
                        <Switch 
                            size='small' 
                            className='[&_.MuiSwitch-thumb]:bg-primary'
                            defaultChecked={true}
                            onChange={handleNotifications}
                        />
                    </ListItem>
                    <ListItem component='button' onClick={handlePaymentMethod}>
                        <ListItemIcon>
                            <PaymentOutlined className='text-primary' />
                        </ListItemIcon>
                        <ListItemText primary='Payment Method' />
                        <ChevronRight className='text-text-muted' />
                    </ListItem>
                </List>
            </Box>

            {/* Theme Toggle section */}
            <Box className='w-full rounded-2xl bg-neutral-50 dark:bg-gray-800 mt-4 p-4'>
                <Box className='flex items-center justify-between'>
                    <Box className='flex items-center'>
                        <Visibility className='text-primary mr-3' />
                        <Typography>Theme</Typography>
                    </Box>
                    <ThemeToggle size="medium" />
                </Box>
            </Box>

            {/* Edit Profile Dialog */}
            <Dialog 
                open={editDialogOpen} 
                onClose={handleCancelEdit}
                maxWidth="sm"
                fullWidth
                disableEnforceFocus
                PaperProps={{
                    sx: {
                        position: 'fixed',
                        top: '50%',
                        left: '37px',
                        right: 'auto',
                        transform: 'translateY(-50%)',
                        width: '375px',
                        margin: 0,
                        border: '1px solid gray',
                        borderRadius: '20px',
                        maxHeight: '80vh',
                    }
                }}
            >
                <DialogTitle 
                    sx={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 600, 
                        fontFamily: 'Poppins',
                        pb: 1,
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    Edit Profile
                </DialogTitle>
                <DialogContent sx={{ p: 3, '&.MuiDialogContent-root': { paddingTop: 2 } }}>
                    <Box className="flex flex-col gap-6">
                        <TextField
                            label="Full Name"
                            value={editForm.full_name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                            fullWidth
                            className="text-input"
                            size="medium"
                        />
                        <TextField
                            label="Bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                            fullWidth
                            className="text-input"
                            multiline
                            rows={3}
                            size="medium"
                            placeholder="Tell us about yourself..."
                        />
                        <TextField
                            label="Location"
                            value={editForm.location}
                            onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                            fullWidth
                            className="text-input"
                            placeholder="City, Country"
                            size="medium"
                        />
                        
                        {/* User Interests */}
                        <Box className="flex flex-col gap-3">
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    fontWeight: 600, 
                                    fontFamily: 'Poppins',
                                    color: 'text.primary'
                                }}
                            >
                                Interests
                            </Typography>
                            <Box className="flex flex-wrap gap-2">
                                {['Music', 'Sport', 'Art', 'Tech', 'Food', 'Education', 'Business', 'Other'].map((interest) => (
                                    <Button
                                        key={interest}
                                        variant={editForm.user_interests.includes(interest) ? 'contained' : 'outlined'}
                                        size="small"
                                        onClick={() => {
                                            setEditForm(prev => ({
                                                ...prev,
                                                user_interests: prev.user_interests.includes(interest)
                                                    ? prev.user_interests.filter(i => i !== interest)
                                                    : [...prev.user_interests, interest]
                                            }));
                                        }}
                                        className="rounded-full"
                                        sx={{
                                            fontSize: '0.75rem',
                                            px: 2,
                                            py: 0.5,
                                            minWidth: 'auto',
                                            height: '32px'
                                        }}
                                    >
                                        {interest}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                        {/* Profile Photo Upload */}
                        <Box className="flex flex-col items-center gap-4">
                            <Typography 
                                variant="subtitle1" 
                                className="self-start"
                                sx={{ 
                                    fontWeight: 600, 
                                    fontFamily: 'Poppins',
                                    color: 'text.primary'
                                }}
                            >
                                Profile Photo
                            </Typography>
                            
                            {/* Current Photo Display */}
                            {(photoPreview || editForm.avatar_url) && (
                                <Box className="relative">
                                    <Avatar
                                        src={photoPreview || editForm.avatar_url}
                                        sx={{ 
                                            width: 80, 
                                            height: 80,
                                            border: '2px solid',
                                            borderColor: 'divider'
                                        }}
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
                                                width: 24,
                                                height: 24,
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
                                className="w-full h-12"
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
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
                                <Typography 
                                    variant="caption" 
                                    className="text-text-muted font-poppins"
                                    sx={{ 
                                        fontSize: '0.75rem',
                                        textAlign: 'center',
                                        wordBreak: 'break-all'
                                    }}
                                >
                                    Selected: {selectedPhoto.name}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 2, gap: 2 }}>
                    <Button 
                        onClick={handleCancelEdit} 
                        startIcon={<Cancel />}
                        className="h-12 flex-1"
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 500
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSaveProfile} 
                        variant="contained" 
                        startIcon={<Save />}
                        disabled={loading || updateUserMutation.isPending}
                        className="h-12 flex-1"
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 500
                        }}
                    >
                        {updateUserMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Photo Edit Dialog */}
            <Dialog 
                open={photoEditDialogOpen} 
                onClose={handleCancelPhotoEdit}
                maxWidth="sm"
                fullWidth
                disableEnforceFocus
                PaperProps={{
                    sx: {
                        position: 'fixed',
                        top: '50%',
                        left: '37px',
                        right: 'auto',
                        transform: 'translateY(-50%)',
                        width: '375px',
                        margin: 0,
                        border: '1px solid gray',
                        borderRadius: '20px',
                    }
                }}
            >
                <DialogTitle>Edit Profile Photo</DialogTitle>
                <DialogContent>
                    <Box className="flex flex-col items-center gap-4 mt-2">
                        {/* Current Photo Display */}
                        {(photoPreview || profile?.avatar_url || user?.avatar_url) && (
                            <Box className="relative">
                                <Avatar
                                    src={photoPreview || profile?.avatar_url || user?.avatar_url}
                                    sx={{ width: 150, height: 150 }}
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
                            className="w-full h-12"
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
                            <Typography variant="caption" className="text-text-muted font-poppins">
                                Selected: {selectedPhoto.name}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCancelPhotoEdit} 
                        startIcon={<Cancel />}
                        className="h-12"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSaveProfile} 
                        variant="contained" 
                        startIcon={<Save />}
                        disabled={loading || updateUserMutation.isPending}
                        className="h-12"
                    >
                        {updateUserMutation.isPending ? 'Saving...' : 'Save Photo'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Profile Menu */}
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        position: 'fixed',
                        width: '200px',
                        maxWidth: '335px',
                    }
                }}
            >
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>

            <BottomAppBar className='fixed bottom-0 z-10 w-full' />
        </Container>
    );
}

export default Profile;
