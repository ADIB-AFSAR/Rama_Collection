import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Optional: You can create an index.css file for global styles
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
<BrowserRouter>
  <React.StrictMode>
  <Provider store={store}>
      <App/>
   </Provider>
  </React.StrictMode>
  </BrowserRouter>
);
