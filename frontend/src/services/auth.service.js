import api from "./api";

export async function registerUser(data) {
  const response = await api.post("/auth/register", data);
  return response.data;
}
export async function loginUser(data){
    const response = await api.post("/auth/login",data);
    return response.data;
}
export async function logoutUser() {
    await api.post("/auth/logout");
  }
  export async function getMe() {
    const response = await api.get("/auth/me");
    return response.data;
  }
  