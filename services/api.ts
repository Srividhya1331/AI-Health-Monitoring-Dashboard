import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ✅ THIS IS IMPORTANT
export const getHealthData = () => {
  return API.get("/health/");
};