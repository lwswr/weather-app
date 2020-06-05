import React, { useState, useEffect, useReducer } from "react";
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

// Full Cloud https://images.unsplash.com/photo-1546706872-9c90b8d0c94f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
// Partly Cloudy https://images.unsplash.com/photo-1579461182805-98ac523af8f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2300&q=80
// Full Sun https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2249&q=80

const MainContainer = styled.div`
  font-family: sans-serif;
  font-weight: 100;
  /* needs a method that checks the value of the api response after it's filtered to determine which background image is set */
  background-image: url("https://a-static.besthdwallpaper.com/new-zealand-natural-landscape-wallpaper-3554x1999-2934_53.jpg");
  color: white;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const AppTitle = styled.div`
  font-size: 35px;
  font-weight: lighter;
  padding: 50px 5px 10px 10px;
  letter-spacing: 20px;
`;

// Adds amount of days required to date and sets time to 15:00:00
const incrementDate = (value: number, date = new Date()) => {
  return addDays(setHours(setMinutes(setSeconds(date, 0), 0), 15), value);
};

const firstDay = incrementDate(1);
const secondDay = incrementDate(2);
const thirdDay = incrementDate(3);

const daysOfTheWeek: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

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

export type AuthState = {
  authenticated: boolean;
};

export type AuthEvents =
  | {
      type: "logged in clicked";
    }
  | {
      type: "logged out clicked";
    };

const reducer: React.Reducer<AuthState, AuthEvents> = (state, event) => {
  switch (event?.type) {
    case "logged in clicked": {
      return {
        ...state,
        authenticated: true,
      };
    }
    case "logged out clicked": {
      return {
        ...state,
        authenticated: false,
      };
    }
  }
};

function App() {
  const [state, update] = useReducer(reducer, { authenticated: false });
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

  const checkTimeAndFilter = (day: Date) => {
    return forecastInfo.list.filter(
      (item) =>
        isSameDay(new Date(item.dt_txt), day) &&
        isSameHour(new Date(item.dt_txt), day)
    );
  };

  const resultDays: Forecast[][] = [
    checkTimeAndFilter(firstDay),
    checkTimeAndFilter(secondDay),
    checkTimeAndFilter(thirdDay),
  ];

  return (
    <MainContainer>
      <button
        onClick={() =>
          update({
            type: !state.authenticated
              ? "logged in clicked"
              : "logged out clicked",
          })
        }
      >
        {!state.authenticated ? "login" : "logout"}
      </button>
      {state.authenticated ? (
        <div>
          <AppTitle>WEATHER APP</AppTitle>
          <SearchForm
            submit={({ city }) => {
              setSearchLocation(city);
            }}
          />
          <WeatherCard weatherCardProps={weatherInfo} />
          <ForecastWindow forecasts={resultDays} weekdays={weekdays} />
        </div>
      ) : null}
    </MainContainer>
  );
}

export default App;
