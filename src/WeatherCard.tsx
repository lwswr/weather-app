import * as React from "react";
import { WeatherProps } from "./App";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: 30px;
  color: #49515e;
  padding: 40px;
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const TempBox = styled.div`
  text-align: center;
  font-size: 4rem;
  margin: 25px 50px;
`;

function celciusConvertion(x: number) {
  return x - 273.15;
}

export const WeatherCard = ({
  weatherCardProps,
}: {
  weatherCardProps: WeatherProps;
}) => {
  const celciusTemp = celciusConvertion(weatherCardProps.main.temp).toFixed(0);
  const imageDimension = 200;

  return (
    <Card>
      <img
        src={`http://openweathermap.org/img/wn/${weatherCardProps.weather[0].icon}@2x.png`}
        alt=""
        width={imageDimension}
        height={imageDimension}
      />
      <TempBox>{celciusTemp}°C</TempBox>
      <h3>{weatherCardProps.name}</h3>
      <h4>{weatherCardProps.weather[0].main}</h4>
      <p>Description: {weatherCardProps.weather[0].description}</p>
      <p>Humidity: {weatherCardProps.main.humidity}%</p>
      <p>Wind Speed: {weatherCardProps.wind.speed}mph</p>
    </Card>
  );
};
