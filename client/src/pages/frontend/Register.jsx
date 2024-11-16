import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './frontend.css'; // External CSS file for custom styles 
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import {useFormData} from '../../hooks/useFormData'; // Adjust the path as necessary
import { registerUserStart } from '../../redux/action/user.acton';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  const [handleChange, formData] = useFormData({
    name: '',
    email: '',
    password: '',
    contact: '', 
  });

  const { name, email, password, contact } = formData;

  const submit = (event) => {
    event.preventDefault(); 

    // Validate fields here if needed
    dispatch(registerUserStart(formData))
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="background-blur"></div>

      <div className="register-box">
        <div className="register-form">
          <h2>Register</h2>
          {err && <div className="alert alert-danger">{err}</div>}
          <p>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#ff6b6b' }}>
              Login
            </Link>
          </p>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name" // Add name attribute
                placeholder="John Doe"
                value={name} // Bind the value to the state
                onChange={handleChange} // Bind onChange to handleChange
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email" // Add name attribute
                placeholder="you@example.com"
                value={email} // Bind the value to the state
                onChange={handleChange} // Bind onChange to handleChange
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password" // Add name attribute
                placeholder="Enter 6 characters or more"
                value={password} // Bind the value to the state
                onChange={handleChange} // Bind onChange to handleChange
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword" // You can handle this in your form logic if needed
                placeholder="Re-enter your password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact" // Add name attribute
                placeholder="Your contact number"
                value={contact} // Bind the value to the state
                onChange={handleChange} // Bind onChange to handleChange
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Profile Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image" 
                onChange={uploadFiles}  
              />
            </div> */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
              />
              <label className="form-check-label terms" htmlFor="terms">
                I agree to the terms and conditions
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              REGISTER
            </button>
          </form>
        </div>
        <div className="register-image">
          <img
            src="https://img.perniaspopupshop.com/HOMEPAGE_IMAGES/WOMEN/01_Nov_24/Ridhi-Mehra_WT_1_11_24.jpg"
            alt="Gucci model showcasing a fashion outfit"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
