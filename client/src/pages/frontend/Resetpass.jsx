import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './frontend.css';
import { Spinner } from 'react-bootstrap';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const validate = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;     
    if (!passwordRegex.test(password)) return 'Password must be at least 6 characters and include a number and a special character.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
        if (validationError) {
          toast.error(validationError)
          return;
        }
    setLoading(true)
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/user/reset-password/${token}`, { password });
      setLoading(false)
      toast.success("Password reset successful");
      navigate('/login');
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="password-flow-container">
      <div className="background-blur"></div>
      <div className="password-flow-box">
        <h2 className='d-flex justify-content-between'>Reset Password <a onClick={() => window.history.back()}>
        <i
          style={{ cursor: 'pointer'}}
          className="bi bi-arrow-left fs-3 text-dark"
        ></i>
      </a></h2>
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
            {loading ?<Spinner animation="border" size="sm" className="text-white m-0 p-0" />:"Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
