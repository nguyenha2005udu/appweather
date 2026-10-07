export function roundTemp(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatHour(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatDay(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  }).format(new Date(value));
}

export function formatLongDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  }).format(new Date(value));
}

export function windDirection(degree: number): string {
  const directions = ["B", "ĐB", "Đ", "ĐN", "N", "TN", "T", "TB"];
  return directions[Math.round(degree / 45) % 8];
}

export function kmVisibility(meters: number): string {
  return `${Math.round(meters / 1000)} km`;
}
