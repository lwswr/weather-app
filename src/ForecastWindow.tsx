import * as React from "react";
import { ForecastCard } from "./ForecastCard";
import { Forecast } from "./App";
import styled from "styled-components";

const ForecastPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 15px auto;
  width: 50%;
  background: rgb(38, 53, 64, 0.9);
  border-radius: 5px 5px 50px 50px;
  padding: 5px;
`;

export const ForecastWindow = ({
  forecasts,
  weekdays,
}: {
  forecasts: Forecast[][];
  weekdays: string[];
}) => {
  return (
    <ForecastPanel>
      <ForecastCard
        forecastCardProps={forecasts[0]}
        forecastCardTitle={weekdays[0]}
      />
      <ForecastCard
        forecastCardProps={forecasts[1]}
        forecastCardTitle={weekdays[1]}
      />
      <ForecastCard
        forecastCardProps={forecasts[2]}
        forecastCardTitle={weekdays[2]}
      />
    </ForecastPanel>
  );
};
