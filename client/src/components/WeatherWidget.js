import React, { useState } from 'react';
import '../styles/WeatherWidget.css'; // Import the CSS file for styling
import { ReactComponent as MySVG } from '../assets/fintek_logo.svg';
import fetchWeatherData from '../api/weatherApi';
import CityWeatherDetails from './CityWeatherDetails';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    

    const data = await fetchWeatherData(city);
    if (data) {
      setWeatherData(data);
    } else {
      setWeatherData(null);
      setError('Failed to fetch weather data. Please try again.'); // Update error state
      setWeatherData(null); // Clear previous weather data if there's an error
    }
  };

  return (
    <div className="weather-widget">
      <div className="widget-body">
        <div className="left-pane">
          <MySVG className="widget-logo" />
          <div className="left-center-pane">
          <p className="widget-description">
            Use our weather<br/>app to see the weather <br/>around the world
          </p>
          <label htmlFor="city-input" className="input-label">
            City Name
          </label>
          <div className="input-container">
            <input
              type="text"
              id="city-input"
              placeholder="Enter city name..."
              value={city}
              onChange={handleCityChange}
              className="text-input"
            />
            <button onClick={handleSubmit} className="input-button">
              Check
            </button>
          </div>
        </div>
        </div>
        
          {weatherData ? (<div className="right-pane">
            <CityWeatherDetails weatherData={weatherData} />
            </div>
          ) : (<div className="right-pane-empty"></div>
          )}
        
      </div>
    </div>
  );
};

export default WeatherWidget;
