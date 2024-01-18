import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../databases/connection.js";
import { sendMailTest } from "../util/nodemailer.js";

const saltRounds = 14;

const router = Router();

async function authorize(req, res, next) {
  const query = "SELECT hashed_password, role FROM users WHERE username = ?;";
  const sqlData = await db.get(query, [req.body.username]);
  if (sqlData && await bcrypt.compare(req.body.password, sqlData.hashed_password || "")) {
    req.session.user = {name: req.body.username, role:sqlData.role }
    next();
  } else {
    res.status(401).send("Incorrect email or password")
  }
}

router.post("/api/login", authorize, (req, res, next) => {
  res.send({ data: { name: req.session.user.name, role: req.session.user.role } });
});

async function signup(req, res, next) {
  const query = "SELECT * FROM users WHERE username = ?;";
  const foundValue = await db.get(query, [req.body.username]);
  if (!foundValue) {
    const hashed_password = await bcrypt.hash(req.body.password, saltRounds);
    const query = "INSERT INTO users (username, hashed_password, role) VALUES(?, ?, 'user')";
    await db.run(query, [req.body.username, hashed_password]);
    await sendMailTest();
    next();
  } else {
    res.send({ data: null });
  }
}

router.post("/api/signup", signup, (req, res) => {
  req.session.user = {name: req.body.username, role:'user'}
  res.send({ data: { user: req.session.user.name, role: req.session.user.role } });
});

function authenticate(req, res, next) {
  if (session.user) {
    next();
  } else {
    res.send({ data: null });
  }
}

router.get("/signout", authenticate, (req, res) => {
  session.user = undefined;
  res.send({ data: null });
});

export default router;
