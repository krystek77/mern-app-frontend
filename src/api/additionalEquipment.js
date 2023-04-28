import { userAPI } from "../utils";
import {server} from '../config/config'
const URL = `${server}/additional-equipment`;

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
