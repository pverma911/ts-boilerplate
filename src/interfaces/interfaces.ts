export interface UserModel {
  name: string;
  email: string;
  password: string;
  age: number;
  role: Number;
}

export interface decodedUserToken {
  email: string;
  role: number;
}
