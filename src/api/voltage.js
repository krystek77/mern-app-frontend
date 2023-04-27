import { userAPI } from '../utils';
const URL = 'http://localhost:4000/voltage';

export const getVoltagesByCategoryIds = async (data) => {
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

export const getVoltagesByCategoryId = async (categoryId) => {
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

export const createVoltage = async (data) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}`, {
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
    console.log(error);
  }
};
export const updateVoltage = async (data, voltageId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${voltageId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const deleteVoltage = async (voltageId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${voltageId}`, {
      headers: {
        'Content-Type': 'application/json',
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

export const getVoltageById = async (voltageId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${voltageId}`, {
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
