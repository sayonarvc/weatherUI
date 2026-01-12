import {getRequestCurrentWeather} from './app/api/requestCurrentWeatherAPI.js';
import {setNextWeather, setWeather} from './app/blockManagers/weatherManager.js';
import {updateDOMAddedLocations} from './app/domManagers/domManager.js';
import {
  cityInput,
  currentWeatherDataText,
  form,
  translateInCelsiusButton,
  translateInFarenheitButton
} from './app/data/constans.js';
import {getRequestNextWeather} from './app/api/requestNextWeatherAPI.js';
import {updateFavoriteCitiesFromStorage} from './app/blockManagers/favoritesManager.js';
import {setCookie} from './app/helpers/cookie.js';
import {availabilityTraslateButtonTemperature} from './app/helpers/enableButtonTranslateTemp';
import {isValidCityName} from './app/validation/isValidCityName';
import {setInLSCurrentWeatherData} from './app/helpers/localStorage';

document.addEventListener('DOMContentLoaded', () => {
  updateFavoriteCitiesFromStorage();

  const lastCity = localStorage.getItem(currentWeatherDataText) || '';
  if (lastCity) {
    cityInput.value = lastCity;
    loadLastCityWeather(lastCity);
  }

  updateDOMAddedLocations();
});

async function loadLastCityWeather(cityName) {
  try {
    if (!cityName) return;

    const data = await getRequestCurrentWeather(cityName);

    setWeather(data.name, data.temp, data.icon, data.feelsLike, data.sunrise, data.sunset);
    setNextWeatherForm(cityName);

    availabilityTraslateButtonTemperature(false, true);

    return data;
  } catch (error) {
    alert(`Не удалось загрузить последний город:, ${error}`);
    throw error;
  }
}

export async function setNextWeatherForm(cityName) {
  const data = await getRequestNextWeather(cityName);

  data.forecasts.forEach((forecast) => {
    setNextWeather(
      forecast.dt,
      forecast.temp,
      forecast.feelsLike,
      forecast.icon
    );
  });

  return data;
}

function handleFormSubmit(e) {
  const cityName = cityInput.value.trim();
  e.preventDefault();
  setCurrentWeatherForm(cityName);
  setNextWeatherForm(cityName);

  availabilityTraslateButtonTemperature(false, true);
}

async function setCurrentWeatherForm(cityName) {
  try {
    if (isValidCityName(cityName)) {
      return true;
    }

    const data = await getRequestCurrentWeather(cityName);

    setWeather(data.name, data.temp, data.icon, data.feelsLike, data.sunrise, data.sunset);
    setInLSCurrentWeatherData(cityName);
    setCookie(cityName, 1);

  } catch (error) {
    alert(`Не удалось получить данные о погоде: ${error}`);
    throw error;
  }
}

function toggleTemperatureToFarenheit() {
  const temperatureElement = document.querySelector('.temperature');

  const currentText = temperatureElement.textContent;
  const temperatureValue = parseInt(currentText);

  const fahrenheit = Math.round((temperatureValue * 9 / 5) + 32);
  temperatureElement.textContent = `${fahrenheit}°F`;
  availabilityTraslateButtonTemperature(true, false);
}

function toggleTemperatureToCelsius() {
  const temperatureElement = document.querySelector('.temperature');

  if (!temperatureElement) {
    console.log('Элемент температуры не найден');
    return;
  }

  const currentText = temperatureElement.textContent;
  const temperatureValue = parseInt(currentText);

  const celsius = Math.round((temperatureValue - 32) * 5 / 9);
  temperatureElement.textContent = `${celsius}°C`;

  availabilityTraslateButtonTemperature(false, true);
}

translateInCelsiusButton.addEventListener('click', toggleTemperatureToCelsius);
translateInFarenheitButton.addEventListener('click', toggleTemperatureToFarenheit);
form.addEventListener('submit', handleFormSubmit);