import { Pressable, StyleSheet, Text, View } from "react-native";

import { HourlyForecast } from "../types/weather";
import { formatHour, roundTemp } from "../utils/format";
import { getWeatherMeta } from "../utils/weatherCodes";

type HourlyCardProps = {
  hour: HourlyForecast;
  onPress: () => void;
};

export function HourlyCard({ hour, onPress }: HourlyCardProps) {
  const meta = getWeatherMeta(hour.weatherCode);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Text style={styles.time}>{formatHour(hour.time)}</Text>
      <Text style={styles.weatherIcon}>{meta.icon}</Text>
      <Text style={styles.temp}>{roundTemp(hour.temperature)}</Text>
      <View style={styles.rainRow}>
        <Text style={styles.rainIcon}>💧</Text>
        <Text style={styles.rain}>{hour.precipitationProbability}%</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.34)",
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 8,
    borderWidth: 1,
    elevation: 4,
    gap: 9,
    height: 140,
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#020617",
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    width: 82
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }]
  },
  rain: {
    color: "#CFFAFE",
    fontSize: 12,
    fontWeight: "700"
  },
  rainRow: {
    alignItems: "center",
    backgroundColor: "rgba(103,232,249,0.12)",
    borderRadius: 8,
    flexDirection: "row",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 4
  },
  rainIcon: {
    fontSize: 11,
    lineHeight: 14
  },
  temp: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800"
  },
  time: {
    color: "#DCEBFF",
    fontSize: 12,
    fontWeight: "700"
  },
  weatherIcon: {
    fontSize: 30,
    lineHeight: 34
  }
});
