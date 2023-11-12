import express from 'express'
const app = express()

app.use(express.json())

import superMarketRouter from './routers/supermarketRouters.js'
app.use(superMarketRouter)



const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log("Running on PORT: " + PORT))