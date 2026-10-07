import { CurrentWeather, DailyForecast, HourlyForecast, WeatherDetail, WeatherMetric } from "../types/weather";
import { kmVisibility, roundTemp, windDirection } from "./format";
import { getWeatherMeta } from "./weatherCodes";

export function currentToDetail(current: CurrentWeather): WeatherDetail {
  const meta = getWeatherMeta(current.weatherCode);

  return {
    summary: `${meta.label}. Nhiệt độ cảm nhận ${roundTemp(current.apparentTemperature)}, cao nhất ${roundTemp(
      current.high
    )} và thấp nhất ${roundTemp(current.low)}.`,
    icon: meta.icon,
    metrics: [
      metric("Nhiệt độ", roundTemp(current.temperature), "🌡️", "#F97316"),
      metric("Cảm nhận", roundTemp(current.apparentTemperature), "🙋", "#EC4899"),
      metric("Độ ẩm", `${current.humidity}%`, "💧", "#06B6D4"),
      metric("Gió", `${Math.round(current.windSpeed)} km/h`, "🌬️", "#22C55E"),
      metric("Hướng gió", `${windDirection(current.windDirection)} ${Math.round(current.windDirection)}°`, "🧭", "#A855F7"),
      metric("UV", current.uvIndex.toFixed(1), "☀️", "#EAB308"),
      metric("Mưa", `${current.precipitation} mm`, "🌧️", "#38BDF8"),
      metric("Áp suất", `${Math.round(current.pressure)} hPa`, "⏱️", "#94A3B8"),
      metric("Tầm nhìn", kmVisibility(current.visibility), "👁️", "#14B8A6")
    ]
  };
}

export function hourlyToDetail(hour: HourlyForecast): WeatherDetail {
  const meta = getWeatherMeta(hour.weatherCode);

  return {
    summary: `${meta.label}. Khả năng mưa ${hour.precipitationProbability}%, cảm nhận ${roundTemp(
      hour.apparentTemperature
    )}.`,
    icon: meta.icon,
    metrics: [
      metric("Nhiệt độ", roundTemp(hour.temperature), "🌡️", "#F97316"),
      metric("Cảm nhận", roundTemp(hour.apparentTemperature), "🙋", "#EC4899"),
      metric("Độ ẩm", `${hour.humidity}%`, "💧", "#06B6D4"),
      metric("Gió", `${Math.round(hour.windSpeed)} km/h`, "🌬️", "#22C55E"),
      metric("Hướng gió", `${windDirection(hour.windDirection)} ${Math.round(hour.windDirection)}°`, "🧭", "#A855F7"),
      metric("UV", hour.uvIndex.toFixed(1), "☀️", "#EAB308"),
      metric("Khả năng mưa", `${hour.precipitationProbability}%`, "☔", "#38BDF8"),
      metric("Lượng mưa", `${hour.precipitation} mm`, "🌧️", "#38BDF8"),
      metric("Áp suất", `${Math.round(hour.pressure)} hPa`, "⏱️", "#94A3B8"),
      metric("Tầm nhìn", kmVisibility(hour.visibility), "👁️", "#14B8A6")
    ]
  };
}

export function dailyToDetail(day: DailyForecast): WeatherDetail {
  const meta = getWeatherMeta(day.weatherCode);

  return {
    summary: `${meta.label}. Nhiệt độ dao động ${roundTemp(day.low)} đến ${roundTemp(
      day.high
    )}, khả năng mưa cao nhất ${day.precipitationProbability}%.`,
    icon: meta.icon,
    metrics: [
      metric("Cao nhất", roundTemp(day.high), "⬆️", "#F97316"),
      metric("Thấp nhất", roundTemp(day.low), "⬇️", "#38BDF8"),
      metric("Khả năng mưa", `${day.precipitationProbability}%`, "☔", "#06B6D4"),
      metric("Lượng mưa", `${day.precipitation} mm`, "🌧️", "#2563EB"),
      metric("UV tối đa", day.uvIndex.toFixed(1), "☀️", "#EAB308"),
      metric("Gió mạnh nhất", `${Math.round(day.windSpeed)} km/h`, "🌬️", "#22C55E"),
      metric("Hướng gió", `${windDirection(day.windDirection)} ${Math.round(day.windDirection)}°`, "🧭", "#A855F7"),
      metric("Bình minh", timeOnly(day.sunrise), "🌅", "#F59E0B"),
      metric("Hoàng hôn", timeOnly(day.sunset), "🌙", "#818CF8")
    ]
  };
}

function metric(
  label: string,
  value: string,
  icon: WeatherMetric["icon"],
  accent: string
): WeatherMetric {
  return { label, value, icon, accent };
}

function timeOnly(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
