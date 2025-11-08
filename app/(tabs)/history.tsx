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
import Button from "../../components/ui/Button";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../../constants/Colors";

type Order = {
  id: string;
  company: string;
  number: string;
  from: string;
  to: string;
  datetime: string;
  price: number;
  status: "proximo" | "en-curso" | "completado";
};

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    company: "Mudanzas Águila",
    number: "#123",
    from: "CDMX",
    to: "GDL",
    datetime: "Hoy, 15:00",
    price: 2850,
    status: "proximo",
  },
  {
    id: "2",
    company: "Fletes Rápidos",
    number: "#124",
    from: "GDL",
    to: "QRO",
    datetime: "Ayer, 10:00",
    price: 4200,
    status: "en-curso",
  },
  {
    id: "3",
    company: "Mudanzas Seguras",
    number: "#122",
    from: "CDMX",
    to: "PUE",
    datetime: "02 Nov, 09:00",
    price: 3200,
    status: "completado",
  },
];

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

  // Mostrar únicamente pedidos completados
  const filtered = MOCK_ORDERS.filter((o) => o.status === "completado");

  function statusBadge(status: Order["status"]) {
    if (status === "proximo") return { label: "Confirmado", bg: COLORS.primary, color: COLORS.white };
    if (status === "en-curso") return { label: "En curso", bg: COLORS.secondary, color: COLORS.white };
    return { label: "Completado", bg: COLORS.lightGray, color: COLORS.text };
  }

  function onPressOrder(order: Order) {
    // por ahora mostramos un detalle simple
    Alert.alert(order.company, `${order.number}\n${order.from} → ${order.to}\n${order.datetime}\n$${order.price}`);
  }

  function renderItem({ item }: { item: Order }) {
    const badge = statusBadge(item.status);

    return (
      <TouchableOpacity style={[styles.card, SHADOWS.small]} onPress={() => onPressOrder(item)}>
        <View style={{ flex: 1 }}>
          <ThemedText weight="bold" color={COLORS.text}>{item.company}</ThemedText>
          <ThemedText color={COLORS.textSecondary} style={{ marginTop: 6 }}>{`Pedido ${item.number}`}</ThemedText>

          <View style={{ flexDirection: "row", marginTop: SPACING.md, alignItems: "center" }}>
            <Ionicons name="location-outline" size={18} color={COLORS.primary} />
            <ThemedText color={COLORS.text} style={{ marginLeft: SPACING.sm }}>{`${item.from} → ${item.to}`}</ThemedText>
          </View>

          <View style={{ flexDirection: "row", marginTop: SPACING.sm, alignItems: "center" }}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
            <ThemedText color={COLORS.text} style={{ marginLeft: SPACING.sm }}>{item.datetime}</ThemedText>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <ThemedText weight="bold" color={COLORS.text}>${item.price}</ThemedText>
          <View style={[styles.badge, { backgroundColor: badge.bg, marginTop: SPACING.md }]}> 
            <ThemedText size={12} style={{ color: badge.color }}>{badge.label}</ThemedText>
          </View>

          {item.status === "proximo" ? (
            <View style={{ flexDirection: "row", marginTop: SPACING.md }}>
              <Button title="Reprogramar" variant="outline" size="small" />
              <View style={{ width: SPACING.sm }} />
              <Button title="Cancelar" variant="secondary" size="small" />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: SPACING.xs + insets.top }]}> 
      <View style={styles.headerBox}>
        <ThemedText weight="bold" size={20} style={styles.headerTitle}>Historial de Pedidos</ThemedText>
        <ThemedText color={COLORS.white} size={14} style={{ marginTop: 6 }}>Revisa tus pedidos anteriores</ThemedText>
      </View>

      {/* Eliminado selector: ahora mostramos solo Pedidos Completados */}

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: SPACING.lg, paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyBox}>
            <Ionicons name="time-outline" size={28} color={COLORS.gray} />
            <ThemedText size={16} style={{ marginTop: SPACING.sm, color: COLORS.gray }}>No hay pedidos en esta sección.</ThemedText>
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
  headerBox: {
    backgroundColor: COLORS.fondo,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  headerTitle: {
    color: COLORS.white,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  tab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },
  tabActive: {
    backgroundColor: COLORS.inputBackground,
  },
  tabText: {
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.text,
    fontWeight: "700",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  emptyBox: {
    marginTop: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
  },
});
