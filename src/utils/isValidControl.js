/* eslint-disable no-unused-vars */
import { inputPatterns } from '../constants';

export function isValidControl(data) {
  const errors = {};
  if (data.name === '') {
    errors.name = 'Nazwa sterownika nie może być pusta';
  }
  if (/[/!@#$%^~?&ąęćĄĘĆłŁńŃŹźŻżśŚ+]+/gm.test(data.name)) {
    errors.name =
      'Niepoprawna nazwa sterownika. Sterownik nie może zawierać znaków specjalnych';
  }
  return errors;
}
export default isValidControl;
