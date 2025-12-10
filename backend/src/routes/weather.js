import express from "express";
import { getWeatherByCity } from "../services/weatherService.js";

const router = express.Router();

router.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const data = await getWeatherByCity(city);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
