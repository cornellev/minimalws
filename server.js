import express from "express"
import morgan from "morgan"
import path from "path"
import { createServer } from "http"
import { WebSocketServer } from "ws"

const app = express()
// this is per the ws docs
const server = createServer(app)

// log all requests to the server
app.use(morgan("dev"))

// serve the html page
app.get("/", (_, response) =>
    response.sendFile(path.resolve("index.html")))

const port = process.env.PORT ?? 8000
server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}!`)
    console.log("---")
})

