const express = require("express")

const app = express()

app.use(express.json())

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/public/home.html");
})

app.get("/second",(req, res) => {
    res.sendFile(__dirname + ("/public/secondPage.html"))
})

app.listen(8080)