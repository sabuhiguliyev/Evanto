import { createTheme } from '@mui/material/styles';
import { designTokens } from './designTokens';
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
  },
  
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    
    h1: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
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
          justifyContent: 'flex-start',
          backgroundColor: isDarkMode ? '#1C2039' : '#F9FAFB',
          overflowY: 'auto',
          boxShadow: isDarkMode ? 'none' : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: isDarkMode ? '0' : '12px',
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
          borderRadius: '9999px',
          fontFamily: designTokens.typography.fontFamily.primary,
          height: '48px',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
        },
        contained: {
          backgroundColor: designTokens.colors.primary,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: designTokens.colors.primaryHover,
          },
        },
        sizeLarge: {
          height: '56px',
          padding: '16px 24px',
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

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '9999px',
            backgroundColor: isDarkMode ? '#334155' : '#F3F4F6',
            border: isDarkMode ? '1px solid #475569' : '1px solid #E5E7EB',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
            '&.MuiInputBase-multiline': {
              borderRadius: '12px',
            },
          },
          '& .MuiInputLabel-root': {
            color: isDarkMode ? '#64748B' : '#9CA3AF',
          },
          '& .MuiInputBase-input': {
            color: isDarkMode ? 'white' : '#111827',
            '&::placeholder': {
              color: isDarkMode ? '#64748B' : '#9CA3AF',
            },
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            backgroundColor: '#5D9BFC',
            color: 'white',
            borderColor: '#5D9BFC',
            '&:hover': {
              backgroundColor: '#4A8BFC',
            },
          },
          '&:not(.Mui-selected)': {
            backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
            color: isDarkMode ? 'white' : '#374151',
            borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
            '&:hover': {
              backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
            },
          },
        },
      },
    },
  },
});

export default createBaseTheme;