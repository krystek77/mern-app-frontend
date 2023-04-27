/* eslint-disable no-unused-vars */
import { inputPatterns } from "../constants";

export function isValidNewsletter() {
  const errors = {};
  errors.email = "Email nie prawidłowy";
  return errors;
}
export default isValidNewsletter;
