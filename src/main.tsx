import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import theme from './styles/theme';
// import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles/tailwind.css';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/poppins';

createRoot(document.getElementById('root')!).render(
    <StyledEngineProvider injectFirst>
        <StrictMode>
            <App />
        </StrictMode>
    </StyledEngineProvider>,
);
