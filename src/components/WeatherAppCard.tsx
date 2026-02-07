import type{ IWeatherData } from "../typescript/interface/weatherapp.interface";

interface CardProps {
  data: IWeatherData;
  unit: "C" | "F";
  onToggle: () => void;
}

const WeatherAppCard = ({ data, unit, onToggle }: CardProps) => {
  
  const convertTemp = (temp: number) => {
    return unit === "C" ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);
  };

  return (
    <div className="card-content">
      <button className="unit-btn" onClick={onToggle}>
        Switch to °{unit === "C" ? "F" : "C"}
      </button>

      <h2 className="city-name">{data.name}, {data.sys.country}</h2>

      <div className="temp-section">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <h1>{convertTemp(data.main.temp)}°{unit}</h1>
      </div>

      <p className="description">{data.weather[0].description}</p>

      <div className="info-grid">
        <div className="info-item">
          <span>Humidity</span>
          <strong>{data.main.humidity}%</strong>
        </div>
        <div className="info-item">
          <span>Wind</span>
          <strong>{data.wind.speed} m/s</strong>
        </div>
        <div className="info-item">
          <span>Pressure</span>
          <strong>{data.main.pressure} hPa</strong>
        </div>
        <div className="info-item">
          <span>Feels Like</span>
          <strong>{convertTemp(data.main.feels_like)}°{unit}</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherAppCard;