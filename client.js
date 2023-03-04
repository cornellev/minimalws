const socket = new WebSocket("ws:" + location.host + location.pathname)

socket.addEventListener("open", () => {
    socket.send("Hi. I'm the client, and I have connected!")
})

// ping pong wooohooo
socket.addEventListener("message", e => {
    const message = e.data
    console.log("> " + message)

    if (message === "ping")
        socket.send("pong")
})