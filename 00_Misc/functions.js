// Hoisting - Functions get parsed
console.log(gerRandomInt())

function gerRandomInt(min, max){
    return 5
}


function genericActionPeformer(generic, name){
    return generic(name)
}

const jump = (name) => `${name} is jumping`

console.log(genericActionPeformer(jump,"Jacob"))


const run = function(name){
    return `${name} is running`
}

console.log(genericActionPeformer(run,"Jacob"))

console.log(genericActionPeformer((name) => `${name} is sleeping`, "Jacob"))
