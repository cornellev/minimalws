# minimalws

A minimal implementation of client-server WebSocket communication, using [expressjs](https://expressjs.com) and the nodejs [ws](https://github.com/websockets/ws) library. This repository is intended to demonstrate how it is possible to communicate dashboard data across the client and server in a way that can be tested over localhost (apparently `socket.io` can do this too but I was having trouble with it earlier when combining it with React).

This repository includes lots of commented code and notes about how to handle things when used as part of a real dashboard project, such as making a consistent client-server communication protocol (maybe with JSON instead of the Strings that I used here...)

_Note:_ Check out [this gist](https://github.com/luciopaiva/socketio-with-express/blob/master/server.js), which has some more socket-handling code for when connections are formed and deleted. Someone did exactly this but with `socket.io` instead of `ws`.

_Note:_ Also have a look at [my Tic-Tac-Toe with websockets project](https://github.com/Jklein64/tictactoe), where I used React context, refs, and `useEffect()` to manage the game state while communicating with the server.

## Setup

1. Run `npm install`
2. Run `npm start`
3. Navigate to [localhost:8000](http://localhost:8000)
