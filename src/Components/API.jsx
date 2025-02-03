import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Pages/AuthPages/AuthContext";

const API = axios.create({
  baseURL: "https://erisn-api.onrender.com", // Replace with your actual API URL
});

// Add a response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.message === "Invalid token.") {
      const { logout } = useContext(AuthContext);
      logout(); // Automatically logout if token is invalid
    }
    return Promise.reject(error);
  }
);

export default API;
