import { getRequestCurrentWeather } from "./api/requestCurrentWeatherAPI.js";
import { setNextWeather, setWeather } from './blockManagers/weatherManager.js';
import { updateDOMAddedLocations } from './domManagers/domManager.js';
import { form, translateInFarenheitButton, translateInCelsiusButton, cityInput } from "./data/constans.js";
import { getRequestNextWeather } from "./api/requestNextWeatherAPI.js";
import { updateFavoriteCitiesFromStorage } from './blockManagers/favoritesManager.js';

document.addEventListener('DOMContentLoaded', () => {
    updateFavoriteCitiesFromStorage();

    const lastCity = localStorage.getItem('currentWeatherData') || '';
    if (lastCity) {
        cityInput.value = lastCity;
        loadLastCityWeather(lastCity);
    }

    updateDOMAddedLocations();
});

function loadLastCityWeather(cityName) {
    if (!cityName) return;

    getRequestCurrentWeather(cityName)
        .then(data => {
            setWeather(data.name, data.temp, data.icon, data.feelsLike, data.sunrise, data.sunset);
            setNextWeatherForm(cityName);

            translateInFarenheitButton.disabled = false;
            translateInCelsiusButton.disabled = true;
        })
        .catch(error => {
            console.error('Не удалось загрузить последний город:', error);
        });
}

export function setNextWeatherForm(cityName) {
    getRequestNextWeather(cityName)
        .then(data => {
            data.forecasts.forEach((forecast) => {
                setNextWeather(
                    forecast.dt,
                    forecast.temp,
                    forecast.feelsLike,
                    forecast.icon
                );
            });
        })
        .catch(error => {
            console.error(error);
            alert(`Не удалось получить данные о погоде`);
        });
}

function handleFormSubmit(e) {
    const cityName = cityInput.value.trim();
    e.preventDefault();
    setCurrentWeatherForm(cityName);
    setNextWeatherForm(cityName);

    localStorage.setItem('currentWeatherData', cityName)

    translateInFarenheitButton.disabled = false;
    translateInCelsiusButton.disabled = true;
}

function setCurrentWeatherForm(cityName) {
    if (!cityName) {
        alert('Пожалуйста, введите название города');
        return;
    }

    getRequestCurrentWeather(cityName)
        .then(data => {
            setWeather(data.name, data.temp, data.icon, data.feelsLike, data.sunrise, data.sunset);

            localStorage.setItem('currentWeatherData', cityName);
        })
        .catch(error => {
            console.error(error);
            alert(`Не удалось получить данные о погоде`);
        });
}

function toggleTemperatureToFarenheit() {
    const temperatureElement = document.querySelector('.temperature');

    if (!temperatureElement) {
        console.log('Элемент температуры не найден');
        return;
    }

    const currentText = temperatureElement.textContent;
    const temperatureValue = parseInt(currentText);

    const fahrenheit = Math.round((temperatureValue * 9/5) + 32);
    temperatureElement.textContent = `${fahrenheit}°F`;
    translateInFarenheitButton.disabled = true;
    translateInCelsiusButton.disabled = false;
}

function toggleTemperatureToCelsius() {
    const temperatureElement = document.querySelector('.temperature');

    if (!temperatureElement) {
        console.log('Элемент температуры не найден');
        return;
    }

    const currentText = temperatureElement.textContent;
    const temperatureValue = parseInt(currentText);

    const celsius = Math.round((temperatureValue - 32) * 5/9);
    temperatureElement.textContent = `${celsius}°C`;

    translateInCelsiusButton.disabled = true;
    translateInFarenheitButton.disabled = false;
}

translateInCelsiusButton.addEventListener('click', toggleTemperatureToCelsius);
translateInFarenheitButton.addEventListener('click', toggleTemperatureToFarenheit);
form.addEventListener('submit', handleFormSubmit);