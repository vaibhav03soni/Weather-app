const getBackgroundImage = (description) => {
    switch (description) {
      case 'clear sky':
        return 'url(/sunny.jpg)';
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return 'url(/cloudy.jpg)';
      case 'rain':
      case 'shower rain':
        return 'url(/rainy.jpg)';
      case 'snow':
        return 'url(/snowy.jpg)';
      default:
        return 'url(/default.jpg)';
    }
  };
  
  const Appi = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('New York');
  
    const backgroundImageStyle = {
      backgroundImage: weatherData
        ? getBackgroundImage(weatherData.weather[0].description)
        : 'url(/default.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  
    return (
      <div style={backgroundImageStyle}>
        <div className="app">
          <h1>Weather App</h1>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city"
          />
          {weatherData ? (
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
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  };
  