import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Enable CORS for API requests
app.use(
  cors({
    origin: ["https://chat-app-kappa-nine-84.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-kappa-nine-84.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store online users
const userSocketMap = new Map(); // Using Map for better efficiency

// Function to get a receiver's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap.get(userId);
}

io.on("connection", (socket) => {
  console.log("🔗 New connection:", socket.id);

  // Extract userId and token from frontend
  const { userId, token } = socket.handshake.query;
  console.log("📩 Received userId:", userId);
  console.log("🔑 Received token:", token);

  if (!userId || !token) {
    console.log("❌ Missing userId or token. Disconnecting...");
    return socket.disconnect();
  }

  // Verify JWT token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ User authenticated:", decoded.userId);

    // Store user as online
    userSocketMap.set(userId, socket.id);
    console.log("👥 Online Users:", Array.from(userSocketMap.keys()));

    // Emit updated online users list
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  } catch (error) {
    console.log("❌ Invalid token:", error.message);
    return socket.disconnect();
  }

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    
    // Find userId by socket ID and remove from map
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }

    console.log("👥 Updated Online Users:", Array.from(userSocketMap.keys()));
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { io, app, server };
