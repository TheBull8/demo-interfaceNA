import axios from "axios";

const BASE_URL = "https://api.rarible.org/";
const apiKey = import.meta.env.VITE_API_KEY;

export const raribleHttpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "X-API-KEY": apiKey,
  },
});
