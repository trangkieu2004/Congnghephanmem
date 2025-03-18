import React, { useState } from "react";
import "./Signup.css"; // Import file CSS để định dạng
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "", // Thêm field xác nhận mật khẩu
  });

  const [isLoading, setIsLoading] = useState(false); // State hiển thị loading
  const [recaptchaValue, setRecaptchaValue] = useState(null); // State cho reCAPTCHA

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset thông báo khi có thay đổi
  };
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value); // Lưu giá trị reCAPTCHA
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      setIsLoading(false);
      return;
    }
    if (!recaptchaValue) {
      toast.error("Vui lòng xác nhận bạn không phải là robot!");
      setIsLoading(false);
      return;
    }

    try {
      const { username, email, phone, address, password } = formData;
      console.log("Form data gửi lên API:", {
        username,
        email,
        phone,
        address,
        password,
      });

      const response = await axios.post(
        "https://pet-booking-eta.vercel.app/user/register",
        { username, email, phone, address, password, recaptchaValue, role: "USER" }
      );

      console.log("Phản hồi từ API:", response);

      if (response.status === 201) {
        toast.success(
          "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận."
        );
        setFormData({
          username: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          confirmPassword: "",
        });
        setRecaptchaValue(null); // Reset reCAPTCHA
        // Chuyển hướng đến trang đăng nhập
        setTimeout(() => {
          navigate("/login"); // Điều hướng đến trang đăng nhập
        }, 2000); // Đợi 2 giây trước khi chuyển hướng
      } else {
        toast.error(`Lỗi ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);

      if (error.response) {
        console.log("Chi tiết lỗi từ API:", error.response.data);
        const messages = error.response.data.response?.message;

        if (Array.isArray(messages)) {
          messages.forEach((msg) => toast.error(msg)); // Hiển thị từng thông báo lỗi
        } else {
          toast.error(
            error.response.data.message ||
              `Lỗi ${error.response.status}: ${error.response.statusText}`
          );
        }
      } else if (error.request) {
        console.log("Không nhận được phản hồi từ server:", error.request);
        toast.error(
          "Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại mạng."
        );
      } else {
        console.log("Lỗi khác:", error.message);
        toast.error("Đã xảy ra lỗi không xác định.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <ReCAPTCHA
          sitekey="6LcrJvQqAAAAACm8kKMdcRzKMLiG8HOfnAHyJunq" // Thay YOUR_SITE_KEY bằng khóa trang của bạn
          onChange={handleRecaptchaChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>
      <p>Bạn đã có tài khoản?</p>
      <a href="/login" className="dangnhap">
        Đăng nhập
      </a>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Signup;
