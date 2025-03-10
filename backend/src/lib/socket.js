import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Enable CORS for API requests (optional, if your API needs it)
app.use(
  cors({
    origin: ["https://chat-app-kappa-nine-84.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-kappa-nine-84.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies if needed
  },
});

// Store online users
const userSocketMap = {}; // { userId: socketId }

// Function to get a receiver's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Extract userId and token from frontend
  const { userId, token } = socket.handshake.query;

  if (!userId || !token) {
    console.log("Missing userId or token. Disconnecting...");
    return socket.disconnect();
  }

  // Verify JWT token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userSocketMap[userId] = socket.id;

    // Send updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    console.log("User authenticated:", userId);
  } catch (error) {
    console.log("Invalid token:", error.message);
    return socket.disconnect();
  }

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
