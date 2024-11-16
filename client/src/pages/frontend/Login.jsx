import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { useSelector, useDispatch } from 'react-redux'; // Import necessary hooks from Redux
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import './frontend.css'; // External CSS file for custom styles 
import { loginUserStart, getUserStart } from '../../redux/action/user.acton'; // Adjust import based on your file structure
import {useFormData} from '../../hooks/useFormData'; // Adjust import based on your file structure

const Login = () => {
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  
  // Initialize form data using custom hook
  const [handleChange, formData] = useFormData({
    email: "",
    password: "",
  });
  
  const { email, password } = formData;

  const submit = (event) => {
    event.preventDefault();
    dispatch(loginUserStart(formData));

    // Wait for the user to be logged in before checking for token
    setTimeout(() => {
      let token = localStorage.getItem('jwt_token');
      if (!token) {
        console.error('Token is undefined');
        return;
      }
      if(currentUser.role === 'admin') {
        navigate('/dashboard');
      }else{
        navigate('/')
      }
    }, 500);
  };

  useEffect(() => {
    dispatch(getUserStart());
  }, [dispatch]); // Added dispatch as a dependency

  return (
    <div className="login-container">
      {/* Background Blur */}
      <div className="background-blur"></div>

      {/* Login Box */}
      <div className="login-box">
        <div className="login-image">
          <img
            src="https://cdn0.weddingwire.in/article/0173/original/1280/jpg/123710-taruntahiliani.jpeg"
            alt="Gucci model showcasing a fashion outfit"
          />
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <p>
            Don't have an account yet?{' '}
            <a href="/register" style={{ color: '#ff6b6b' }}>
              Sign Up
            </a>
          </p>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email" // Added name attribute
                placeholder="you@example.com"
                value={email} // Controlled component
                onChange={handleChange} // Update form data on change
                required // Added required attribute
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
                name="password" // Added name attribute
                placeholder="Enter 6 characters or more"
                value={password} // Controlled component
                onChange={handleChange} // Update form data on change
                required // Added required attribute
              />
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              LOGIN
            </button>
            {/* Uncomment if social login is needed */}
            {/* <div className="text-center my-3">or login with</div> */}
            {/* <div className="social-login">
              <button className="btn btn-secondary">
                <FontAwesomeIcon icon={faGoogle} className="me-2" />
                Google
              </button>
              <button className="btn btn-secondary">
                <FontAwesomeIcon icon={faFacebookF} className="me-2" />
                Facebook
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
