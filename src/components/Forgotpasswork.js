import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forgotpasswork.css';

const Forgotpasswork = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi email lấy lại mật khẩu
    console.log('Email:', email);
    // Chuyển hướng đến trang lấy lại mật khẩu
    navigate('/resetpassword');
  };
  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Lấy lại mật khẩu</button>
      </form>
      <a href="/login">Quay lại đăng nhập</a>
    </div>
  )
}

export default Forgotpasswork;
