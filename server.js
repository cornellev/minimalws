import express from "express"
import { createServer } from "http"
import morgan from "morgan"
import path from "path"
import { WebSocketServer } from "ws"

const app = express()
const http = createServer(app)
const server = new WebSocketServer({ server: http })

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
    socket.on("message", data => {
        console.log("> " + data)
    })

    // ping pong woohoo
    socket.send("ping")
})

const port = process.env.PORT ?? 8000
http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}!`)
    console.log("---")
})

