const BASE_URL = "http://localhost:5000";

// 🧾 CREATE ORDER (customer)
export const createOrder = async (data) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      table_number: data.table_number,
      items: data.items,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to create order");
  }

  return res.json();
};

// 📦 GET ALL ORDERS (admin)
export const getOrders = async (token) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Request failed");
  }

  return res.json();
};

// 🔄 UPDATE ORDER STATUS (admin)
export const updateOrderStatus = async (id, status, token) => {
  const res = await fetch(`${BASE_URL}/orders/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "Request failed");
  }

  return res.json();
};