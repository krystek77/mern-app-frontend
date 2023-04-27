const URL = "http://localhost:4000/customer";

export const getCustomers = async () => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
