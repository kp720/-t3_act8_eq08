const BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async (page = 1, limit = 10, search = '', category = '') => {
  const skip = (page - 1) * limit;
  let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

  if (search) {
    url = `${BASE_URL}/search?q=${search}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    url = `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Error de conexión');
  return await response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error('Error al cargar categorías');
  return await response.json();
};

export const addProduct = async (data) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al agregar');
  return await response.json();
};

export const updateProduct = async (id, data) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al actualizar');
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar');
  return await response.json();
};