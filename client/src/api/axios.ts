import axios from "axios";

const API_BASE_URL: string = "/api/";


export default axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 400,
});


// axios instance for requesting private resources
export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, //include cookies (REFRESH JWT cookie)
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status >= 200 && status < 400,
});
