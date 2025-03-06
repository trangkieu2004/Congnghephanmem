import React, {useState} from 'react';
import './ResetPass.css';

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic khi gửi biểu mẫu
    console.log(newPassword, confirmPassword);
  };
  return (
    <div className="reset-password-container">
      <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPass;
