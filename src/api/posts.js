import {server} from '../config/config'
const URL = `${server}/post`;

export const getPosts = async () => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMarkdownPosts = async () => {
  try {
    const response = await fetch(`${URL}/posts/markdown`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMarkdownPost = async (id) => {
  try {
    const response = await fetch(`${URL}/markdown/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = async (post) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: post,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = async (slug) => {
  console.log('GET POST');
  try {
    const response = await fetch(`${URL}/${slug}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (slug) => {
  try {
    const response = await fetch(`${URL}/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = async (slug, data) => {
  console.log('UPDATE POST');
  try {
    const response = await fetch(`${URL}/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const countPosts = async () => {
  try {
    const response = await fetch(`${URL}/posts/count`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
