import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLoginStart } from '../redux/action/googleAuth.action';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts) {
        clearInterval(interval);
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCallbackResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentUser) {
      toast.success("Logged in successfully");
      navigate(currentUser.role === "Admin" ? "/dashboard" : "/");
    }
  }, [currentUser]);

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    dispatch(googleLoginStart(userObject));
  };

  return <div id="googleSignInDiv"></div>;
};

export default GoogleLoginButton;
