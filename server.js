import path from "path"
import morgan from "morgan"
import express from "express"
import { createServer } from "http"
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

    // start sending data. This is where we would want to actually
    // get the data from the mobile app instead over a *different* 
    // websocket. When we get that data, we would want to send it to
    // the frontend! This assumes the data comes at a fixed rate.
    const interval1 = setInterval(() => {
        const throttle = Math.floor(Math.random() * 1000 * 100) / 100
        const wattage = Math.floor(throttle / 150 + 50 * Math.random() * 100) / 100
        socket.send("throttle " + throttle)
        socket.send("watts " + wattage)
    }, 100)

    const interval2 = setInterval(() => {
        socket.send("lap")
    }, 1500)

    // clear intervals if the socket closes
    socket.on("close", () => {
        clearInterval(interval1)
        clearInterval(interval2)
    })
})

const port = process.env.PORT ?? 8000
http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}!`)
    console.log("---")
})

