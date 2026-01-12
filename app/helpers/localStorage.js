export function setInLSCurrentWeatherData(currentCityName) {
  localStorage.setItem('currentWeatherData', currentCityName);
}

export function setInLSFavoriteCities(arrayFavoriteCities) {
  localStorage.setItem('favoriteCities', JSON.stringify(arrayFavoriteCities));
}

export function getInLSFavoriteCities(keyLocalStorage) {
  return localStorage.getItem(`${keyLocalStorage}`);
}
