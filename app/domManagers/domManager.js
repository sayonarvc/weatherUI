import { favoritesCity, deleteCityInFavorite } from '../blockManagers/favoritesManager.js';
import {addLoveCity, loadWeatherForCity} from '../blockManagers/weatherManager.js';
import {addedLocations, temperatureSection, translateInFarenheitButton} from '../data/constans.js';
import {setNextWeatherForm} from '../../main.js';
import {createElement, formatTimeFromTimestamp, createImageElement} from '../helpers/domElements.js';

export function clearSearchInput (){
  const cityInput = document.querySelector('.header');
  cityInput.value = '';
}

export const clearTemperatureSection = () => {
  while (temperatureSection.firstChild) {
    temperatureSection.removeChild(temperatureSection.firstChild);
  }
};

const createCityElement = (nameCity) => {
  return createElement('div', 'weather-city', nameCity);
};

const createTemperatureElement = (tempCity) => {
  return createElement('div', 'temperature', `${tempCity}°C`);
};

const createWeatherImageElement = (imgWeather) => {
  return createImageElement('weather-img', imgWeather);
};

const createLikeButtonElement = () => {
  const likeBtn = createElement('button', 'like-content', '❤️');
  likeBtn.addEventListener('click', addLoveCity);

  return likeBtn;
};

const createCurrentFeelsLike = (feelsLikeData) => {
  return createElement('div', 'feels-like', `Ощущается как: ${feelsLikeData}°C`);
};

const createCurrentSunrise = (sunriseData) => {
  const formattedTime = formatTimeFromTimestamp(sunriseData);
  return createElement('div', 'sunrise', `Рассвет: ${formattedTime}`);
};

const createCurrentSunset = (sunsetData) => {
  const formattedTime = formatTimeFromTimestamp(sunsetData);
  return createElement('div', 'sunset', `Закат: ${formattedTime}`);
};

const createNextDateElement = (nextDt) => {
  const formattedTime = formatTimeFromTimestamp(nextDt);
  return createElement('div', 'next-date', `Время: ${formattedTime}`);
};

const createNextTemperatureElement = (nextTemp) => {
  return createElement('div', 'next-temperature', `Температура: ${nextTemp}°C`);
};

const createNextFeelsLikeElement = (nextFeelsLike) => {
  return createElement('div', 'next-feels-like', `Ощущается как: ${nextFeelsLike}°C`);
};

const createNextIconElement = (nextImgWeather) => {
  return createImageElement('next-weather-img', nextImgWeather);
};

export function createWeatherElements(temp, img, city, like, feelsLike, sunrise, sunset) {
  const containerCurrentWeather = document.createElement('div');
  const containerTemp = document.createElement('div');

  containerCurrentWeather.className = 'block-current-weather';

  containerTemp.appendChild(temp);
  containerTemp.appendChild(img);
  containerCurrentWeather.appendChild(containerTemp);
  containerCurrentWeather.appendChild(city);
  containerCurrentWeather.appendChild(like);
  containerCurrentWeather.appendChild(feelsLike);
  containerCurrentWeather.appendChild(sunrise);
  containerCurrentWeather.appendChild(sunset);

  temperatureSection.appendChild(containerCurrentWeather);
}

export function createNextWeatherElements(dt, nextTemp, nextFeelsLike, icon) {
  const containerNextWeather = document.createElement('div');
  containerNextWeather.className = 'block-next-weather';

  containerNextWeather.appendChild(dt);
  containerNextWeather.appendChild(nextTemp);
  containerNextWeather.appendChild(nextFeelsLike);
  containerNextWeather.appendChild(icon);

  temperatureSection.appendChild(containerNextWeather);
}

export const createCurrentWeatherElementsArray = (nameCity, tempCity, imgWeather, feelsLike, sunrise, sunset) => {
  const tempDiv = createTemperatureElement(tempCity);
  const weatherImg = createWeatherImageElement(imgWeather);
  const cityDiv = createCityElement(nameCity);
  const likeBtn = createLikeButtonElement();
  const feelsLikeDiv = createCurrentFeelsLike(feelsLike);
  const sunriseDiv = createCurrentSunrise(sunrise);
  const sunsetDiv = createCurrentSunset(sunset);

  return [tempDiv, weatherImg, cityDiv, likeBtn, feelsLikeDiv, sunriseDiv, sunsetDiv];
};

export const createNextWeatherElementsArray = (dt, temp, feelsLike, icon) => {
  const dtDiv = createNextDateElement(dt);
  const nextTempDiv = createNextTemperatureElement(temp);
  const nextFeelsLikeDiv =  createNextFeelsLikeElement(feelsLike);
  const nextWeatherImg = createNextIconElement(icon);

  return [dtDiv, nextTempDiv, nextFeelsLikeDiv, nextWeatherImg];

};

function addLoveCityInDOM(location, dislikeBtn) {
  const container = document.createElement('div');
  container.className = 'location-container';

  container.appendChild(location);
  container.appendChild(dislikeBtn);

  addedLocations.appendChild(container);
}

export function updateDOMAddedLocations(){
  while (addedLocations.firstChild) {
    addedLocations.removeChild(addedLocations.firstChild);
  }

  favoritesCity.forEach(cityData => {
    const location = document.createElement('div');
    location.className = 'location-tag';
    location.textContent = cityData.name;

    location.addEventListener('click', () => {
      loadWeatherForCity(cityData.name);
      translateInFarenheitButton.disabled=false;
      setNextWeatherForm(cityData.name);
    });

    const dislikeBtn = document.createElement('button');
    dislikeBtn.className = 'dislike-btn';
    dislikeBtn.textContent = '❌';

    dislikeBtn.addEventListener('click', () => {
      deleteCityInFavorite(favoritesCity, cityData.name);
      updateDOMAddedLocations();
    });

    addLoveCityInDOM(location, dislikeBtn);
  });
}