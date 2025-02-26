import React, { useState } from 'react';
import './Forgotpasswork.css';

const Forgotpasswork = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi email lấy lại mật khẩu
    console.log('Email:', email);
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
