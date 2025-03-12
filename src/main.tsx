import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles/tailwind.css';
import theme from './styles/theme';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/poppins';
import { ThemeProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')!).render(
    <StyledEngineProvider injectFirst>
        <StrictMode>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </StrictMode>
    </StyledEngineProvider>,
);
