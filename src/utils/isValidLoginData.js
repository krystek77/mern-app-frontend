import INPUT_PATTERNS from "../constants/patterns";

export function isValidLoginData(data) {
  const errors = {};
  if (!INPUT_PATTERNS.EMAIL.test(data.email)) {
    errors.email = `${data.email} - nieporawny adres email`;
  }
  if (!INPUT_PATTERNS.PASSWORD.test(data.password)) {
    errors.password = "Hasło musi mieć conajmniej 8 znaków, w tym dużą literę, cyfrę i znak specjalny";
  }
  return errors;
}
export default isValidLoginData;
