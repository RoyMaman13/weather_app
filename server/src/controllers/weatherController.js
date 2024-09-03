const weatherService = require('../services/weatherService');

const getWeather = async (req, res) => {
  const { city } = req.query;

  try {
    const weatherData = await weatherService.fetchWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error: error.message });
  }
};

module.exports = {
  getWeather
};
