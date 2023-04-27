import { userAPI } from '../utils';
import { server} from '../config/config'
const URL = `${server}/control`;

export const getControls = async () => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const getControlsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(`${URL}/controls/${categoryId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const createControl = async (control) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(control),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const getControlByName = async (controlName) => {
  try {
    if (controlName) {
      const response = await fetch(`${URL}/${controlName}`);
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateControl = async (controlName, data) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${controlName}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteControl = async (controlName) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${controlName}`, {
      headers: {
        'Content-Type': 'application.json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
