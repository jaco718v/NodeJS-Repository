import { Router } from "express";

 const furnitureRouter = Router()

  furnitureRouter.get("/chair",(req,res) => {
    res.send({data: "Chair"})
    }
  )

  furnitureRouter.get("/sofa",(req,res) => {
    res.send({data: "Sofa"})
    }
  )

export default furnitureRouter
 