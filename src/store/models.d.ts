export interface User {
  name: string;
  surname: string;
  email: string;
}
export interface UserResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  token: string;
}

export interface UserSubmit {
  email: string;
  password: string;
}
