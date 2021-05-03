const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "/public")));

io.on("connection", (socket) => {
  console.log("conection ejecutada", socket.id);

  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    if (data) {
      socket.broadcast.emit("chat:typing", data);
    } else {
      socket.broadcast.emit("chat:typing", "");
    }
  });
});

server.listen(5000, () => console.log("run server in http://localhost:5000"));
