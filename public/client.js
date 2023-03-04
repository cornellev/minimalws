const socket = new WebSocket("ws:" + location.host + location.pathname)

const lap = document.getElementById("lap")
const watts = document.getElementById("watts")
const throttle = document.getElementById("throttle")

socket.addEventListener("open", () => {
    socket.send("Hi. I'm the client, and I have connected!")
})

// ping pong wooohooo
socket.addEventListener("message", e => {
    const message = e.data
    console.log("> " + message)

    // this is where you would want to define some sort 
    // of typed JSON protocol instead of the strings that
    // I'm using here. A JSON protocol might have a "type"
    // key that says what to do, and should be well-documented.
    // It only depends on the client and server!

    // the current protocol is that message is one of
    //  - ping
    //  - lap
    //  - watts [number]
    //  - throttle [number]

    const command = message.split(" ")
    switch (command[0]) {
        case "ping":
            socket.send("pong")
            break

        case "lap":
            // increment the lap counter
            const current = parseInt(lap.textContent)
            lap.textContent = current + 1
            break

        case "watts":
            // set wattage to the given value
            watts.textContent = command[1]
            break

        case "throttle":
            // set throttle to the given value
            throttle.textContent = command[1]
            break

        default:
            // error if we get something we don't understand
            console.error(`Unknown command "${command[0]}" with parameters [${command.slice(1)}]`)
    }
})