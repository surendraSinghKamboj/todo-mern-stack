import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "Todo_MERN" })
        console.log("Database connected.........")
    } catch (error) {
        console.error("Database connection failed..........")
    }
}
