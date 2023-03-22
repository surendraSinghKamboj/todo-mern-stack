import mongoose from "mongoose";

const tasks = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Tasks = mongoose.model("Tasks", tasks); 