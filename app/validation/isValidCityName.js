export function isValidCityName(nameCity) {
  if (nameCity.length === 0) {
    alert('Города без названия не существует');
    return false;
  }
  if (nameCity.length > 160) {
    alert('Не существует такого города, чье название более 160 символов');
    return false;
  }
}

export function isValidAddDuplicateCity(array, nameCity) {
  let existingCity = array.findIndex(city => city.name === nameCity);

  if (existingCity !== -1) {
    console.error('Город с таким названием уже добавлен в избранное');
    return true;
  }
}