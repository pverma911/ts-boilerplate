export interface UserModel {
  name: string;
  email: string;
  password: string;
  age: number;
  role: number;
}

export interface TokenUser {
  email: string;
  role: number;
}

export interface decodedUserToken {
  email: string;
  role: number;
}
