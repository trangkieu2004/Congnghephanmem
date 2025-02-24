import './App.css';
import React, { useState } from "react";
import FComment from './components/FComment';   // Header
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Introduce from './components/Introduce';
import Signup from './components/Signup';
import Service from './components/Service';
import ServiceDetail from './components/ServiceDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  // const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Chỉ hiển thị trang Login */}
        <Route path="/register" element={<Signup />} /> {/* Route cho trang Đăng ký */}
        <Route path="/" element={<><FComment /><Home /><Footer /></>} />
        <Route path="/home" element={<><FComment /><Home /><Footer /></>} />
        <Route path="/introduce" element={<><FComment /><Introduce /><Footer /></>} />
        <Route path="/services" element={<><FComment /><Service /><Footer /></>} />
        <Route path="/service-detail" element={<><FComment /><ServiceDetail /><Footer /></>} />
      </Routes>
    </Router>
    
  );
};

export default App;