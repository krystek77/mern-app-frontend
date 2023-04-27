const URL = 'http://localhost:4000/kurs';

export const getAvarageExchangeRate = async () => {
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
