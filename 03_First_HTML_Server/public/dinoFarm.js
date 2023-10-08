const extinctDinos = ["🦕", "🦖", "🦴", "🍗"];

export function getExtinctDinos(){
    return extinctDinos
}

export function addDino(newDino){
    extinctDinos.push(newDino)  
}

export default {
    getExtinctDinos,
    addDino
}

