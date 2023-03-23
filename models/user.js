import mongoose from "mongoose";

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Users = mongoose.model("Users", users); 