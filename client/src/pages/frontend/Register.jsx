import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './frontend.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useFormData } from '../../hooks/useFormData';
import { registerUserStart } from '../../redux/action/user.acton';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);
    const [showPassword, setShowPassword] = useState(false);


  const [handleChange, formData] = useFormData({
    name: '',
    email: '',
    password: '',
    contact: '',
  });

  const { name, email, password, contact } = formData;

  const validate = () => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(name)) return 'Enter a valid full name.';
    if (!emailRegex.test(email)) return 'Enter a valid email address.';
    if (!passwordRegex.test(password)) return 'Password must be at least 6 characters and include a number and a special character.';
    if (!phoneRegex.test(contact)) return 'Enter a valid 10-digit contact number.';
    if (!isChecked) return 'You must agree to the terms and conditions.';

    return null;
  };

  const submit = (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      toast.error(validationError)
      return;
    }
     dispatch(registerUserStart({
    ...formData,
    onSuccess: () => navigate('/login'), // callback only on success
  }));
    };

  useEffect(() => {
        if (currentUser) {
          let token = localStorage.getItem('jwt_token');
          if (!token) {
            console.error('Token is undefined');
            return;
          }
          if (currentUser.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }
      }, [currentUser, navigate]);

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = "https://img.perniaspopupshop.com/HOMEPAGE_IMAGES/WOMEN/01_Nov_24/Ridhi-Mehra_WT_1_11_24.jpg";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <div className="register-container">
      <div className="background-blur"></div>

      <div className="register-box">
        <div className="register-form">
          <h2>Register</h2>
           <p>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#ff6b6b' }}>
              Login
            </Link>
          </p>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="John Doe"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className='d-flex'>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password" // Added name attribute
                placeholder="Enter 6 characters or more"
                value={password} // Controlled component
                onChange={handleChange} // Update form data on change
                required // Added required attribute
              /><span className='mt-2 mx-1' onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className='bi bi-eye-slash'></i> : <i className='bi bi-eye'></i>}</span></div>
            </div>

            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact"
                placeholder="Your contact number"
                value={contact}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label className="form-check-label terms" htmlFor="terms">
                I agree to the terms and conditions
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {loading ?<Spinner animation="border" size="sm" className="text-white m-0 p-0" />:"REGISTER"}
            </button>
          </form>
        </div>

        <div className="register-image">
          {isImageLoaded ? (
            <img
              src="https://img.perniaspopupshop.com/HOMEPAGE_IMAGES/WOMEN/01_Nov_24/Ridhi-Mehra_WT_1_11_24.jpg"
              alt="Fashion model"
            />
          ) : (
            <div
              style={{
                height: '400px',
                width: '100%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
