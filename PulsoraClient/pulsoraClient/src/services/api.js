import axios from "axios";
const ApiBaseUrl = "https://marquerite-unprotecting-amber.ngrok-free.dev";
const apiClient = axios.create({
  baseURL: ApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
