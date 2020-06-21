import axios from "axios";
import { WeatherResponse, ForecastResponse } from "./App";

// pass in the search location as a prop
export const getWeather = (search: string) => {
  return axios
    .get<WeatherResponse>(
      `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b46010a9031dddd81c9d4a302cfac47e`
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return console.log("error", err);
    });
};

export const getForecast = (search: string) => {
  axios
    .get<ForecastResponse>(
      `http://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=b46010a9031dddd81c9d4a302cfac47e`
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return console.log("error", err);
    });
};
