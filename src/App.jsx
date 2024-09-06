import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '89ad215c880fedc814320f0f7e554360'; // Replace with your actual OpenWeatherMap API key

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Indore');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        setError('');
      } catch (err) {
        setError('City not found');
        setWeatherData(null);
      }
      setIsLoading(false);
    };

    fetchWeather();
  }, [location]);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="app">
      <h1> Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="Enter city"
      />
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      ) : (
        <p>Enter a city to get weather information.</p>
      )}
    </div>
  );
};

export default App;
