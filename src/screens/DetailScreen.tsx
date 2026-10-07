import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { MetricCard } from "../components/MetricCard";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export function DetailScreen({ navigation, route }: Props) {
  const { title, subtitle, detail } = route.params;

  return (
    <LinearGradient colors={["#111827", "#0F766E", "#1D4ED8"]} style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>‹</Text>
            <Text style={styles.backText}>Quay lại</Text>
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.summaryBlock}>
            <View style={styles.iconWrap}>
              <Text style={styles.detailWeatherIcon}>{detail.icon}</Text>
            </View>
            <Text style={styles.summary}>{detail.summary}</Text>
          </View>

          <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
          <View style={styles.metricsGrid}>
            {detail.metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 8,
    flexDirection: "row",
    gap: 4,
    height: 42,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800"
  },
  backIcon: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 30
  },
  content: {
    paddingBottom: 32,
    paddingHorizontal: 18
  },
  detailWeatherIcon: {
    fontSize: 62,
    lineHeight: 72
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 8
  },
  headerText: {
    flex: 1
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 8,
    borderWidth: 1,
    height: 108,
    justifyContent: "center",
    width: 108
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between"
  },
  safeArea: {
    flex: 1
  },
  screen: {
    flex: 1
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
    marginTop: 24
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 3
  },
  summary: {
    color: "#F8FAFC",
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 26
  },
  summaryBlock: {
    alignItems: "center",
    flexDirection: "row",
    gap: 18,
    marginTop: 28
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900"
  }
});
