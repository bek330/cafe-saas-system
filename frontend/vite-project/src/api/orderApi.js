export const createOrder = async (data) => {
  const res = await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      table_number: data.table_number,
      items: data.items, // ✅ FIXED
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("API ERROR:", error);
    throw new Error(error.error || "Failed");
  }

  return res.json();
};

export const getOrderById = async (id) => {
  const res = await fetch(`http://localhost:5000/orders/${id}`);

  if (!res.ok) throw new Error("Failed to fetch order");

  return res.json();
};