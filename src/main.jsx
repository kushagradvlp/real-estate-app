import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your global styles, including Tailwind
import App from './App.jsx'; // or './App.jsx' if you rename it

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
