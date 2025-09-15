import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Typography, Avatar, Badge, Divider, List, ListItem, ListItemIcon, ListItemText, Switch, TextField, DialogTitle, DialogContent, DialogActions, Menu, MenuItem } from '@mui/material';
import { MoreVertOutlined, Edit, PersonOutlineOutlined, ChevronRight, PaymentOutlined, NotificationsOutlined, StoreOutlined, Visibility, Save, Cancel, ImageOutlined, LogoutOutlined, SettingsOutlined } from '@mui/icons-material';
import { Container } from '@mui/material';
import BottomAppBar from "@/components/navigation/BottomAppBar";
import { PageHeader } from '@/components/layout/PageHeader';
import { supabase } from "@/utils/supabase";
import { useUserStore } from "@/store/userStore";
import { showSuccess, showError } from '@/utils/notifications';
import { useUser, useUpdateUser, useUserStats } from '@/hooks/entityConfigs';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { ContainerDialog } from '@/components/dialogs/ContainerDialog';
import { getAvatarProps } from '@/utils/avatarUtils';
import { LocationPicker } from '@/components/forms/LocationPicker';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface ProfileAvatarProps {
    src?: string;
    size?: number;
    onEditClick?: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ src, size, onEditClick }) => {
    const { user: authUser } = useUserStore();
    const { data: user } = useUser(authUser?.id || '');
    
    
    // Use the src prop if provided, otherwise use the avatar logic
    const avatarProps = src ? {
        src,
        sx: {
            width: size || 80,
            height: size || 80,
        }
    } : getAvatarProps(user, authUser, size || 80);
    
    return (
        <Badge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <IconButton
                    size='small'
                    onClick={onEditClick}
                    className="bg-primary hover:bg-primary-dark border-2 border-white"
                >
                    <Edit className="text-sm text-white" />
                </IconButton>
            }
        >
            <Avatar {...avatarProps} />
        </Badge>
    );
};

