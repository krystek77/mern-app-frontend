import { userAPI } from "../utils";
import {server} from '../config/config'
const URL = `${server}/product`;

export const getProductsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(`${URL}/category/${categoryId}/products`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsByCategoryName = async (categoryName) => {
  try {
    if (!categoryName) {
      const response = await fetch(URL);
      const result = await response.json();
      return result;
    } else {
      const response = await fetch(`${URL}/category/${categoryName}`);
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductDetailsByModel = async (model) => {
  if (!model) return;
  try {
    const response = await fetch(`${URL}/model/${model}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsBasedOnSpecyfiedTags = async (tags) => {
  try {
    const response = await fetch(`${URL}/basedOnTags/?tags=${tags}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getProductsByTags = async (query, model) => {
  let result = [];
  try {
    if (query) {
      const response = await fetch(`${URL}/model/${model}/tags-search?tags=${query}`);
      result = await response.json();
    } else {
      const response = await fetch(`${URL}/model/${model}/tags-search?tags=`);
      result = await response.json();
    }
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProducts = async (query) => {
  let result = [];
  try {
    if (query) {
      const response = await fetch(`${URL}?title=${query}`);
      result = await response.json();
    } else {
      const response = await fetch(URL);
      result = await response.json();
    }
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduct = async (product) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = async (model, data) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/${model}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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

export const deleteProduct = async (model) => {
  const token = userAPI.getToken();
  try {
    const response = await fetch(`${URL}/model/${model}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
