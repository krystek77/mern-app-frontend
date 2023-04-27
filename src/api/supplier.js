import { userAPI } from '../utils';
const URL = 'http://localhost:4000/supplier';

export const createSupplier = async (data) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(URL, {
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

export const getAllSuppliers = async () => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(URL, {
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

export const getSupplierDetails = async (supplierId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/details/${supplierId}`, {
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

export const updateSupplier = async (supplierId, data) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${supplierId}`, {
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
    console.log(error.message);
  }
};
export const deleteSupplier = async (supplierId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${supplierId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
