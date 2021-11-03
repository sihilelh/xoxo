const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/join/:joinid", (req, res) => {
  res.sendFile(__dirname + "/join.html");
});
app.get("/host/:id", (req, res) => {
  res.sendFile(__dirname + "/host.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

let Sessions = [];

io.on("connection", (socket) => {
  socket.emit("connection", socket.id);
  socket.on("create", (req) => {
    socket.join(req.room);
    Sessions.push({
      room: req.room,
      players: [
        {
          name: req.name,
          id: socket.id,
        },
      ],
    });
    io.to(req.room).emit("oncreate", true);
  });
  socket.on("join", (req) => {
    var count = 0;
    if (io.sockets.adapter.rooms.get(req.room)) {
      count = io.sockets.adapter.rooms.get(req.room).size;
    }
    console.log(count);
    if (count < 2) {
      socket.join(req.room);
      var room = null;
      Sessions.forEach((val, i) => {
        if (val.room == req.room) {
          Sessions[i].players.push({
            name: req.name,
            id: socket.id,
          });
          room = Sessions[i];
        }
      });
      io.to(req.room).emit("onjoin", { canplay: true, room });
    } else {
      socket.join("waiting");
      io.to("waiting").emit("onjoin", { canplay: false });
    }
  });
  socket.on("game", (req) => {
    io.to(req.room).emit("game", req);
  });
});

app.use("/static", express.static("static"));

const port = 8080;
server.listen(port, () => {
  console.log(`Server Listning to port ${port}`);
});
