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

function getNextFiveElements(combinedHourlyData, targetTime) {
  // Find the index where the time matches
  const startIndex = combinedHourlyData.findIndex(item => item.time === targetTime);
  // If the time is found, return the next 5 elements starting from the matching index
  if (startIndex !== -1) {
      return combinedHourlyData.slice(startIndex+1, startIndex + 6);
  } else {
      return []; // Return an empty array if the time is not found
  }
}

function roundToHour(dateTime) {
  const [date, time] = dateTime.split(" ");
  const [hours, minutes] = time.split(":");
  // Return the date with the hour and "00" minutes
  return `${date} ${hours}:00`;
}

const getforecastWeather = async (req, res) => {
  const { city, localtime } = req.query;

  try {
    const weatherData = await weatherService.fetchforecastWeather(city);
    //get today and tomorow forecast
    const hourlyToday = weatherData.forecast.forecastday[0].hour;
    const hourlyTomorowDay = weatherData.forecast.forecastday[1].hour;
    const combinedHourlyData = hourlyToday.concat(hourlyTomorowDay);
    //exclude to the relevent hours
    const fiveElementsData = getNextFiveElements(combinedHourlyData, roundToHour(localtime))
    //shrink to the needed data only
    const timeAndTemp = fiveElementsData.map(item => ({
      time: item.time,
      temp_c: item.temp_c
  }));
    res.json(timeAndTemp)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forecast weather data', error: error.message });
  }
};

module.exports = {
  getWeather,
  getforecastWeather
};
