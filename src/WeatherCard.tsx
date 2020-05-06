import * as React from "react";
import { WeatherProps } from "./App";

export const WeatherCard = ({
  weatherCardProps,
}: {
  weatherCardProps: WeatherProps;
}) => {
  return (
    <ul>
      <h3>Location: {weatherCardProps.name}</h3>
      <p>Overview: {weatherCardProps.weather[0].main}</p>
      <p>Description: {weatherCardProps.weather[0].description}</p>
      <p>Wind Speed: {weatherCardProps.wind.speed}mph</p>
    </ul>
  );
};
