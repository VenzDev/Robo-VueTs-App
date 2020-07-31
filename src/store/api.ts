import axios from "axios";
import {
  UserResponse,
  RegisterSubmit,
  AddRobotSubmit,
  EditRobotSubmit
} from "./models";

axios.defaults.baseURL = "http://localhost:3000";

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

export const apiUsers = async () => {
  const fetchedData = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return fetchedData.data;
};

export const apiRobotById = async (id: string) => {
  const fetchedData = await axios.get(`/user/findRobot?robotId=${id}`);
  return fetchedData.data;
};

export const apiAddRobot = async (robotSubmit: AddRobotSubmit) => {
  const fetchedData = await axios.post("/user/addRobot", robotSubmit);
  return fetchedData.data;
};

export const apiDeleteRobot = async (id: string) => {
  const fetchedData = await axios.post("/user/deleteRobot?robotId=" + id);
  return fetchedData.data;
};

export const apiEditRobot = async (editRobotSubmit: EditRobotSubmit) => {
  console.log(editRobotSubmit);
  const fetchedData = await axios.post("/user/editRobot", editRobotSubmit);
  return fetchedData.data;
};
