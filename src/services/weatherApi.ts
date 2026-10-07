import { Coordinates, DailyForecast, HourlyForecast, WeatherBundle } from "../types/weather";

type OpenMeteoResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    pressure_msl: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
    weather_code: number[];
    pressure_msl: number[];
    visibility: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    uv_index: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    precipitation_sum: number[];
    uv_index_max: number[];
    sunrise: string[];
    sunset: string[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
  };
};

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherBundle(
  coordinates: Coordinates,
  locationName: string
): Promise<WeatherBundle> {
  const params = new URLSearchParams({
    latitude: String(coordinates.latitude),
    longitude: String(coordinates.longitude),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "is_day"
    ].join(","),
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation_probability",
      "precipitation",
      "weather_code",
      "pressure_msl",
      "visibility",
      "wind_speed_10m",
      "wind_direction_10m",
      "uv_index"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "precipitation_sum",
      "uv_index_max",
      "sunrise",
      "sunset",
      "wind_speed_10m_max",
      "wind_direction_10m_dominant"
    ].join(","),
    forecast_days: "7",
    timezone: "auto"
  });

  const response = await fetch(`${WEATHER_API}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Không thể tải dữ liệu thời tiết. Vui lòng thử lại.");
  }

  const data = (await response.json()) as OpenMeteoResponse;
  const currentDay = data.daily.time.findIndex((day) => day === data.current.time.slice(0, 10));
  const safeCurrentDay = currentDay >= 0 ? currentDay : 0;
  const currentHourIndex = Math.max(
    0,
    data.hourly.time.findIndex((time) => time >= data.current.time.slice(0, 13))
  );

  return {
    locationName,
    coordinates,
    fetchedAt: new Date().toISOString(),
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      pressure: data.current.pressure_msl,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      uvIndex: data.hourly.uv_index[currentHourIndex] ?? 0,
      visibility: data.hourly.visibility[currentHourIndex] ?? 0,
      high: data.daily.temperature_2m_max[safeCurrentDay],
      low: data.daily.temperature_2m_min[safeCurrentDay],
      isDay: data.current.is_day === 1
    },
    hourly: buildHourlyForecast(data),
    daily: buildDailyForecast(data)
  };
}

function buildHourlyForecast(data: OpenMeteoResponse): HourlyForecast[] {
  const now = new Date(data.current.time).getTime();
  const nextHours = data.hourly.time
    .map((time, index) => ({ time, index }))
    .filter(({ time }) => new Date(time).getTime() >= now)
    .slice(0, 24);

  return nextHours.map(({ time, index }) => ({
    time,
    temperature: data.hourly.temperature_2m[index],
    apparentTemperature: data.hourly.apparent_temperature[index],
    humidity: data.hourly.relative_humidity_2m[index],
    precipitationProbability: data.hourly.precipitation_probability[index],
    precipitation: data.hourly.precipitation[index],
    windSpeed: data.hourly.wind_speed_10m[index],
    windDirection: data.hourly.wind_direction_10m[index],
    uvIndex: data.hourly.uv_index[index],
    pressure: data.hourly.pressure_msl[index],
    visibility: data.hourly.visibility[index],
    weatherCode: data.hourly.weather_code[index]
  }));
}

function buildDailyForecast(data: OpenMeteoResponse): DailyForecast[] {
  return data.daily.time.map((date, index) => ({
    date,
    weatherCode: data.daily.weather_code[index],
    high: data.daily.temperature_2m_max[index],
    low: data.daily.temperature_2m_min[index],
    precipitationProbability: data.daily.precipitation_probability_max[index],
    precipitation: data.daily.precipitation_sum[index],
    uvIndex: data.daily.uv_index_max[index],
    sunrise: data.daily.sunrise[index],
    sunset: data.daily.sunset[index],
    windSpeed: data.daily.wind_speed_10m_max[index],
    windDirection: data.daily.wind_direction_10m_dominant[index]
  }));
}
