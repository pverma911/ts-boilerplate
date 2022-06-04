import mongoose, { Schema } from "mongoose";
import { UserModel } from "../interfaces/interfaces";

const user = new Schema<UserModel>({
  name: String,
  age: Number,
  email: String,
  password: String,
  role: { type: Number, default: 1 },
});

const User = mongoose.model("User", user);

export { User };
