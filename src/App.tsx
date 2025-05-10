import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Test from './components/Test';
import SplashScreen from './components/ui/SplashScreen';
import Step1 from './components/ui/Onboarding/Step1';
import Step2 from './components/ui/Onboarding/Step2';
import Step3 from './components/ui/Onboarding/Step3';
import Welcome1 from './components/ui/WelcomeScreen/Welcome1';
import Welcome2 from './components/ui/WelcomeScreen/Welcome2';
import SignIn from './components/ui/SignIn';
import SignUp from './components/ui/SignUp';
import ForgotPassword from './components/ui/ForgotPassword';
import CheckEmail from './components/ui/CheckEmail';
import ResetPassword from './components/ui/ResetPassword';
import CreatePassword from './components/ui/CreatePassword';
import Congratulation from './components/ui/Congratulation';
import ChooseYourInterests from './components/ui/ChooseYourInterests';
import NewInquiry from './components/ui/NewInquiry';
import CreateEvent from './components/ui/CreateEvent';
import CreateMeetUp1 from './components/ui/CreateMeetUp/CreateMeetUp1';
import CreateMeetUp2 from './components/ui/CreateMeetUp/CreateMeetUp2';
import CreateMeetUp3 from './components/ui/CreateMeetUp/CreateMeetUp3';
import MainPage1 from './components/ui/MainPage/MainPage1';
import MainPage2 from './components/ui/MainPage/MainPage2';
import UpcomingEvent from './components/ui/UpcomingEvent';
import Search from './components/ui/Search';
import Filter from './components/ui/Filter';
import EventDetails from './components/ui/EventDetails';
import Favorite from './components/ui/Favorite';
import BookEvent from './components/ui/BookEvent';
import SelectSeats from './components/ui/SelectSeats';
import GetTicket from './components/ui/GetTicket';
import Summary from './components/ui/Summary';
import YourTicket from './components/ui/YourTicket';
import TicketDetails from './components/ui/TicketDetails';
import Ticket from './components/ui/Ticket';
import Payment from './components/ui/Payment';
import AddCard from './components/ui/AddCard';
import PaymentDetails from './components/ui/PaymentDetails';
import Profile from './components/ui/Profile';
import Language from './components/ui/Language';
import Notification from './components/ui/Notification';
import Settings from './components/ui/Settings';
import Help from './components/ui/Help';
import Privacy from './components/ui/Privacy';
import About from './components/ui/About';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Test />} />
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
                <Route path='/inquiry' element={<NewInquiry />} />
                <Route path='/create-event' element={<CreateEvent />} />
                <Route path='/create-meetup-1' element={<CreateMeetUp1 />} />
                <Route path='/create-meetup-2' element={<CreateMeetUp2 />} />
                <Route path='/create-meetup-3' element={<CreateMeetUp3 />} />
                <Route path='/main-page-1' element={<MainPage1 />} />
                <Route path='/main-page-2' element={<MainPage2 />} />
                <Route path='/upcoming' element={<UpcomingEvent />} />
                <Route path='/search' element={<Search />} />
                <Route path='/filter' element={<Filter />} />
                <Route path='/event-details' element={<EventDetails />} />
                <Route path='/favorite' element={<Favorite />} />
                <Route path='/book-event' element={<BookEvent />} />
                <Route path='/select-seats' element={<SelectSeats />} />
                <Route path='/get-ticket' element={<GetTicket />} />
                <Route path='/summary' element={<Summary />} />
                <Route path='/ticket-details' element={<TicketDetails />} />
                <Route path='/your-ticket' element={<YourTicket />} />
                <Route path='/ticket' element={<Ticket />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/payment-card' element={<AddCard />} />
                <Route path='/payment-details' element={<PaymentDetails />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/language' element={<Language />} />
                <Route path='/notification' element={<Notification />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/help' element={<Help />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
