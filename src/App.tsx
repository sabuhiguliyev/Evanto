import React from  'react'
import './styles/App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

const App: React.FC = ()=> {
return (
    <Router>
        <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
    </Router>
)
}

export default App
