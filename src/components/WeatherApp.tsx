import { useState } from "react";
import WeatherAppSearch from "./WeatherAppSearch";
import WeatherAppCard from "./WeatherAppCard";
import type { IWeatherData } from "../typescript/interface/weatherapp.interface";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const API_KEY = "f0ead001c5a3f4792fd6e4b288ae621e";

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error("City not found");

      const data: IWeatherData = await response.json();
      setWeatherData(data);
    } catch {
      setError("City not found. Try again!");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = () => {
    setUnit(prev => (prev === "C" ? "F" : "C"));
  };

  return (
    <div className="weather-container">
      <WeatherAppSearch onSearch={fetchWeather} />

      {loading && (
        <div className="loading-area">
          <div className="spinner"></div>
          <p>Fetching weather...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-box">
          <strong>Oops!</strong> {error}
        </div>
      )}

      {weatherData && !loading && !error && (
        <WeatherAppCard
          data={weatherData}
          unit={unit}
          onToggle={handleUnitToggle}
        />
      )}
    </div>
  );
};

export default WeatherApp;
