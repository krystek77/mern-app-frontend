import { userAPI } from "../utils";
const URL = "http://localhost:4000/additional-equipment";

// GET http://localhost:4000/additional-equipment HTTP/1.1
export const getAdditionalEquipments = async () => {
  try {
    const response = await fetch(URL, {
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// GET http://localhost:4000/additional-equipment/${slug} HTTP/1.1
export const getAdditionalEquipment = async (slug) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${slug}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// POST http://localhost:4000/additional-equipment HTTP/1.1
export const createAdditionalEquipment = async (data) => {
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

// PATCH http://localhost:4000/additional-equipment/${slug} HTTP/1.1
export const updateAdditionalEquipment = async (data, slug) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${slug}`, {
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

// DELETE http://localhost:4000/additional-equipment/${slug} HTTP/1.1
export const deleteAdditionalEquipment = async (slug) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${slug}`, {
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
