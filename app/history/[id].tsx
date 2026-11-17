import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/ui/Button";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, SPACING } from "../../constants/Colors";

export default function OrderDetail() {
  const { id } = useLocalSearchParams() as { id?: string };

  return (
    <View style={styles.container}>
      <ThemedText weight="bold" size={20} style={{ color: COLORS.text }}>Detalle del pedido</ThemedText>
      <ThemedText style={{ marginTop: SPACING.sm, color: COLORS.text }}>ID: {id}</ThemedText>

      <View style={{ height: SPACING.md }} />

      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
});
