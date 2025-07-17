import axios from "axios";

const instance = axios.create({
  baseURL: "https://blood-bank-backend-0loe.onrender.com/api/v1",
});

// Add the token to headers before each request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("bloodbank_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
