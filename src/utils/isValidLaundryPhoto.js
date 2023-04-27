/* eslint-disable no-unused-vars */
import { inputPatterns } from '../constants';

export function isValidLaundryPhoto(data) {
  const errors = {};
  if (data.hasOwnProperty('image') && data.image.name === '') {
    errors.image = 'Nie wybrano pliku';
  }
  if (data.hasOwnProperty('alt') && data.alt === '') {
    errors.alt = 'Nie podano tekstu alternatywnego';
  }
  if (data.hasOwnProperty('title') && data.title === '') {
    errors.title = 'Nie podano tytułu zdjęcia';
  }

  return errors;
}
export default isValidLaundryPhoto;
