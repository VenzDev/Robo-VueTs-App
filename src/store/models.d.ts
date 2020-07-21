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
