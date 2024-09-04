export const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`http://localhost:5001/api/weather?city=${city}`);
      
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null; // Return null in case of error
    }
  };

  export const fetchHistoryWeatherData = async (city, localtime) => {
    try {
      const response = await fetch(`http://localhost:5001/api/HistoryWeather?city=${city}&localtime=${localtime}`);
      
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null; // Return null in case of error
    }
  };
  