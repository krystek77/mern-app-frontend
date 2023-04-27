import { userAPI } from '../utils';
const URL = 'http://localhost:4000/option';

export const getOptionsByCategoryIds = async (data) => {
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

export const getOptionsByCategoryId = async (categoryId) => {
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

export const createOption = async (data) => {
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
export const updateOption = async (data, optionId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${optionId}`, {
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
export const deleteOption = async (optionId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${optionId}`, {
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

export const getOptionById = async (optionId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${optionId}`, {
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
