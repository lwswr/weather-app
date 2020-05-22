import * as React from "react";
import { WeatherResponse } from "./App";
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

const IconBox = styled.img`
  margin: auto;
`;

export function celciusConvertion(x: number) {
  return x - 273.15;
}

export const WeatherCard = ({
  weatherCardProps,
}: {
  weatherCardProps: WeatherResponse;
}) => {
  const celciusTemp = celciusConvertion(weatherCardProps.main.temp).toFixed(0);
  const imageDimension = "200";

  return (
    <Card>
      <IconBox
        src={`http://openweathermap.org/img/wn/${weatherCardProps.weather[0].icon}@2x.png`}
        alt=""
        width={imageDimension}
        height={imageDimension}
      />
      <TempBox>{celciusTemp}°C</TempBox>
      <h3>{weatherCardProps.name}</h3>
      <p>{weatherCardProps.weather[0].description}</p>
      <p>Humidity: {weatherCardProps.main.humidity}%</p>
      <p>Wind Speed: {weatherCardProps.wind.speed}mph</p>
    </Card>
  );
};
