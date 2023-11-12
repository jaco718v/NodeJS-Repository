import { Router } from 'express'

const router = Router()

function butler(req, res, next){
  console.log("Welcome to the mansion", req.ip)
  next()
}

router.get("/room", butler ,(req, res, next) => {
  console.log({data: "room1"})
  next()
})

router.get("/room",(req, res, next) => {
  console.log({data: "room2"})
})

router.get("/room/*",(req, res) => {
  res.send({data: "unknown room"})
})

export default router