import apiClient from "./apiClient";

export const getDashboardSummary = async () => {
  return apiClient("/admin/dashboard/summary");
};

export const uploadFile = async (formData) => {
  return apiClient("/upload", {
    method: "POST",
    body: formData,
  });
};
