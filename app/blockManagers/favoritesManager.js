import data from '../data/data.json' with {type: 'json'};

const getFavoriteCities = () => {
  const saved = localStorage.getItem('favoriteCities');
  if (!saved) {
    console.log('localStorage пуст, возвращаем пустой массив');
    return [];
  }
  const parseCities = JSON.parse(saved);
  console.log('Загружено из localStorage:', parseCities);
  return parseCities;
};

export const favoriteCity = [...data];
export let favoritesCity = getFavoriteCities();

export const addCityInFavorite = (array, nameCity) => {
  let existingCity = array.findIndex(city => city.name === nameCity);

  if (nameCity.length === 0) {
    console.error('Города без названия не существует');
    return false;
  }
  if (nameCity.length > 160) {
    console.error('Не существует такого города, чье название более 160 символов');
    return false;
  }
  if (existingCity !== -1) {
    console.error('Город с таким названием уже добавлен в избранное');
    return false;
  }

  //---пушится в localStorage
  array.push({
    name: nameCity
  });

  //---пушится в data.json массив
  favoriteCity.push({
    name: nameCity
  });

  localStorage.setItem('favoriteCities', JSON.stringify(array));
  console.log('Сохранено в localStorage:', array);
  return true;
};

export const deleteCityInFavorite = (array, nameCity) => {
  let indexCity = array.findIndex(city => city.name === nameCity);

  if (indexCity !== -1) {
    //---удаляется из localStorage
    array.splice(indexCity, 1);
    //---удаляется из data.json
    favoriteCity.splice(indexCity, 1);
    console.info('Город удален из массива');

    localStorage.setItem('favoriteCities', JSON.stringify(array));
    console.log('Сохранено в localStorage:', array);
    return true;
  } else {
    console.error('Такого города нет в массиве, ничего не удалено');
    return false;
  }
};

export const updateFavoriteCitiesFromStorage = () => {
  favoritesCity = getFavoriteCities();
  return favoritesCity;
};
