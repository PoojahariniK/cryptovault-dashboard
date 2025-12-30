import api from "./api";

export const addAsset = (data) => {
  return api.post("/assets", data);
};

export const getAssets = () => {
  return api.get("/assets");
};

export const updateAsset = (id, quantity) => {
  return api.put(`/assets/${id}`, { quantity });
};

export const deleteAsset = (id) => {
  return api.delete(`/assets/${id}`);
};
