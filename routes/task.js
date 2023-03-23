import express from "express"
import { deleteTask, newTask, readTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, newTask)

router.get("/read", isAuthenticated, readTask)

router.route("/:id").put(isAuthenticated, updateTask)
                    .delete(isAuthenticated, deleteTask)


export default router