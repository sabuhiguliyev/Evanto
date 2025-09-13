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
    
    // Use design tokens for typography variants
    h1: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.h1.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.h1.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.h1.lineHeight],
    },
    h2: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.h2.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.h2.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.h2.lineHeight],
    },
    h3: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.h3.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.h3.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.h3.lineHeight],
    },
    h4: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.h4.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.h4.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.h4.lineHeight],
    },
    h5: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.h5.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.h5.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.h5.lineHeight],
    },
    h6: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.h6.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.h6.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.h6.lineHeight],
    },
    body1: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.body1.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.body1.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.body1.lineHeight],
    },
    body2: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.body2.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.body2.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.body2.lineHeight],
    },
    caption: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.caption.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.caption.fontWeight],
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.caption.lineHeight],
    },
    button: {
      fontSize: designTokens.typography.fontSize[designTokens.typography.variants.button.fontSize],
      fontWeight: designTokens.typography.fontWeight[designTokens.typography.variants.button.fontWeight],
      textTransform: 'none',
      lineHeight: designTokens.typography.lineHeight[designTokens.typography.variants.button.lineHeight],
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
          // Distinctive shadow for light mode
          boxShadow: isDarkMode ? 'none' : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: isDarkMode ? '0' : '12px',
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

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '9999px', // Fully rounded for default variant
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
            // Override for multiline (textarea) - not fully rounded
            '&.MuiInputBase-multiline': {
              borderRadius: '12px', // Standard rounded corners for textareas
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