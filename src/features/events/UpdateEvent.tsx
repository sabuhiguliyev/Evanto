import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Button, TextField, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import {
    KeyboardArrowLeft,
    Save,
} from '@mui/icons-material';
import { Container } from '@mui/material';
import useUserStore from '@/store/userStore';
import { useAppStore } from '@/store/appStore';
import { useFiltersStore } from '@/store/filtersStore';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useUpdateEvent, useUpdateMeetup } from '@/hooks/entityConfigs';
import { supabase } from '@/utils/supabase';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import type { UnifiedItem } from '@/utils/schemas';
import LocationPicker from '@/components/forms/LocationPicker';

function UpdateEvent() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserStore(state => state.user);
    const { isDarkMode } = useDarkMode();
    
    const item = location.state?.item as UnifiedItem;
    const itemType = location.state?.itemType as 'event' | 'meetup';
    
    const updateEventMutation = useUpdateEvent();
    const updateMeetupMutation = useUpdateMeetup();
    
    const [loading, setLoading] = useState(false);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        start_date: new Date(),
        end_date: new Date(),
        ticket_price: 0,
        meetup_link: '',
        event_image: null as File | null,
        image_url: null as File | null
    });
    
    const { categories } = useFiltersStore();

    // Populate form with item data when component mounts
    useEffect(() => {
        if (item && item.id) {
            // Ensure category is a valid option
            const validCategories = ['Music', 'Sport', 'Art', 'Tech', 'Food', 'Education', 'Business', 'Other'];
            const validCategory = validCategories.includes(item.category) ? item.category : '';
            
            setEditForm({
                title: item.title || '',
                description: item.description || '',
                category: validCategory,
                location: item.location || '',
                start_date: item.start_date ? new Date(item.start_date) : new Date(),
                end_date: item.end_date ? new Date(item.end_date) : new Date(),
                ticket_price: item.type === 'event' ? item.ticket_price || 0 : 0,
                meetup_link: item.type === 'meetup' ? item.meetup_link || '' : '',
                event_image: null as File | null,
                image_url: null as File | null
            });
        }
    }, [item?.id, item?.type]);

    const handleSave = async () => {
        try {
            setLoading(true);
            
            if (!item?.id || !user?.id) {
                toast.error('No item ID or user ID found');
                return;
            }

            let image_url = item.image; // Keep existing image by default

            // Handle image upload if a new image was selected
            if (editForm.event_image || editForm.image_url) {
                const selectedImage = editForm.event_image || editForm.image_url;
                if (selectedImage) {
                    const fileExt = selectedImage.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
                    const filePath = `${user.id}/${fileName}`;

                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('events-images')
                        .upload(filePath, selectedImage);

                    if (uploadError) {
                        console.error('Upload failed:', uploadError);
                        toast.error('Failed to upload image');
                        image_url = null;
                    } else {
                        const { data: { publicUrl } } = supabase.storage
                            .from('events-images')
                            .getPublicUrl(filePath);
                        image_url = publicUrl;
                    }
                }
            }

            // Prepare update data
            const updateData = {
                title: editForm.title,
                description: editForm.description,
                category: editForm.category,
                location: editForm.location,
                start_date: editForm.start_date.toISOString(),
                end_date: editForm.end_date.toISOString(),
                image: image_url,
                ...(itemType === 'event' && {
                    ticket_price: editForm.ticket_price,
                }),
                ...(itemType === 'meetup' && {
                    meetup_link: editForm.meetup_link,
                }),
            };

            // Call appropriate update mutation
            if (itemType === 'event') {
                updateEventMutation.mutate(
                    { id: item.id, data: updateData },
                    {
                        onSuccess: () => {
                            toast.success('Event updated successfully!');
                            navigate('/events/manage');
                        },
                        onError: (error) => {
                            console.error('Update error:', error);
                            toast.error('Failed to update event');
                        },
                    }
                );
            } else if (itemType === 'meetup') {
                updateMeetupMutation.mutate(
                    { id: item.id, data: updateData },
                    {
                        onSuccess: () => {
                            toast.success('Meetup updated successfully!');
                            navigate('/events/manage');
                        },
                        onError: (error) => {
                            console.error('Update error:', error);
                            toast.error('Failed to update meetup');
                        },
                    }
                );
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Failed to update item');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <Container className="justify-center">
                <Typography variant="h6" className="text-center text-text-3">
                    Please sign in to edit events
                </Typography>
            </Container>
        );
    }

    if (!item || !itemType) {
        return (
            <Container className="justify-center">
                <Typography variant="h6" className="text-center text-text-3">
                    No item data found
                </Typography>
                <Button 
                    onClick={() => navigate('/events/manage')}
                    variant="contained"
                    className="mt-4 bg-primary-1 text-white"
                    sx={{ textTransform: 'none' }}
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            <Container className={`relative ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
                <Box className="no-scrollbar w-full overflow-y-auto">
                    {/* Header */}
                    <Box className="mb-8 flex w-full items-center justify-between">
                        <IconButton 
                            onClick={() => navigate('/events/manage')} 
                            className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700"
                        >
                            <KeyboardArrowLeft />
                        </IconButton>
                        <Typography variant="h4" className="font-poppins font-semibold text-gray-900 dark:text-white">
                            Edit {itemType === 'event' ? 'Event' : 'Meetup'}
                        </Typography>
                        <Box className="w-10" />
                    </Box>

                    {/* Save Button */}
                    <Box className="mb-6">
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSave}
                            disabled={loading}
                            size="large"
                            className="w-full h-12 font-jakarta"
                            sx={{
                                backgroundColor: '#5D9BFC',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#4A8BFC',
                                },
                            }}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Box>



                {/* Edit Form */}
                <Box className="space-y-6">
                    {/* Title/Name Field */}
                    <TextField
                        label={itemType === 'event' ? 'Title' : 'Meetup Name'}
                        value={editForm.title}
                        onChange={(e) => {
                            if (itemType === 'event') {
                                setEditForm(prev => ({ ...prev, title: e.target.value }));
                            } else {
                                setEditForm(prev => ({ ...prev, title: e.target.value }));
                            }
                        }}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: isDarkMode ? '#374151' : '#d1d5db',
                                },
                                '&:hover fieldset': {
                                    borderColor: isDarkMode ? '#6b7280' : '#9ca3af',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#5D9BFC',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: isDarkMode ? '#9ca3af' : '#6b7280',
                            },
                            '& .MuiInputBase-input': {
                                color: isDarkMode ? '#f3f4f6' : '#111827',
                            },
                        }}
                    />
                    
                    {/* Category Field */}
                    <TextField
                        select
                        label="Category"
                        value={editForm.category}
                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: isDarkMode ? '#374151' : '#d1d5db',
                                },
                                '&:hover fieldset': {
                                    borderColor: isDarkMode ? '#6b7280' : '#9ca3af',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#5D9BFC',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: isDarkMode ? '#9ca3af' : '#6b7280',
                            },
                            '& .MuiInputBase-input': {
                                color: isDarkMode ? '#f3f4f6' : '#111827',
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.name} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    {/* Description Field */}
                    <TextField
                        label={itemType === 'event' ? 'Description' : 'Meetup Description'}
                        value={editForm.description}
                        onChange={(e) => {
                            setEditForm(prev => ({ ...prev, description: e.target.value }));
                        }}
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: isDarkMode ? '#374151' : '#d1d5db',
                                },
                                '&:hover fieldset': {
                                    borderColor: isDarkMode ? '#6b7280' : '#9ca3af',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#5D9BFC',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: isDarkMode ? '#9ca3af' : '#6b7280',
                                '&.Mui-focused': {
                                    color: '#5D9BFC',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: isDarkMode ? '#f3f4f6' : '#111827',
                            },
                            '& .MuiInputBase-inputMultiline': {
                                padding: '14px',
                            },
                        }}
                    />
                    
                    {/* Event-specific fields */}
                    {itemType === 'event' && (
                        <>
                            <LocationPicker
                                value={editForm.location}
                                onChange={(value) => setEditForm(prev => ({ ...prev, location: value }))}
                            />

                            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label="Start Date & Time"
                                    placeholder="MM/DD/YY HH:MM"
                                    value={editForm.start_date ? format(editForm.start_date, 'MM/dd/yy HH:mm') : ''}
                                    onChange={(e) => {
                                        const date = new Date(e.target.value);
                                        if (!isNaN(date.getTime())) {
                                            setEditForm(prev => ({ ...prev, start_date: date }));
                                        }
                                    }}
                                    className="text-input"
                                    fullWidth
                                />
                                
                                <TextField
                                    label="End Date & Time"
                                    placeholder="MM/DD/YY HH:MM"
                                    value={editForm.end_date ? format(editForm.end_date, 'MM/dd/yy HH:mm') : ''}
                                    onChange={(e) => {
                                        const date = new Date(e.target.value);
                                        if (!isNaN(date.getTime())) {
                                            setEditForm(prev => ({ ...prev, end_date: date }));
                                        }
                                    }}
                                    className="text-input"
                                    fullWidth
                                />
                            </Box>

                            <TextField
                                label="Ticket Price"
                                type="number"
                                value={editForm.ticket_price}
                                onChange={(e) => setEditForm(prev => ({ 
                                    ...prev, 
                                    ticket_price: Number(e.target.value) 
                                }))}
                                className="text-input"
                                fullWidth
                                InputProps={{
                                    startAdornment: <span className="mr-2">$</span>,
                                }}
                            />

                            <Box>
                                <Typography variant="body2" className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-text-3'}`}>
                                    Event Image
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setEditForm(prev => ({ ...prev, event_image: file }));
                                        }
                                    }}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                {editForm.event_image && (
                                    <Typography variant="caption" className={`${isDarkMode ? 'text-gray-300' : 'text-text-3'}`}>
                                        Image selected: {editForm.event_image.name}
                                    </Typography>
                                )}
                            </Box>
                        </>
                    )}
                    
                    {/* Meetup-specific fields */}
                    {itemType === 'meetup' && (
                        <>
                            <DateTimePicker
                                label="Meetup Date & Time"
                                value={editForm.start_date}
                                onChange={(date) => setEditForm(prev => ({ ...prev, start_date: date || new Date() }))}
                                slotProps={{
                                    textField: {
                                        className: "text-input",
                                        fullWidth: true,
                                    },
                                }}
                            />

                            <TextField
                                label="Meetup Link"
                                value={editForm.meetup_link}
                                onChange={(e) => setEditForm(prev => ({ ...prev, meetup_link: e.target.value }))}
                                className="text-input"
                                fullWidth
                                placeholder="https://meet.google.com/..."
                            />

                            <Box>
                                <Typography variant="body2" className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-text-3'}`}>
                                    Meetup Image
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setEditForm(prev => ({ ...prev, image_url: file }));
                                        }
                                    }}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                {editForm.image_url && (
                                    <Typography variant="caption" className={`${isDarkMode ? 'text-gray-300' : 'text-text-3'}`}>
                                        Image selected: {editForm.image_url.name}
                                    </Typography>
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
            </Container>
        </>
    );
}

export default UpdateEvent;
