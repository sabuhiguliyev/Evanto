import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/poppins';
import App from './App';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/tailwind.css';

createRoot(document.getElementById('root')!).render(
    <StyledEngineProvider injectFirst>
        <StrictMode>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StrictMode>
    </StyledEngineProvider>,
);
