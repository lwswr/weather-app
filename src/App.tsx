import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { SearchForm } from "./SearchForm";
import { WeatherCard } from "./WeatherCard";
import { ForecastWindow } from "./ForecastWindow";
import {
  isSameDay,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  getDay,
} from "date-fns";
import { isSameHour } from "date-fns/esm";

const MainContainer = styled.div`
  font-family: sans-serif;
  font-weight: 100;
  background-image: url("https://www.oysterworldwide.com/panel/wp-content/uploads/2018/11/Destination_New_Zealand.jpg");
  color: white;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const H1 = styled.h1`
  font-size: 35px;
  font-weight: 1;
  letter-spacing: 20px;
`;

// Adds amount of days required to date and sets time to 15:00:00
const incrementDate = (value: number, date = new Date()) => {
  return addDays(setHours(setMinutes(setSeconds(date, 0), 0), 15), value);
};

// Tomorrow
const firstDay = incrementDate(1);
// Day after Tomorrow
const secondDay = incrementDate(2);
// 3 days from now
const thirdDay = incrementDate(3);

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const weekdays: string[] = [
  daysOfTheWeek[getDay(firstDay)],
  daysOfTheWeek[getDay(secondDay)],
  daysOfTheWeek[getDay(thirdDay)],
];

// type declarations
export type WeatherResponse = {
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

export type ForecastResponse = {
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
function WeatherApp() {
  // local variables
  const [forecastInfo, setForecastInfo] = useState<
    ForecastResponse | undefined
  >(undefined);
  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | undefined>(
    undefined
  );
  const [searchLocation, setSearchLocation] = useState("London");

  // call to bouth APIs
  useEffect(() => {
    // function to get Current Weather API using cityRequest prop assigned from input field
    const getWeather = (cityRequest: string) => {
      axios
        .get<WeatherResponse>(
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
        .get<ForecastResponse>(
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

  // because we said that our state can be undefined | T (whatever value when it's not defined)
  // we need to check if it is defined!
  if (!forecastInfo || !weatherInfo) return null;

  const resultDay1 = forecastInfo.list.filter(
    (item) =>
      isSameDay(new Date(item.dt_txt), firstDay) &&
      isSameHour(new Date(item.dt_txt), firstDay)
  );
  const resultDay2 = forecastInfo.list.filter(
    (item) =>
      isSameDay(new Date(item.dt_txt), secondDay) &&
      isSameHour(new Date(item.dt_txt), secondDay)
  );
  const resultDay3 = forecastInfo.list.filter(
    (item) =>
      isSameDay(new Date(item.dt_txt), thirdDay) &&
      isSameHour(new Date(item.dt_txt), thirdDay)
  );
  return (
    <MainContainer>
      <H1> • WEATHER • APP • </H1>
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
        weekdays={weekdays}
      />
    </MainContainer>
  );
}

export default WeatherApp;
