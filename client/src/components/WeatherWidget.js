import React, { useState } from 'react';
import '../styles/WeatherWidget.css'; // Import the CSS file for styling
import { ReactComponent as MySVG } from '../assets/fintek_logo.svg';
import {fetchWeatherData, fetchHistoryWeatherData}  from '../api/weatherApi';
import CityWeatherDetails from './CityWeatherDetails';

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString.replace(' ', 'T')); // Convert to ISO format

  const formattedDate = date.toLocaleDateString('en-GB'); // Format date as DD/MM/YYYY
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as HH:MM

  return `${formattedDate.replace(/\//g, '/')} at ${formattedTime}`;
};

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherHoursData, setweatherHoursData] = useState(null);
  const [error, setError] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');   

    const data = await fetchWeatherData(city);
    if (data) {
      const historyData = await fetchHistoryWeatherData(city, data.location.localtime)
      setWeatherData(data);
      setweatherHoursData(historyData)
      setCity('')
    } else {
      setWeatherData(null);
      if(city){
        setError(`Failed to find weather data for ${city}. Please try again.`); // Update error state
      }
      else {
        setError('Please fill in the location')
      }
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="city-input"
              placeholder="Enter city name..."
              value={city}
              onChange={handleCityChange}
              className="text-input"
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
            <CityWeatherDetails weatherData={weatherData} weatherHoursData={weatherHoursData} formatDateTime={formatDateTime}/>
            </div>
          ) : (<div className="right-pane-empty">{error}</div>
          )}
        
      </div>
    </div>
  );
};

export default WeatherWidget;
