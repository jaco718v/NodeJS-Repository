import { Router } from "express";
import bcrypt from 'bcrypt'
import db from "../databases/connection.js"
import { sendMailTest } from "../util/nodemailer.js";

const saltRounds = 14

const router = Router()

async function authorize(req ,res, next){
  const query = "SELECT hashed_password FROM users WHERE username = ?;"
  const sqlData = await db.get(query,[req.body.username])
  
  if(await bcrypt.compare((req.body.password), sqlData.hashed_password)){
    next()
  }else{
    res.send({data:null})
  }
}

router.post("/api/login", authorize ,(req ,res ) => {
  req.session.user = req.body.username
  res.send({data:{username: req.body.username}})
})


async function signup(req ,res, next){
  const query = 'SELECT * FROM users WHERE username = ?;'
  const foundValue = await db.get(query,[req.body.username])
  if(!foundValue){
    const hashed_password = await bcrypt.hash(req.body.password, saltRounds)
    const query = "INSERT INTO users (username, hashed_password) VALUES( ?,?)"
    await db.run(query, [req.body.username, hashed_password])
    await sendMailTest()
    next()
  }else{
    res.send({data: null})
  }
}

router.post("/api/signup", signup, (req, res) => {
  req.session.user = req.body.username
  res.send({data:{username: req.body.username}})
})

function authenticate(req ,res, next){
  if(session.user){
    next()
  }else{
    res.send({data: null})
  }
}

router.get("/signout", authenticate, (req,res) => {
  session.user = undefined
  res.send({data: null})
})

export default router