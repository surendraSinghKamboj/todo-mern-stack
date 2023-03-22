import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const status = await mongoose.connect("mongodb://127.0.0.1:27017")
        console.log("Database conncted.........")
    } catch (error) {
        console.log(error)
    }
}
