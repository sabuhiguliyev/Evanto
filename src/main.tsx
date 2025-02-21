import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material';
import './styles/tailwind.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>,
);
