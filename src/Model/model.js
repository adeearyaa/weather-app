import { loadCurrentWeather } from "../View/currentWeather";

export class Weather {
  static currentWeather = null;
  static threeDayWeatherForecast = null;
  static todaysHourlyWeather = null;
  static currentWeatherAnimation = null;
}

export async function retrieveWeather(region) {
  try {
    const retrievedData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${region}&days=3&key=85039c63a5264c41b0363709241801`,
      {
        mode: "cors",
      }
    );
    const weatherData = await retrievedData.json();
    let location = weatherData.location;
    let current = weatherData.current;
    let forecast = weatherData.forecast;
    console.log(weatherData);
    currentWeather(location, current);
    threeDayWeather(forecast);
    hourlyWeather(location, forecast);
    await weatherAnimation(current);
  } catch (error) {
    throw error;
  }
}

const currentWeather = (location, current) => {
  let cityAndCountry = `${location.name},${location.country}`;
  let [date, time] = location.localtime.split(" ");
  let temperature = String(current.temp_c);
  let description = current.condition.text;
  let day = getDayOfWeek(date);
  let weatherIcon = current.condition.icon;
  Weather.currentWeather = {
    cityAndCountry,
    date,
    time,
    temperature,
    description,
    day,
    weatherIcon,
  };
};

const hourlyWeather = (location, forecast) => {
  const combinedHours = [
    ...forecast.forecastday[0].hour,
    ...forecast.forecastday[1].hour,
  ];
  const localTime = location.localtime.split(" ")[1];
  const hour = +localTime.split(":")[0];
  const todayForecast = combinedHours.slice(hour, hour + 24);
  let time = [];
  let icons = [];
  let temp = [];
  for (let i = 0; i < todayForecast.length; i++) {
    time.push(todayForecast[i].time.split(" ")[1]);
    icons.push(todayForecast[i].condition.icon);
    temp.push(todayForecast[i].temp_c);
  }
  Weather.todaysHourlyWeather = { time, icons, temp };
};

const threeDayWeather = (forecast) => {
  let threeDaysForecast = forecast.forecastday;
  let minTemp = [];
  let maxTemp = [];
  let icons = [];
  let dayNames = [];
  for (let i = 0; i < threeDaysForecast.length; i++) {
    minTemp.push(threeDaysForecast[i].day.mintemp_c);
    maxTemp.push(threeDaysForecast[i].day.maxtemp_c);
    icons.push(threeDaysForecast[i].day.condition.icon);
    let date = threeDaysForecast[i].date;
    dayNames.push(getDayOfWeek(date));
  }
  Weather.threeDayWeatherForecast = { minTemp, maxTemp, icons, dayNames };
};

const getDayOfWeek = (dateString) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  return days[date.getDay()];
};

async function weatherAnimation(currentWeather) {
  const weatherCode = convertWeatherCode(currentWeather.condition);
  console.log(weatherCode);
  const baseURL = 'https://api.giphy.com/v1/gifs';
  const apiKey = 'api_key=SIYpuOY48tQbeMJ1gn4LaYo9pk9eEqGp';
  const gifID = {
    sunny: '27bTd0Bz1ArO6Nu4fE',
    clear: 'heOKY8nrJUMfK',
    cloudy: '5k3G1jcuMia1wABeEK',
    fog: 'xUNd9QMlTDCkdAN5fO',
    rain: 'xTcnT45z6H5gxFYZZS',
    snow: 'l0iXz7gGDJoQIBRVWD',
    sleet: '12N67TnsGuckZG',
    ice: 'hjvqSizgd6pWM',
  };
  let animationAPI;
  const weatherData = currentWeather;
  if (weatherCode === 'sunny') {
    if (weatherData.is_day === 1) {
      console.log("yes");
      animationAPI = getGifAPI(baseURL, apiKey, gifID.sunny);
    } else if (weatherData.is_day === 0) {
      animationAPI = getGifAPI(baseURL, apiKey, gifID.clear);
    }
  } else if (weatherCode === 'cloudy') {
    animationAPI = getGifAPI(baseURL, apiKey, gifID[weatherCode]);
  } else if (weatherCode === 'fog') {
    animationAPI = getGifAPI(baseURL, apiKey, gifID[weatherCode]);
  } else if (weatherCode === 'rain') {
    animationAPI = getGifAPI(baseURL, apiKey, gifID[weatherCode]);
  } else if (weatherCode === 'snow') {
    animationAPI = getGifAPI(baseURL, apiKey, gifID[weatherCode]);
  } else if (weatherCode === 'sleet') {
    animationAPI = getGifAPI(baseURL, apiKey, gifID[weatherCode]);
  } else if (weatherCode === 'ice') {
    animationAPI = getGifAPI(baseURL, apiKey, gifID[weatherCode]);
  }

  let response = await fetch(animationAPI, { mode: 'cors' });
  let gifData = await response.json();
  Weather.currentWeatherAnimation = gifData;
}

function convertWeatherCode(weatherCondition) {
  const code = weatherCondition.code;
  const targetCode = {
    cloudy: [1003, 1006, 1009],
    fog: [1030, 1135, 1147],
    rain: [1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1201, 1243, 1246],
    snow: [1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282],
    sleet: [1069, 1204, 1207, 1249, 1252],
    ice: [1237, 1261, 1264, 1117],
  };
  let convertedCode;
  if (code === 1000) {
    convertedCode = 'sunny';
  } else if (targetCode.cloudy.includes(code)) {
    convertedCode = 'cloudy';
  } else if (targetCode.fog.includes(code)) {
    convertedCode = 'fog';
  } else if (targetCode.rain.includes(code)) {
    convertedCode = 'rain';
  } else if (targetCode.snow.includes(code)) {
    convertedCode = 'snow';
  } else if (targetCode.sleet.includes(code)) {
    convertedCode = 'sleet';
  } else if (targetCode.ice.includes(code)) {
    convertedCode = 'ice';
  }
  return convertedCode;
}

function getGifAPI(baseURL, APIKey, gifID) {
  let animationAPI = `${baseURL}/${gifID}?${APIKey}`;
  return animationAPI;
}

