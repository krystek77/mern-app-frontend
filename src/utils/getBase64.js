export function getBase64(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener(
      'load',
      () => {
        return resolve(reader.result);
      },
      false
    );
    reader.addEventListener(
      'error',
      (error) => {
        reject(error);
      },
      false
    );
  });
}

export default getBase64;
