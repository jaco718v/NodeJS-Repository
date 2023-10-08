import {getExtinctDinos} from "./dinoFarm.js"

function getDinoInfo(){
    const extinctDinos = getExtinctDinos()
    console.log(`There are ${extinctDinos.length} dinos`)
    console.table(extinctDinos)
}

getDinoInfo()