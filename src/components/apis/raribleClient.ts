import axios from "axios";

const BASE_URL = "https://testnet-api.rarible.org/";

export const raribleHttpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "X-API-KEY": import.meta.env.VITE_API_KEY,
  },
});
