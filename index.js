import express from "express";

const app = express();

//  middlewares

app.use(express.static("public"))



app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(3300, () => console.log("Server Started"));