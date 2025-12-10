import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import weatherRouter from "./routes/weather.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({ ok: true, status: "server is running" });
});

// Weather API route
app.use("/weather", weatherRouter);

// Serve frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all to serve index.html for React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log("API KEY:", process.env.WEATHER_API_KEY);
});
