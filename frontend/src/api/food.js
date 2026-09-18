const API = import.meta.env.VITE_API_URL || '/api';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

export const getFoods = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetch(`${API}/foods${query ? '?' + query : ''}`).then(handleResponse);
};

export const getFoodById = (id) =>
  fetch(`${API}/foods/${id}`).then(handleResponse);

export const createFood = (token, foodData) =>
  fetch(`${API}/foods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(foodData),
  }).then(handleResponse);

export const updateFood = (token, id, foodData) =>
  fetch(`${API}/foods/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(foodData),
  }).then(handleResponse);

export const deleteFood = (token, id) =>
  fetch(`${API}/foods/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
