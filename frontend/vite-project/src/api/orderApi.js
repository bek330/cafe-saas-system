import apiClient from "./apiClient";

// 🧾 CREATE ORDER (customer)
export const createOrder = async (data) => {
  return apiClient("/orders", {
    body: {
      table_number: data.table_number,
      items: data.items,
    },
  });
};

// 📦 GET ALL ORDERS (admin)
export const getOrders = async () => {
  return apiClient("/orders");
};

// 🔄 UPDATE ORDER STATUS (admin)
export const updateOrderStatus = async (id, status) => {
  return apiClient(`/orders/${id}/status`, {
    method: "PUT",
    body: { status },
  });
};

export const getOrderHistory = async (params) => {
  const query = new URLSearchParams(params);
  return apiClient(`/orders/history?${query.toString()}`);
};