type WeatherCodeMeta = {
  label: string;
  icon: string;
  gradient: string[];
};

const codeMap: Record<number, WeatherCodeMeta> = {
  0: { label: "Trời quang", icon: "☀️", gradient: ["#2E90FA", "#38BDF8", "#F7C948"] },
  1: { label: "Ít mây", icon: "🌤️", gradient: ["#2563EB", "#2DD4BF", "#F8D66D"] },
  2: { label: "Mây rải rác", icon: "⛅", gradient: ["#475569", "#38BDF8", "#93C5FD"] },
  3: { label: "Nhiều mây", icon: "☁️", gradient: ["#334155", "#64748B", "#94A3B8"] },
  45: { label: "Sương mù", icon: "🌫️", gradient: ["#475569", "#94A3B8", "#CBD5E1"] },
  48: { label: "Sương giá", icon: "❄️", gradient: ["#475569", "#A5B4FC", "#E0F2FE"] },
  51: { label: "Mưa phùn nhẹ", icon: "🌦️", gradient: ["#1E3A8A", "#0891B2", "#67E8F9"] },
  53: { label: "Mưa phùn", icon: "🌧️", gradient: ["#1D4ED8", "#0284C7", "#7DD3FC"] },
  55: { label: "Mưa phùn dày", icon: "🌧️", gradient: ["#1E40AF", "#0369A1", "#38BDF8"] },
  61: { label: "Mưa nhẹ", icon: "🌦️", gradient: ["#0F172A", "#2563EB", "#14B8A6"] },
  63: { label: "Mưa vừa", icon: "🌧️", gradient: ["#111827", "#1D4ED8", "#0891B2"] },
  65: { label: "Mưa to", icon: "⛈️", gradient: ["#0B1120", "#312E81", "#0284C7"] },
  71: { label: "Tuyết nhẹ", icon: "🌨️", gradient: ["#1E293B", "#60A5FA", "#E0F2FE"] },
  73: { label: "Tuyết", icon: "❄️", gradient: ["#0F172A", "#38BDF8", "#F8FAFC"] },
  75: { label: "Tuyết dày", icon: "❄️", gradient: ["#111827", "#7DD3FC", "#FFFFFF"] },
  80: { label: "Mưa rào nhẹ", icon: "🌦️", gradient: ["#064E3B", "#0EA5E9", "#A7F3D0"] },
  81: { label: "Mưa rào", icon: "🌧️", gradient: ["#082F49", "#2563EB", "#67E8F9"] },
  82: { label: "Mưa rào mạnh", icon: "⛈️", gradient: ["#0F172A", "#4338CA", "#06B6D4"] },
  95: { label: "Dông", icon: "⛈️", gradient: ["#111827", "#4C1D95", "#FACC15"] },
  96: { label: "Dông kèm mưa đá", icon: "⛈️", gradient: ["#020617", "#312E81", "#EAB308"] },
  99: { label: "Dông mạnh", icon: "⛈️", gradient: ["#020617", "#581C87", "#F59E0B"] }
};

export function getWeatherMeta(code: number): WeatherCodeMeta {
  return codeMap[code] ?? { label: "Đang cập nhật", icon: "🌡️", gradient: ["#0F172A", "#334155", "#64748B"] };
}
