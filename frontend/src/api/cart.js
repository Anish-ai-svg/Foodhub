const API = import.meta.env.VITE_API_URL || '/api';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const getCart = (token) =>
  fetch(`${API}/cart`, { headers: authHeaders(token) }).then(handleResponse);

export const addItem = (token, foodId, quantity = 1) =>
  fetch(`${API}/cart/items`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ foodId, quantity }),
  }).then(handleResponse);

export const updateItem = (token, foodId, quantity) =>
  fetch(`${API}/cart/items/${foodId}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ quantity }),
  }).then(handleResponse);

export const removeItem = (token, foodId) =>
  fetch(`${API}/cart/items/${foodId}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(handleResponse);

export const clearCart = (token) =>
  fetch(`${API}/cart`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(handleResponse);
