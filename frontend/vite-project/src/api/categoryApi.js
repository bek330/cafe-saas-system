import apiClient from "./apiClient";

export const getCategories = async () => {
  return apiClient("/categories");
};

export const createCategory = async (categoryData) => {
  return apiClient("/categories", {
    body: categoryData,
  });
};

export const updateCategory = async (id, categoryData) => {
  return apiClient(`/categories/${id}`, {
    method: "PUT",
    body: categoryData,
  });
};

export const deleteCategory = async (id) => {
  return apiClient(`/categories/${id}`, {
    method: "DELETE",
  });
};