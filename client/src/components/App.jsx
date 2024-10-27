import React from 'react';
import Header from '../layouts/Header/Header';
import AppRouter from '../routes/Router';
import Footer from '../layouts/Footer/Footer';

function App() {
  return <div>
    <Header/>
    <AppRouter/>
    <Footer/>
  </div>;
}

export default App;
