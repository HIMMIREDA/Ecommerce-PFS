import axiosInstance, { axiosPrivate } from "../../api/axios";
import { LoginPayload, RegisterPayload } from "../../types/payloads";
import { User } from "../../types/user";

const registerUser = async (user: RegisterPayload) => {
  const response = await axiosInstance.post("/auth/register", user);
  return response?.data;
};

const logoutUser = async () => {
  const response = await axiosPrivate.get("/auth/logout");
  return response?.data;
};

const loginUser = async (user: LoginPayload) => {
  const response = await axiosInstance.post<User>("/auth", user);

  return response?.data;
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;