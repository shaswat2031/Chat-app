import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-app-k703.onrender.com/api",
  withCredentials: true, // Allows sending cookies with requests
});
