import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api" 
    : "https://chat-app-ujwm.vercel.app/api",
  withCredentials: true,
});