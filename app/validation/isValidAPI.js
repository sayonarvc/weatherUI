export function checkAPIError(response, cityName = '') {
  if (!response.ok) {
    if (response.status === 404) {
      console.log(`Город "${cityName}" не найден`);
    } else if (response.status === 401) {
      console.log('Неверный API ключ');
    } else {
      console.log(`HTTP ошибка: ${response.status}`);
    }
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response;
}