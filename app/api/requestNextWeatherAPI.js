import {checkAPIError} from "../validation/isValidAPI.js";

const cityInput = document.querySelector('.header');
const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = '5796abbde9106b7da4febfae8c44c232';

function createUrlForRequest(cityName){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

export function getRequestNextWeather(cityName){
    const URL = createUrlForRequest(cityName);
    return fetch(URL)
        .then(response => checkAPIError(response, cityName))
        .then(response =>  response.json())
        .then(data => {
            const forecasts = data.list.slice(0, 3).map(forecast => ({
                dt: forecast.dt,
                temp: Math.round(forecast.main.temp),
                feelsLike: Math.round(forecast.main.feels_like),
                icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
            }));

            return {
                forecasts: forecasts
            };
        })
        .catch(error => {
            console.error(error.message);
        });
}