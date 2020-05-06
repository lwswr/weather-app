import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchForm } from "./SearchForm";
import { WeatherCard } from "./WeatherCard";

export type WeatherProps = {
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  wind: {
    speed: number;
  };
  id: string;
  name: string;
};

const initialWeatherInfoObj: WeatherProps = {
  weather: [
    {
      main: "",
      description: "",
    },
  ],
  wind: {
    speed: 0,
  },
  id: "",
  name: "",
};

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(initialWeatherInfoObj);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const getWeather = (cityRequest: string) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityRequest}&appid=b46010a9031dddd81c9d4a302cfac47e`
        )
        .then((res) => {
          setWeatherInfo(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    getWeather(searchLocation);
  }, [searchLocation]);

  return (
    <div>
      <h1>Weather App</h1>
      <SearchForm
        submit={({ city }) => {
          setSearchLocation(city);
        }}
      />
      <WeatherCard weatherCardProps={weatherInfo} />
    </div>
  );
}

export default WeatherApp;
