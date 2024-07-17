import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./utils/db";

import userRouter from "./routes/user.routes";

import chatRouter from "./routes/chat.routes";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // Be sure to lock down your CORS settings in production!
    methods: ["GET", "POST"]
  }
});

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRouter);

app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// WebSocket logic
io.on("connection", (socket) => {
  // Join a specific room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("receiveMessage", "Welcome to the room " + roomId);
  });

  // Send message to specific room
  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});