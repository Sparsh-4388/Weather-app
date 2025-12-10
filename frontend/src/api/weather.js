import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; // picks up from frontend/.env

export async function getWeatherByCity(city) {
  const res = await axios.get(`${BASE_URL}/weather`, { params: { city } });
  return res.data;
}