import React, { useEffect } from 'react';
import Header from '../layouts/Header/Header';
import AppRouter from '../routes/Router';
import Footer from '../layouts/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
 useEffect(() => {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 5000);

  fetch(`${process.env.REACT_APP_API_URL}/api/health`, { signal: controller.signal })
    .catch(() => {});

  return () => {
    clearTimeout(t);
    controller.abort();
  };
}, []);

  return <div>
    <Header/>
    <AppRouter/>
    <ToastContainer position="top-right" autoClose={3000} />
    <Footer/>
  </div>;
}

export default App;
