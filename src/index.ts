import { app } from "./app";
import { connectToDb } from "./db/connect";

import "dotenv/config";

const startServer = async (): Promise<any> => {
  try {
    await connectToDb();
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        "TS express server running on port " + process.env.PORT || 8000
      );
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
