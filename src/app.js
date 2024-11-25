import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import bookRoutes from "./routes/book.js"
import { isHttpError } from "http-errors";


dotenv.config();
const app = express();

const corsOptions = {
  origin: ['http://localhost:5000'],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(json({ limit: "25mb" }));

app.disable("x-powered-by");

app.use("/api/v1/book", bookRoutes);

app.use((req, res, next) => {
    return next(createHttpError(404, "Endpoint not found"));
  });

  app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "An unknown error has occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
  });

  export default app;