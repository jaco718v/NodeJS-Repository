//Import express
//const express = require("express");
//Instatiate express
//const app = express();

const app = require("express")();



app.get("/",(req, res) => {
    res.send({ data: "This is the first request handler"});
});

//Dog endpoint

app.get("/dog",(req, res) => {
    res.send({dog: "Woof"});
});

app.get("/dog/:first/:second",(req, res) => {
    console.log(req.params.first, req.params.second )
    res.send({dog: "Borf"})
})

app.get("/dog/:id",(req, res) => {
    console.log(req.params.id)
    if(req.params.id == 1){
    res.send({dog: "Borf"})
    }
    else if(req.params.id == 2){
        res.send({dog: "Yip!"})
    }else{
        res.send({dog: "Woof"})
    }
})
let balance = 100

app.get("/wallet/:amount",(req, res) => {
    let amount = req.params.amount

    if(balance < amount){
        res.send({message: "Not enough dosh in your wallet, bud!"})
    } else{
        res.send({message: `Sure pal!, you've withdrawn ${amount} cheetos`})
    }
})

// 80 http
// 443 https
// 8080 http developer port - Tomcat
// 9090 https developer port

app.listen(8080);