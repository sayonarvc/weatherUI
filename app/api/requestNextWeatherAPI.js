import {checkAPIError} from "../validation/isValidAPI.js";

const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = '5796abbde9106b7da4febfae8c44c232';

function createUrlForRequest(cityName){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

function recursiveArrayHandler(list, count, index=0, forecasts=[]){
    if(count ===0 || index >= list.length){
        return forecasts;
    }

    const forecast = list[index];
    forecasts.push({
        dt: forecast.dt,
        temp: Math.round(forecast.main.temp),
        feelsLike: Math.round(forecast.main.feels_like),
        icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
        }
    )

    return recursiveArrayHandler(list, count - 1, index + 1, forecasts);
}

export async function getRequestNextWeather(cityName) {
    try {
        const URL = createUrlForRequest(cityName);
        const response = await fetch(URL);
        await checkAPIError(response, cityName);

        const data = await response.json();

        const forecasts = recursiveArrayHandler(data.list, 3);

        return {
            forecasts: forecasts
        };
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}