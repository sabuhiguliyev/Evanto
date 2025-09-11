import React, { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProviderCore } from '@mui/material/styles';
import createBaseTheme from '@/styles/muiTheme';
import { useDarkMode } from './DarkModeContext';

interface MUIThemeContextType {
  // Add any theme-related utilities here if needed
}

const MUIThemeContext = createContext<MUIThemeContextType>({});

export const useMUITheme = () => useContext(MUIThemeContext);

interface CustomMUIThemeProviderProps {
  children: ReactNode;
}

export const MUIThemeProvider: React.FC<CustomMUIThemeProviderProps> = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const theme = createBaseTheme(isDarkMode);

  return (
    <MUIThemeContext.Provider value={{}}>
      <MUIThemeProviderCore theme={theme}>
        {children}
      </MUIThemeProviderCore>
    </MUIThemeContext.Provider>
  );
};
