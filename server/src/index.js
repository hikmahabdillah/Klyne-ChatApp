import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import contactsRoutes from "./routes/contacts.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const port = process.env.PORT || 5001;

// middleware
app.use(express.json({ limit: "10mb" })); // middleware that will process the JSON-formatted request body
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// handle cors
const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, PATCH, DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/contacts", contactsRoutes);

server.listen(port, () => {
  console.log(`server is running in listen port ${port}`);
  connectDB();
});
