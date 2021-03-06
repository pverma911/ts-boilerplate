import mongoose from "mongoose";

export const connectToDb = async () => {
  const dbConnect: Promise<any> = new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => {
        console.log("Database connection has been established");
        resolve("Database connection has been established");
      })
      .catch((err) => reject(err));
  });

  return dbConnect;
};
