
fetch("/battlepokemon")
.then((response) => response.json())
.then((result) => {
    const pokemonNameHeader = document.getElementById("your-pokemon-name");
    pokemonNameHeader.innerText = result.data.name

    const imageWrapperDiv = document.getElementById("your-pokemon-sprite");
    imageWrapperDiv.innerHTML = `<img class="sprite "src="${result.data.sprite}">` 
    
    const pokemonPowerHeader = document.getElementById("your-pokemon-power")
    pokemonPowerHeader.innerText = result.data.power  
})