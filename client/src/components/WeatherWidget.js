import React, { useState } from 'react';
import '../styles/WeatherWidget.css';
import { ReactComponent as MySVG } from '../assets/fintek_logo.svg';
import {fetchWeatherData, fetchforecastData}  from '../api/weatherApi';
import CityWeatherDetails from './CityWeatherDetails';

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString.replace(' ', 'T'));
  const formattedDate = date.toLocaleDateString('en-GB');
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${formattedDate.replace(/\//g, '/')} at ${formattedTime}`;
};

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setforecastData] = useState(null);
  const [error, setError] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = await fetchWeatherData(city);

    if (data) {
      const forecastData = await fetchforecastData(city, data.location.localtime)
      setWeatherData(data);
      setforecastData(forecastData)
      setCity('')
    } else {
        setWeatherData(null);
        setforecastData(null)
        if(city){
          setError(`Failed to find weather data for ${city}. Please try again.`);
        }
        else {
          setError('Please enter the required location.')
        }
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="city-input"
              placeholder="Enter city name..."
              value={city}
              onChange={handleCityChange}
              className="text-input"
              maxLength={40}
            />
            <button type="submit" className="input-button">
              Check
            </button>
            </form>
          </div>
          {weatherData ? (<div className='latidude' >
                latitude: {weatherData.location.lat} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; longitude: {weatherData.location.lon}<br/>
                accurate to: {formatDateTime(weatherData.location.localtime)}
            </div>
          ) :(<p/>)}
        </div>        
        </div>      
          {weatherData ? (<div className="right-pane">
            <CityWeatherDetails weatherData={weatherData} forecastData={forecastData} formatDateTime={formatDateTime}/>
            </div>
          ) : (<div className="right-pane-empty">{error}</div>
          )}
        
      </div>
    </div>
  );
};

export default WeatherWidget;
