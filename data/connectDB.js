import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conection = await mongoose.connect(process.env.MONGO_URI, { dbName: "Todo_MERN" })
        console.log(`Database connected on ${conection.connection.host}`)
    } catch (error) {
        console.error("Database connection failed..........")
    }
}
