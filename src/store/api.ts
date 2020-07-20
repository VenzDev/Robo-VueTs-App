import axios from "axios";
import { UserResponse } from "./models";

axios.defaults.baseURL = "https://vue10.herokuapp.com/";

export const apiLogin = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  const fetchedData = await axios.post("/user/login", { email, password });
  return fetchedData.data;
};
