import {checkAPIError} from "../validation/isValidAPI.js";

const cityInput = document.querySelector('.header');
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

function createUrlForRequest(){
    const cityName = cityInput.value;
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

export function getRequestCurrentWeather(cityName){
    const URL = createUrlForRequest(cityName);

    return fetch(URL)
        .then(response => checkAPIError(response, cityName))
        .then(response =>  response.json())
        .then(data => {
            const weatherData = {
                name: data.name,
                temp: Math.round(data.main.temp),
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                feelsLike: Math.round(data.main.feels_like),
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset
            };

            localStorage.setItem('currentWeatherData', cityName);
            return weatherData;
        })
        .catch(error => {
            console.error(error.message);
        });
}