export interface IWeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: [{ description: string; icon: string }];
  wind: { speed: number };
}