
import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const date = new Date();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const onchangeInput = (event) => {
    setInput(event.target.value);
  };

  const search = (event) => {
    if (event.key === 'Enter') {
      setInput('');
      setWeather({ ...weather, loading: true });
      axios
        .get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: input,
            units: 'metric',
            appid: '8c8795c57bbf2210b4cf00992b5fc7f5',
          },
        })
        .then((res) => {
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((err) => {
          setWeather({ ...weather, data: {}, error: true });
        });
    }
  };

  return (
    <div>
      <div className="App">
        <div className="weather-app">
          <div className="city-search">
            <input
              type="text"
              className="city"
              placeholder="Enter City Name ..."
              value={input}
              onChange={onchangeInput}
              onKeyDown={search}
            />
          </div>
          {weather.loading && (
            <TailSpin color="red" height={70} width={70} />
          )}
          {weather.error && (
            <div className="error-message">
              <span>City not Found</span>
            </div>
          )}
          {weather.data && weather.data.main && (
            <div>
               <div className="city-name">
                <h2>
                  {weather.data.name} ,
                  <span>{weather.data.sys.country}</span>
                </h2>
              </div>
              <div className="date">
                <span>{toDate()}</span>
              </div>
              <div className="icon-temp">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt=""
                />
                {Math.round(weather.data.main.temp)}
                <sup className="deg">*</sup>C
              </div>
              <div className="des-wind">
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed: {weather.data.wind.speed}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;





