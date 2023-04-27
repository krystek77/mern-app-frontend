const URL = "http://localhost:4000/document";
export const getDocuments = async () => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const createDocuments = async (documents) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      body: documents,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDocument = async (slug) => {
  try {
    const response = await fetch(`${URL}/${slug}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDisplayFileName = async (slug, displayFileName) => {
  try {
    const response = await fetch(`${URL}/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({displayFileName}),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
