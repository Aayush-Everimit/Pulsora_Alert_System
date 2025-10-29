import axios from "axios";
const ApiBaseUrl = "/api";
const apiClient = axios.create({
  baseURL: ApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
