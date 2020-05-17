import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchForm } from "./SearchForm";
import { WeatherCard } from "./WeatherCard";
import { ForecastCard } from "./ForecastCard";
import styled from "styled-components";

const MainContainer = styled.div`
  font-family: sans-serif;
  font-weight: 100;
  background: #49515e;
  color: white;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 100;
`;

// type declarations
export type WeatherProps = {
  coord: { lon: number; lat: number };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
};

export type ForecastProps = {
  list: [
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    },
    {
      main: { temp: number };
      weather: [{ id: number; icon: string }];
      dt_txt: string;
    }
  ];
};

// initialising properties
const initialWeatherInfoObj: WeatherProps = {
  coord: { lon: 0, lat: 0 },
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
  base: "",
  main: {
    temp: 0,
    pressure: 0,
    humidity: 0,
    temp_min: 0,
    temp_max: 0,
  },
  visibility: 0,
  wind: { speed: 0, deg: 0 },
  clouds: { all: 0 },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    message: 0,
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  id: 0,
  name: "",
  cod: 0,
};

const initialForecastInfoObj: ForecastProps = {
  list: [
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
    {
      main: { temp: 0 },
      weather: [{ id: 0, icon: "" }],
      dt_txt: "",
    },
  ],
};

function WeatherApp() {
  // local variables
  const [forecastInfo, setForecastInfo] = useState(initialForecastInfoObj);
  const [weatherInfo, setWeatherInfo] = useState(initialWeatherInfoObj);
  const [searchLocation, setSearchLocation] = useState("");

  // call to bouth APIs
  useEffect(() => {
    // function to get Current Weather API using cityRequest prop assigned from input field
    const getWeather = (cityRequest: string) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityRequest}&appid=b46010a9031dddd81c9d4a302cfac47e`
        )
        .then((response) => {
          setWeatherInfo(response.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    // function to get 5 day 3 hourly forecast API using cityRequest prop assigned from input field
    const getForecast = (cityRequest: string) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${cityRequest}&appid=b46010a9031dddd81c9d4a302cfac47e`
        )
        .then((response) => {
          setForecastInfo(response.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    if (searchLocation !== "") {
      // Execute both calls
      getWeather(searchLocation);
      getForecast(searchLocation);
    }
  }, [searchLocation]);

  return (
    <MainContainer>
      <H1>WEATHER APP</H1>
      <SearchForm
        submit={({ city }) => {
          setSearchLocation(city);
        }}
      />
      <WeatherCard weatherCardProps={weatherInfo} />
      <ForecastCard forecastCardProps={forecastInfo} />
    </MainContainer>
  );
}

export default WeatherApp;
