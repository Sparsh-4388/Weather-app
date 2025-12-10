import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(city) {
  try {
    // Current weather
    const currentRes = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    // Forecast (next 5 days, 3-hour intervals)
    const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    const current = currentRes.data;
    const forecast = forecastRes.data;

    // Normalize the data
    return {
      location: {
        name: current.name,
        country: current.sys.country,
      },
      current: {
        temp: current.main.temp,
        feels_like: current.main.feels_like,
        condition: current.weather[0].main,
        description: current.weather[0].description,
        humidity: current.main.humidity,
        wind_speed: current.wind.speed,
        icon: current.weather[0].icon,
      },
      forecast: forecast.list.slice(0, 8).map((item) => ({
        dt_txt: item.dt_txt,
        temp: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
      })),
    };
  } catch (error) {
    console.error(error);

    // Check if the error is from OpenWeatherMap API
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Failed to fetch weather";
      
      // Throw error with meaningful status
      const err = new Error(message);
      err.status = status; 
      throw err;
    } else {
      // Network or other unexpected errors
      const err = new Error("Failed to fetch weather");
      err.status = 500;
      throw err;
    }
  }
}
