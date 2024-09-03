import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherWidget from './components/WeatherWidget.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherWidget />
  </React.StrictMode>
);

