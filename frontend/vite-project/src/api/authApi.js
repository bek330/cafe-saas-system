import apiClient from "./apiClient";

export const login = async (username, password) => {
  return apiClient("/auth/login", {
    body: { username, password },
  });
};
