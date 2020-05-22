import * as React from "react";
import styled from "styled-components";
import { Forecast } from "./App";

const ForecastCardStyle = styled.div`
  display: inline-flex;
`;

export const ForecastCard = ({
  forecastCardProps,
}: {
  forecastCardProps: Forecast[];
}) => {
  return (
    <ForecastCardStyle>
      <ul>
        <li>{forecastCardProps[0].main.temp}</li>
      </ul>
    </ForecastCardStyle>
  );
};
