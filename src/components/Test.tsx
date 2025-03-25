import React from 'react';
import { Grid2, Avatar, Typography } from '@mui/material';

const Test = () => {
    const categories = [
        { label: 'Art', image: '/images/categories/art.jpg' },
        { label: 'Music', image: '/images/categories/music.jpg' },
        // Add more categories as needed
    ];

    return (
        <Grid2 container spacing={10} component='div'>
            {categories.map((category, index) => (
                <Grid2
                    size={1}
                    spacing={2}
                    key={index}
                    container
                    direction='column'
                    alignItems='center'
                    component='div'
                >
                    <Avatar
                        alt={category.label}
                        src={category.image}
                        sx={{ width: 101, height: 101, backgroundColor: '#F5F5F5' }}
                    />
                    <Typography variant='body1' sx={{ marginTop: 1, fontWeight: 600, fontSize: 13 }}>
                        {category.label}
                    </Typography>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default Test;
