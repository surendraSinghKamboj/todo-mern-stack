import { Tasks } from "../models/task.js"


// Create new Task

export const newTask = async (req, res, next) => {
    const { title, description } = req.body

    try {
        const task = new Tasks({ title, description, user: req.user })
        await task.save()
        return res.status(201).json({ success: true, message: "Todo task created successfully......" })
    } catch (error) {
        return res.status(401).json({ success: false, message: "Todo task not created." })
    }
}


// read all created Tasks

export const readTask = async (req, res) => {
    const userId = req.user._id
    try {
        const tasks = await Tasks.find({ user: userId })
        res.status(200).json({ success: true, message: "successfull", data: tasks })
    } catch (error) {
        return req.status(404).json({ success: false, message: "Tasks not found" })
    }
}


// Udate existing Task

export const updateTask = async (req, res) => {


    try {
        const task = await Tasks.findById(req.params.id);
        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(202).json({ success: true, message: "task updated successfully." })

    } catch (error) {
        res.status(403).json({ success: false, message: "failed." })

    }
}

// Delete existing task

export const deleteTask = async (req, res) => {

    try {
        const task = await Tasks.findById(req.params.id);
        await task.deleteOne();
        res.status(202).json({ success: true, message: "task deleted successfully." })
    } catch (error) {
        res.status(403).json({ success: false, message: "failed." })

    }
}