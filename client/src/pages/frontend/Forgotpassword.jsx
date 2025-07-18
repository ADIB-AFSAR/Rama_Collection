import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/user/forgot-password`, { email });
      setLoading(false)
      toast.success("Reset link sent to your email");
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="password-flow-container">
      <div className="background-blur"></div>
      <div className="password-flow-box">
        <h2 className='d-flex justify-content-between'>Forgot Password <a onClick={() => window.history.back()}>
        <i
          style={{ cursor: 'pointer'}}
          className="bi bi-arrow-left fs-3 text-dark"
        ></i>
      </a></h2>
        <p>Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            {loading ?<Spinner animation="border" size="sm" className="text-white m-0 p-0" /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
