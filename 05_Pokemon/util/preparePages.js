import { readPage, renderPage } from "./templateEngine.js";


const frontPage = readPage(`./public/pages/frontpage/front.html`)

export const frontPageFull = renderPage(frontPage,{
    tabTitle: "Battle",
    //cssLinks: "/assets/css/main.css"    
})

const battlePage = readPage(`./public/pages/battle/battle.html`)
export const battlePageFull = renderPage(battlePage,{ tabTitle: "Battle"})
const contactPage = readPage(`./public/pages/contact/contact.html`)
export const contactPageFull = renderPage(contactPage,"Contact")