import {getRequestCurrentWeather} from '../api/requestCurrentWeatherAPI.js';
import {addCityInFavorite, favoritesCity} from './favoritesManager.js';
import {
  clearSearchInput,
  clearTemperatureSection,
  createCurrentWeatherElementsArray,
  createNextWeatherElements,
  createNextWeatherElementsArray,
  createWeatherElements,
  updateDOMAddedLocations
} from '../domManagers/domManager.js';
import {cityInput} from '../data/constans.js';
import {setInLSCurrentWeatherData} from '../helpers/localStorage';

export let currentCity = '';

export async function loadWeatherForCity(cityName) {
  try {
    cityInput.value = cityName;

    const data = await getRequestCurrentWeather(cityName);

    setWeather(data.name, data.temp, data.icon, data.feelsLike, data.sunrise, data.sunset);
    setInLSCurrentWeatherData(cityName);

    return data;
  } catch (error) {
    alert(`Ошибка при загрузке погоды:, ${error}`);
  }
}

export const addLoveCity = () => {
  const success = addCityInFavorite(favoritesCity, currentCity);
  if (success) {
    updateDOMAddedLocations();
  }
};

const appendWeatherElements = (elements) => {
  createWeatherElements(...elements);
};

export const setWeather = (nameCity, tempCity, imgWeather, feelsLike, sunrise, sunset) => {
  clearTemperatureSection();

  const weatherElements = createCurrentWeatherElementsArray(nameCity, tempCity, imgWeather, feelsLike, sunrise, sunset);
  appendWeatherElements(weatherElements);

  currentCity = nameCity;
  clearSearchInput();
};

export const setNextWeather = (dt, temp, feelsLike, icon) => {
  const nextWeatherElements = createNextWeatherElementsArray(dt, temp, feelsLike, icon);
  createNextWeatherElements(...nextWeatherElements);

  clearSearchInput();
};