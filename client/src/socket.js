import socketIOClient from "socket.io-client";

const socketBase = "http://127.0.0.1:4000";

export default function socket () {
  const socket = socketIOClient(`${socketBase}`);
  socket.on("connect", () => {
    console.log("Connected ");
  });
  return socket;
}