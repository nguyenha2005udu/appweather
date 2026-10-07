import { Pressable, StyleSheet, Text, View } from "react-native";

import { DailyForecast } from "../types/weather";
import { formatDay, roundTemp } from "../utils/format";
import { getWeatherMeta } from "../utils/weatherCodes";

type DailyRowProps = {
  day: DailyForecast;
  onPress: () => void;
};

export function DailyRow({ day, onPress }: DailyRowProps) {
  const meta = getWeatherMeta(day.weatherCode);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.dayBlock}>
        <Text style={styles.day}>{formatDay(day.date)}</Text>
        <Text style={styles.desc} numberOfLines={1}>
          {meta.label}
        </Text>
      </View>
      <Text style={styles.weatherIcon}>{meta.icon}</Text>
      <View style={styles.rain}>
        <Text style={styles.rainIcon}>☔</Text>
        <Text style={styles.rainText}>{day.precipitationProbability}%</Text>
      </View>
      <Text style={styles.temp}>
        {roundTemp(day.high)} / {roundTemp(day.low)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  day: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "800"
  },
  dayBlock: {
    flex: 1,
    minWidth: 88
  },
  desc: {
    color: "rgba(226,232,240,0.76)",
    fontSize: 12,
    marginTop: 3
  },
  pressed: {
    opacity: 0.72
  },
  rain: {
    alignItems: "center",
    backgroundColor: "rgba(103,232,249,0.12)",
    borderRadius: 8,
    flexDirection: "row",
    gap: 3,
    justifyContent: "flex-end",
    paddingHorizontal: 7,
    paddingVertical: 5,
    width: 54
  },
  rainText: {
    color: "#CFFAFE",
    fontSize: 12,
    fontWeight: "700"
  },
  rainIcon: {
    fontSize: 12,
    lineHeight: 16
  },
  row: {
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.34)",
    borderColor: "rgba(255,255,255,0.16)",
    borderRadius: 8,
    borderWidth: 1,
    elevation: 3,
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
    minHeight: 72,
    paddingHorizontal: 14,
    shadowColor: "#020617",
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.10,
    shadowRadius: 10
  },
  temp: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "right",
    width: 72
  },
  weatherIcon: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    width: 30
  }
});
