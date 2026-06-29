import "dotenv/config";
import express from "express";
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'

import { connectDB } from "./lib/db.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors({origin:process.env.FRONTEND_URL, credentials:true}))
app.use(clerkMiddleware())

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
