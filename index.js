const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const UserRoute = require("./Routes/user.route");
const ChatRoute = require("./Routes/chat.route");
const ChatController = require("./Controllers/chat.controller");
// const User = require("./models/user.model");
// const Chat = require("./models/chat.model");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

//Middle Ware

app.use(bodyParser.json()); // Parse JSON payloads
app.use(cors());
app.use(express.json()); // This makes it JSON supportive
app.use(express.urlencoded({ extended: false })); // This makes it Form Supportive

io.on("connection", (socket) => {
  console.log("A User Connected " + socket.id);

  socket.emit("welcome", { message: "Welcome To SocketIO" });

  socket.on("joinRoom", (roomId) => {
    console.log(`${socket.id} is joining on ${roomId}`);
    socket.join(roomId);
    socket.emit("joinedRoom", { roomId, message: "You joined The room" });
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    console.log(
      `Message for room ${roomId}: ${message.message} sent by ${message.sentBy}`
    );
    socket.to(roomId).emit("receiveMessage", { message });
  });

  socket.on("disconnect", () => {
    console.log("User" + socket.id + "has disconnected");
  });
});

server.listen(3001, () => {
  console.log("listenint to 3001");
});

app.use("/api/users", UserRoute);
app.use("/api/chat", ChatRoute);

mongoose
  .connect(
    "mongodb+srv://admin:admin@nodedb.qrn8o.mongodb.net/MessageMeDatabase?retryWrites=true&w=majority&appName=NodeDB"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Listening to port 3000 Connected To MongoDB");
    });
  })
  .catch(() => {
    console.log("Failed To Connect To Database");
  });

// Clear Users
// (async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://admin:admin@nodedb.qrn8o.mongodb.net/MessageMeDatabase?retryWrites=true&w=majority&appName=NodeDB",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );

//     // Delete all users
//     await Chat.deleteMany({});
//     console.log("All users deleted successfully");

//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error deleting users:", error);
//   }
// })();
