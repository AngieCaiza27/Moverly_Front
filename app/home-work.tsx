import { View, StyleSheet } from "react-native";
import ThemedText from "../components/ui/themed-text";
import { COLORS } from "../constants/Colors";

export default function HomeWorkScreen() {
  return (
    <View style={styles.container}>
      <ThemedText size={26} weight="bold" style={{ color: COLORS.primary }}>
        Trabajo 💼
      </ThemedText>
      <ThemedText style={{ color: COLORS.gray, marginTop: 8 }}>
        Administra tus direcciones y mudanzas laborales.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
