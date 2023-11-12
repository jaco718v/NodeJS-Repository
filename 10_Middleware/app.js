import express from "express";
import {rateLimit} from "express-rate-limit";
import roomsRouter from "./routers/roomsRouter.js";
import furnitureRouter from "./routers/furnitureRouter.js";
import authRouter from "./routers/authRouter.js"

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false,
})

const authlimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false,
})

//Order matters
app.use(limiter) 

function ipLogger(req, res, next){
  console.log(req.ip)
  next()
}

app.use("/room", ipLogger)

app.use(roomsRouter)
app.use(furnitureRouter)
//app.use("/furniture", furnitureRouter)

app.use(authRouter)

app.get("*",(req, res) => {
  res.send({data: `404 page not found`})
})


app.all("*",(req, res) => {
  res.send({data: `Unsurpported path: ${req.path}`})
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log("Server is running on PORT: " + PORT))