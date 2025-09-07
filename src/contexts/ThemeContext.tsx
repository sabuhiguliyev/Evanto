import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5D9BFC',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1C2039',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F3F4F6',
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
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    logo: {
      fontFamily: '"Candal", "Poppins", sans-serif',
      fontSize: '30px',
      fontWeight: 400,
      lineHeight: '39px',
    },
    button: {
      fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: '19px',
    },
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
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '36px',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: '28px',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '22px',
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    caption: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: '19px',
          borderRadius: '50px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          minWidth: '335px',
          height: '50px',
          borderRadius: '50px',
        },
        outlined: {
          borderWidth: '1px',
          borderRadius: '50px',
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

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5D9BFC',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1C2039',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    background: {
      default: '#1C2039',
      paper: '#1C2039',
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
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    logo: {
      fontFamily: '"Candal", "Poppins", sans-serif',
      fontSize: '30px',
      fontWeight: 400,
      lineHeight: '39px',
    },
    button: {
      fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: '19px',
    },
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
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '36px',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: '28px',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '22px',
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    caption: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: '19px',
          borderRadius: '50px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          minWidth: '335px',
          height: '50px',
          borderRadius: '50px',
        },
        outlined: {
          borderWidth: '1px',
          borderRadius: '50px',
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
          border: '1px solid #333333',
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

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    return savedMode || 'light';
  });

  const toggleTheme = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    // Apply theme to document body and html element
    // Always keep body background white, only Container should be dark
    document.body.style.backgroundColor = 'white';
    document.body.style.color = theme.palette.text.primary;
    
    // Apply dark class to html element for Tailwind dark mode
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mode]);

  const value: ThemeContextType = {
    mode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
