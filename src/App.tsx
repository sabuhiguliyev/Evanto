import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
import useSupabaseAuthSync from '@/hooks/useSupabaseAuthSync';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { supabase } from '@/utils/supabase';

// Temporarily disable routes to test components one by one
// import { AppRoutes } from '@/routes';
import SplashScreen from '@/features/onboarding/SplashScreen';
import OnboardingStep1 from '@/features/onboarding/OnboardingStep1';
import OnboardingStep2 from '@/features/onboarding/OnboardingStep2';
import OnboardingStep3 from '@/features/onboarding/OnboardingStep3';
import ChooseYourInterests from '@/features/onboarding/ChooseYourInterests';
import Welcome from '@/features/Welcome';
import SignIn from '@/features/auth/SignIn';
import SignUp from '@/features/auth/SignUp';
import ForgotPassword from '@/features/auth/ForgotPassword';
import EmailSent from '@/features/auth/EmailSent';
import VerifyCode from '@/features/auth/VerifyCode';
import ResetPassword from '@/features/auth/ResetPassword';
import Home from '@/features/Home';
import Profile from '@/features/account/Profile';
import Settings from '@/features/account/Settings';
import Language from '@/features/profile/Language';
import Notification from '@/features/profile/Notification';
import Congratulation from '@/features/onboarding/Congratulation';
import CreateEvent from '@/features/events/CreateEvent';
import EventDetails from '@/features/events/EventDetails';
import ManageEvents from '@/features/events/ManageEvents';
import UpdateEvent from '@/features/events/UpdateEvent';
import CreateMeetupStep1 from '@/features/meetups/CreateMeetupStep1';
import CreateMeetupStep2 from '@/features/meetups/CreateMeetupStep2';
import CreateMeetupStep3 from '@/features/meetups/CreateMeetupStep3';
import Favorites from '@/features/Favorites';
import UpcomingEvent from '@/features/UpcomingEvent';
import Search from '@/features/Search';
import Tickets from '@/features/tickets/Tickets';
import CreateCard from '@/features/payments/CreateCard';
import PaymentDetails from '@/features/payments/PaymentDetails';

// Component that handles real-time updates inside QueryClientProvider
const RealtimeProvider: React.FC = () => {
    useRealtimeUpdates();
    return null;
};

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
                // Processing OAuth callback
                try {
                    const { data, error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });
                    
                    if (error) {
                        console.error('Error setting session:', error);
                    } else {
                        // OAuth session established successfully
                        
                        // Ensure user exists in database
                        try {
                            const { fetchUserProfile } = await import('@/services');
                            await fetchUserProfile();
                            // User profile ensured in database
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
            <RealtimeProvider />
            <ReactQueryDevtools initialIsOpen={false} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Router>
                    <Routes>
                        <Route path="/" element={<SplashScreen />} />
                        <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
                        <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
                        <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
                        <Route path="/onboarding/interests" element={<ChooseYourInterests />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/auth/sign-in" element={<SignIn />} />
                        <Route path="/auth/sign-up" element={<SignUp />} />
                        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                        <Route path="/auth/email-sent" element={<EmailSent />} />
                        <Route path="/auth/verify-code" element={<VerifyCode />} />
                        <Route path="/auth/reset-password" element={<ResetPassword />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/settings" element={<Settings />} />
                        <Route path="/profile/language" element={<Language />} />
                        <Route path="/profile/notifications" element={<Notification />} />
                        <Route path="/onboarding/congratulations" element={<Congratulation />} />
                        <Route path="/events/create" element={<CreateEvent />} />
                        <Route path="/events/:id" element={<EventDetails />} />
                        <Route path="/events/manage" element={<ManageEvents />} />
                        <Route path="/events/:id/edit" element={<UpdateEvent />} />
                        <Route path="/meetups/create/step-1" element={<CreateMeetupStep1 />} />
                        <Route path="/meetups/create/step-2" element={<CreateMeetupStep2 />} />
                        <Route path="/meetups/create/step-3" element={<CreateMeetupStep3 />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/upcoming" element={<UpcomingEvent />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/tickets" element={<Tickets />} />
                        <Route path="/payments/cards" element={<CreateCard />} />
                        <Route path="/payments/details" element={<PaymentDetails />} />
                    </Routes>
                </Router>
            </LocalizationProvider>
        </QueryClientProvider>
    );
};

export default App;
