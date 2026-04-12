const BASE_URL = "http://localhost:5000";

export const getMenuByCategory = async (categoryId) => {
  const res = await fetch(`${BASE_URL}/menu/category/${categoryId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch menu items");
  }

  return res.json();
};