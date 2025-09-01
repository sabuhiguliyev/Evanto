import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useSupabaseAuthSync from '@/hooks/useSupabaseAuthSync';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import SplashScreen from '@/features/SplashScreen';
import Step1 from '@/features/onboarding/Step1';
import Step2 from '@/features/onboarding/Step2';
import Step3 from '@/features/onboarding/Step3';
import Welcome1 from '@/features/welcome/Welcome1';
import Welcome2 from '@/features/welcome/Welcome2';
import SignIn from '@/features/auth/SignIn';
import SignUp from '@/features/auth/SignUp';
import ForgotPassword from '@/features/ForgotPassword';
import CheckEmail from '@/features/CheckEmail';
import ResetPassword from '@/features/ResetPassword';
import CreatePassword from '@/features/CreatePassword';
import Congratulation from '@/features/Congratulation';
import ChooseYourInterests from '@/features/ChooseYourInterests';
import CreateEvent from '@/features/events/CreateEvent';
import MeetUp1 from '@/features/meetups/MeetUp1';
import MeetUp2 from '@/features/meetups/MeetUp2';
import MeetUp3 from '@/features/meetups/MeetUp3';
import MainPage1 from '@/features/MainPage1';
import UpcomingEvent from '@/features/UpcomingEvent';
import Search from '@/features/Search';
import EventDetails from '@/features/events/EventDetails';
import Favorite from '@/features/Favorite';
import BookEvent from '@/features/BookEvent';
import SelectSeats from '@/features/SelectSeats';
import Summary from '@/features/Summary';

import TicketDetails from '@/features/TicketDetails';
import Ticket from '@/features/Tickets';
import Payment from '@/features/Payment';
import AddCard from '@/features/AddCard';
import PaymentDetails from '@/features/PaymentDetails';
import Profile from '@/features/account/Profile';
import ManageEvents from '@/features/ManageEvents';
import EditEvent from '@/features/EditEvent';
import Language from '@/features/Language';
import Notification from '@/features/Notification';
import Settings from '@/features/account/Settings';
import Help from '@/features/Help';
import Privacy from '@/features/Privacy';
import About from '@/features/About';
import Test from '@/Test';
import AuthCallback from '@/AuthCallback';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

const App: React.FC = () => {
    useSupabaseAuthSync();

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Router>
                    <Routes>
                        <Route path='/auth/callback' element={<AuthCallback />} />
                        <Route path='/splashscreen' element={<SplashScreen />} />
                        <Route path='/onboarding/1' element={<Step1 />} />
                        <Route path='/onboarding/2' element={<Step2 />} />
                        <Route path='/onboarding/3' element={<Step3 />} />
                        <Route path='/welcome/1' element={<Welcome1 />} />
                        <Route path='/welcome/2' element={<Welcome2 />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/check-email' element={<CheckEmail />} />
                        <Route path='/reset-password' element={<ResetPassword />} />
                        <Route path='/create-password' element={<CreatePassword />} />
                        <Route path='/congratulation' element={<Congratulation />} />
                        <Route path='/interests' element={<ChooseYourInterests />} />
                        <Route path='/create-event' element={<CreateEvent />} />
                        <Route path='/create-meetup-1' element={<MeetUp1 />} />
                        <Route path='/create-meetup-2' element={<MeetUp2 />} />
                        <Route path='/create-meetup-3' element={<MeetUp3 />} />
                        <Route path='/' element={<MainPage1 />} />
                        <Route path='/main-page-1' element={<MainPage1 />} />
                        <Route path='/upcoming' element={<UpcomingEvent />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/event-details' element={<EventDetails />} />
                        <Route path='/favorite' element={<Favorite />} />
                        <Route path='/book-event' element={<BookEvent />} />
                        <Route path='/select-seats' element={<SelectSeats />} />
                        <Route path='/summary' element={<Summary />} />
                        <Route path='/ticket-details' element={<TicketDetails />} />
                        <Route path='/tickets' element={<Ticket />} />
                        <Route path='/payment' element={<Payment />} />
                        <Route path='/payment-card' element={<AddCard />} />
                        <Route path='/payment-details' element={<PaymentDetails />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/manage-events' element={<ManageEvents />} />
                        <Route path='/edit-event' element={<EditEvent />} />
                        <Route path='/language' element={<Language />} />
                        <Route path='/notification' element={<Notification />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/help' element={<Help />} />
                        <Route path='/privacy' element={<Privacy />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/test' element={<Test />} />
                    </Routes>
                </Router>
            </LocalizationProvider>
        </QueryClientProvider>
    );
};

export default App;
