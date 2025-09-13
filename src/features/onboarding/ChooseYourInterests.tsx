import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Box, Grid2, Typography, Button } from '@mui/material';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowCircleLeft } from '@mui/icons-material';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';
import { useDarkMode } from '@/contexts/DarkModeContext';

const interests = [
    { label: 'Music', iconName: 'music_note' },
    { label: 'Sport', iconName: 'sports_soccer' },
    { label: 'Art', iconName: 'brush' },
    { label: 'Education', iconName: 'school' },
    { label: 'Tech', iconName: 'computer' },
    { label: 'Food', iconName: 'restaurant' },
    { label: 'Other', iconName: 'more_horiz' },
];

function ChooseYourInterests() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const handleInterestClick = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest],
        );
    };

    const handleContinue = async () => {
        setIsLoading(true);
        try {
            // Try to get user from store first
            const userStore = (await import('@/store/userStore')).default;
            let user = userStore.getState().user;
            
            // If user not in store, try to get from Supabase auth
            if (!user) {
                const { supabase } = await import('@/utils/supabase');
                const { data: { user: authUser } } = await supabase.auth.getUser();
                
                if (!authUser) {
                    toast.error('User not found. Please try signing up again.');
                    navigate('/auth/sign-up');
                    return;
                }
                
                user = {
                    id: authUser.id,
                    email: authUser.email || '',
                    full_name: authUser.user_metadata?.full_name || '',
                    avatar_url: authUser.user_metadata?.avatar_url || null,
                    bio: null,
                    location: null,
                    notifications_enabled: true,
                    language: 'en',
                    dark_mode: false,
                    user_interests: [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    last_login: null
                };
            }

            // Wait for session to be fully established
            console.log('Waiting for session to be established...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Verify session is active
            const { supabase } = await import('@/utils/supabase');
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            console.log('Session check:', sessionData, sessionError);
            
            if (sessionError || !sessionData.session) {
                toast.error('Session not ready. Please try again.');
                return;
            }

            console.log('Updating interests for user:', user.id);
            console.log('Session user ID:', sessionData.session?.user?.id);
            console.log('Selected interests:', selectedInterests);
            
            // Get session user ID
            const sessionUserId = sessionData.session?.user?.id;
            console.log('Using session user ID:', sessionUserId);
            
            // Check if user exists first
            const { data: checkData, error: checkError } = await supabase
                .from('users')
                .select('id, user_interests')
                .eq('id', sessionUserId)
                .single();
            
            console.log('User check result:', checkData);
            console.log('User check error:', checkError);
            
            let userData;
            
            if (checkError && checkError.code === 'PGRST116') {
                // User doesn't exist, create them
                console.log('User not found, creating user profile...');
                
                const { data: insertData, error: insertError } = await supabase
                    .from('users')
                    .insert({
                        id: sessionUserId,
                        email: user.email,
                        full_name: user.full_name,
                        avatar_url: user.avatar_url,
                        user_interests: selectedInterests,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    })
                    .select()
                    .single();
                
                console.log('Insert result:', insertData);
                console.log('Insert error:', insertError);
                
                if (insertError) {
                    throw insertError;
                }
                
                userData = insertData;
            } else if (checkError) {
                throw checkError;
            } else {
                // User exists, update interests
                console.log('User exists, updating interests...');
                
                const { data, error } = await supabase
                    .from('users')
                    .update({
                        user_interests: selectedInterests,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', sessionUserId)
                    .select();
                
                console.log('Update result:', data);
                console.log('Update error:', error);
                
                if (error) {
                    throw error;
                }
                
                userData = data;
            }

            toast.success('Interests saved successfully!');
            navigate('/onboarding/congratulations', { state: { context: 'account' } });
        } catch (error) {
            console.error('Save interests error:', error);
            toast.error('Failed to save interests. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

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
            
            <Container className="relative min-h-screen">
                <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='flex grow flex-col gap-2 self-start mb-8'>
                    <Button 
                        onClick={() => navigate(-1)}
                        className='mb-6 p-0 min-w-0 w-10 h-10'
                        sx={{ textTransform: 'none' }}
                    >
                        <ArrowCircleLeft className='w-10 h-10' />
                    </Button>
                    <Typography variant='h5' className="text-heading mb-2">
                        Choose Your Interests
                    </Typography>
                    <Typography variant='body1' className={`font-poppins leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-text-secondary'}`}>
                        You are able to select multiple categories
                    </Typography>
                </Box>

                <Box className='mb-8'>
                    <Grid2 container spacing={2} wrap='wrap'>
                        {interests.map(({ label, iconName }) => {
                            const isSelected = selectedInterests.includes(label);
                            return (
                                <Grid2 key={label} size={4}>
                                    <Button
                                        variant={isSelected ? 'contained' : 'outlined'}
                                        onClick={() => handleInterestClick(label)}
                                        className={`w-24 h-24 rounded-full flex flex-col items-center justify-center font-jakarta text-sm font-medium ${
                                            isSelected 
                                                ? 'bg-primary text-white border-primary' 
                                                : isDarkMode 
                                                    ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600' 
                                                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                        }`}
                                        sx={{
                                            textTransform: 'none',
                                            minWidth: '96px',
                                            minHeight: '96px',
                                        }}
                                    >
                                        <Box className="mb-1 text-2xl">
                                            {getCategoryIcon(iconName)}
                                        </Box>
                                        <Typography variant='caption' className={`text-xs font-jakarta ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                            {label}
                                        </Typography>
                                    </Button>
                                </Grid2>
                            );
                        })}
                    </Grid2>
                </Box>

                <Box className='flex flex-col gap-4'>
                    <Button
                        variant='contained'
                        className='font-jakarta h-12 text-base font-medium'
                        onClick={handleContinue}
                        disabled={selectedInterests.length === 0 || isLoading}
                        fullWidth
                    >
                        {isLoading ? 'Saving...' : 'Continue'}
                    </Button>
                    <Button 
                        onClick={() => navigate('/home')}
                        className={`font-jakarta text-base font-medium ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}
                        sx={{ textTransform: 'none' }}
                    >
                        Skip
                    </Button>
                </Box>
            </Box>
        </Container>
        </>
    );
}

export default ChooseYourInterests;
