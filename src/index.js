import app from "./app.js";
import { connectToDb } from "./config/connectToDb.js";
import env from "./utils/validateEnv.js";

const port = env.PORT || 5005;

if (!port || !env.MONGO_URI) {
  throw new Error(
    "Please ensure that you have a port and your MONGO connection in place"
  );
}

export const startServer = async () => {
  await connectToDb();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();

