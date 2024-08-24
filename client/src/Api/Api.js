import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;


const api = axios.create({ baseURL });

export async function register(data) {
  return api.post("/auth/register", data);
}

export async function login(data) {
  return api.post("/auth/login", data);
}
