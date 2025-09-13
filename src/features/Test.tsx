import React from 'react';
import { Box, Typography, Container, TextField } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

function Test() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Box className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </Box>

      <Container sx={{ border: '2px solid red', position: 'relative', minHeight: '100vh' }}>
        <Typography variant="h6" className="text-center py-8">
          TextField Input Classes Test
        </Typography>
        
        <Box className="space-y-6 p-4">
          <Typography variant="h6" className="text-center mb-4">
            TextField Variants
          </Typography>
          
          <TextField
            label="Default TextField"
            placeholder="Default MUI styling"
            fullWidth
          />
          
          <TextField
            label="Outlined Variant"
            variant="outlined"
            placeholder="Outlined variant"
            fullWidth
          />
          
          <TextField
            label="Filled Variant"
            variant="filled"
            placeholder="Filled variant"
            fullWidth
          />
          
          <TextField
            label="Standard Variant"
            variant="standard"
            placeholder="Standard variant"
            fullWidth
          />
          
          <Typography variant="h6" className="text-center mb-4 mt-8">
            TextField Sizes
          </Typography>
          
          <TextField
            label="Small Size"
            size="small"
            placeholder="Small size"
            fullWidth
          />
          
          <TextField
            label="Medium Size (Default)"
            size="medium"
            placeholder="Medium size (default)"
            fullWidth
          />
          
          <Typography variant="h6" className="text-center mb-4 mt-8">
            TextField States
          </Typography>
          
          <TextField
            label="Error State"
            error
            helperText="This is an error message"
            placeholder="Error state"
            fullWidth
          />
          
          <TextField
            label="Disabled State"
            disabled
            placeholder="Disabled state"
            fullWidth
          />
          
          <TextField
            label="Required Field"
            required
            placeholder="Required field"
            fullWidth
          />
        </Box>
      </Container>
    </>
  );
}

export default Test;