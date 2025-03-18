import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Forgotpasswork.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpasswork = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const response = await axios.post('https://pet-booking-eta.vercel.app/user/forgot-password', { email });
      console.log('Phản hồi từ server:', response.data);

      toast.success('Đã gửi email chứa mã OTP. Vui lòng kiểm tra hộp thư của bạn.');

      // Điều hướng thẳng đến trang reset password, truyền email kèm theo (nếu muốn)
      setTimeout(() => {
        navigate('/resetpassword', { state: { email} }); 
      }, 2000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
      } else {
        toast.error('Lỗi kết nối đến máy chủ.');
      }
      console.error('Lỗi:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleEmailSubmit}>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Gửi mã OTP</button>
      </form>
      <a href="/login">Quay lại đăng nhập</a>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Forgotpasswork;
