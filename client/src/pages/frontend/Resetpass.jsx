import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './frontend.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/user/reset-password/${token}`, { password });
      toast.success("Password reset successful");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="password-flow-container">
      <div className="background-blur"></div>
      <div className="password-flow-box">
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <label>New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-visibility-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className='bi bi-eye-slash'></i> : <i className='bi bi-eye'></i>}
              
            </span>
          </div>
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
