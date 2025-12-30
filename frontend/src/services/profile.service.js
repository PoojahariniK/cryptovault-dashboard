import api from "./api";

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const updateUsername = async (username) => {
  return api.put("/profile/update-name", { username });
};

export const changePassword = async (data) => {
  return api.put("/profile/change-password", data);
};
