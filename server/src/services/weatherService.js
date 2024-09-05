const axios = require('axios');
const config = require('../config/config');

const fetchWeather = async (city) => {
  const response = await axios.get(`${config.weatherApiUrl}current.json?key=${config.weatherApiKey}&q=${city}&aqi=no`);
  return response.data;
};

const fetchforecastWeather = async (city) => {
  const response = await axios.get(`${config.weatherApiUrl}forecast.json?key=${config.weatherApiKey}&q=${city}&days=2&aqi=no&alerts=no`);
  return response.data;
};

module.exports = {
  fetchWeather,
  fetchforecastWeather
};
