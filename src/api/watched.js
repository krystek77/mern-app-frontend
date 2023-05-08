import { server } from "../config/config";
const URL = `${server}/watched`;

export const getLastWatched = async () => {
  try {
    const response = await fetch(URL, { method: "GET", headers: { "Content-Type": "application/json" } });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const addLastWatched = async (model) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({model}),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
