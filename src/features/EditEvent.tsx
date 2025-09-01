import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Button, TextField, MenuItem } from '@mui/material';
import {
    KeyboardArrowLeft,
    Save,
} from '@mui/icons-material';
import Container from '@/components/layout/Container';
import useUserStore from '@/store/userStore';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import type { UnifiedItem } from '@/types/UnifiedItem';
import LocationPicker from '@/components/forms/LocationPicker';

function EditEvent() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserStore(state => state.user);
    
    const item = location.state?.item as UnifiedItem;
    const itemType = location.state?.itemType as 'event' | 'meetup';
    
    const [loading, setLoading] = useState(false);
    const [editForm, setEditForm] = useState({
        title: '',
        meetup_name: '',
        description: '',
        meetup_description: '',
        category: '',
        location: '',
        start_date: new Date(),
        end_date: new Date(),
        meetup_date: new Date(),
        ticket_price: 0,
        meetup_link: '',
        event_image: null as File | null,
        image_url: null as File | null
    });
    
    const categories = [
        'Music', 'Sport', 'Art', 'Tech', 'Food', 'Education', 'Business', 'Other'
    ];

    // Populate form with item data when component mounts
    useEffect(() => {
        if (item && item.id) {
            // Ensure category is a valid option
            const validCategories = ['Music', 'Sport', 'Art', 'Tech', 'Food', 'Education', 'Business', 'Other'];
            const validCategory = validCategories.includes(item.category) ? item.category : '';
            
            setEditForm({
                title: item.type === 'event' ? item.title || '' : '',
                meetup_name: item.type === 'meetup' ? item.meetup_name || '' : '',
                description: item.type === 'event' ? (item as any).description || '' : '',
                meetup_description: item.type === 'meetup' ? (item as any).meetup_description || '' : '',
                category: validCategory,
                location: item.type === 'event' ? item.location || '' : '',
                start_date: item.type === 'event' && item.start_date ? new Date(item.start_date) : new Date(),
                end_date: item.type === 'event' && item.end_date ? new Date(item.end_date) : new Date(),
                meetup_date: item.type === 'meetup' && item.meetup_date ? new Date(item.meetup_date) : new Date(),
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
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success('Event updated successfully!');
            navigate('/manage-events');
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
                    onClick={() => navigate('/manage-events')}
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
        <Container className="relative justify-start">
            <Box className="no-scrollbar w-full overflow-y-auto">
                {/* Header */}
                <Box className="mb-8 flex flex-col w-full items-center ">
                    <Box className="flex items-center  mb-8 w-full mx-auto">
                        <IconButton 
                            onClick={() => navigate('/manage-events')} 
                            className="text-text-3" 
                            sx={{ border: '1px solid #eee' }}
                        >
                            <KeyboardArrowLeft />
                        </IconButton>
                        <Typography variant="h4" className='mx-auto'>Edit {itemType === 'event' ? 'Event' : 'Meetup'}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-primary-1 text-white"
                        size="small"
                        sx={{ 
                            textTransform: 'none',
                            fontSize: '1rem',
                            padding: '2px 8px',
                            minWidth: 'auto',
                            height: '50px'
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
                        value={itemType === 'event' ? editForm.title : editForm.meetup_name}
                        onChange={(e) => {
                            if (itemType === 'event') {
                                setEditForm(prev => ({ ...prev, title: e.target.value }));
                            } else {
                                setEditForm(prev => ({ ...prev, meetup_name: e.target.value }));
                            }
                        }}
                        className="text-input"
                        fullWidth
                    />
                    
                    {/* Category Field */}
                    <TextField
                        select
                        label="Category"
                        value={editForm.category}
                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                        className="text-input"
                        fullWidth
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    {/* Description Field */}
                    <TextField
                        label={itemType === 'event' ? 'Description' : 'Meetup Description'}
                        value={itemType === 'event' ? editForm.description : editForm.meetup_description}
                        onChange={(e) => {
                            if (itemType === 'event') {
                                setEditForm(prev => ({ ...prev, description: e.target.value }));
                            } else {
                                setEditForm(prev => ({ ...prev, meetup_description: e.target.value }));
                            }
                        }}
                        className="text-input"
                        multiline
                        rows={4}
                        fullWidth
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
                                <Typography variant="body2" className="mb-2 text-text-3">
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
                                    className="w-full"
                                />
                                {editForm.event_image && (
                                    <Typography variant="caption" className="text-text-3">
                                        Image selected: {editForm.event_image.name}
                                    </Typography>
                                )}
                            </Box>
                        </>
                    )}
                    
                    {/* Meetup-specific fields */}
                    {itemType === 'meetup' && (
                        <>
                            <TextField
                                label="Meetup Date"
                                placeholder="MM/DD/YY HH:MM"
                                value={editForm.meetup_date ? format(editForm.meetup_date, 'MM/dd/yy HH:mm') : ''}
                                onChange={(e) => {
                                    const date = new Date(e.target.value);
                                    if (!isNaN(date.getTime())) {
                                        setEditForm(prev => ({ ...prev, meetup_date: date }));
                                    }
                                }}
                                className="text-input"
                                fullWidth
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
                                <Typography variant="body2" className="mb-2 text-text-3">
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
                                    className="w-full"
                                />
                                {editForm.image_url && (
                                    <Typography variant="caption" className="text-text-3">
                                        Image selected: {editForm.image_url.name}
                                    </Typography>
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default EditEvent;
