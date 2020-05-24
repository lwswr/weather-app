import * as React from "react";
import { ForecastCard } from "./ForecastCard";
import { Forecast } from "./App";
import styled from "styled-components";

const ForecastPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 15px auto;
  width: 50%;
  background: rgb(38, 53, 64, 0.9);
  border-radius: 5px 5px 50px 50px;
  padding: 5px;
`;

export const ForecastWindow = ({
  dayOneForecast,
  dayTwoForecast,
  dayThreeForecast,
}: {
  dayOneForecast: Forecast[];
  dayTwoForecast: Forecast[];
  dayThreeForecast: Forecast[];
}) => {
  return (
    <ForecastPanel>
      <ForecastCard forecastCardProps={dayOneForecast} />
      <ForecastCard forecastCardProps={dayTwoForecast} />
      <ForecastCard forecastCardProps={dayThreeForecast} />
    </ForecastPanel>
  );
};
