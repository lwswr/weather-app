import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [searchBuffer, setSearchBuffer] = useState("");

  useEffect(() => {
    const getWeather = (city: string) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b46010a9031dddd81c9d4a302cfac47e`
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
      <form
        action="submit"
        onSubmit={(event) => {
          event.preventDefault();
          setSearch(searchBuffer);
        }}
      >
        <input
          type="text"
          placeholder="Enter a destination"
          value={searchBuffer}
          onChange={(event) => setSearchBuffer(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <h1>{search}</h1>
      <h1>Weather App</h1>
      <ul>
        <h3>Location: {weatherInfo?.name}</h3>
        <p>Wind Speed: {weatherInfo?.wind.speed}mph</p>
        <p>{weatherInfo?.weather.description}</p>
      </ul>
    </div>
  );
}

export default WeatherApp;
