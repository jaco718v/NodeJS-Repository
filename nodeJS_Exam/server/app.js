import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import authRouter from "./routers/authRouter.js";
import bookRouter from "./routers/bookRouter.js";
import orderRouter from "./routers/orderRouter.js";
import favoritesRouter from "./routers/favoritesRouter.js";
import locationsRouter from "./routers/locationRouter.js";

const app = express();

app.use(express.json());

app.use(helmet.permittedCrossDomainPolicies());

import path from "path";
app.use(express.static(path.resolve("../client/dist")));

app.set("trust proxy", 1); // trust first proxy

const allRoutesRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesRateLimiter);

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use("/auth", authRateLimiter);

import cors from "cors";
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

import session from "express-session";
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
app.use(sessionMiddleware);

app.use(authRouter);

app.use(bookRouter);

app.use(orderRouter);

app.use(favoritesRouter);

app.use(locationsRouter);

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
  socket.on("client-request-recommendation", () => {
    if (socket.request.session.sessionGenres) {
      const genreFrequency = socket.request.session.sessionGenres.reduce(
        (genre, fq) => {
          genre[fq] = (genre[fq] ?? 0) + 1;
          return genre;
        },
        {}
      );

      let topGenreData;
      for (let value in genreFrequency) {
        topGenreData = topGenreData ?? {
          genre: value,
          fq: genreFrequency[value],
        };
        if (topGenreData.fq < genreFrequency[value])
          topGenreData = { genre: value, fq: genreFrequency[value] };
      }
      let books = socket.request.session.recommendedBooks ?? [];
      let booksOfGenre = books.filter((n) =>
        n.genres.includes(topGenreData.genre)
      );
      for (let i = booksOfGenre.length - 1; i > 0; i--) {
        //Fisher Yates Method
        let j = Math.floor(Math.random() * (i + 1));
        let k = booksOfGenre[i];
        booksOfGenre[i] = booksOfGenre[j];
        booksOfGenre[j] = k;
      }
      io.emit("server-recommendation-yes", {
        data: { ...booksOfGenre[0], topGenre: topGenreData.genre },
      });
    }
    io.emit("server-recommendation-no");
  });

  socket.on("client-request-history", () => {
    if (socket.request.session.history) {
      io.emit("server-history-yes", { data: socket.request.session.history });
    } else {
      io.emit("server-history-no");
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send({ data: `Unsupported path ${req.path}` });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));
