import data from '../data/data.json' with {type: 'json'};
import {isValidAddDuplicateCity} from '../validation/isValidCityName';
import {getInLSFavoriteCities, setInLSFavoriteCities} from '../helpers/localStorage';
import {favoriteCitiesText} from '../data/constans';

const getFavoriteCities = () => {
  const saved = getInLSFavoriteCities(favoriteCitiesText);
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
  if (isValidAddDuplicateCity(array, nameCity)) {
    return false;
  }

  array.push({
    name: nameCity
  });

  favoriteCity.push({
    name: nameCity
  });

  setInLSFavoriteCities(array);
  console.log('Сохранено в localStorage:', array);
  return true;
};

export const deleteCityInFavorite = (array, nameCity) => {
  let indexCity = array.findIndex(city => city.name === nameCity);

  if (indexCity !== -1) {
    array.splice(indexCity, 1);

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
