import  { Router }  from "express";

const router = Router()

router.use((req,res,next) => {
  req.specialString = "Franskbrød"
  next()
})

router.get("/users/", (req,res) => {
  console.log(req.path, ":", req.session)
  if(!req.session.nameOfUser) {
    res.send({data:"Stranger danger!"})
  } else {
  res.send({data: `Your stored name is ${req.session.nameOfUser}`})
}
})

router.get("/users/logout",(req,res) => {
  req.session.nameOfUser = undefined
  
  //delete req.session.nameOfUser

  // req.session.destroy(() => {
  //   res.send({data: "You have been logged out"})
  // })

  res.send({data: "You have been logged out"})
})

router.get("/users/:registeredUserName", (req,res) => {
  console.log(req.path, ":", req.session)
  req.session.nameOfUser = req.params.registeredUserName
res.send({data: `Your name ${req.params.registeredUserName} was stored in the session`})
})

export default router