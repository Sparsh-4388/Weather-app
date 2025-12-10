import axios from "axios";

const BASE_URL = "https://weather-app-51f0.onrender.com/"; // backend endpoint

export async function getWeatherByCity(city) {
  const res = await axios.get(BASE_URL, { params: { city } });
  return res.data;
}
