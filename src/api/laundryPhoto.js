import {server} from '../config/config'
const URL = `${server}/laundryPhoto`;

export const getLaundryPhotos = async (page, onpage) => {
  try {
    const response = await fetch(`${URL}/?page=${page}&onpage=${onpage}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const getAllLaundryPhotos = async () => {
  try {
    const response = await fetch(`${URL}/laundryPhotos/all`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getLaundryPhoto = async (laundryPhotoId) => {
  try {
    const response = await fetch(`${URL}/${laundryPhotoId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const createLaundryPhotos = async (data) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: data,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLaundryPhoto = async (laundryPhotoId) => {
  try {
    const response = await fetch(`${URL}/${laundryPhotoId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLaundryPhoto = async (laundryPhotoId, data) => {
  try {
    const response = await fetch(`${URL}/${laundryPhotoId}`, {
      method: 'PATCH',
      body: data,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const countLaundryPhotos = async () => {
  try {
    const response = await fetch(`${URL}/laundryPhotos/count`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
