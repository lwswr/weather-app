import * as React from "react";
import styled from "styled-components";
import { Forecast } from "./App";

const ForecastCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px 20px;
  border: 2px solid white;
  border-radius: 20px;
`;

const ForecastCardIcon = styled.img``;

const ForecastCardTitle = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: lighter;
`;

const ForecastCardTemp = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: lighter;
  margin-top: 10px;
`;

const celciusConvertion = (x: number) => {
  return x - 273.15;
};

export const ForecastCard = ({
  forecastCardProps,
  forecastCardTitle,
}: {
  forecastCardProps: Forecast[];
  forecastCardTitle: string;
}) => {
  return (
    <ForecastCardStyle>
      <ForecastCardTitle>{forecastCardTitle}</ForecastCardTitle>
      <ForecastCardIcon
        src={`http://openweathermap.org/img/wn/${forecastCardProps[0].weather[0].icon}@2x.png`}
        alt=""
      />
      <ForecastCardTemp>
        {celciusConvertion(forecastCardProps[0].main.temp).toFixed(0)}°C
      </ForecastCardTemp>
    </ForecastCardStyle>
  );
};
