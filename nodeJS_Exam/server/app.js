import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import authRouter from "./routers/authRouter.js";
import bookRouter from "./routers/bookRouter.js"
import orderRouter from "./routers/orderRouter.js"
const app = express();

import path from "path";
app.use(express.static(path.resolve("../client/dist")));    

app.use(express.json());

app.use(helmet());

app.set("trust proxy", 1); // trust first proxy

const allRoutesRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesRateLimiter);

const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use("/auth", authRateLimiter);


import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});
app.use(sessionMiddleware);

app.use(authRouter);

app.use(bookRouter)

app.use(orderRouter)

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
  socket.on("client-request-recommendation", (data) => {
      if(socket.request.session.recOptions){
        let recOptions = socket.request.session.recOptions
        let recommendations = recOptions
        if(data){
          recommendations = recOptions.filter((n) => n.genres.find((n) => n === data.data))
        }
        let randomchoice = Math.floor(Math.random() * recommendations.length)
        if(recommendations.length > 0){
          data = {title:recommendations[randomchoice].title}
          io.emit("server-sent-recommendation", data);
        }else {
        io.emit("server-no-recommendation")
        }
      }else {
        io.emit("server-no-recommendation")
      }
    });
  socket.on("client-request-history", () => {
    if(socket.request.session.history){
      io.emit("server-sent-history", socket.request.session.history)
    } else {
      io.emit("server-no-history")
    }
  })
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send({ data: `Unsupported path ${req.path}`})
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));