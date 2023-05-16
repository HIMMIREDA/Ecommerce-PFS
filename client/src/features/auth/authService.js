import axios from "../../api/axios";
import axiosInstance, { axiosPrivate } from "../../api/axios";

const registerUser = async (user) => {
  const response = await axiosInstance.post("/auth/register", user);
  return response?.data;
};

const logoutUser = async () => {
  const response = await axios.get("/auth/logout");
  return response?.data;
};

const loginUser = async (user) => {
  const response = await axiosInstance.post("/auth", user);

  return response?.data;
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;