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

function extractDate(datetimeString) {
  if (!datetimeString || typeof datetimeString !== 'string') {
    console.error('Invalid datetime string:', datetimeString);
    return null;
  }
  // Split the string by space and take the first part (date)
  return datetimeString.split(' ')[0];
}

function extractTime(datetimeString) {
  if (!datetimeString || typeof datetimeString !== 'string') {
    console.error('Invalid datetime string:', datetimeString);
    return null; // Handle the error
  }
}

const getHistoryWeather = async (req, res) => {
  const { city, localtime } = req.query;
  const date = extractDate(localtime)
  const time = extractTime(localtime)

  try {
    const weatherData = await weatherService.fetchHistoryWeather(city, date);
    res.json(weatherData.forecast.forecastday[0].hour.map(hour => ({
      time: hour.time,   // Get the time
      temp_c: hour.temp_c // Get the temperature in Celsius
    })));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching History weather data', error: error.message });
  }
};



module.exports = {
  getWeather,
  getHistoryWeather
};
