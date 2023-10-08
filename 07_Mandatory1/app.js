import express from "express"; 
import fs from "fs"

const app = express();
app.use(express.static("public"));
app.use(express.json());


const hardcodedUsername = "Donald"
const hardcodedPassword = "Cheeseburger"
const secret ="Hamburger"

const frontPage = fs.readFileSync(`./public/pages/frontpage/frontpage.html`).toString()
const homePage = fs.readFileSync(`./public/pages/homepage/homepage.html`).toString()
const part1Page = fs.readFileSync(`./public/pages/part1/part1.html`).toString()
const part2Page = fs.readFileSync(`./public/pages/part2/part2.html`).toString()
const part3Page = fs.readFileSync(`./public/pages/part3/part3.html`).toString()

app.get("/",(req,res) =>{
    res.send(frontPage)
})

app.get("/login",(req,res) => {
    if(req.query.username ===  hardcodedUsername && req.query.password === hardcodedPassword){
    res.send(homePage)
    } else {
    res.send(frontPage)
    }
})

app.get("/part1",(req,res) =>{
    if(req.query.secret ===  secret){
        res.send(part1Page)
        } else {
        res.send(frontPage)
        }
})

app.get("/part2",(req,res) =>{
    if(req.query.secret ===  secret){
        res.send(part2Page)
        } else {
        res.send(frontPage)
        }
})


app.get("/part3",(req,res) =>{
    if(req.query.secret ===  secret){
        res.send(part3Page)
        } else {
        res.send(frontPage)
        }
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})