import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth Components
import AuthCallback from '@/AuthCallback';
import SignIn from '@/features/auth/SignIn';
import SignUp from '@/features/auth/SignUp';
import ForgotPassword from '@/features/auth/ForgotPassword';
import EmailSent from '@/features/auth/EmailSent';
import VerifyCode from '@/features/auth/VerifyCode';
import ResetPassword from '@/features/auth/ResetPassword';

// Onboarding Components
import SplashScreen from '@/features/onboarding/SplashScreen';
import OnboardingStep1 from '@/features/onboarding/OnboardingStep1';
import OnboardingStep2 from '@/features/onboarding/OnboardingStep2';
import OnboardingStep3 from '@/features/onboarding/OnboardingStep3';
import Welcome from '@/features/Welcome';
import ChooseYourInterests from '@/features/onboarding/ChooseYourInterests';
import Congratulation from '@/features/onboarding/Congratulation';

// Event Components
import CreateEvent from '@/features/events/CreateEvent';
import EventDetails from '@/features/events/EventDetails';
import UpdateEvent from '@/features/events/UpdateEvent';
import ManageEvents from '@/features/events/ManageEvents';

// Meetup Components
import CreateMeetupStep1 from '@/features/meetups/CreateMeetupStep1';
import CreateMeetupStep2 from '@/features/meetups/CreateMeetupStep2';
import CreateMeetupStep3 from '@/features/meetups/CreateMeetupStep3';

// Main App Components
import Home from '@/features/Home';
import Search from '@/features/Search';
import Favorites from '@/features/Favorites';
import UpcomingEvent from '@/features/UpcomingEvent';

// Booking Flow Components
import BookEvent from '@/features/bookings/BookEvent';
import SelectSeats from '@/features/bookings/SelectSeats';
import Summary from '@/features/bookings/Summary';

// Ticket Components
import Ticket from '@/features/tickets/Tickets';
import TicketDetails from '@/features/tickets/TicketDetails';

// Payment Components
import Payment from '@/features/payments/Payment';
import CreateCard from '@/features/payments/CreateCard';
import PaymentDetails from '@/features/payments/PaymentDetails';

// Profile Components
import Profile from '@/features/account/Profile';
import Settings from '@/features/account/Settings';
import Language from '@/features/profile/Language';
import Notification from '@/features/profile/Notification';

// Support Components
import Help from '@/features/support/Help';
import Privacy from '@/features/support/Privacy';
import About from '@/features/support/About';

// Development Components
import Test from '@/features/Test';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path='/auth/callback' element={<AuthCallback />} />
      <Route path='/auth/sign-in' element={<SignIn />} />
      <Route path='/auth/sign-up' element={<SignUp />} />
      <Route path='/auth/forgot-password' element={<ForgotPassword />} />
      <Route path='/auth/email-sent' element={<EmailSent />} />
      <Route path='/auth/verify-code' element={<VerifyCode />} />
      <Route path='/auth/reset-password' element={<ResetPassword />} />

      {/* Onboarding Routes */}
      <Route path='/onboarding/splash' element={<SplashScreen />} />
      <Route path='/onboarding/step-1' element={<OnboardingStep1 />} />
      <Route path='/onboarding/step-2' element={<OnboardingStep2 />} />
      <Route path='/onboarding/step-3' element={<OnboardingStep3 />} />
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/onboarding/interests' element={<ChooseYourInterests />} />
      <Route path='/onboarding/congratulations' element={<Congratulation />} />

      {/* Event Routes */}
      <Route path='/events/create' element={<CreateEvent />} />
      <Route path='/events/:id' element={<EventDetails />} />
      <Route path='/events/:id/edit' element={<UpdateEvent />} />
      <Route path='/events/manage' element={<ManageEvents />} />

      {/* Meetup Routes */}
      <Route path='/meetups/create/step-1' element={<CreateMeetupStep1 />} />
      <Route path='/meetups/create/step-2' element={<CreateMeetupStep2 />} />
      <Route path='/meetups/create/step-3' element={<CreateMeetupStep3 />} />

      {/* Main App Routes */}
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/upcoming' element={<UpcomingEvent />} />

      {/* Booking Flow Routes */}
      <Route path='/bookings/event/:id' element={<BookEvent />} />
      <Route path='/bookings/select-seats' element={<SelectSeats />} />
      <Route path='/bookings/summary' element={<Summary />} />

      {/* Ticket Routes */}
      <Route path='/tickets' element={<Ticket />} />
      <Route path='/tickets/:id' element={<TicketDetails />} />

      {/* Payment Routes */}
      <Route path='/payments' element={<Payment />} />
      <Route path='/payments/cards' element={<CreateCard />} />
      <Route path='/payments/details' element={<PaymentDetails />} />

      {/* Profile Routes */}
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/settings' element={<Settings />} />
      <Route path='/profile/language' element={<Language />} />
      <Route path='/profile/notifications' element={<Notification />} />

      {/* Support Routes */}
      <Route path='/help' element={<Help />} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path='/about' element={<About />} />

      {/* Development Routes */}
      <Route path='/test' element={<Test />} />
      
      {/* Legacy redirects */}
      <Route path='/main-page-1' element={<Home />} />
    </Routes>
  );
};
