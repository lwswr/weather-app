import * as React from "react";
import { WeatherResponse } from "./App";
import styled from "styled-components";

const Card = styled.div`
  background: rgb(38, 53, 64, 0.9);
  border-radius: 50px 50px 5px 5px;
  color: white;
  padding: 5px;
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const TempBox = styled.div`
  text-align: center;
  font-size: 6rem;
  margin: 5px 10px;
`;

const IconBox = styled.img`
  margin: auto;
`;

function celciusConvertion(x: number) {
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
      <MainInfo>
        <IconBox
          src={`http://openweathermap.org/img/wn/${weatherCardProps.weather[0].icon}@2x.png`}
          alt=""
          width={imageDimension}
          height={imageDimension}
        />
        <TempBox>{celciusTemp}°C</TempBox>
      </MainInfo>

      <h3>{weatherCardProps.name}</h3>
      <p>{weatherCardProps.weather[0].description}</p>
      <p>Humidity: {weatherCardProps.main.humidity}%</p>
      <p>Wind Speed: {weatherCardProps.wind.speed}mph</p>
    </Card>
  );
};
