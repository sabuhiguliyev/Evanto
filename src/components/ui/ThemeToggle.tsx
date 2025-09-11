import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={toggleDarkMode}
        size={size}
        className={className}
        sx={{
          color: isDarkMode ? '#5D9BFC' : '#5D9BFC',
          backgroundColor: isDarkMode ? 'rgba(93, 155, 252, 0.1)' : 'rgba(93, 155, 252, 0.04)',
          border: isDarkMode ? '1px solid #5D9BFC' : '1px solid #5D9BFC',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(93, 155, 252, 0.2)' : 'rgba(93, 155, 252, 0.08)',
          },
        }}
      >
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;

