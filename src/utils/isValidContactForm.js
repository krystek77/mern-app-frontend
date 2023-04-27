/* eslint-disable no-unused-vars */
import { inputPatterns } from '../constants';
export function isValidContactForm() {
  const errors = { person: {}, company: {} };

  //   const tempErrorsPerson = {
  //     firstName: false,
  //     lastName: false,
  //     phone: false,
  //     email: false,
  //     message: false,
  //   };
  //   const tempErrorsCompany = {
  //     name: false,
  //     street: false,
  //     houseNumber: false,
  //     zipCode: false,
  //     city: false,
  //     phone: '',
  //     email: '',
  //     message: false,
  //   };
  //   if (formData.email.match(INPUT_PATTERNS.EMAIL) === null) {
  //     tempErrors.email = true;
  //     isValid = false;
  //   }
  //   // not required
  //   if (
  //     formData.name !== '' &&
  //     formData.name.match(/^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]{3,}$/) === null
  //   ) {
  //     tempErrors.name = true;
  //     isValid = false;
  //   }
  //   // not required
  //   if (
  //     formData.lastName !== '' &&
  //     formData.lastName.match(/^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]{3,}$/) === null
  //   ) {
  //     tempErrors.lastName = true;
  //     isValid = false;
  //   }
  //   //required
  //   if (formData.phone.match(/^(\+48)?[0-9]{9}$/) === null) {
  //     tempErrors.phone = true;
  //     isValid = false;
  //   }
  //   // not required
  //   if (
  //     formData.city !== '' &&
  //     formData.city.match(/^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ\s]{3,}$/) === null
  //   ) {
  //     tempErrors.city = true;
  //     isValid = false;
  //   }
  //   //not required
  //   if (
  //     formData.company !== '' &&
  //     formData.company.match(/^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ\s\.-]{3,}$/) === null
  //   ) {
  //     tempErrors.company = true;
  //     isValid = false;
  //   }
  //   //required
  //   if (formData.message.length <= 50) {
  //     tempErrors.message = true;
  //     isValid = false;
  //   }
  errors.person.firstName = 'Błędne imię';
  errors.person.message = 'Niepoprawna wiadomość';
  return errors;
}

export default isValidContactForm;
