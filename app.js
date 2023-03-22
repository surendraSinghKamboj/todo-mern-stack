import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config({ path: "./config.env" });

export const app = express();




// Using Middlewares
app.use(express.json());
app.use(morgan());

// Using Routes
app.use("/user", userRouter);