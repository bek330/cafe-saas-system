import apiClient from "./apiClient";

export const getDashboardSummary = async (range = 7) => {
  return apiClient(`/admin/dashboard/summary?range=${range}`);
};

export const uploadFile = async (formData) => {
  return apiClient("/upload", {
    method: "POST",
    body: formData,
  });
};
