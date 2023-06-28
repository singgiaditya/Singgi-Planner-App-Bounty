import React, { useEffect, useState } from 'react';

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);

  const fetchWeatherData = async (query) => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=112f0fa2b3f042888d3150153232706&q=${query}`);
      const data = await response.json();
      if (data.error) {
        setError(true);
        setWeatherData(null);
      } else {
        setError(false);
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(true);
      setWeatherData(null);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      const { city } = data;
      setLocation(city);
      fetchWeatherData(city);
    } catch (error) {
      console.error('Error getting current location:', error);
      setError(true);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(location);
  };

  return (
    <div className="weather-widget">
      <div className="location">
        <form onSubmit={handleLocationSubmit}>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
          <button type="submit">Change Location</button>
        </form>
      </div>
      {error ? (
        <div className="location-not-found">Location not found</div>
      ) : weatherData ? (
        <>
          <div className="weather-info">
            <div className="weather-icon">
              <img src={weatherData.current.condition.icon} alt="Weather Icon" />
            </div>
            <div className="temperature">{weatherData.current.temp_c}&deg;C</div>
            <div className="description">{weatherData.current.condition.text}</div>
          </div>
          <div className="weather-details">
            <div>Humidity: {weatherData.current.humidity}%</div>
            <div>Wind Speed: {weatherData.current.wind_kph} km/h</div>
            <div>Precipitation: {weatherData.current.precip_mm} mm</div>
          </div>
        </>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
}
