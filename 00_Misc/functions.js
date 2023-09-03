// Hoisting - Functions get parsed
console.log(gerRandomInt())

function gerRandomInt(min, max){
    return 5
}


const jump = (name) => `${name} is jumping`

console.log(genericActionPeformer(jump,"Jacob"))


function genericActionPeformer(generic, name){
    return generic(name)
}

const run = function(name){
    return `${name} is running`
}

console.log(genericActionPeformer(run,"Jacob"))

console.log(genericActionPeformer((name) => `${name} is sleeping`, "Jacob"))
