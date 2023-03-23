import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({ path: "./config.env" });

export const app = express();




// Using Middlewares
app.use(express.json());
app.use(morgan());
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONT_END_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

// Using Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);


// error handler middleware

app.use(errorMiddleware)