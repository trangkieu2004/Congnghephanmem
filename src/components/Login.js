import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Nhập axios
import './Login.css'; // Tạo tệp CSS để định dạng
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer và toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast

const Login = ({ setUsername }) => {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Đang gửi yêu cầu đăng nhập...'); // Log thông báo

    try {
      const response = await axios.post('https://pet-booking-eta.vercel.app/user/login', {
        username: inputUsername,
        password,
      });

      console.log('Đăng nhập thành công:', response.data);
      localStorage.setItem("userId", response.data.data.user._id);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("username", inputUsername);
      setUsername(inputUsername); // Lưu tên đăng nhập vào state
      navigate('/'); // Điều hướng tới trang Home (hoặc trang bạn muốn)

      toast.success("Đăng nhập thành công!"); // Hiển thị thông báo thành công
      // Chuyển hướng sau 1 giây để user thấy thông báo
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.log("Lỗi nhận được từ API:", error.response?.data);
    
      let errorMessage = "Có lỗi xảy ra, vui lòng thử lại!";
    
      if (Array.isArray(error.response?.data?.response?.message)) {
        // Nếu `message` là mảng, nối tất cả lỗi lại
        errorMessage = error.response.data.response.message.join(", ");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
    
      toast.error(errorMessage); // Hiển thị lỗi từ API hoặc lỗi mặc định
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="Tên đăng nhập"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            required
          />
        </div>
        <button type="submit" className="login-button">Đăng Nhập</button>
      </form>
      <div className="footer-links">
        <div className="sizecchu">
          Bạn chưa có tài khoản? 
          <br />
          <span 
            onClick={() => navigate('/register')} // Điều hướng đến trang Đăng ký
            className='register-link'
            style={{ cursor: "pointer", color: "black", textDecoration: "underline" }}
          >
            Đăng ký
          </span>
        </div>
        <div className="kieuchu">
          <span 
            onClick={() => navigate('/forgotpasswork')} // Điều hướng đến trang Quên mật khẩu
            style={{ cursor: "pointer", color: "black", textDecoration: "underline" }}
          >
            Quên mật khẩu?
          </span>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Login;