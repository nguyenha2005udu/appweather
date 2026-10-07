export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type CurrentWeather = {
  time: string;
  temperature: number;
  apparentTemperature: number;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  precipitation: number;
  pressure: number;
  visibility: number;
  weatherCode: number;
  isDay: boolean;
};

export type HourlyForecast = {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  pressure: number;
  visibility: number;
  weatherCode: number;
};

export type DailyForecast = {
  date: string;
  weatherCode: number;
  high: number;
  low: number;
  precipitationProbability: number;
  precipitation: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  windSpeed: number;
  windDirection: number;
};

export type WeatherBundle = {
  locationName: string;
  coordinates: Coordinates;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  fetchedAt: string;
};

export type WeatherMetric = {
  label: string;
  value: string;
  icon: string;
  accent: string;
};

export type WeatherDetail = {
  summary: string;
  icon: string;
  metrics: WeatherMetric[];
};
