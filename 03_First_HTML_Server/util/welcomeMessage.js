const welcomeMessageJson = require("./welcomeMessage.json") // Forældet brug hellere import/export

function getWelcomeMessage(clientName){
    if(!clientName){
        return welcomeMessageJson.noNameWelcomeMessage
    } else {
    return welcomeMessageJson.nameWelcomeMessage.replace("$clientName", clientName)
}
}

module.exports = {
    getWelcomeMessage,
    name: "Bob"
}