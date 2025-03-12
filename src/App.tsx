import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './views/Test';
import SplashScreen from './views/SplashScreen';
import Step1 from './views/Onboarding/Step1';
import Step2 from './views/Onboarding/Step2';
import Step3 from './views/Onboarding/Step3';
import WelcomeScreen1 from './views/WelcomeScreen/WelcomeScreen1';
// import WelcomeScreen2 from './views/WelcomeScreen/WelcomeScreen2';
// import SignIn1 from './views/SignIn/SignIn1';
// import SignIn2 from './views/SignIn/SignIn2';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Test />} />
                <Route path='/splashscreen' element={<SplashScreen />} />
                <Route path='/onboarding/1' element={<Step1 />} />
                <Route path='/onboarding/2' element={<Step2 />} />
                <Route path='/onboarding/3' element={<Step3 />} />
                <Route path='/welcome/1' element={<WelcomeScreen1 />} />
                {/*<Route path='/welcome/2' element={<WelcomeScreen2 />} />*/}
                {/*<Route path='/signin/1' element={<SignIn1 />} />*/}
                {/*<Route path='/signin/2' element={<SignIn2 />} />*/}
                {/*<Route path="/signup" element={<SignUp />} />*/}
                {/*<Route path="/signin" element={<SignIn />} />*/}
                {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
                {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                {/*<Route path="/event/:id" element={<EventDetails />} />*/}
                {/*<Route path="/create-event" element={<CreateEvent />} />*/}
            </Routes>
        </Router>
    );
};

export default App;
