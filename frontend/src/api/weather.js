import axios from "axios";

const BASE_URL = "http://localhost:5000/weather"; // backend endpoint

export async function getWeatherByCity(city) {
  const res = await axios.get(BASE_URL, { params: { city } });
  return res.data;
}
