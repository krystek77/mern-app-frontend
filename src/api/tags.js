import {server} from '../config/config'
const URL = `${server}/tag`;

export const getTags = async () => {
  try {
    const response = await fetch(URL);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const getTagByName = async (tagName) => {
  if (tagName) {
    try {
      const response = await fetch(`${URL}/${tagName}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
};
export const createTags = async (data) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTag = async (tagName) => {
  try {
    const response = await fetch(`${URL}/skasuj-tag/${tagName}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const editTag = async (tagName, data) => {
  try {
    const response = await fetch(`${URL}/edytuj-tag/${tagName}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
