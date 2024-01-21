import "./viewStyle.css";
import sun from "../icons/icons8-sun-100.png";
import {loadSearchBar} from "./searchBar";
import {loadCurrentWeather} from "./currentWeather";

export const initialLoad = () => {
  const header = document.querySelector(".header");
  customizeHeader(header);
  const searchBarContainer = document.querySelector(".search-bar");
  loadSearchBar(searchBarContainer);
};

const customizeHeader = (header) => {
  let headerText = document.createTextNode("WeatherWhisper");
  header.appendChild(headerText);
  let sunIcon = new Image();
  sunIcon.src = sun;
  header.appendChild(sunIcon);
};

