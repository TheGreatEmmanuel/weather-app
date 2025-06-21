import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";



const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const search = async (city) => {
    if (city == "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      inputRef.current.value = "";
    } catch (error) {
      setWeatherData(null);
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a city name"
          className="input"
          id="city-search"
        />
        <CiSearch
          className="search-icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} className="weather-icon" />
          <div id="all-mid">
            <p className="temperature">{weatherData.temperature}°c</p>
            <p className="location">{weatherData.location}</p>
          </div>
          <div className="weather-data">
            <div className="col">
              <img src="/humidity.svg" alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
             </div>
            <div className="col">
              <img  src="/wind.svg" alt="" /> 
              <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
            
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
