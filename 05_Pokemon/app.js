import express from "express"; //Type module in package.json
//const express = require("express"); //Forældet
const app = express();
app.use(express.static("public"));
app.use(express.json());

import path from "path"
import { getRandomNumber } from "./util/randomUtil.js";

import { frontPageFull, battlePageFull, contactPageFull } from "./util/preparePages.js";


app.get("/",(req, res) => {
    res.send(frontPageFull)
})

app.get("/battle",(req, res) => {
    res.send(battlePageFull)
})

app.get("/contact",(req, res) => {
    res.send(contactPageFull)
})



//-------------------------------------

let currentPokemon

app.get("/battlepokemon", (req ,res) => {
    

    if(!currentPokemon || currentPokemon.power <= 1){  
    const randomPKMid = getRandomNumber(1,151)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPKMid}`)
    .then((response) => {
        if(!response.ok){
            throw new Error("Error getting a pokemon")
        }
        return response.json()
    })
    .then((result) => {
        currentPokemon = {
            name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
            sprite: result.sprites.front_default,
            power: getRandomNumber(1,10)
        }
        res.send({data: currentPokemon})
    })} else {
        currentPokemon.power--
        res.send({data: currentPokemon})
    }
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})