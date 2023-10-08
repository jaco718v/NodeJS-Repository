const express = require("express");
const app = express();

app.use(express.static("public"));

app.use(express.json());

const welcomeMessageUtil = require("./util/welcomeMessage.js") //Autocompletes .js

//console.log(process.env); // Shows enviroment variabels + other


app.get("/",(req, res) => {
    res.sendFile(__dirname + "/public/home.html");
})

app.get("/second",(req, res) => {
    res.sendFile(__dirname + ("/public/secondPage.html"))
})


app.get("/welcomeMessage",(req, res) => {
    res.send({data: "Chugga choo choo"});
})

//Serverside redirect
app.get("/doorman/:key",(req, res) => {
    if(req.params.key === "Spoink"){
        return res.redirect("/welcomeMessasge")
    }
    res.send({data: "Correct key not provoded"})
})

app.get("/yourMessage",(req, res) => {
    const clientName = req.query.user
    const message = welcomeMessageUtil.getWelcomeMessage(clientName)
    res.send( {data: message})
})

app.get("/proxyserver",(req,res) => {
    fetch("http://www.google.com")
    .then((response) => response.text())
    .then((result) => res.send(result))
})


const PORT = Number(process.env.PORT) || 8080
app.listen(PORT, () => console.log("server is running on port: ", PORT))

