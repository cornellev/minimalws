const root = ReactDOM.createRoot(document.getElementById("root"));
const App = () => {
  const [lap, setLap] = React.useState(1);
  const [watts, setWatts] = React.useState(0);
  const [throttle, setThrottle] = React.useState(0);
  const socket = React.useRef(new WebSocket("ws:" + location.host + location.pathname));

  // empty deps array => run once
  React.useEffect(() => {
    socket.current.onopen = () => socket.current.send("Hi. I'm the client, and I have connected!");
    socket.current.onmessage = e => {
      const message = e.data;
      console.log("> " + message);
      const command = message.split(" ");
      const first = command[0];
      if (first === "ping") socket.current.send("pong");else if (first === "lap") setLap(lap => lap + 1);else if (first === "watts") setWatts(parseFloat(command[1]));else if (first === "throttle") setThrottle(parseFloat(command[1]));else console.error(`Unknown command "${command[0]}" with parameters [${command.slice(1)}]`);
    };
    return () => socket.current.close();
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Lap ", lap), /*#__PURE__*/React.createElement("p", null, "Watts: ", /*#__PURE__*/React.createElement("code", null, watts)), /*#__PURE__*/React.createElement("p", null, "Throttle: ", /*#__PURE__*/React.createElement("code", null, throttle)));
};
root.render( /*#__PURE__*/React.createElement(App, null));
