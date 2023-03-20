console.clear();
import express from "express";
import os, { cpus } from "os";

const app = express();

//  middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());

// routes
app.get("/", (req, res) => {
    res.render("index");
});

console.log(os.networkInterfaces())

app.get("/dashboard", (req, res) => {
    const values = {
        arch: os.arch(),
        ostype: os.type(),
        osplatform: os.platform(),
        totalmem: `${parseFloat(os.totalmem() / 1073741824).toFixed(1)} Gb`,
        freemem: `${parseFloat(os.freemem() / 1073741824).toFixed(1)} Gb`,
        cpus: os.cpus(),
        network_wifi: os.networkInterfaces()["Wi-Fi"],
        network_loop_back: os.networkInterfaces()["Loopback Pseudo-Interface 1"]
    };
    res.render("dashboard", values);
});

app.post("/register", (req, res) => {
    console.log(req.body);
    res.redirect("dashboard");
});

app.listen(3300, () => console.log("Server Started"));
