import * as React from "react";
import { ForecastCard } from "./ForecastCard";
import { Forecast } from "./App";

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
    <div>
      <ForecastCard forecastCardProps={dayOneForecast} />
      <ForecastCard forecastCardProps={dayTwoForecast} />
      <ForecastCard forecastCardProps={dayThreeForecast} />
    </div>
  );
};
