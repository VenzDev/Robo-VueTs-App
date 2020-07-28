export interface User {
  name: string;
  surname: string;
  email: string;
  robots: Array<Robot> | [];
}
export interface UserResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  token: string;
  robots: Array<Robot> | [];
}

export interface UserSubmit {
  email: string;
  password: string;
}

export interface UserState {
  user: User | null;
  errorMessage: string | null;
}

export interface RegisterSubmit {
  name: string;
  surname: string;
  email: string;
  password: string;
}
export interface AddRobotSubmit {
  name: string;
  surname: string;
  email: string;
  country: string;
}
export interface UserAuthResponse {
  name: string;
  surname: string;
  email: string;
  robots: Array<Robot> | [];
}
export interface Robot {
  name: string;
  surname: string;
  email: string;
  country: string;
  user: string;
}
