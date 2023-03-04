import express from "express"
import morgan from "morgan"
import path from "path"
import { WebSocketServer } from "ws"

const app = express()
const server = new WebSocketServer({ server: app })

// log all requests to the server
app.use(morgan("dev"))

// note: don't do this in production. it exposes all
// of the files in this directory! Convenient here though
app.get("*", (request, response) => {
    let filepath = path.relative("/", request.url)
    if (filepath === "") filepath = "index.html"
    response.sendFile(path.resolve(filepath))
})

server.on("connection", socket => {
    // send socket errors to the main error stream
    socket.on("error", console.error)

    // print when we receive messages
    socket.on("message", data => console.log)

    // ping pong woohoo
    socket.send("ping")
})

server.on("listening", () => {
    console.log("Something connected to the WebSocket server!")
})

const port = process.env.PORT ?? 8000
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}!`)
    console.log("---")
})

