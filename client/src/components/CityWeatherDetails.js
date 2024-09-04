import React from 'react';
import '../styles/CityWeatherDetails.css'; // Make sure to update the CSS file accordingly

function extractTime(datetimeString) {
  if (!datetimeString || typeof datetimeString !== 'string') {
    console.error('Invalid datetime string:', datetimeString);
    return null; // Handle the error
  }
  return datetimeString.split(' ')[1] || null;
}

const roundToHour = (localtime) => {
  const [hour] = localtime.split(':');
  return `${hour}:00`;
};

const CityWeatherDetails = ({ weatherData, formatDateTime, weatherHoursData }) => {
  if (!weatherData) {
    return <p>No weather data available</p>;
  }
  
  const { name, country} = weatherData.location;
  const { temp_c, condition, precip_mm, humidity, wind_kph } = weatherData.current;
  const localtime = formatDateTime(weatherData.location.localtime);

  return (
    <div className="weather-details">
      <h2>{name}</h2>
      <h3>{country}</h3>
      <p>{roundToHour(localtime)}</p>
      <div className="temperature-condition">
        <h1 className="temp">{temp_c}°C</h1>
        <h2>{condition.text}</h2>
      </div>
      
      <div className="additional-info">
  <div className="info-row">
    <div className="category">
      <span>Precipitation:</span>
      <span className="value">{precip_mm} mm</span>
    </div>
    <div className="category">
      <span>Humidity:</span>
      <span className="value">{humidity}%</span>
    </div>
    <div className="category">
      <span>Wind:</span>
      <span className="value">{wind_kph} kph</span>
    </div>
  </div>
</div>
<div className="additional-info">
  <div className="info-row">
    {weatherHoursData.slice(0, 5).map((hourData, index) => (
      <div className="category" key={index}>
        <span>{extractTime(hourData.time)}</span>
        <span className="value">{hourData.temp_c}°</span>
      </div>
    ))}
  </div>
</div>
</div>

  );
};

export default CityWeatherDetails;
