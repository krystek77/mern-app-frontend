import { userAPI } from "../utils";
const URL = "http://localhost:4000/sparepart";

export const getAllSpareParts = async () => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSparePartDetails = async (sparePartId) => {
  try {
    const response = await fetch(`${URL}/details/${sparePartId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const getSpareParts = async () => {};
export const getSparePartsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(`${URL}/categoryId/${categoryId}/spareparts`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const createSparePart = async (data) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const createSpareParts = async () => {};
export const updateSparePart = async (data, sparePartId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${sparePartId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const updateSpareParts = async () => {};

export const deleteSparePart = async (sparePartId) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${sparePartId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSpareParts = async () => {};
