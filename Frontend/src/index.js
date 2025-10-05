// Frontend/src/index.js (MOVED to this location)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css'; 

// Render the main App component into the root element of index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);