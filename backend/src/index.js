import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import fs from "fs";

import { connectDB } from "./lib/db.js";
import path from "path";

const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
