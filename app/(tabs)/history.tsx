import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../constants/Colors";

type Order = {
  id: string;
  date: string; // ISO
  from: string;
  to: string;
  price: number;
  status: "completed" | "cancelled" | "in_progress";
};

const SAMPLE_ORDERS: Order[] = [
  {
    id: "1",
    date: "2025-11-01T10:30:00Z",
    from: "Av. Siempre Viva 742",
    to: "Calle Falsa 123",
    price: 45.0,
    status: "completed",
  },
  {
    id: "2",
    date: "2025-10-20T14:00:00Z",
    from: "Calle Las Flores 5",
    to: "Plaza Central 8",
    price: 60.5,
    status: "in_progress",
  },
  {
    id: "3",
    date: "2025-09-12T08:15:00Z",
    from: "Barrio Alto 21",
    to: "Puerto Viejo 3",
    price: 120.0,
    status: "cancelled",
  },
];

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function formatPrice(n: number) {
    return `$${n.toFixed(2)}`;
  }

  function statusColor(status: Order["status"]) {
    switch (status) {
      case "completed":
        return COLORS.success;
      case "in_progress":
        return COLORS.primary;
      case "cancelled":
        return COLORS.error;
    }
  }

  function renderItem({ item }: { item: Order }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => Alert.alert("Detalle", `Orden ${item.id}\n${item.from} → ${item.to}\n${formatPrice(item.price)}`)}
      >
        <View style={{ flex: 1 }}>
          <ThemedText weight="bold" size={16} color={COLORS.text}>{item.from} → {item.to}</ThemedText>
          <ThemedText size={13} color={COLORS.textLight} style={{ marginTop: 6 }}>{formatDate(item.date)}</ThemedText>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <ThemedText size={14} weight="bold" color={COLORS.text}>{formatPrice(item.price)}</ThemedText>
          <View style={[styles.statusPill, { backgroundColor: statusColor(item.status) + "22" }]}>
            <Ionicons name={item.status === "completed" ? "checkmark-done" : item.status === "in_progress" ? "time-outline" : "close-circle-outline"} size={14} color={statusColor(item.status)} />
            <ThemedText size={12} style={{ marginLeft: 6, color: statusColor(item.status) }}>{item.status.replace("_", " ")}</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: SPACING.xl + insets.top }]}>
      {/* Título*/}
      <ThemedText size={26} weight="bold" style={styles.title}>
        Historial de pedidos
      </ThemedText>

      <FlatList
        data={SAMPLE_ORDERS}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: SPACING.lg, paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyBox}>
            <Ionicons name="time-outline" size={28} color={COLORS.gray} />
            <ThemedText size={16} style={{ marginTop: SPACING.sm, color: COLORS.gray }}>Aún no tienes pedidos</ThemedText>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    marginBottom: SPACING.lg,
    color: COLORS.primary,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusPill: {
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
  },
  emptyBox: {
    marginTop: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
  },
});
