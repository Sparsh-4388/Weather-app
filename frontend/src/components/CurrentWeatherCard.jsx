export default function CurrentWeatherCard({ data, location }) {
  if (!data || !location) return null;

  return (
    <div className="current-card">
      <h2 className="location">{location.name}, {location.country}</h2>
      <div className="weather-main">
        <img
          src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.condition}
        />
        <div className="temp">{Math.round(data.temp)}°C</div>
      </div>
      <div className="weather-details">
        <div>Feels like: {Math.round(data.feels_like)}°C</div>
        <div>Condition: {data.description}</div>
        <div>Humidity: {data.humidity}%</div>
        <div>Wind: {data.wind_speed} m/s</div>
      </div>
    </div>
  );
}
