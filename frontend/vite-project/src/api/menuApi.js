import apiClient from "./apiClient";

export const getMenuItems = async () => {
  return apiClient("/menu");
};

export const getMenuByCategory = async (categoryId) => {
  return apiClient(`/menu/category/${categoryId}`);
};

export const createMenuItem = async (menuData) => {
  return apiClient("/menu", {
    body: menuData,
  });
};

export const updateMenuItem = async (id, menuData) => {
  return apiClient(`/menu/${id}`, {
    method: "PUT",
    body: menuData,
  });
};

export const toggleMenuItemAvailability = async (id) => {
  return apiClient(`/menu/toggle/${id}`, {
    method: "PUT",
  });
};