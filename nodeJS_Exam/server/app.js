import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import path from "path";
import helmet from "helmet";
import session from "express-session";
import authRouter from "./routers/authRouter.js";
import bookRouter from "./routers/bookRouter.js"
import orderRouter from "./routers/orderRouter.js"

const app = express();

app.use(express.static(path.resolve("../client/dist")));

app.use(express.json());

import cors from "cors";


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


// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

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
  console.log("anybody there?")
    // socket.on("client-request-recommendation", (data) => {
    //   console.log("test")
    //     let recOptions = socket.request.session.recOptions
    //     console.log(recOptions)
    //     // data.title = 
    //     io.emit("server-sent-recommendation", data);
    // });
});



app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});



app.all("*", (req, res) => {
  res.status(404).send({ data: `Unsupported path ${req.path}`})
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on " + PORT));
