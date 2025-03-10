import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Use Cookie Parser
app.use(cookieParser());

// ✅ Proper CORS Configuration
app.use(
  cors({
    origin: "https://chat-app-kappa-nine-84.vercel.app", // Frontend URL
    credentials: true, // Allow cookies
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve Frontend in Production (Render Deployment)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
  connectDB();
});
