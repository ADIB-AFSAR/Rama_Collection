import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import useTimer from '../../hooks/Timer';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false)
  const { seconds, timeString, startTimer } = useTimer(600);
  const [resend,setResend] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/user/forgot-password`, { email });
      startTimer()
      setLoading(false)
      toast.success(`Reset link sent to your email`);
      setResend(true)
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
        {seconds === 0 && <p>Enter your email to receive a reset link.</p>}
          {seconds === 0 && resend  &&(
        <p style={{ color: 'red', fontSize: "12px"  }}>Token expired. Please request a new one.</p>
      )}
{seconds > 0 && (
  <p style={{ color: "grey", fontSize: "12px" }}>
    Token expires in: <strong>{timeString}</strong>
  </p>
)}
       {seconds > 0 && (
  <p style={{ color: "black", fontSize: "12px" }}>
    <i>
      Reset link sent to <strong>{email}</strong>.{" "}
      <br></br>
      <a
        href="https://mail.google.com/mail/u/0/#inbox"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "underline"}}
      >
        Open Gmail Inbox
      </a>
    </i>
  </p>
)}

        {seconds === 0 && <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email Address</label>
            {/* {seconds > 0 && <p style={{ color: 'green', fontSize: "12px"  }}><i>Reset link sent to {email}</i></p>} */}
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled = {seconds>0}
            />
          </div>
          <button className="btn btn-primary link-btn" type="submit" disabled={seconds > 0}>
{loading ? (
  <Spinner animation="border" size="sm" className="text-white m-0 p-0" />
) : resend && seconds === 0 ? (
  "Resend Reset Link"
) : (
  "Send Reset Link"
)}          </button>
        </form>}
      </div>
    </div>
  );
};

export default ForgotPassword;
