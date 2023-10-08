const express = require("express");

const app = express();

app.use(express.json());

let idNext = 1;

const mountains = [
    {id: idNext++, name: "Everest", height: "Tall"},
    {id: idNext++, name: "Fuji", height: "Medium rare"},
    {id: idNext++, name: "Etna", height: "Epic"},
    {id: idNext++, name: "Andes", height: "8/10"},
    {id: idNext++, name: "Denali", height: "Surprising"}
   ]

const path = "/mountains"

app.get(path,(req, res) => {
    res.send({data: mountains})
});

app.get(path+"/:id",(req, res) => {
    let id = Number(req.params.id)
    res.status(404).send({ error: `Could not find item with id= ${id}`})
});

app.post(path, (req, res) => {
    mountains.push({id: idNext++, name:req.body.name, height: req.body.height})
    res.send(req.body)
});


app.patch(path+"/:id", (req, res) => {
    let id = Number(req.params.id)
    const foundMountain = mountains.find((n)=> n.id === id)
    if(!foundMountain){
        res.status(404).send({ error: `Could not find item with id= ${id}`})
        return
    }
    if(req.body.name!=null){
        foundMountain.name = req.body.name
    }
    if(req.body.height!=null){
        foundMountain.height = req.body.height
    }
    res.send({data:foundMountain})
});

app.put(path+"/:id", (req, res) => {
    let id = Number(req.params.id)
    const foundIndex = mountains.findIndex((n)=> n.id === id)
    if(!foundMountain){
        res.status(404).send({ error: `Could not find item with id= ${id}`})
        return
    }
    mountains[foundIndex] = {...mountains[foundIndex],...req.body, id: Number(req.params.id)}
    res.send({data: foundMountain})
});

app.delete(path+"/:id", (req, res) => {
    let id = Number(req.params.id)
    const arrIndex = mountains.findIndex((n)=> n.id === id)
    if(arrIndex === -1){
        res.status(404).send({ error: `Could not find item with id= ${id}`})
        return
    }
    mountains.splice(arrIndex, 1)
    res.send("Delete complete")
});


const PORT = 8080
app.listen(PORT, (error) => {
    if(error){
        console.log("Error starting the server", error)
        return;
    }
    console.log("Server is running on port", PORT);
});