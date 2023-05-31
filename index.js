const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

// import databasefire from './firebase'

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
// const [messageList2, setMessagelist2] = useState([]);

var k = 0;

io.on("connection", (socket) => {
    console.log(`CONNECTED`);
  
    socket.on("send_message", (data) => {
      console.log("send　message ",k)
      data["message"] =  data["message"] + k
      io.emit("receive_message", data);
      k++;
    });
  
    socket.on("disconnect", () => {
      console.log("DISCONNECT");
    });
  });
  
  server.listen(3001, () => {
    console.log("SERVER RUNNING");
  });