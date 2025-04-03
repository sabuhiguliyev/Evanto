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
            </Routes>
        </Router>
    );
};

export default App;
