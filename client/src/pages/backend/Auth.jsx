import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Auth() {
  const currentUser  = useSelector(state => state.user.currentUser );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is not authenticated
    if (!currentUser  || !currentUser .name) {
      // Allow access only to login, register, and home routes
      if (!['/', '/login', '/register'].includes(location.pathname)) {
        navigate('/login');
      }
      return; // Early return to prevent further checks
    }

    // If the user is authenticated, check their role
    if (['/login', '/register'].includes(location.pathname)) {
      // If the user is already logged in, redirect them to their respective dashboard
      if (currentUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (currentUser.role === 'customer') {
        navigate('/');
      }
    } else if (currentUser.role === 'admin') {
      // Admins can access all routes except login and register
      if (location.pathname.includes('/admin')) {
        // Allow access to admin routes
      } else if (location.pathname === '/') {
        // Allow access to home route
      } else {
        // Redirect to admin dashboard for other routes
        navigate('/admin/dashboard');
      }
    } else if (currentUser.role === 'customer') {
      // Customers cannot access admin routes
      if (location.pathname.includes('/admin')) {
        navigate('/'); // Redirect to home
      }
    }
  }, [currentUser , navigate, location]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Auth;