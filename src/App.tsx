import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchForm } from "./SearchForm";

export type WeatherProps = {
  id: string;
  name: string;
  wind: {
    speed: number;
  };
  weather: {
    description: string;
  };
};

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherProps>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getWeather = (cityReq: string) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityReq}&appid=b46010a9031dddd81c9d4a302cfac47e`
        )
        .then((res) => {
          setWeatherInfo(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    getWeather(search);
  });

  return (
    <div>
      <h1>Weather App</h1>
      <SearchForm
        submit={({ city }) => {
          setSearch(city);
          console.log(city);
        }}
      />
      <ul>
        <h3>Location: {weatherInfo?.name}</h3>
        <p>Wind Speed: {weatherInfo?.wind.speed}mph</p>
        <p>Description:{weatherInfo?.weather.description} (Not Working)</p>
      </ul>
    </div>
  );
}

export default WeatherApp;
