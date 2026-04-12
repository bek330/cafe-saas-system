
const BASE_URL = "http://localhost:5000";

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};