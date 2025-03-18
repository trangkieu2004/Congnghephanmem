import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ResetPass.css';

const ResetPass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Lấy email từ navigate

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Thiếu email! Vui lòng quay lại bước quên mật khẩu.');
      navigate('/forgotpasswork');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      return;
    }

    try {
      const response = await axios.post('https://pet-booking-eta.vercel.app/user/reset-password', {
        password: newPassword,
        email: email,
        otp: otp
      });

      console.log('Reset password success:', response.data);
      toast.success('Đổi mật khẩu thành công!');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Lỗi:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Nhập mã OTP & đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Xác nhận</button>
      </form>
      <a href="/login">Quay lại đăng nhập</a>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default ResetPass;
