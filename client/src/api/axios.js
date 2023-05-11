import axios from "axios";

const API_BASE_URL = "/api/";

export default axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 400,
});
