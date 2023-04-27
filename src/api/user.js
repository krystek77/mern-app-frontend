import {server} from '../config/config'
const URL = `${server}/user`;

export const signinUser = async (data) => {
  try {
    const response = await fetch(`${URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const signupUser = async (data) => {
  try {
    const response = await fetch(`${URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
