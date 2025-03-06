import './App.css';
import React, { useState } from "react";
import FComment from './components/FComment';   // Header
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Introduce from './components/Introduce';
import Signup from './components/Signup';
import Forgotpasswork from './components/Forgotpasswork';
import ResetPass from './components/ResetPass';
import Service from './components/Service';
import ServiceDetail from './components/ServiceDetail';
import AppointmentForm from './components/AppointmentForm';
import ConfirmBooking from './components/ConfirmBooking';
import BookingDoctor from './components/BookingDoctor';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotpasswork" element={<Forgotpasswork />} />
        <Route path="/resetpassword" element={<ResetPass />} />
        
        <Route path="/" element={<><FComment username={username} onLogout={() => setUsername('')} /><Home /><Footer /></>} />
        <Route path="/home" element={<><FComment username={username} onLogout={() => setUsername('')} /><Home /><Footer /></>} />
        <Route path="/introduce" element={<><FComment username={username} onLogout={() => setUsername('')} /><Introduce /><Footer /></>} />
        <Route path="/services" element={<><FComment username={username} onLogout={() => setUsername('')} /><Service /><Footer /></>} />
        <Route path="/booking-doctor" element={<><FComment username={username} onLogout={() => setUsername('')} /><BookingDoctor /><Footer /></>} />
        <Route path="/service-detail" element={<><FComment username={username} onLogout={() => setUsername('')} /><ServiceDetail /><Footer /></>} />
        <Route path="/booking" element={<><FComment username={username} onLogout={() => setUsername('')} /><AppointmentForm /><Footer /></>} />
        <Route path="/confirm" element={<><FComment username={username} onLogout={() => setUsername('')} /><ConfirmBooking /><Footer /></>} />
      </Routes>
    </Router>
    
  );
};

export default App;