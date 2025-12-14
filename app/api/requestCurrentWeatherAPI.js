import { checkAPIError } from "../validation/isValidAPI.js";

const serverUrl = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = `f660a2fb1e4bad108d6160b7f58c555f`;

function createUrlForRequest(cityName){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

export async function getRequestCurrentWeather(cityName){
    try {
        const URL = createUrlForRequest(cityName);
        const response = await fetch(URL);
        await checkAPIError(response, cityName);

        const data = await response.json();
        const weatherData = {
            name: data.name,
            temp: Math.round(data.main.temp),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            feelsLike: Math.round(data.main.feels_like),
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
        };

        return weatherData;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
