import express from "express"
import { newTask, readTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, newTask)

router.get("/read", isAuthenticated, readTask)

export default router