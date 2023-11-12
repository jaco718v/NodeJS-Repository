import { Router } from "express";
const router = Router()
import db from "../databases/connection.js"


router.get("/api/supermarkets", async (req,res) => {
  const supermarkets = await db.all("SELECT * FROM supermarkets;")
  console.log(supermarkets)
  res.send({data: supermarkets})
})

router.post("/api/supermarkets", (req, res) => {
  console.log(req.body.name)
  res.send({data: null})
})


export default router