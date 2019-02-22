import socketIOClient from "socket.io-client";

const socketBase = "http://127.0.0.1:4000";

export default function socket (userName = 'guest') {
  const socket = socketIOClient(`${socketBase}?name=${userName}`);
  socket.on("connect", () => {
    console.log("Connect with username " + userName);
  });
  return socket;
}