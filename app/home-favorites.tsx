import { View, StyleSheet } from "react-native";
import ThemedText from "../components/ui/themed-text";
import { COLORS } from "../constants/Colors";

export default function HomeFavoritesScreen() {
  return (
    <View style={styles.container}>
      <ThemedText size={26} weight="bold" style={{ color: COLORS.primary }}>
        Favoritos ⭐
      </ThemedText>
      <ThemedText style={{ color: COLORS.gray, marginTop: 8 }}>
        Aquí verás tus rutas o compañías favoritas.
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
