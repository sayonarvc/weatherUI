export function setCookie(cityName, second) {
  const mSecond = second * 60;
  document.cookie = `city=${cityName}; max-age=${mSecond}`;
}