import React from 'react';
import '../styles/CityWeatherDetails.css'; 

function extractTime(datetimeString) {
  if (!datetimeString || typeof datetimeString !== 'string') {
    console.error('Invalid datetime string:', datetimeString);
    return null;
  }
  return datetimeString.split(' ')[1] || null;
}

const roundToHour = (localtime) => {
  const [hour] = localtime.split(':');
  return `${hour}:00`;
};

const roundTemp = (temp) => {
  const [roundedTemp] = temp.toString().split('.');
  return roundedTemp;
};


const CityWeatherDetails = ({ weatherData, formatDateTime, forecastData }) => {
  if (!weatherData) {
    return <p>No weather data available</p>;
  }
  
  const { name, country} = weatherData.location;
  const { temp_c, condition, precip_mm, humidity, wind_kph } = weatherData.current;
  const localtime = formatDateTime(weatherData.location.localtime);

  return (
    <div className="weather-details">
      <h2>{name}</h2>
      <h3 className='state-details'>{country}</h3>
      <p>{roundToHour(localtime)}</p>
      <div className="temperature-condition">
        <h1 className="temp">{roundTemp(temp_c)}°</h1>
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
      <span className="value">{roundTemp(wind_kph)} km/h</span>
    </div>
  </div>
</div>
<div className="additional-info">
  <div className="info-row">
    {forecastData.slice(0, 5).map((hourData, index) => (
      <div className="category" key={index}>
        <span>{extractTime(hourData.time)}</span>
        <span className="value">{roundTemp(hourData.temp_c)}°</span>
      </div>
    ))}
  </div>
</div>
</div>

  );
};

export default CityWeatherDetails;
