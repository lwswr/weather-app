import * as React from "react";
import styled from "styled-components";
import { ForecastProps } from "./App";

const ForecastList = styled.div`
  display: inline-flex;
`;

const formatNumber = (value: number) => {
  if (value <= 9) {
    return "0" + value;
  } else {
    return value;
  }
};

const incrementDate = (value: number) => {
  const currentDate = new Date();
  const newDate =
    currentDate.getFullYear() +
    "-" +
    formatNumber(currentDate.getMonth()) +
    "-" +
    formatNumber(currentDate.getDate() + value) +
    " 12:00:00";
  return newDate;
};

const firstDay = incrementDate(1);
const secondDay = incrementDate(2);
const thirdDay = incrementDate(3);
const forthDay = incrementDate(4);
const fifthDay = incrementDate(5);

const firstDayString = firstDay.toString();
const secondDayString = secondDay.toString();
const thirdDayString = thirdDay.toString();
const forthDayString = forthDay.toString();
const fifthDayString = fifthDay.toString();

export const ForecastCard = ({
  forecastCardProps,
}: {
  forecastCardProps: ForecastProps;
}) => {
  return (
    <ForecastList>
      <ul>
        <li>{firstDayString}</li>
        <li>{secondDayString}</li>
        <li>{thirdDayString}</li>
        <li>{forthDayString}</li>
        <li>{fifthDayString}</li>
      </ul>
    </ForecastList>
  );
};
