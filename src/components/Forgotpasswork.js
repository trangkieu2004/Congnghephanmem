import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Nhập axios
import './Forgotpasswork.css';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer và toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast

const Forgotpasswork = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Bước hiện tại (1: nhập email, 2: nhập OTP)
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss(); // Xóa các thông báo trước đó

    try {
      // Gửi yêu cầu lấy lại mật khẩu
      const response = await axios.post('https://pet-booking-eta.vercel.app/user/forgot-password', { email });
      console.log('Phản hồi từ server:', response.data);
      
      toast.success('Đã gửi email lấy lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.');
      setStep(2); // Chuyển sang bước nhập OTP
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      } else {
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
      console.error('Lỗi:', error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss(); // Xóa các thông báo trước đó

    try {
      // Gửi OTP để xác nhận
      const response = await axios.post('https://pet-booking-eta.vercel.app/user/verify-otp', { email, otp });
      console.log('Phản hồi từ server:', response.data);
      
      toast.success('OTP xác nhận thành công. Bạn có thể tiếp tục đặt lại mật khẩu.');

      // Chuyển hướng đến trang reset password
      setTimeout(() => {
        navigate('/resetpassword');
      }, 2000); // Chờ 2 giây trước khi chuyển hướng
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Đã xảy ra lỗi xác nhận OTP. Vui lòng thử lại.');
      } else {
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
      console.error('Lỗi:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu</h2>
      {step === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Lấy lại mật khẩu</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="Nhập OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Xác nhận OTP</button>
        </form>
      )}
      <a href="/login">Quay lại đăng nhập</a>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
}

export default Forgotpasswork;