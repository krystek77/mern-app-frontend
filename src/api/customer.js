import {server} from '../config/config'
const URL = `${server}/customer`;

export const getCustomers = async () => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
