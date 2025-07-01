import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/poppins';
import App from './App';
import theme from './styles/theme';
import './styles/tailwind.css';

createRoot(document.getElementById('root')!).render(
    <StyledEngineProvider injectFirst>
        <StrictMode>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </StrictMode>
    </StyledEngineProvider>,
);
