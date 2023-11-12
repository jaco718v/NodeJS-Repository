// import dotenv from "dotenv"
// dotenv.config()

import "dotenv/config"

import  express  from "express"
const app = express()

import path from "path"
app.use(express.static(path.resolve('../client/dist')))

app.use(express.json())

import helmet from "helmet"
app.use(helmet())


import cors from "cors"
app.use(cors({
  credentials: true,
  origin: true
}))


//console.log(process.env.SESSION_SECRET)

import session from "express-session"

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

import usersRouter from "./routers/usersRouter.js"
app.use(usersRouter)

import coffeRouter from "./routers/coffesRouter.js"
app.use(coffeRouter)

import loversRouter from './routers/loversRouter.js'
app.use(loversRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve('../client/dist/index.html'))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log("Server is running on " + PORT))
