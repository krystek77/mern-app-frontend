/* eslint-disable no-unused-vars */
import { inputPatterns } from "../constants";

export function isValidTags(data) {
  const errors = {};
  if (data.tags.trim() === "") {
    errors.tags = "Tagi nie mogą być pustym znakiem";
  }
  return errors;
}
export default isValidTags;
