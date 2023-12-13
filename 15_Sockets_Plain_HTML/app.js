import express from 'express'
const app = express()

app.use(express.static("public"))

import http from 'http'
const server = http.createServer(app)

import { Server } from 'socket.io'
const io = new Server(server)


//io global namespace
io.on("connection", (socket) => {
  console.log("A socket connected", socket.id),

  socket.on("client-choose-color", (data) => {
    io.emit("server-sent-color", data) // All sockets in namespace
    //socket.broadcast.emit("server-sent-color", data) //All in namespace but itselv
    //socket.emit("server-sent-color", data) // Only self
  })
  socket.on("disconnect", () => console.log("disconnected"))
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log("Server is running on PORT", PORT))