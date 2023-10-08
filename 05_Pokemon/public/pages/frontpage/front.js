function getRandomNumber(min, max){
    const randomNumber = Math.floor(Math.random()*(max-min)+min)
    return randomNumber
}

const randomPKMid = getRandomNumber(1, 151)


const response = fetch(`https://pokeapi.co/api/v2/pokemon/${randomPKMid}`)
.then((response) => {
    if(!response.ok){
        throw new Error("Error getting a pokemon")
    }
    return response.json()})
.then((response) => {
    const nameHeader = document.getElementById("pokemon-name");
    nameHeader.innerText = response.name.charAt(0).toUpperCase() + response.name.slice(1)

    const imageWrapperDiv = document.getElementById("sprite");
    imageWrapperDiv.innerHTML = 
    `<img class="sprite "src="${response.sprites.front_default}">`  
})


