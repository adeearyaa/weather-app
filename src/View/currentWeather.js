import sun from "../icons/icons8-sun-100.png"
import "./currentWeatherStyle.css"

export const loadCurrentWeather = (currentWeatherInfo) => {
    let temperature = document.querySelector(".temp");
    temperature.textContent = `${currentWeatherInfo.temperature}\u00B0C`;
    let iconImage = document.querySelector(".icon");
    iconImage.src = `https:${currentWeatherInfo.weatherIcon}`;
    let weatherDescription = document.querySelector(".weather-description");
    weatherDescription.textContent = currentWeatherInfo.description;
    let cityAndCountry = document.querySelector(".city-and-country");
    cityAndCountry.textContent = currentWeatherInfo.cityAndCountry;
    let dayAndTime = document.querySelector(".day-and-time");
    dayAndTime.textContent = `${currentWeatherInfo.day}, ${currentWeatherInfo.time}`;
    let date = document.querySelector(".date");
    date.textContent = currentWeatherInfo.date;
}