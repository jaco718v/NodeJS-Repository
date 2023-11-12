import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import path from "path";
import helmet from "helmet";
import session from "express-session";
import authRouter from "./routers/authRouter.js";

const app = express();

app.use(express.static(path.resolve("../client/dist")));

app.use(express.json());

app.use(helmet());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(limiter);

app.use(authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on " + PORT));
