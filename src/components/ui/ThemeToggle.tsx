import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const ThemeToggle = ({ 
  size = 'medium', 
  className = '' 
}: ThemeToggleProps): React.JSX.Element => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={toggleDarkMode}
        size={size}
        className={`text-blue-500 border border-blue-500 ${isDarkMode ? 'bg-blue-500/10 hover:bg-blue-500/20' : 'bg-blue-500/5 hover:bg-blue-500/10'} ${className}`}
      >
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};


