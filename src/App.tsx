import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
import { useSupabaseAuthSync } from '@/hooks/useSupabaseAuthSync';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { supabase } from '@/utils/supabase';
import { DarkModeProvider } from '@/contexts/DarkModeContext';
import { MUIThemeProvider } from '@/contexts/MUIThemeProvider';

import { SplashScreen } from '@/features/onboarding/SplashScreen';
import OnboardingStep1 from '@/features/onboarding/OnboardingStep1';
import OnboardingStep2 from '@/features/onboarding/OnboardingStep2';
import OnboardingStep3 from '@/features/onboarding/OnboardingStep3';
import Welcome from '@/features/Welcome';
import { SignIn } from '@/features/auth/SignIn';
import { SignUp } from '@/features/auth/SignUp';
import ForgotPassword from '@/features/auth/ForgotPassword';
import EmailSent from '@/features/auth/EmailSent';
import { VerifyCode } from '@/features/auth/VerifyCode';
import ResetPassword from '@/features/auth/ResetPassword';
import Home from '@/features/Home';
import { Profile } from '@/features/account/Profile';
import { Settings } from '@/features/account/Settings';
import Language from '@/features/profile/Language';
import Notification from '@/features/profile/Notification';
import ChangePassword from '@/features/profile/ChangePassword';
import Congratulation from '@/features/onboarding/Congratulation';
import CreateEvent from '@/features/events/CreateEvent';
import EventDetails from '@/features/events/EventDetails';
import ManageEvents from '@/features/events/ManageEvents';
import UpdateEvent from '@/features/events/UpdateEvent';
import CreateMeetupStep1 from '@/features/meetups/CreateMeetupStep1';
import CreateMeetupStep2 from '@/features/meetups/CreateMeetupStep2';
import CreateMeetupStep3 from '@/features/meetups/CreateMeetupStep3';
import JoinMeetup from '@/features/meetups/JoinMeetup';
import Favorites from '@/features/Favorites';
import UpcomingEvent from '@/features/UpcomingEvent';
import Search from '@/features/Search';
import Tickets from '@/features/tickets/Tickets';
import CreateCard from '@/features/payments/CreateCard';
import PaymentDetails from '@/features/payments/PaymentDetails';
import BookEvent from '@/features/bookings/BookEvent';
import SelectSeats from '@/features/bookings/SelectSeats';
import Summary from '@/features/bookings/Summary';
import Help from '@/features/support/Help';
import Privacy from '@/features/support/Privacy';
import About from '@/features/support/About';

const RealtimeProvider: React.FC = () => {
    useRealtimeUpdates();
    return null;
};

const App: React.FC = () => {
    useSupabaseAuthSync();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = hashParams.get('access_token');
            const refreshToken = hashParams.get('refresh_token');
            
            if (accessToken && refreshToken) {
                try {
                    const { data, error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });
                    
                    if (error) {
                        console.error('Error setting session:', error);
                    } else {
                        try {
                            if (data.user) {
                                const { data: existingUser, error: checkError } = await supabase
                                    .from('users')
                                    .select('id')
                                    .eq('id', data.user.id)
                                    .single();

                                if (!existingUser || checkError) {
                                    const { error: insertError } = await supabase
                                        .from('users')
                                        .insert({
                                            id: data.user.id,
                                            email: data.user.email || '',
                                            full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || '',
                                            avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture || null,
                                            created_at: new Date().toISOString(),
                                            updated_at: new Date().toISOString()
                                        });

                                    if (insertError) {
                                        console.error('Profile creation error:', insertError);
                                    } else {
                                        console.log('User profile created successfully');
                                    }
                                } else {
                                    console.log('User profile already exists');
                                }
                            }
                        } catch (profileError) {
                            console.error('Error ensuring user profile:', profileError);
                        }
                        
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
        <DarkModeProvider>
            <MUIThemeProvider>
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
                        <Route path="/profile/change-password" element={<ChangePassword />} />
                        <Route path="/onboarding/congratulations" element={<Congratulation />} />
                        <Route path="/events/create" element={<CreateEvent />} />
                        <Route path="/events/:id" element={<EventDetails />} />
                        <Route path="/events/manage" element={<ManageEvents />} />
                        <Route path="/events/:id/edit" element={<UpdateEvent />} />
                        <Route path="/meetups/create/step-1" element={<CreateMeetupStep1 />} />
                        <Route path="/meetups/create/step-2" element={<CreateMeetupStep2 />} />
                        <Route path="/meetups/create/step-3" element={<CreateMeetupStep3 />} />
                        <Route path="/meetups/join/:id" element={<JoinMeetup />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/upcoming" element={<UpcomingEvent />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/tickets" element={<Tickets />} />
                        <Route path="/bookings/event/:id" element={<BookEvent />} />
                        <Route path="/bookings/select-seats" element={<SelectSeats />} />
                        <Route path="/bookings/summary" element={<Summary />} />
                        <Route path="/payments/cards" element={<CreateCard />} />
                        <Route path="/payments/details" element={<PaymentDetails />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                    </Router>
                    </LocalizationProvider>
                </QueryClientProvider>
            </MUIThemeProvider>
        </DarkModeProvider>
    );
};

export default App;
