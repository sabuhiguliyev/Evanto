import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Box, Grid2, Typography, Button } from '@mui/material';
import { updateUserProfile } from '@/services';
import Container from '../../components/layout/Container';
import { Link } from 'react-router-dom';
import CircleArrowIcon from '@/assets/icons/arrowcircleleft.svg?react';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';
import { useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

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
    const { mode } = useTheme();

    const handleInterestClick = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest],
        );
    };

    const handleContinue = async () => {
        setIsLoading(true);
        try {
            await updateUserProfile({
                user_interests: selectedInterests
            });

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
                <ThemeToggle />
            </Box>
            
            <Container className={`relative justify-start ${mode === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='flex grow flex-col gap-2 self-start mb-8'>
                    <Button 
                        onClick={() => navigate(-1)}
                        className='mb-6 p-0 min-w-0 w-10 h-10'
                        sx={{ textTransform: 'none' }}
                    >
                        <CircleArrowIcon className='w-10 h-10' />
                    </Button>
                    <Typography variant='h3' className={`font-poppins font-semibold mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Choose Your Interests
                    </Typography>
                    <Typography variant='body1' className={`font-poppins leading-relaxed ${mode === 'dark' ? 'text-gray-300' : 'text-text-secondary'}`}>
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
                                                : mode === 'dark' 
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
                                        <Typography variant='caption' className={`text-xs font-jakarta ${mode === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
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
                        onClick={() => navigate('/onboarding/congratulations', { state: { context: 'account' } })}
                        className={`font-jakarta text-base font-medium ${mode === 'dark' ? 'text-blue-400' : 'text-primary'}`}
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
