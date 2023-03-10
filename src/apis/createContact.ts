import axios from "axios";

let baseURL = "";

if (import.meta.env.VITE_MODE === "production") {
  baseURL = import.meta.env.VITE_API_URL_PROD;
} else if (import.meta.env.VITE_MODE === "development") {
  baseURL = import.meta.env.VITE_API_URL_DEV;
}

export const apiCreateContact = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
