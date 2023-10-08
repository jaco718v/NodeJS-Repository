const express = require("express");
const app = express();

//Locale
console.log(Date())
//UTC
console.log(new Date())
//Epoch timestamp / Unix
console.log(Date.now())

const path = "/date"

// create route thay returns the date
app.get(path+"/now",(req,res) => { 
    res.send({data: new Date()})
})

// Create a route that return current month
app.get(path+"/month",(req,res) => {
    const currentMonth = new Date().toLocaleDateString("DAN", {month: "long"})
    res.send({data: currentMonth})
})
// Create a route that returns the current day
app.get(path+"/day",(req,res) => {
    const currentDay = new Date().toLocaleDateString("DAN", {weekday: "long"})
    res.send({data: currentDay})
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app