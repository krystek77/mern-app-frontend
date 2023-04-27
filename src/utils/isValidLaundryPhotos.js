/* eslint-disable no-unused-vars */
import { inputPatterns } from '../constants';

export function isValidLaundryPhotos(data) {
  const errors = {};
  if (!Object.keys(data).length) {
    errors.images = 'Nie wybrano żadnego zdjęcia';
  }
  if (data.hasOwnProperty('alts') && data.alts.some((alt) => alt === '')) {
    errors.alts = 'Nie podano tekstu alternatywnego';
  }
  if (
    data.hasOwnProperty('titles') &&
    data.titles.some((title) => title === '')
  ) {
    errors.titles = 'Nie podano tytułu zdjęcia';
  }
  return errors;
}
export default isValidLaundryPhotos;
