import { createTheme } from '@mui/material/styles';

// Extend MUI theme types
declare module '@mui/material/styles' {
  interface TypographyVariants {
    logo: React.CSSProperties;
    button: React.CSSProperties;
    navLabel: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    logo?: React.CSSProperties;
    button?: React.CSSProperties;
    navLabel?: React.CSSProperties;
  }
  interface Palette {
    custom: {
      darkBackground: string;
      lightBackground: string;
      mutedText: string;
      borderLight: string;
      borderDark: string;
      inputBackground: string;
      chipBackground: string;
      chipHover: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      darkBackground?: string;
      lightBackground?: string;
      mutedText?: string;
      borderLight?: string;
      borderDark?: string;
      inputBackground?: string;
      chipBackground?: string;
      chipHover?: string;
    };
  }
}

// Simplified 5-Color Palette
const colors = {
  // Primary Brand (1 color)
  primary: '#5D9BFC',        // Main blue
  
  // Backgrounds (2 colors)
  background: {
    light: '#FFFFFF',        // White
    dark: '#1C2039',         // Dark navy
  },
  
  // Text (2 colors)
  text: {
    primary: '#000000',      // Black
    secondary: '#666666',    // Gray
  }
};

// Create theme factory function that accepts dark mode
export const createMUITheme = (isDarkMode: boolean) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: colors.primary,
      light: colors.primary,
      dark: colors.primary,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.primary,
      light: colors.primary,
      dark: colors.primary,
      contrastText: '#FFFFFF',
    },
    text: {
      primary: isDarkMode ? '#FFFFFF' : colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.secondary,
    },
    background: {
      default: isDarkMode ? colors.background.dark : colors.background.light,
      paper: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#F8F8F8',
    },
    error: {
      main: '#EF4444',
      light: '#EF4444',
      dark: '#EF4444',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#F59E0B',
      dark: '#F59E0B',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981',
      light: '#10B981',
      dark: '#10B981',
      contrastText: '#FFFFFF',
    },
    // Custom colors for consistent usage
    custom: {
      darkBackground: '#1C2039',
      lightBackground: '#FFFFFF',
      mutedText: isDarkMode ? '#AAAAAA' : '#6B7280',
      borderLight: '#D1D5DB',
      borderDark: 'rgba(255, 255, 255, 0.2)',
      inputBackground: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F8F8F8',
      chipBackground: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#F3F4F6',
      chipHover: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#E5E7EB',
    },
  },
  
  // Typography system - Based on ARCHITECTURE.md specifications
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    
    // Logo typography - Candal font from ARCHITECTURE.md
    logo: {
      fontFamily: '"Candal", "Plus Jakarta Sans", sans-serif',
      fontSize: '30px',
      fontWeight: 400,
      lineHeight: '39px',
      color: isDarkMode ? '#FFFFFF' : colors.text.primary,
    },
    
    // Button typography - Plus Jakarta Sans from ARCHITECTURE.md
    button: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: '19px',
      color: '#FFFFFF',
    },
    
    // Navigation typography from ARCHITECTURE.md
    navLabel: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: '20px',
      color: colors.text.secondary,
    },
    
    // Header Typography - Plus Jakarta Sans from ARCHITECTURE.md
    h1: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '36px',
      fontWeight: 700, // Bold
      lineHeight: '44px',
      color: isDarkMode ? '#FFFFFF' : colors.text.primary,
    },
    h2: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '28px',
      fontWeight: 600, // SemiBold
      lineHeight: '36px',
      color: isDarkMode ? '#FFFFFF' : colors.text.primary,
    },
    h3: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '22px',
      fontWeight: 600, // SemiBold
      lineHeight: '28px',
      color: isDarkMode ? '#FFFFFF' : colors.text.primary,
    },
    h4: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '18px',
      fontWeight: 500, // SemiBold
      lineHeight: '24px',
      color: isDarkMode ? '#FFFFFF' : colors.text.primary,
    },
    h5: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '16px',
      fontWeight: 500, // SemiBold
      lineHeight: '22px',
      color: isDarkMode ? '#FFFFFF' : colors.text.primary,
    },
    h6: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '14px',
      fontWeight: 500, // SemiBold
      lineHeight: '20px',
      color: isDarkMode ? '#FFFFFF' : colors.text.primary,
    },
    
    // Body Typography - Poppins from ARCHITECTURE.md
    body1: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '16px',
      fontWeight: 400, // Medium
      lineHeight: '24px',
      color: isDarkMode ? '#FFFFFF' : colors.text.primary,
    },
    body2: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '14px',
      fontWeight: 400, // Medium
      lineHeight: '20px',
      color: colors.text.secondary,
    },
    caption: {
      fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: '12px',
      fontWeight: 400, // Medium
      lineHeight: '16px',
      color: colors.text.secondary,
    },
  },
  
  spacing: 8, // 8px base unit (MUI default)
  
  shape: {
    borderRadius: 8, // 8px (MUI default)
  },

  // Comprehensive component overrides
  components: {
    // Button overrides - Based on ARCHITECTURE.md button specifications
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: '19px',
          borderRadius: '50px', // Pill-shaped buttons from ARCHITECTURE.md
        },
        contained: {
          backgroundColor: colors.primary,
          color: '#FFFFFF',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: colors.primary,
            boxShadow: '0 4px 12px rgba(93, 155, 252, 0.3)',
          },
        },
        outlined: {
          borderColor: colors.primary,
          color: colors.primary,
          borderWidth: '1px',
          borderRadius: '50px',
          '&:hover': {
            borderColor: colors.primary,
            backgroundColor: isDarkMode ? 'rgba(93, 155, 252, 0.1)' : 'rgba(93, 155, 252, 0.04)',
            borderWidth: '1px',
          },
        },
        sizeLarge: {
          minWidth: '335px', // Primary button width from ARCHITECTURE.md
          height: '50px', // Primary button height from ARCHITECTURE.md
          borderRadius: '50px',
        },
        sizeMedium: {
          height: '44px', // Icon button size from ARCHITECTURE.md
          minWidth: '44px',
        },
        sizeSmall: {
          height: '32px',
          minWidth: '32px',
        },
      },
    },

    // IconButton overrides - Based on ARCHITECTURE.md specifications
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
          '&.MuiIconButton-disableRipple': {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
        sizeLarge: {
          width: '48px', // Large icon button from ARCHITECTURE.md
          height: '48px',
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          color: isDarkMode ? '#FFFFFF' : colors.text.primary,
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
          },
        },
        sizeMedium: {
          width: '44px', // Icon button size from ARCHITECTURE.md
          height: '44px',
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          color: isDarkMode ? '#FFFFFF' : colors.text.primary,
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
          },
        },
        sizeSmall: {
          width: '32px',
          height: '32px',
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          color: isDarkMode ? '#FFFFFF' : colors.text.primary,
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
          },
        },
        // EventCard specific icon button sizes
        '&.event-card-favorite': {
          width: 32,
          height: 32,
          minWidth: 32,
          minHeight: 32,
        },
      },
    },

    // Typography overrides
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
        },
      },
    },

    // TextField overrides - Based on ARCHITECTURE.md specifications
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F8F8F8', // Light gray background from ARCHITECTURE.md
            border: isDarkMode ? '1px solid #FFFFFF33' : '1px solid #D1D5DB', // Border colors from ARCHITECTURE.md
            borderRadius: '12px', // Rounded corners from ARCHITECTURE.md
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.text.secondary,
            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
            '&.Mui-focused': {
              color: colors.primary,
            },
          },
          '& .MuiInputBase-input': {
            color: isDarkMode ? '#FFFFFF' : colors.text.primary,
            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
            '&::placeholder': {
              color: colors.text.secondary,
              opacity: 1,
            },
          },
          '& .MuiFormHelperText-root': {
            color: '#EF4444', // Error color from ARCHITECTURE.md
            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          },
        },
      },
    },

    // Card overrides - Based on ARCHITECTURE.md card specifications
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px', // Card border radius from ARCHITECTURE.md
          boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#F8F8F8',
        },
        // EventCard specific styling
        '&.event-card': {
          backgroundColor: isDarkMode ? '#FFFFFF26' : '#F8F8F8',
          border: 'none',
          boxShadow: 'none',
          borderRadius: '15px',
        },
      },
    },

    // Chip overrides - Based on ARCHITECTURE.md chip specifications
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          borderRadius: '8px', // Rounded corners from ARCHITECTURE.md
          height: '28px', // Chip height from ARCHITECTURE.md
          fontSize: '0.75rem', // Chip font size from ARCHITECTURE.md
          fontWeight: 500,
          '& .MuiChip-label': {
            px: 1.5
          },
          '& .MuiChip-icon': {
            fontSize: '0.75rem',
            ml: 0.5,
          }
        },
        filled: {
          backgroundColor: colors.primary,
          color: '#FFFFFF',
          border: 'none',
        },
        outlined: {
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
          color: isDarkMode ? '#FFFFFF' : colors.text.primary,
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },

    // ToggleButton overrides - Based on ARCHITECTURE.md specifications
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          borderRadius: '20px', // Rounded corners from ARCHITECTURE.md
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
          color: isDarkMode ? '#FFFFFF' : colors.text.primary,
          '&.Mui-selected': {
            backgroundColor: colors.primary,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: colors.primary,
            },
          },
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },

    // Avatar overrides - Based on ARCHITECTURE.md specifications
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: 'none', // No borders from ARCHITECTURE.md
        },
      },
    },

    // AvatarGroup overrides - Based on ARCHITECTURE.md specifications
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          '& .MuiAvatar-root': {
            border: 'none', // No borders from ARCHITECTURE.md
          },
        },
        // EventCard specific avatar sizes - All set to M (medium) size
        '&.event-card-avatars-large': {
          '& .MuiAvatar-root': {
            width: 20,
            height: 20,
            fontSize: '0.5rem',
            border: 'none',
          },
        },
        '&.event-card-avatars-medium': {
          '& .MuiAvatar-root': {
            width: 16,
            height: 16,
            fontSize: '0.4rem',
            border: 'none',
          },
        },
        '&.event-card-avatars-small': {
          '& .MuiAvatar-root': {
            width: 16,
            height: 16,
            fontSize: '0.4rem',
            border: 'none',
          },
        },
      },
    },

    // InputAdornment overrides - Based on ARCHITECTURE.md specifications
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: colors.text.secondary,
        },
      },
    },

    // Slider overrides - Based on ARCHITECTURE.md specifications
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-valueLabel': {
            fontSize: 8,
            fontWeight: 'normal',
            borderRadius: '8px',
            backgroundColor: colors.primary,
            color: '#FFFFFF',
            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          },
        },
      },
    },

    // Modal overrides - Based on ARCHITECTURE.md specifications
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },

    // Dialog overrides - Based on ARCHITECTURE.md specifications
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '20px', // Rounded corners from ARCHITECTURE.md
          backgroundColor: isDarkMode ? colors.background.dark : colors.background.light,
        },
      },
    },

    // List overrides - Based on ARCHITECTURE.md specifications
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },

    // ListItem overrides - Based on ARCHITECTURE.md specifications
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },

    // ListItemText overrides - Based on ARCHITECTURE.md specifications
    MuiListItemText: {
      styleOverrides: {
        root: {
          '& .MuiListItemText-primary': {
            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: isDarkMode ? '#FFFFFF' : colors.text.primary,
          },
          '& .MuiListItemText-secondary': {
            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
            fontSize: '12px',
            color: colors.text.secondary,
          },
        },
      },
    },

    // Divider overrides - Based on ARCHITECTURE.md specifications
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },

    // CircularProgress overrides - Based on ARCHITECTURE.md specifications
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: colors.primary,
        },
      },
    },

    // Badge overrides - Based on ARCHITECTURE.md specifications
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: colors.primary,
          color: '#FFFFFF',
        },
      },
    },

    // Menu overrides - Based on ARCHITECTURE.md specifications
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '8px', // Rounded corners from ARCHITECTURE.md
          backgroundColor: isDarkMode ? colors.background.dark : colors.background.light,
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        },
      },
    },

    // MenuItem overrides - Based on ARCHITECTURE.md specifications
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          fontSize: '14px',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },

    // Switch overrides - Based on ARCHITECTURE.md specifications
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: colors.primary,
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: colors.primary,
          },
        },
      },
    },

    // Radio overrides - Based on ARCHITECTURE.md specifications
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: colors.primary,
          },
        },
      },
    },

    // Checkbox overrides - Based on ARCHITECTURE.md specifications
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: colors.primary,
          },
        },
      },
    },

    // FormControl overrides - Based on ARCHITECTURE.md specifications
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },

    // InputLabel overrides - Based on ARCHITECTURE.md specifications
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          color: colors.text.secondary,
          '&.Mui-focused': {
            color: colors.primary,
          },
        },
      },
    },

    // Select overrides - Based on ARCHITECTURE.md specifications
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
          },
        },
      },
    },

    // Stepper overrides - Based on ARCHITECTURE.md specifications
    MuiStepper: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
        },
      },
    },

    // StepLabel overrides - Based on ARCHITECTURE.md specifications
    MuiStepLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
        },
      },
    },

    // Paper overrides - Based on ARCHITECTURE.md specifications
    MuiPaper: {
      styleOverrides: {
        root: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
        },
      },
    },

    // Tooltip overrides - Based on ARCHITECTURE.md specifications
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans", sans-serif',
          fontSize: '12px',
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
      },
    },

    // Container overrides - Mobile-first design with fixed 375px width
    MuiContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'transparent',
          gap: '15px',
          width: '375px',
          height: '812px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '20px',
          paddingBottom: '0px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '20px',
          border: '1px solid gray',
          '&.no-scrollbar': {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        },
      },
    },
  },
});
