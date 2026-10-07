import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { DailyRow } from "../components/DailyRow";
import { HourlyCard } from "../components/HourlyCard";
import { MetricCard } from "../components/MetricCard";
import { StateView } from "../components/StateView";
import { fetchWeatherBundle } from "../services/weatherApi";
import { requestCurrentLocation } from "../services/location";
import { RootStackParamList } from "../types/navigation";
import { WeatherBundle } from "../types/weather";
import { currentToDetail, dailyToDetail, hourlyToDetail } from "../utils/details";
import { formatLongDate, roundTemp } from "../utils/format";
import { getWeatherMeta } from "../utils/weatherCodes";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const [weather, setWeather] = useState<WeatherBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;

  const loadWeather = useCallback(async (isRefresh = false) => {
    try {
      setError(null);
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const location = await requestCurrentLocation();
      const nextWeather = await fetchWeatherBundle(location.coordinates, location.locationName);
      setWeather(nextWeather);
      setUsedFallback(location.usedFallback);
      Animated.timing(fade, {
        duration: 480,
        toValue: 1,
        useNativeDriver: true
      }).start();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Đã có lỗi xảy ra.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fade]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <StateView type="loading" title="Đang tải thời tiết" message="Ứng dụng đang xin vị trí và lấy dự báo mới nhất." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.screen}>
        <StateView type="error" title="Không tải được dữ liệu" message={error} actionLabel="Thử lại" onAction={() => loadWeather()} />
      </SafeAreaView>
    );
  }

  if (!weather) {
    return (
      <SafeAreaView style={styles.screen}>
        <StateView type="empty" title="Chưa có dữ liệu" message="Không tìm thấy dự báo phù hợp cho vị trí này." actionLabel="Tải lại" onAction={() => loadWeather()} />
      </SafeAreaView>
    );
  }

  const meta = getWeatherMeta(weather.current.weatherCode);
  const currentDetail = currentToDetail(weather.current);
  const primaryMetrics = currentDetail.metrics.slice(2, 10);

  return (
    <LinearGradient colors={meta.gradient} style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.animated, { opacity: fade }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            refreshControl={<RefreshControl tintColor="#FFFFFF" refreshing={refreshing} onRefresh={() => loadWeather(true)} />}
          >
            <View style={styles.topBar}>
              <View style={styles.locationRow}>
                <Text style={styles.topIcon}>📍</Text>
                <Text style={styles.location} numberOfLines={1}>
                  {weather.locationName}
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.iconButton} onPress={() => loadWeather(true)}>
                <Text style={styles.buttonIcon}>↻</Text>
              </TouchableOpacity>
            </View>

            {usedFallback ? (
              <View style={styles.notice}>
                <Text style={styles.noticeIcon}>ℹ️</Text>
                <Text style={styles.noticeText}>Không lấy được vị trí hiện tại, ứng dụng đang dùng Hà Nội làm vị trí dự phòng.</Text>
              </View>
            ) : null}

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.hero}
              onPress={() =>
                navigation.navigate("Detail", {
                  title: "Thời tiết hiện tại",
                  subtitle: formatLongDate(weather.current.time),
                  detail: currentDetail
                })
              }
            >
              <View style={styles.heroIcon}>
                <Text style={styles.heroWeatherIcon}>{meta.icon}</Text>
              </View>
              <Text style={styles.date}>{formatLongDate(weather.current.time)}</Text>
              <Text style={styles.temperature}>{roundTemp(weather.current.temperature)}</Text>
              <Text style={styles.condition}>{meta.label}</Text>
              <View style={styles.tempLine}>
                <Text style={styles.tempLineText}>Cao {roundTemp(weather.current.high)}</Text>
                <Text style={styles.tempLineText}>Thấp {roundTemp(weather.current.low)}</Text>
                <Text style={styles.tempLineText}>Cảm nhận {roundTemp(weather.current.apparentTemperature)}</Text>
              </View>
            </TouchableOpacity>

            <SectionTitle title="24 giờ tới" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hourlyList}>
              {weather.hourly.map((hour) => (
                <HourlyCard
                  key={hour.time}
                  hour={hour}
                  onPress={() =>
                    navigation.navigate("Detail", {
                      title: "Dự báo theo giờ",
                      subtitle: formatLongDate(hour.time),
                      detail: hourlyToDetail(hour)
                    })
                  }
                />
              ))}
            </ScrollView>

            <SectionTitle title="Chỉ số thời tiết" />
            <View style={styles.metricsGrid}>
              {primaryMetrics.map((metric) => (
                <MetricCard key={metric.label} metric={metric} />
              ))}
            </View>

            <SectionTitle title="7 ngày tới" />
            {weather.daily.map((day) => (
              <DailyRow
                key={day.date}
                day={day}
                onPress={() =>
                  navigation.navigate("Detail", {
                    title: "Dự báo nhiều ngày",
                    subtitle: formatLongDate(day.date),
                    detail: dailyToDetail(day)
                  })
                }
              />
            ))}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

const styles = StyleSheet.create({
  animated: {
    flex: 1
  },
  condition: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6
  },
  content: {
    paddingBottom: 34,
    paddingHorizontal: 18
  },
  date: {
    color: "#DCEBFF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 14
  },
  hero: {
    alignItems: "center",
    paddingBottom: 22,
    paddingTop: 28
  },
  heroIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderColor: "rgba(255,255,255,0.20)",
    borderRadius: 8,
    borderWidth: 1,
    height: 116,
    justifyContent: "center",
    width: 116
  },
  heroWeatherIcon: {
    fontSize: 68,
    lineHeight: 76
  },
  hourlyList: {
    paddingBottom: 8
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 8,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  buttonIcon: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 28
  },
  location: {
    color: "#F8FAFC",
    flex: 1,
    fontSize: 16,
    fontWeight: "800"
  },
  locationRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 7,
    paddingRight: 12
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 8
  },
  notice: {
    alignItems: "center",
    backgroundColor: "rgba(120, 53, 15, 0.42)",
    borderColor: "rgba(254, 243, 199, 0.22)",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    padding: 12
  },
  noticeText: {
    color: "#FEF3C7",
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18
  },
  noticeIcon: {
    fontSize: 15,
    lineHeight: 18
  },
  safeArea: {
    flex: 1
  },
  screen: {
    backgroundColor: "#0F172A",
    flex: 1
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
    marginTop: 22
  },
  tempLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginTop: 15
  },
  tempLineText: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 8,
    color: "#F8FAFC",
    fontSize: 13,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  temperature: {
    color: "#FFFFFF",
    fontSize: 86,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 96,
    marginTop: 4
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8
  },
  topIcon: {
    fontSize: 16,
    lineHeight: 20
  }
});
