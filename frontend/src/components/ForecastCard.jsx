export default function ForecastCard({ data }) {
  if (!data) return null;

  return (
    <div className="forecast-card">
      <div className="forecast-time">{data.dt_txt.split(" ")[1]}</div>
      <img
        src={`http://openweathermap.org/img/wn/${data.icon}.png`}
        alt={data.condition}
      />
      <div className="forecast-temp">{Math.round(data.temp)}°C</div>
      <div className="forecast-condition">{data.condition}</div>
    </div>
  );
}
