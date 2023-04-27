/* eslint-disable no-useless-escape */
export function isValidSupplier(data) {
  const errors = {};
  const tmp = { ...data };
  if (tmp.companyName === '') {
    errors.companyName = 'nazwa firmy nie może być pustym łańcuchem znaków';
  }
  if (tmp.city === '') {
    errors.city = 'nazwa miasta nie może być pusta';
  }
  if (
    tmp.email.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    ) === null
  ) {
    errors.email = 'podany email jest nieprawidłowy';
  }
  if (tmp.nip.match(/^[0-9]{10}$/gm) === null) {
    errors.nip = 'nieprawidłowy format numeru NIP';
  }
  if (tmp.zipCode.match(/^\d{2}-\d{3}$/gm) === null) {
    errors.zipCode = 'nieprawidłowy format kodu pocztowego';
  }
  if (
    tmp.phone !== '' &&
    tmp.phone.match(/^\+{1}\d{2,3}\s{1}\d{2}-\d{3}-\d{2}-\d{2}$/gm) === null
  ) {
    errors.phone = 'nieprawidłowy format telefonu';
  }
  if (
    tmp.www !== '' &&
    tmp.www.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    ) === null
  ) {
    errors.www = 'nieprawidłowy adres strony internetowej';
  }
  if (
    tmp.mobilePhone !== '' &&
    tmp.mobilePhone.match(/^\+{1}\d{2}\s{1}\d{3}-\d{3}-\d{3}$/gm) === null
  ) {
    errors.mobilePhone = 'nieprawidłowy format telefonu komórkowego';
  }
  return errors;
}
export default isValidSupplier;
