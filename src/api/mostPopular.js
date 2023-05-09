import { server } from "../config/config";
const URL = `${server}/mostPopular`;

export const increase = async (categoryName, isCoin) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName, isCoin }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const getMostPopular = async () => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
