// src/components/Weather.jsx

import React, { useState } from 'react';
import '../styles/Weather.css'; // Import the CSS file
import fetchWeatherData from '../api/weatherApi';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setWeatherData(null);

    const data = await fetchWeatherData(city);
    if (data) {
        setWeatherData(data);
      } else {
        setError('Failed to fetch weather data. Please try again.'); // Update error state
        setWeatherData(null); // Clear previous weather data if there's an error
      }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
          className="input"
        />
        <button type="submit" className="button">Get Weather</button>
      </form>
      <div className="weatherBox">
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div>
            <h3>Weather in {weatherData.location.name}</h3>
            <p>Temperature: {weatherData.current.temp_c} °C</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
