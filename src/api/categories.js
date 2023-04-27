import { userAPI } from '../utils';

const URL = 'http://localhost:4000/category';

export const getCategories = async (query) => {
  let result = [];
  try {
    if (query) {
      const response = await fetch(`${URL}?category=${query}`);
      result = await response.json();
    } else {
      const response = await fetch(URL);
      result = await response.json();
    }
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

export const createCategory = async (data) => {
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
    console.log(error.message);
  }
};

export const updateCategory = async (data, categoryId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${categoryId}`, {
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

export const getCategoryDetails = async (categoryId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${categoryId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCategory = async (categoryId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${categoryId}`, {
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
