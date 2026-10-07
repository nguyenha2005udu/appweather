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
    backgroundColor: "rgba(15, 23, 42, 0.58)",
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 116,
    padding: 14,
    width: "48%"
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 8,
    height: 34,
    justifyContent: "center",
    marginBottom: 10,
    width: 34
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
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6
  }
});
