import { app } from "./app.js";
import { connectDb } from "./data/connectDB.js";



connectDb();

app.listen(process.env.PORT, () => console.log(`server Started on http://localhost:${process.env.PORT}`))