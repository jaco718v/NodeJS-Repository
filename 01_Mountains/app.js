const app = require("express")();

const mountains = ["Everest", "Fuji", "Etna", "Andes", "Denali"]

app.get("/",(req, res) => {
    res.send(mountains)
});

app.get("/:id",(req, res) => {
    let id = req.params.id
    res.send(mountains[id])
});

app.listen(8080);