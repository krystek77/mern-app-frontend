export function isValidAdditionalEquipment(data) {
  const errors = {};
  if (data.model === "") {
    errors.model = "Oznaczenie jest wymagane";
  }
  if (data.name === "") {
    errors.name = "Nazwa jest wymagana";
  }

  if (data.price.match(/[0-9]+\.?[0-9]*$/) === null) {
    errors.price = `${data.price} nie jest poprawną ceną`;
  }
  return errors;
}
export default isValidAdditionalEquipment;
