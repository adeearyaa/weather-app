import { initialLoad } from "../View/view";
import { retrieveWeather, Weather } from "../Model/model.js";
import { loadCurrentWeather } from "../View/currentWeather.js";
import { loadHourlyForecast } from "../View/hourlyForecast";
import { loadThreeDayForecast } from "../View/threeDayForecast";
import {displayErrorMessage,loadBackgroundAnimation} from "../View/searchBar.js";

//call the api for singapore first
//initialLoad is going to take in parameters for singapore

async function startApp() {
  await retrieveWeather("Singapore");
  initialLoad();
  loadCurrentWeather(Weather.currentWeather);
  loadHourlyForecast(Weather.todaysHourlyWeather);
  loadThreeDayForecast(Weather.threeDayWeatherForecast);
  loadBackgroundAnimation(Weather.currentWeatherAnimation);
}

export const receiveQueryFromView = async (searchQuery) => {
  try {
    await retrieveWeather(searchQuery);
    loadCurrentWeather(Weather.currentWeather);
    loadHourlyForecast(Weather.todaysHourlyWeather);
    loadThreeDayForecast(Weather.threeDayWeatherForecast);
    loadBackgroundAnimation(Weather.currentWeatherAnimation);
  } catch (error) {
      console.log(error);
      displayErrorMessage();
  }
};

startApp();