function Profile() {
    const navigate = useNavigate();
    const { user: authUser, setUser } = useUserStore();
    const { data: user, isLoading: userLoading } = useUser(authUser?.id || '');
    const { data: stats, isLoading: statsLoading } = useUserStats(authUser?.id);
    const updateUserMutation = useUpdateUser();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [profile, setProfile] = useState<any>(null);
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

    // Use user data from TanStack Query hook
    useEffect(() => {
        if (user) {
            setProfile(user);
        } else if (authUser) {
            // Use auth user data as fallback
            setProfile({
                id: authUser.id,
                email: authUser.email,
                full_name: authUser.full_name,
                avatar_url: authUser.avatar_url,
                bio: null,
                location: null,
                user_interests: []
            });
        }
    }, [user, authUser]);



    const handleBack = () => {
        navigate(-1);
    };

    const handleManageEvents = () => {
        navigate('/events/manage');
    };

    const handleProfileEdit = () => {
        if (user) {
            setEditForm({
                full_name: user.full_name || '',
                bio: user.bio || '',
                location: user.location || '',
                avatar_url: user.avatar_url || '',
                user_interests: user.user_interests || []
            });
        }
        setEditDialogOpen(true);
    };

    const handlePhotoEdit = () => {
        setPhotoEditDialogOpen(true);
    };

    const handlePaymentMethod = () => {
        navigate('/payments/cards');
    };

    const handleSettings = () => {
        navigate('/profile/settings');
    };

    const handleNotifications = () => {
        showSuccess('Notifications setting updated!');
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
                                showSuccess('Photo saved as embedded image (upload failed)');
                            } else {
                                const { data: publicUrlData } = supabase.storage
                                    .from(bucketName)
                                    .getPublicUrl(uploadData.path);
                                avatar_url = publicUrlData.publicUrl;
                            }
                        } else {
                            // No available bucket, use base64
                            avatar_url = await convertImageToBase64(selectedPhoto);
                            showSuccess('Photo saved as embedded image (no storage bucket available)');
                        }
                    }
                } catch (error) {
                    avatar_url = await convertImageToBase64(selectedPhoto);
                    showSuccess('Photo saved as embedded image (storage unavailable)');
                }
            }

            // Update profile with new data including photo URL using TanStack Query mutation
            if (user?.id) {
                // Filter out empty strings and prepare clean data
                const cleanData = {
                    full_name: editForm.full_name.trim() || undefined,
                    bio: editForm.bio.trim() || undefined,
                    location: editForm.location.trim() || undefined,
                    avatar_url: avatar_url || undefined,
                    user_interests: editForm.user_interests.length > 0 ? editForm.user_interests : undefined,
                };
                
                // Remove undefined values
                const filteredData = Object.fromEntries(
                    Object.entries(cleanData).filter(([_, value]) => value !== undefined)
                );
                
                updateUserMutation.mutate({
                    id: user.id,
                    data: filteredData
                }, {
                    onSuccess: (updatedProfile) => {
                        setProfile(updatedProfile);
                        setEditDialogOpen(false);
                        setPhotoEditDialogOpen(false);
                        setSelectedPhoto(null);
                        setPhotoPreview(null);
                        showSuccess('Profile updated successfully!');
                    },
                    onError: (profileError: any) => {
                        console.error('Profile update error:', profileError);
                        
                        // Check if it's a database schema issue
                        if (profileError.message?.includes('avatar_url') || profileError.code === 'PGRST204') {
                            showError('Database schema needs update. Please run the migration script first.');
                        } else {
                            showError(`Failed to update profile: ${profileError?.message || 'Unknown error'}`);
                        }
                    }
                });
            }
        } catch (error: any) {
            console.error('Error updating profile:', error);
            showError(`Failed to update profile: ${error?.message || 'Unknown error'}`);
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
                showError('Failed to logout');
            } else {
                setUser(null);
                // Clear all TanStack Query caches
                const { queryClient } = await import('@/lib/queryClient');
                queryClient.clear();
                showSuccess('Logged out successfully');
                navigate('/');
            }
        } catch (error) {
            console.error('Logout error:', error);
            showError('Failed to logout');
        }
        handleMenuClose();
    };

    if (userLoading && !user) {
        return (
            <Container className="relative min-h-screen">
                <Typography>Loading profile...</Typography>
            </Container>
        );
    }

    if (updateUserMutation.isPending) {
        return (
            <Container className="relative min-h-screen">
                <Typography>Updating profile...</Typography>
            </Container>
        );
    }

    // Use user from store as fallback if database user not loaded yet
    const displayUser = user || authUser;
    
    if (!displayUser) {
        return (
            <Container className="relative min-h-screen flex items-center justify-center">
                <Box className="flex flex-col items-center gap-4 text-center">
                    <Typography variant="h5" className="font-jakarta font-semibold text-primary">
                        Please sign in to view profile
                    </Typography>
                    <Button 
                        onClick={() => navigate('/auth/sign-in')} 
                        variant='contained'
                        className="bg-primary text-white font-jakarta font-semibold h-12 px-8"
                    >
                        Sign In
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <Button
                    onClick={toggleDarkMode}
                    size="small"
                    variant="outlined"
                    className={`text-xs ${isDarkMode ? 'text-white border-gray-600' : 'text-gray-700 border-gray-300'}`}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </Button>
            </Box>
            
            <Container className='relative min-h-screen'>
                <PageHeader 
                    title="Profile"
                    showBackButton={true}
                    showMenuButton={true}
                    onBackClick={handleBack}
                    onMenuClick={handleMenuOpen}
                    className="mb-8"
                />
            
            <Box className='flex w-full flex-col items-center justify-center'>
                <ProfileAvatar 
                    src={user?.avatar_url || profile?.avatar_url} 
                    size={100}
                    onEditClick={handlePhotoEdit}
                />
                <Typography variant='h4' className='mt-2'>
                    {profile?.full_name || user?.full_name || user?.email?.split('@')[0] || 'User'}
                </Typography>
                <Typography variant='body2' className='text-muted font-jakarta'>
                    {profile?.bio || 'No bio added yet'}
                </Typography>
                {profile?.location && (
                    <Typography variant='body2' className='text-muted mt-1 font-jakarta'>
                        📍 {profile.location}
                    </Typography>
                )}
            </Box>

            <Box className='grid h-20 w-full grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center rounded-2xl bg-neutral-50 dark:bg-gray-800'>
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary font-jakarta'>
                        {stats?.events_created || 0}
                    </Typography>
                    <Typography variant='body2' className='text-muted font-jakarta'>
                        Events
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary font-jakarta'>
                        {stats?.meetups_created || 0}
                    </Typography>
                    <Typography variant='body2' className='text-muted font-jakarta'>
                        Meetups
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary font-jakarta'>
                        {stats?.events_attending || 0}
                    </Typography>
                    <Typography variant='body2' className='text-muted font-jakarta'>
                        Attending
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem className='h-[40%] self-center' />
                <Box className='text-center'>
                    <Typography variant='h4' className='text-primary font-jakarta'>
                        {user?.user_interests?.length || 0}
                    </Typography>
                    <Typography variant='body2' className='text-muted font-jakarta'>
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
                        <ChevronRight className='text-muted' />
                    </ListItem>
                    <ListItem component='button' onClick={handleProfileEdit}>
                        <ListItemIcon>
                            <PersonOutlineOutlined className='text-primary' />
                        </ListItemIcon>
                        <ListItemText primary='Edit Profile' />
                        <ChevronRight className='text-muted' />
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
                        <ChevronRight className='text-muted' />
                    </ListItem>
                    <ListItem component='button' onClick={handleSettings}>
                        <ListItemIcon>
                            <SettingsOutlined className='text-primary' />
                        </ListItemIcon>
                        <ListItemText primary='Settings' />
                        <ChevronRight className='text-muted' />
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
            <ContainerDialog 
                open={editDialogOpen} 
                onClose={handleCancelEdit}
                maxWidth={false}
                fullWidth
                disableEnforceFocus
            >
                <DialogTitle 
                    className="text-xl font-semibold font-poppins pb-1 border-b border-divider"
                >
                    Edit Profile
                </DialogTitle>
                <DialogContent sx={{ 
                    p: 3, 
                    '&.MuiDialogContent-root': { 
                        paddingTop: 2,
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    } 
                }}>
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
                            multiline
                            rows={3}
                            size="medium"
                            placeholder="Tell us about yourself..."
                        />
                        <Box className="flex flex-col gap-2">
                            <Typography 
                                variant="subtitle1" 
                                className="self-start"
                                sx={{ 
                                    fontWeight: 600, 
                                    fontFamily: 'Poppins',
                                    color: 'text.primary'
                                }}
                            >
                                Location
                            </Typography>
                            <LocationPicker
                                value={editForm.location}
                                onChange={(value) => setEditForm(prev => ({ ...prev, location: value }))}
                            />
                        </Box>
                        
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
                                {['Music', 'Sports', 'Art', 'Tech', 'Food', 'Education', 'Business', 'Other'].map((interest) => (
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
                            {(photoPreview || editForm.avatar_url || profile?.avatar_url || user?.avatar_url) && (
                                <Box className="relative">
                                    <Avatar
                                        src={photoPreview || editForm.avatar_url || profile?.avatar_url || user?.avatar_url}
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
                        disabled={userLoading || updateUserMutation.isPending}
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
            </ContainerDialog>

            {/* Photo Edit Dialog */}
            <ContainerDialog 
                open={photoEditDialogOpen} 
                onClose={handleCancelPhotoEdit}
                maxWidth="sm"
                fullWidth
                disableEnforceFocus
            >
                <DialogTitle>Edit Profile Photo</DialogTitle>
                <DialogContent sx={{ 
                    '&.MuiDialogContent-root': { 
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    } 
                }}>
                    <Box className="flex flex-col items-center gap-4 mt-2">
                        {/* Current Photo Display */}
                        {(photoPreview || profile?.avatar_url || user?.avatar_url) && (
                            <Box className="relative">
                                <Avatar
                                    src={photoPreview || profile?.avatar_url || user?.avatar_url}
                                    sx={{ width: 120, height: 120 }}
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
                        disabled={userLoading || updateUserMutation.isPending}
                        className="h-12"
                    >
                        {updateUserMutation.isPending ? 'Saving...' : 'Save Photo'}
                    </Button>
                </DialogActions>
            </ContainerDialog>

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

                <BottomAppBar   />
            </Container>
        </>
    );
}

export default Profile;
