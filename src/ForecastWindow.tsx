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
  dayOneTitle,
  dayTwoTitle,
  dayThreeTitle,
}: {
  dayOneForecast: Forecast[];
  dayTwoForecast: Forecast[];
  dayThreeForecast: Forecast[];
  dayOneTitle: string;
  dayTwoTitle: string;
  dayThreeTitle: string;
}) => {
  return (
    <ForecastPanel>
      <ForecastCard
        forecastCardProps={dayOneForecast}
        forecastCardTitle={dayOneTitle}
      />
      <ForecastCard
        forecastCardProps={dayTwoForecast}
        forecastCardTitle={dayTwoTitle}
      />
      <ForecastCard
        forecastCardProps={dayThreeForecast}
        forecastCardTitle={dayThreeTitle}
      />
    </ForecastPanel>
  );
};
