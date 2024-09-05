export const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`http://localhost:5001/api/weather?city=${city}`);
      
      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }  
      // Parse the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  export const fetchforecastData = async (city, localtime) => {
    try {
      const response = await fetch(`http://localhost:5001/api/forecastData?city=${city}&localtime=${localtime}`);
      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }  
      // Parse the JSON response
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };
  