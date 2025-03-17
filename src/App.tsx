import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './views/Test';
import SplashScreen from './views/SplashScreen';
import Step1 from './views/Onboarding/Step1';
import Step2 from './views/Onboarding/Step2';
import Step3 from './views/Onboarding/Step3';
import Welcome1 from './views/WelcomeScreen/Welcome1';
import Welcome2 from './views/WelcomeScreen/Welcome2';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ForgotPassword from './views/ForgotPassword';
import CheckEmail from './views/CheckEmail';
import ResetPassword from './views/ResetPassword';
import CreatePassword from './views/CreatePassword';

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
            </Routes>
        </Router>
    );
};

export default App;
