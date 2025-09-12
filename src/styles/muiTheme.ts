import { createTheme } from '@mui/material/styles';
import { designTokens, darkModeColors } from './designTokens';

// Create base theme using MUI defaults + minimal overrides
const createBaseTheme = (isDarkMode: boolean) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: designTokens.colors.primary,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: designTokens.colors.neutral[600],
      contrastText: '#FFFFFF',
    },
    error: {
      main: designTokens.colors.error,
    },
    warning: {
      main: designTokens.colors.warning,
    },
    success: {
      main: designTokens.colors.success,
    },
    info: {
      main: designTokens.colors.info,
    },
    background: {
      default: isDarkMode ? '#0F172A' : '#F9FAFB',
      paper: isDarkMode ? '#1E293B' : '#FFFFFF',
    },
    text: {
      primary: isDarkMode ? '#F8FAFC' : '#111827',
      secondary: isDarkMode ? '#CBD5E1' : '#4B5563',
    },
    // Custom palette for project-specific colors
    custom: {
      mutedText: isDarkMode ? '#64748B' : '#9CA3AF',
      primary: designTokens.colors.primary,
      neutral: designTokens.colors.neutral,
      inputBackground: isDarkMode ? '#334155' : '#F3F4F6',
      borderDark: '#475569',
      borderLight: '#E5E7EB',
      chipBackground: isDarkMode ? '#475569' : '#F3F4F6',
      chipHover: isDarkMode ? '#64748B' : '#E5E7EB',
    },
  },
  
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    // Use MUI defaults for typography - minimal overrides
    button: {
      textTransform: 'none',
    },
  },

  // Use MUI defaults
  shape: {
    borderRadius: 8,
  },
  spacing: 8,

  // Minimal component overrides - only essential customizations
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '375px',
          height: '812px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Default justify-start behavior
          backgroundColor: isDarkMode ? '#1C2039' : '#F9FAFB',
          overflowY: 'auto',
          // Default no-scrollbar behavior
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '50%',
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 16,
          height: 16,
          fontSize: '0.4rem',
        },
      },
    },

    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          '& .MuiAvatar-root': {
            width: 16,
            height: 16,
            fontSize: '0.4rem',
          },
        },
      },
    },
  },
});

export default createBaseTheme;