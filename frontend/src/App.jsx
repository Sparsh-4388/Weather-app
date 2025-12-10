import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
import { getWeatherByCity } from "./api/weather";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchCity) => {
    setCity(searchCity);
    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const data = await getWeatherByCity(searchCity);
      setWeatherData(data);
    } catch (err) {
      // Improved error handling
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError("Invalid request. Please check your input.");
            break;
          case 401:
            setError("Unauthorized. Check your API key.");
            break;
          case 404:
            setError("City not found. Try a different name.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(
              `Error ${err.response.status}: ${err.response.data?.message || "Unknown error"}`
            );
        }
      } else if (err.request) {
        setError("No response from server. Please check your network.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Pixel Weather</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="loading">Loading...</p>}

      {error && (
        <div className="error-card">
          <p>{error}</p>
        </div>
      )}

      {weatherData && (
        <div className="results">
          <CurrentWeatherCard
            data={weatherData.current}
            location={weatherData.location}
          />

          <div className="forecast-grid">
            {weatherData.forecast.map((item) => (
              <ForecastCard key={item.dt_txt} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
