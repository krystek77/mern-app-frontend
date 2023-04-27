export function isValidSparePart(data) {
  // console.log(data);
  const errors = {};
  if (data.name === "") {
    errors.name = "Część zamienna musi mieć nazwę";
  }
  if (data.products === undefined) {
    errors.products = "Musisz wybrać produkt. Jeśli go nie ma to zdefiniuj go";
  }
  return errors;
}
export default isValidSparePart;
