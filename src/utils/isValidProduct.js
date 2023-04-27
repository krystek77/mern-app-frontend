export function isValidProduct(data) {
  const errors = {};
  if (data.title === "") {
    errors.title = "Tytuł nie może być pusty łańcuchem znaków";
  }
  if (/[/!@#$%^~?&+]+/gm.test(data.title)) {
    errors.title = `Tytuł nie może zawierać znaków: /!@#$%^~?&+/`;
  }
  if (data.model === "") {
    errors.model = "Model jest wymagany i nie może być pustym łańcuchem znaków";
  }
  if (/[/!@#$%^~?&ąęćĄĘĆłŁńŃŹźŻżśŚ+]+/gm.test(data.model)) {
    errors.model = `Nazwa modelu nie może zawierać znaków: /!@#$%^~?&ąęćĄĘĆłŁńŃŹźŻżśŚ+/`;
  }
  if (data.parameters === undefined) {
    errors.parameters = "Przynajmniej jeden parametr musi być podany";
  }
  if (Array.isArray(data.parameters)) {
    data.parameters.forEach((element) => {
      if (element.name === "") errors.parameterName = "Nazwa parametru nie może być pusta";
      if (element.unit === "") errors.parameterUnit = "Musisz wybrać jednostkę parametru";
      if (element.value === "") errors.parameterValue = "Wartość parametru nie może być pusta";
    });
  }

  return errors;
}
export default isValidProduct;
