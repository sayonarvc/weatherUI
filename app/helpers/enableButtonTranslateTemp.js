import {translateInCelsiusButton, translateInFarenheitButton} from '../data/constans';

export function availabilityTraslateButtonTemperature(farenhiet, celsium) {
  translateInFarenheitButton.disabled = farenhiet;
  translateInCelsiusButton.disabled = celsium;
}