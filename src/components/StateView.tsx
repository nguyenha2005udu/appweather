import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type StateViewProps = {
  type: "loading" | "error" | "empty" | "location";
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function StateView({ type, title, message, actionLabel, onAction }: StateViewProps) {
  const icon = {
    loading: "☁️",
    error: "⚠️",
    empty: "🌤️",
    location: "📍"
  }[type];

  return (
    <View style={styles.container}>
      {type === "loading" ? (
        <ActivityIndicator size="large" color="#38BDF8" />
      ) : (
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 28
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 48,
    height: 82,
    justifyContent: "center",
    marginBottom: 18,
    width: 82
  },
  icon: {
    fontSize: 36,
    lineHeight: 44
  },
  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 18,
    textAlign: "center"
  },
  message: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  buttonText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800"
  }
});
