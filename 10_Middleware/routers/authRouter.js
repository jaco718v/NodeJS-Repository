import { Router } from "express";

  const router = Router()

function authenticate(req ,res, next){
  if(req.params.name === "Bob" && req.params.pwd === "123"){
    next()
  }else{
    res.send({data: "You are not Bob"})
  }
}

router.get("/login" ,(req,res) => {
  res.redirect("/login/:name/:pwd")
})

router.get("/login/:name/:pwd", authenticate ,(req ,res ) => {
  res.send({data:"You are Bob!"})
})

export default router