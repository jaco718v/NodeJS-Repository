import { Router } from "express";
const router = new Router

router.get("/api/lovers",(req, res) => {
  res.send({data: req.session.lover})
})

router.post("/api/lovers",(req, res) => {
  req.session.lover = req.body.lover //query note
  res.send({data: req.session.lover})
})

export default router