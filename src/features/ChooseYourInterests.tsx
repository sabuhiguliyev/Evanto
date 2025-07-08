import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Box, Grid2, Typography, Button } from '@mui/material';
import { supabase } from '@/utils/supabase';
import Container from '../components/layout/Container';
import Link from '../components/navigation/Link';
import CircleArrowIcon from '@/components/icons/arrowcircleleft.svg?react';

const interests = [
    { label: 'Art', icon: '🎨' },
    { label: 'Design', icon: '🎯' },
    { label: 'Music', icon: '🎵' },
    { label: 'Sports', icon: '🏀' },
    { label: 'Food', icon: '🍔' },
    { label: 'Travel', icon: '🌍' },
    { label: 'Hangout', icon: '🎉' },
    { label: 'Knowledge', icon: '📖' },
    { label: 'Camping', icon: '🏕️' },
    { label: 'Workshop', icon: '🛠️' },
    { label: 'Trekking', icon: '🥾' },
    { label: 'Comedy', icon: '😂' },
];

function ChooseYourInterests() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInterestClick = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest],
        );
    };

    const handleContinue = async () => {
        setIsLoading(true);
        try {
            const { data, error: userError } = await supabase.auth.getUser();
            if (userError) throw new Error(userError.message);
            if (!data?.user) {
                toast.error('You must be logged in to save interests.');
                return;
            }

            const { error: updateError } = await supabase
                .from('users')
                .update({ user_interests: selectedInterests })
                .eq('id', data.user.id)
                .select();

            if (updateError) throw updateError;

            toast.success('Interests saved successfully!');
            navigate('/inquiry');
        } catch (error) {
            console.error('Save interests error:', error);
            toast.error('Failed to save interests. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Box className='flex grow flex-col gap-2 self-start'>
                <CircleArrowIcon className='mb-10' />
                <Typography variant='h3'>Choose Your Interests</Typography>
                <Typography variant='body1'>You are able to select multiple categories</Typography>
            </Box>

            <Grid2 container spacing={1} wrap='wrap'>
                {interests.map(({ label, icon }) => {
                    const isSelected = selectedInterests.includes(label);
                    return (
                        <Grid2 key={label} size={4}>
                            <Button
                                variant='outlined'
                                onClick={() => handleInterestClick(label)}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    border: isSelected ? '2px solid #1976d2' : 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textTransform: 'none',
                                    backgroundColor: isSelected ? '#e3f2fd' : '#f5f5f5',
                                    boxShadow: isSelected ? '0px 0px 8px rgba(25, 118, 210, 0.5)' : 'none',
                                    '&:hover': {
                                        border: isSelected ? '2px solid #1976d2' : 'none',
                                        backgroundColor: isSelected ? '#e3f2fd' : '#ebebeb',
                                    },
                                }}
                            >
                                <span style={{ fontSize: 24 }}>{icon}</span>
                                <Typography variant='body2'>{label}</Typography>
                            </Button>
                        </Grid2>
                    );
                })}
            </Grid2>
            <Button
                variant='contained'
                className='mt-6 normal-case'
                onClick={handleContinue}
                disabled={selectedInterests.length === 0 || isLoading}
            >
                {isLoading ? 'Saving...' : 'Continue'}
            </Button>
            <Link href='/inquiry'>Skip</Link>
        </Container>
    );
}

export default ChooseYourInterests;
