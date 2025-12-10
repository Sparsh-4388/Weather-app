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

// 1️⃣ API routes go first
app.use("/weather", weatherRouter);

// 2️⃣ Serve frontend build AFTER API routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));

// 3️⃣ SPA fallback for React routing (only if not API route)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log("API KEY:", process.env.WEATHER_API_KEY);
});
