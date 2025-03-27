import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FComment from './components/FComment';
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
import Contact from './components/Contact';
import Account from './components/Account';
import ServiceStatus from './components/ServiceStatus';
import Bill from './components/Bill';

const Layout = ({ children, username, onLogout }) => (
  <>
    <FComment username={username} onLogout={onLogout} />
    {children}
    <Footer />
  </>
);

const App = () => {
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    setUsername('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotpasswork" element={<Forgotpasswork />} />
        <Route path="/resetpassword" element={<ResetPass />} />

        <Route path="/profile" element={<Layout username={username} onLogout={handleLogout}><Account /></Layout>} />
        <Route path="/status-service" element={<Layout username={username} onLogout={handleLogout}><ServiceStatus /></Layout>} />
        <Route path="/bill" element={<Layout username={username} onLogout={handleLogout}><Bill /></Layout>} />
        <Route path="/" element={<Layout username={username} onLogout={handleLogout}><Home /></Layout>} />
        <Route path="/home" element={<Layout username={username} onLogout={handleLogout}><Home /></Layout>} />
        <Route path="/introduce" element={<Layout username={username} onLogout={handleLogout}><Introduce /></Layout>} />
        <Route path="/services" element={<Layout username={username} onLogout={handleLogout}><Service /></Layout>} />
        <Route path="/booking-doctor" element={<Layout username={username} onLogout={handleLogout}><BookingDoctor /></Layout>} />
        <Route path="/contact" element={<Layout username={username} onLogout={handleLogout}><Contact /></Layout>} />
        <Route path="/service-detail" element={<Layout username={username} onLogout={handleLogout}><ServiceDetail /></Layout>} />
        <Route path="/booking" element={<Layout username={username} onLogout={handleLogout}><AppointmentForm /></Layout>} />
        <Route path="/confirm" element={<Layout username={username} onLogout={handleLogout}><ConfirmBooking /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
