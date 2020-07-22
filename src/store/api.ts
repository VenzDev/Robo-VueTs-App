import axios from "axios";
import { UserResponse, RegisterSubmit } from "./models";

axios.defaults.baseURL = "https://vue10.herokuapp.com";

axios.interceptors.request.use(req => {
  const token = localStorage.getItem("token");

  req.headers.authorization = token ? `Bearer ${token}` : "";
  return req;
});

export const apiLogin = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  const fetchedData = await axios.post("/user/login", { email, password });
  return fetchedData.data;
};

export const apiRegister = async (registerSubmit: RegisterSubmit) => {
  const fetchedData = await axios.post("/user/register", registerSubmit);
  return fetchedData.data;
};

export const apiAuth = async () => {
  const fetchedData = await axios.get("/user/auth");
  return fetchedData.data;
};
