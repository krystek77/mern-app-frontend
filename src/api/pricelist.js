const URL = 'http://localhost:4000/pricelist';

export const getPriceListsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(`${URL}/${categoryId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const getPriceList = async (productId) => {
  try {
    const response = await fetch(
      `${URL}/product/${decodeURIComponent(productId)}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const createPriceList = async (data) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePriceHeating = async (data, priceListId) => {
  try {
    const response = await fetch(`${URL}/product/${priceListId}/heating`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      method: 'PATCH',
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePriceControl = async (data, priceListId) => {
  try {
    const response = await fetch(`${URL}/product/${priceListId}/control`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      method: 'PATCH',
    });

    const result = response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePriceVoltage = async (data, priceListId) => {
  try {
    const response = await fetch(`${URL}/product/${priceListId}/voltage`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      method: 'PATCH',
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePriceOption = async (data, priceListId) => {
  try {
    const response = await fetch(`${URL}/product/${priceListId}/option`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      method: 'PATCH',
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
