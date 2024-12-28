import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);

  function getWeather() {
    const apiKey = 'b4917c1da7428a7e6a3f47d4f75df833';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) { // Ensure data is valid
          const weather = {
            location: `Weather in ${data.name}`,
            temperature: `Temperature: ${Math.round(data.main.temp)} °C`,
            feelsLike: `Feels Like: ${Math.round(data.main.feels_like)} °C`,
            humidity: `Humidity: ${data.main.humidity}%`,
            wind: `Wind: ${data.wind.speed} km/h`,
            condition: `Weather Condition: ${data.weather[0].description}`,
          };
          setWeatherInfo(weather);
        } else {
          setWeatherInfo({ error: `City not found. Please try again.` });
        }
      })
      .catch((error) => {
        setWeatherInfo({ error: `Error fetching data: ${error.message}` });
      });
  }

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get weather</button>
      {weatherInfo && (
        <div className="weather-info">
          {weatherInfo.error ? (
            <p>{weatherInfo.error}</p>
          ) : (
            <>
              <h3>{weatherInfo.location}</h3>
              <p>{weatherInfo.temperature}</p>
              <p>{weatherInfo.feelsLike}</p>
              <p>{weatherInfo.humidity}</p>
              <p>{weatherInfo.wind}</p>
              <p>{weatherInfo.condition}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
