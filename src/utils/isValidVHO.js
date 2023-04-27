export function isValidVHO(data) {
  const errors = {};
  if (data.name === '') {
    errors.name = 'Opcja musi posiadać nazwę';
  }
  if (data.categoryId === undefined) {
    errors.categoryId = 'Co najmniej jedna kategoria musi być zdefiniowana';
  }
  return errors;
}

export default isValidVHO;
