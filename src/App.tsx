import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchForm } from "./SearchForm";
import { WeatherCard } from "./WeatherCard";
import styled from "styled-components";

const MainContainer = styled.div`
  font-family: sans-serif;
  font-weight: 100;
  background: #49515e;
  color: white;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 100;
`;

export type WeatherProps = {
  coord: { lon: number; lat: number };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
};

const initialWeatherInfoObj: WeatherProps = {
  coord: { lon: 0, lat: 0 },
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
  base: "",
  main: {
    temp: 0,
    pressure: 0,
    humidity: 0,
    temp_min: 0,
    temp_max: 0,
  },
  visibility: 0,
  wind: { speed: 0, deg: 0 },
  clouds: { all: 0 },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    message: 0,
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  id: 0,
  name: "",
  cod: 0,
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
    if (searchLocation !== "") {
      getWeather(searchLocation);
    }
  }, [searchLocation]);

  return (
    <MainContainer>
      <H1>WEATHER APP</H1>
      <SearchForm
        submit={({ city }) => {
          setSearchLocation(city);
        }}
      />
      <WeatherCard weatherCardProps={weatherInfo} />
    </MainContainer>
  );
}

export default WeatherApp;
