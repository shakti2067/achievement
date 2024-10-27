import api from "../api";
import { ACCESS_TOKEN } from "../helper/constant";
import { LoginFormProps, SignupRequestParams } from "./types";

export const me = () => {
  return api.get("/api/me");
};

export const signUp = (data: SignupRequestParams) => {
  return api.post("/api/register", data);
};

export const signIn = async (data: LoginFormProps) => {
  const users = await api.get("/api/admin-login");
  // const users = await api.get("/users");

  const user = await users.data.find((user: LoginFormProps) => user);

  console.log(user, "user cred response");

  if (user.email === data.email && user.password === data.password) {
    return { data: ACCESS_TOKEN };
  } else {
    return Promise.reject(new Error("User not found"));
  }
};

export const getCurrentUser = (token: string | undefined) =>
  api.get(`/api/users/${token}`);

export const generatedImagesData = () => api.get("/api/images");
