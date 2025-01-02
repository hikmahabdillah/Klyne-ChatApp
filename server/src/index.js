import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json()); // middleware that will process the JSON-formatted request body

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`server is running in listen port ${port}`);
  connectDB();
})