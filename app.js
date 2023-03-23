import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./config.env" });

export const app = express();




// Using Middlewares
app.use(express.json());
app.use(morgan());
app.use(cookieParser())

// Using Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);