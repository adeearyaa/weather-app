import "./threeDayForecastStyle.css";

export function loadThreeDayForecast(threeDayWeatherForecast) {
    let threeDayForecast = document.querySelector(".three-day-weather");
    threeDayForecast.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        let threeDayIcon = document.createElement("div");
        let day = document.createElement("div")
        day.textContent = threeDayWeatherForecast.dayNames[i];
        let image = document.createElement("img")
        image.src = `https:${threeDayWeatherForecast.icons[i]}`;
        let lowHighTemps = document.createElement("div");
        lowHighTemps.classList.add("low-high");
        let low = document.createElement("div");
        low.textContent = `L:${threeDayWeatherForecast.minTemp[i]}\u00B0C`;
        let high = document.createElement("div");
        high.textContent = `H:${threeDayWeatherForecast.minTemp[i]}\u00B0C`;
        lowHighTemps.appendChild(low);
        lowHighTemps.appendChild(high);
        threeDayIcon.appendChild(day);
        threeDayIcon.appendChild(image);
        threeDayIcon.appendChild(lowHighTemps);
        threeDayForecast.appendChild(threeDayIcon);
    }
}