import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchForm } from "./SearchForm";
import { WeatherCard } from "./WeatherCard";
import { ForecastWindow } from "./ForecastWindow";
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

const formatNumber = (value: number) => {
  if (value <= 9) {
    return "0" + value;
  } else {
    return value;
  }
};

const incrementDate = (value: number) => {
  const currentDate = new Date();
  const newDate =
    currentDate.getFullYear() +
    "-" +
    formatNumber(currentDate.getMonth() + 1) +
    "-" +
    formatNumber(currentDate.getDate() + value) +
    " 12:00:00";
  return newDate;
};

const firstDay = incrementDate(1);
const secondDay = incrementDate(2);
const thirdDay = incrementDate(3);

const firstDayString = firstDay.toString();
const secondDayString = secondDay.toString();
const thirdDayString = thirdDay.toString();

// type declarations
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

export type Forecast = {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: { all: number };
  wind: { speed: number; deg: number };
  snow: {};
  sys: { pod: string };
  dt_txt: string;
};

export type ForecastProps = {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
  };
};

// initialising properties
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

const initialForecastDataObj: Forecast = {
  dt: 0,
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    sea_level: 0,
    grnd_level: 0,
    humidity: 0,
    temp_kf: 0,
  },
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
  clouds: { all: 0 },
  wind: { speed: 0, deg: 0 },
  snow: {},
  sys: { pod: "" },
  dt_txt: "",
};

const initialForecastObj: ForecastProps = {
  cod: "",
  message: 0,
  cnt: 0,
  list: [initialForecastDataObj],
  city: {
    id: 0,
    name: "",
    coord: { lat: 0, lon: 0 },
    country: "",
  },
};

function WeatherApp() {
  // local variables
  const [forecastInfo, setForecastInfo] = useState(initialForecastObj);
  const [weatherInfo, setWeatherInfo] = useState(initialWeatherInfoObj);
  const [searchLocation, setSearchLocation] = useState("");

  // call to bouth APIs
  useEffect(() => {
    // function to get Current Weather API using cityRequest prop assigned from input field
    const getWeather = (cityRequest: string) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityRequest}&appid=b46010a9031dddd81c9d4a302cfac47e`
        )
        .then((response) => {
          setWeatherInfo(response.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    // function to get 5 day 3 hourly forecast API using cityRequest prop assigned from input field
    const getForecast = (cityRequest: string) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${cityRequest}&appid=b46010a9031dddd81c9d4a302cfac47e`
        )
        .then((response) => {
          setForecastInfo(response.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    if (searchLocation !== "") {
      // Execute both calls
      getWeather(searchLocation);
      getForecast(searchLocation);
    }
  }, [searchLocation]);

  const resultDay1 = forecastInfo.list.filter(
    (item) => item.dt_txt === firstDayString
  );

  const resultDay2 = forecastInfo.list.filter(
    (item) => item.dt_txt === secondDayString
  );

  const resultDay3 = forecastInfo.list.filter(
    (item) => item.dt_txt === thirdDayString
  );

  return (
    <MainContainer>
      <H1>WEATHER APP</H1>
      <SearchForm
        submit={({ city }) => {
          setSearchLocation(city);
        }}
      />

      <WeatherCard weatherCardProps={weatherInfo} />
      <ForecastWindow
        dayOneForecast={resultDay1}
        dayTwoForecast={resultDay2}
        dayThreeForecast={resultDay3}
      />
    </MainContainer>
  );
}

export default WeatherApp;
