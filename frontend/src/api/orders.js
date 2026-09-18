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

export const placeOrder = (token, deliveryAddress) =>
  fetch(`${API}/orders`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ deliveryAddress }),
  }).then(handleResponse);

export const getMyOrders = (token) =>
  fetch(`${API}/orders`, { headers: authHeaders(token) }).then(handleResponse);

export const getOrderById = (token, id) =>
  fetch(`${API}/orders/${id}`, { headers: authHeaders(token) }).then(handleResponse);

export const updateOrderStatus = (token, id, status) =>
  fetch(`${API}/orders/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ status }),
  }).then(handleResponse);
