import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useSupabaseAuthSync from '@/hooks/useSupabaseAuthSync';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { supabase } from '@/utils/supabase';

import { AppRoutes } from '@/routes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

const App: React.FC = () => {
    useSupabaseAuthSync();

    // Handle OAuth callback on app load
    useEffect(() => {
        const handleOAuthCallback = async () => {
            // Check if we have OAuth tokens in the URL hash
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = hashParams.get('access_token');
            const refreshToken = hashParams.get('refresh_token');
            
            if (accessToken && refreshToken) {
                console.log('Processing OAuth callback...');
                try {
                    const { data, error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });
                    
                    if (error) {
                        console.error('Error setting session:', error);
                    } else {
                        console.log('OAuth session established successfully');
                        
                        // Ensure user exists in database
                        try {
                            const { fetchUserProfile } = await import('@/services');
                            await fetchUserProfile();
                            console.log('User profile ensured in database');
                        } catch (profileError) {
                            console.error('Error ensuring user profile:', profileError);
                        }
                        
                        // Clear the hash from URL and redirect to home
                        window.history.replaceState({}, document.title, '/');
                    }
                } catch (error) {
                    console.error('Error processing OAuth callback:', error);
                }
            }
        };

        handleOAuthCallback();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Router>
                    <AppRoutes />
                </Router>
            </LocalizationProvider>
        </QueryClientProvider>
    );
};

export default App;
