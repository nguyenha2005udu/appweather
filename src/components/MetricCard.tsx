import { StyleSheet, Text, View } from "react-native";

import { WeatherMetric } from "../types/weather";

export function MetricCard({ metric }: { metric: WeatherMetric }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: `${metric.accent}24` }]}>
        <Text style={styles.icon}>{metric.icon}</Text>
      </View>
      <Text style={styles.label}>{metric.label}</Text>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.value}>
        {metric.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.48)",
    borderColor: "rgba(255,255,255,0.16)",
    borderRadius: 8,
    borderWidth: 1,
    elevation: 4,
    minHeight: 122,
    padding: 15,
    shadowColor: "#020617",
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    width: "48%"
  },
  iconWrap: {
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderRadius: 8,
    height: 38,
    justifyContent: "center",
    marginBottom: 10,
    width: 38
  },
  icon: {
    fontSize: 18,
    lineHeight: 24
  },
  label: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "600"
  },
  value: {
    color: "#F8FAFC",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 6
  }
});
