import ErrorHandler from "../middlewares/error.js"
import { Tasks } from "../models/task.js"


// Create new Task

export const newTask = async (req, res, next) => {
    const { title, description } = req.body

    try {
        const task = new Tasks({ title, description, user: req.user })
        await task.save()
        return res.status(201).json({ success: true, message: "Todo task created successfully......" })
    } catch (error) {
        return next(new ErrorHandler("todo task not created", 401))
    }
}


// read all created Tasks

export const readTask = async (req, res, next) => {
    const userId = req.user._id
    try {
        const tasks = await Tasks.find({ user: userId })
        res.status(200).json({ success: true, message: "successfull", data: tasks })
    } catch (error) {
        return next(new ErrorHandler("tasks not found", 404))
    }
}


// Udate existing Task

export const updateTask = async (req, res, next) => {


    try {
        const task = await Tasks.findById(req.params.id);
        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(202).json({ success: true, message: "task updated successfully." })

    } catch (error) {
        return next(new ErrorHandler("not in tasks", 404))

    }
}

// Delete existing task

export const deleteTask = async (req, res, next) => {

    try {
        const task = await Tasks.findById(req.params.id);
        await task.deleteOne();
        res.status(202).json({ success: true, message: "task deleted successfully." })
    } catch (error) {
        return next(new ErrorHandler("Invalid Id", 404))
    }
}