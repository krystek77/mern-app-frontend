/* eslint-disable no-unused-vars */
import { inputPatterns } from "../constants";
import { formatFormData } from "../utils";

export function isValidDocument(formData) {
  const document = {};
  const documents = [];
  for (let [key, value] of formData) {
    formatFormData(document, key, value);
    documents.push(document);
  }

  const errors = {};
  if (documents[0].displayFileName === "") {
    errors.filename = "Pusta nazwa wyświetlania";
  }
  return errors;
}
export default isValidDocument;
