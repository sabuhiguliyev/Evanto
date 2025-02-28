import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Step1 from './views/Onboarding/Step1';
import Step2 from './views/Onboarding/Step2';
import Step3 from './views/Onboarding/Step3';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/onboarding/1' element={<Step1 />} />
                <Route path='/onboarding/2' element={<Step2 />} />
                <Route path='/onboarding/3' element={<Step3 />} />
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
