import * as React from "react";
import { WeatherResponse } from "./App";
import styled from "styled-components";

const Card = styled.div`
  background: rgb(164, 176, 189, 0.7);
  border-radius: 50px 50px 5px 5px;
  color: rgb(38, 53, 64);
  padding: 5px;
  margin: 0px auto;
  width: 50%;
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const MainInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
`;
const TempBox = styled.div`
  text-align: center;
  font-size: 5rem;
  margin: 60px 0px;
`;

const CityName = styled.div`
  text-align: center;
  font-size: 25px;
  margin: 20px;
`;

const Description = styled.div`
  text-align: center;
  font-size: 25px;
  margin: 20px;
`;

const IconBox = styled.img`
  margin: auto;
`;

const ItemInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 3px;
  margin-bottom: 20px;
`;

const ItemInfoTitle = styled.div`
  font-size: 15px;
  text-align: center;
  letter-spacing: 5px;
  margin: 20px;
`;

const ItemInfoData = styled.div`
  font-size: 25px;
  text-align: center;
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
        <MainInfoColumn>
          <TempBox>{celciusTemp}°C</TempBox>
          <CityName>
            {weatherCardProps.name}, {weatherCardProps.sys.country}
          </CityName>
        </MainInfoColumn>
        <MainInfoColumn>
          <IconBox
            src={`http://openweathermap.org/img/wn/${weatherCardProps.weather[0].icon}@2x.png`}
            alt=""
            width={imageDimension}
            height={imageDimension}
          />
          <Description>{weatherCardProps.weather[0].description}</Description>
        </MainInfoColumn>
        <MainInfoColumn>
          <ItemInfoBox>
            <ItemInfoTitle>HUMIDITY</ItemInfoTitle>
            <ItemInfoData>{weatherCardProps.main.humidity}%</ItemInfoData>
          </ItemInfoBox>
          <ItemInfoBox>
            <ItemInfoTitle>WIND SPEED</ItemInfoTitle>
            <ItemInfoData>{weatherCardProps.wind.speed}mph</ItemInfoData>
          </ItemInfoBox>
        </MainInfoColumn>
      </MainInfo>
    </Card>
  );
};
