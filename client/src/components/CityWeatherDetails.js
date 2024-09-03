import React from 'react';
import '../styles/CityWeatherDetails.css'; // Make sure to update the CSS file accordingly

const CityWeatherDetails = ({ weatherData, formatDateTime }) => {
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
      <p>{localtime}</p>
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
        <div className="category">
            <span>16:00</span>
            <span className="value">12°</span>
        </div>
        <div className="category">
            <span>17:00</span>
            <span className="value">15°</span>
        </div>
        <div className="category">
            <span>18:00</span>
            <span className="value">14°</span>
        </div>
        <div className="category">
            <span>19:00</span>
            <span className="value">12°</span>
        </div>
        <div className="category">
            <span>20:00</span>
            <span className="value">11°</span>
        </div>
    </div>

</div>
</div>

  );
};

export default CityWeatherDetails;
