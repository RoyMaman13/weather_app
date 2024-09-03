const axios = require('axios');
const config = require('../config/config');

const fetchWeather = async (city) => {
  const response = await axios.get(`${config.weatherApiUrl}?key=${config.weatherApiKey}&q=${city}&aqi=no`);
  return response.data;
};

module.exports = {
  fetchWeather
};
