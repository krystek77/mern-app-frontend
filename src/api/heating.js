import { userAPI } from '../utils';
const URL = 'http://localhost:4000/heating';

export const getHeatingsByCategoryIds = async (data) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/categories`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getHeatingsByCategoryId = async (categoryId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/category/${categoryId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const createHeating = async (data) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const updateHeating = async (data, heatingId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${heatingId}`, {
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
    console.log(error);
  }
};
export const deleteHeating = async (heatingId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${heatingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getHeatingById = async (heatingId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${heatingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
