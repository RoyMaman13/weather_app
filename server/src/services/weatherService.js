const axios = require('axios');
const config = require('../config/config');

const fetchWeather = async (city) => {
  const response = await axios.get(`${config.weatherApiUrl}current.json?key=${config.weatherApiKey}&q=${city}&aqi=no`);
  return response.data;
};

const fetchHistoryWeather = async (city, date) => {
  const response = await axios.get(`${config.weatherApiUrl}history.json?key=${config.weatherApiKey}&q=${city}&dt=${date}`);
  return response.data;
};

module.exports = {
  fetchWeather,
  fetchHistoryWeather
};
