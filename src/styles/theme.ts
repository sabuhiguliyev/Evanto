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
}

// Minimal MUI theme - use defaults, minimal overrides
const theme = createTheme({
  palette: {
    primary: {
      main: '#5D9BFC', // Primary brand color
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1C2039', // Dark gray/blue
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#000000', // Black for headlines
      secondary: '#666666', // Gray for paragraphs
    },
    background: {
      default: '#FFFFFF',
      paper: '#F3F4F6', // Light gray background
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981',
    },
  },
  
  // Typography system - industry standard sizes
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    // Logo typography
    logo: {
      fontFamily: '"Candal", "Poppins", sans-serif',
      fontSize: '30px',
      fontWeight: 400,
      lineHeight: '39px',
    },
    // Button typography from Figma specs
    button: {
      fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: '19px',
    },
    // Navigation typography from Figma specs
    navLabel: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: '44px',
      color: '#000000',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '36px',
      color: '#000000',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: '28px',
      color: '#000000',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
      color: '#000000',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '22px',
      color: '#000000',
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      color: '#000000',
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      color: '#888888',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      color: '#AAAAAA',
    },
    caption: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      color: '#666666',
    },
  },
  
  spacing: 8, // 8px base unit (MUI default)
  
  shape: {
    borderRadius: 8, // 8px (MUI default)
  },

  // Button overrides based on Figma specifications
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: '19px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        // Primary button specs: 335px × 50px, 30px border radius
        sizeLarge: {
          minWidth: '335px',
          height: '50px',
          borderRadius: '30px',
        },
        // Secondary button specs: 50px border radius
        outlined: {
          borderRadius: '50px',
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          border: '1px solid #E5E7EB',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;