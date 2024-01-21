import "./hourlyForecastStyle.css";

export function loadHourlyForecast(hourlyForecastData) {
    let hourlyForecast = document.querySelector(".hourly-weather");
    hourlyForecast.innerHTML = "";
    for (let i = 0; i < 24; i++) {
        let hourlyForecastIcon = document.createElement("div");
        let time = document.createElement("div");
        time.textContent = hourlyForecastData.time[i];
        let image = document.createElement("img")
        image.src = `https:${hourlyForecastData.icons[i]}`;
        let temp = document.createElement("div");
        temp.textContent = `${hourlyForecastData.temp[i]}\u00B0C`;
        hourlyForecastIcon.appendChild(time);
        hourlyForecastIcon.appendChild(image);
        hourlyForecastIcon.appendChild(temp);
        hourlyForecast.appendChild(hourlyForecastIcon);
    }
}