const express = require("express");

const app = express();

app.use(express.json());

let idNext = 0;

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
    res.send({data: mountains.find((n)=> n.id === id)})
});

app.post(path, (req, res) => {
    mountains.push({id: idNext++, name:req.body.name, height: req.body.height})
    res.send(req.body)
});

app.put(path+"/:id", (req, res) => {
    let id = Number(req.params.id)
    const foundMountain = mountains.find((n)=> n.id === id)
    if(!foundMountain){
        res.send("Id not found")
        return
    }
    if(req.body.name!=null){
        foundMountain.name = req.body.name
    }
    if(req.body.height!=null){
        foundMountain.height = req.body.height
    }
    res.send(foundMountain)
});

app.delete(path+"/:id", (req, res) => {
    let id = Number(req.params.id)
    const arrIndex = mountains.findIndex((n)=> n.id === id)
    if(arrIndex === -1){
        res.send("Id not found")
        return
    }
    mountains.splice(arrIndex,1)
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