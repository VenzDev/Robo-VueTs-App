import axios from "axios";
import { UserResponse, RegisterSubmit } from "./models";

axios.defaults.baseURL = "https://vue10.herokuapp.com/";

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
