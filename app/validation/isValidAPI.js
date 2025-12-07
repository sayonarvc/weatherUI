export function checkAPIError(response, cityName = '') {
    if (!response.ok) {
        if (response.status === 404) {
            alert(`Город "${cityName}" не найден`);
        } else if (response.status === 401) {
            alert('Неверный API ключ');
        } else {
            alert(`HTTP ошибка: ${response.status}`);
        }
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response;
}