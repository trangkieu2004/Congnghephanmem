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

const App = () => {
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    setUsername('');
  };

  const renderWithFooter = (Component) => (
    <>
      <FComment username={username} onLogout={handleLogout} />
      <Component />
      <Footer />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotpasswork" element={<Forgotpasswork />} />
        <Route path="/resetpassword" element={<ResetPass />} />
        <Route path="/profile" element={renderWithFooter(Account)} />
        <Route path="/status-service" element={renderWithFooter(ServiceStatus)} />
        <Route path="/" element={renderWithFooter(Home)} />
        <Route path="/home" element={renderWithFooter(Home)} />
        <Route path="/introduce" element={renderWithFooter(Introduce)} />
        <Route path="/services" element={renderWithFooter(Service)} />
        <Route path="/booking-doctor" element={renderWithFooter(BookingDoctor)} />
        <Route path="/contact" element={renderWithFooter(Contact)} />
        <Route path="/service-detail" element={renderWithFooter(ServiceDetail)} />
        <Route path="/booking" element={renderWithFooter(AppointmentForm)} />
        <Route path="/confirm" element={renderWithFooter(ConfirmBooking)} />
      </Routes>
    </Router>
  );
};

export default App;