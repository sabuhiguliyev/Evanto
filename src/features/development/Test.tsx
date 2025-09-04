import React from 'react';
import { Box, Typography } from '@mui/material';

const Test: React.FC = () => {
  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6">
        Test Component
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        This component is ready for future testing purposes.
      </Typography>
    </Box>
  );
};

export default Test;