import { getRequestCurrentWeather } from "../api/requestCurrentWeatherAPI.js";
import { addCityInFavorite } from './favoritesManager.js';
import {
    clearSearchInput,
    clearTemperatureSection,
    createWeatherElements,
    createCurrentWeatherElementsArray, createNextWeatherElementsArray, createNextWeatherElements
} from '../domManagers/domManager.js';
import { updateDOMAddedLocations } from "../domManagers/domManager.js";
import { favoritesCity } from './favoritesManager.js';
import { cityInput } from "../data/constans.js";

export let currentCity = '';

export function loadWeatherForCity(cityName) {
    cityInput.value = cityName;

    return getRequestCurrentWeather(cityName)
        .then(data => {
            setWeather(data.name, data.temp, data.icon, data.feelsLike, data.sunrise, data.sunset);

            localStorage.setItem('currentWeatherData', cityName);
        })
        .catch(error => {
            alert(`Ошибка при загрузке погоды:, ${error}`);
        });
}

export const addLoveCity = () => {
    const success = addCityInFavorite(favoritesCity, currentCity);
    if (success) {
        updateDOMAddedLocations();
    }
}

const appendWeatherElements = (elements) => {
    createWeatherElements(...elements);
}

export const setWeather = (nameCity, tempCity, imgWeather, feelsLike, sunrise, sunset) => {
    clearTemperatureSection();

    const weatherElements = createCurrentWeatherElementsArray(nameCity, tempCity, imgWeather, feelsLike, sunrise, sunset);
    appendWeatherElements(weatherElements);

    currentCity = nameCity;
    clearSearchInput();

    localStorage.setItem('currentWeatherData', nameCity);
}

export const setNextWeather = (dt, temp, feelsLike, icon) => {
    const nextWeatherElements = createNextWeatherElementsArray(dt, temp, feelsLike, icon);
    createNextWeatherElements(...nextWeatherElements);

    clearSearchInput();
}