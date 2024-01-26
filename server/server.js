import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming notifications from clients
  socket.on("notification", (newNotification) => {
    console.log("Received notification:", newNotification);
    // Broadcast the notification to all connected clients
    socket.broadcast.emit("notification", newNotification);
    //socket.emit('notification', { message: 'New notification!' });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const PORT = process.env.PORT || 3001; // Choose a port for your WebSocket server
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
