import React from 'react';
import Header from '../layouts/Header/Header';
import AppRouter from '../routes/Router';
import Footer from '../layouts/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  return <div>
    <Header/>
    <AppRouter/>
    <ToastContainer position="top-right" autoClose={3000} />
    <Footer/>
  </div>;
}

export default App;
