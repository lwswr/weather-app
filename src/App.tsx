import React, { useEffect, useReducer } from "react";
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
import { getWeather, getForecast } from "./API";

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

const LoginButton = styled.button`
  font-size: 20px;
  letter-spacing: 5px;
  font-weight: 100;
  border-radius: 15px;
  border: 2px solid white;
  padding: 12px 20px;
  background: rgb(38, 53, 64, 0.7);
  color: white;
  transition: 0.2s ease-in-out;
  &:hover {
    background: white;
    color: rgb(38, 53, 64);
  }
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

export type AppState = {
  authenticated: boolean;
  city: string;
  weatherResponse: WeatherResponse | undefined;
  forecastResponse: ForecastResponse | undefined;
};

const initialState: AppState = {
  authenticated: false,
  city: "London",
  weatherResponse: undefined,
  forecastResponse: undefined,
};

export type AppEvents =
  | {
      type: "logged in clicked";
    }
  | {
      type: "logged out clicked";
    }
  | {
      type: "search location submitted";
      payload: { city: string };
    }
  | {
      type: "weather response set";
      weatherPayload: WeatherResponse;
    }
  | {
      type: "forecast response set";
      forecastPayload: ForecastResponse;
    };

export const reducer: React.Reducer<AppState, AppEvents> = (state, event) => {
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
    case "search location submitted": {
      return {
        ...state,
        city: event.payload.city,
      };
    }
    case "weather response set": {
      return {
        ...state,
        weatherResponse: event.weatherPayload,
      };
    }
    case "forecast response set": {
      return {
        ...state,
        forecastResponse: event.forecastPayload,
      };
    }
  }
};

function App() {
  const [state, update] = useReducer(reducer, initialState);

  useEffect(() => {
    async function callToAPIs() {
      try {
        const [wResponse, fResponse] = await Promise.all([
          getWeather(state.city),
          getForecast(state.city),
        ]);
        update({
          type: "weather response set",
          weatherPayload: wResponse,
        });
        update({
          type: "forecast response set",
          forecastPayload: fResponse,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (state.city !== null) {
      callToAPIs();
    }
  }, [state.city]);

  // because we said that our state can be undefined | T (whatever value when it's not defined)
  // we need to check if it is defined!
  if (!state.weatherResponse || !state.forecastResponse) return null;

  // Pass the state.forecastResponse in as an argument to the function
  const checkTimeAndFilter = (day: Date, res: ForecastResponse) => {
    return res.list.filter(
      (item: { dt_txt: string | number | Date }) =>
        isSameDay(new Date(item.dt_txt), day) &&
        isSameHour(new Date(item.dt_txt), day)
    );
  };

  const resultDays: Forecast[][] = [
    checkTimeAndFilter(firstDay, state.forecastResponse),
    checkTimeAndFilter(secondDay, state.forecastResponse),
    checkTimeAndFilter(thirdDay, state.forecastResponse),
  ];

  return (
    <MainContainer>
      <AppTitle>WEATHER APP</AppTitle>
      <LoginButton
        onClick={() =>
          update({
            type: !state.authenticated
              ? "logged in clicked"
              : "logged out clicked",
          })
        }
      >
        {!state.authenticated ? "Log in" : "Log out"}
      </LoginButton>
      {state.authenticated ? (
        <div>
          <SearchForm
            submit={({ city }) => {
              update({ type: "search location submitted", payload: { city } });
            }}
          />
          <WeatherCard weatherCardProps={state.weatherResponse} />
          <ForecastWindow forecasts={resultDays} weekdays={weekdays} />
        </div>
      ) : null}
    </MainContainer>
  );
}

export default App;
