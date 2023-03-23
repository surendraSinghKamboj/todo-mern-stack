import { Tasks } from "../models/task.js"

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



export const readTask = async (req, res) => {
    const userId = req.user._id
    try {
        const tasks = await Tasks.find({ user: userId })
        res.status(200).json({ success: true, message: "successfull", data: tasks })
    } catch (error) {
        return req.status(404).json({ success: false, message: "Tasks not found" })
    }
}