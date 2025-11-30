import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../../constants/Colors";

interface Trip {
  id: string;
  passengerName: string;
  passengerRating: number;
  pickupLocation: string;
  dropoffLocation: string;
  distance: string;
  estimatedTime: string;
  fare: string;
  pickupTime: string;
  status: "available" | "completed" | "cancelled";
}

const AVAILABLE_TRIPS: Trip[] = [
  {
    id: "1",
    passengerName: "Ana Martínez",
    passengerRating: 4.9,
    pickupLocation: "Cra 11 No. 100",
    dropoffLocation: "Centro Comercial Premium",
    distance: "6.2 km",
    estimatedTime: "18 min",
    fare: "$18.500",
    pickupTime: "Ahora",
    status: "available",
  },
  {
    id: "2",
    passengerName: "Roberto Silva",
    passengerRating: 4.7,
    pickupLocation: "Av. Carrera 50 No. 25",
    dropoffLocation: "Terminal de Transporte",
    distance: "8.1 km",
    estimatedTime: "22 min",
    fare: "$24.300",
    pickupTime: "En 3 min",
    status: "available",
  },
  {
    id: "3",
    passengerName: "Sofía López",
    passengerRating: 5.0,
    pickupLocation: "Centro Comercial El Hueco",
    dropoffLocation: "Residencial Las Flores",
    distance: "4.8 km",
    estimatedTime: "15 min",
    fare: "$16.200",
    pickupTime: "En 5 min",
    status: "available",
  },
];

const COMPLETED_TRIPS: Trip[] = [
  {
    id: "101",
    passengerName: "Carlos Mendoza",
    passengerRating: 4.8,
    pickupLocation: "Estación de Policía",
    dropoffLocation: "Cra 8 No. 45",
    distance: "3.5 km",
    estimatedTime: "12 min",
    fare: "$12.800",
    pickupTime: "Hoy 14:30",
    status: "completed",
  },
  {
    id: "102",
    passengerName: "Laura Gómez",
    passengerRating: 4.6,
    pickupLocation: "Centro Médico San Rafael",
    dropoffLocation: "Av. Paseo 100",
    distance: "5.2 km",
    estimatedTime: "16 min",
    fare: "$18.100",
    pickupTime: "Hoy 13:15",
    status: "completed",
  },
];

export default function DriverTripsScreen() {
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available");

  const trips = activeTab === "available" ? AVAILABLE_TRIPS : COMPLETED_TRIPS;

  const renderTripCard = ({ item }: { item: Trip }) => (
    <View style={styles.tripCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.passengerInfo}>
          <View style={styles.passengerRow}>
            <ThemedText weight="bold" size={15}>
              {item.passengerName}
            </ThemedText>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={COLORS.warning} />
              <ThemedText size={11} weight="bold">
                {item.passengerRating}
              </ThemedText>
            </View>
          </View>
          <ThemedText size={12} color={COLORS.gray}>
            {item.pickupTime}
          </ThemedText>
        </View>
        {activeTab === "available" && (
          <View style={[styles.fareBadge, { backgroundColor: COLORS.primary }]}>
            <ThemedText color="#fff" weight="bold" size={16}>
              {item.fare}
            </ThemedText>
          </View>
        )}
      </View>

      {/* Route */}
      <View style={styles.routeSection}>
        <View style={styles.routeMarkers}>
          <View style={[styles.marker, { backgroundColor: COLORS.primary }]}>
            <ThemedText color="#fff" weight="bold" size={12}>
              A
            </ThemedText>
          </View>
          <View style={styles.routeLine} />
          <View style={[styles.marker, { backgroundColor: COLORS.primary }]}>
            <ThemedText color="#fff" weight="bold" size={12}>
              B
            </ThemedText>
          </View>
        </View>
        <View style={styles.routeDetails}>
          <ThemedText size={13} weight="bold">
            {item.pickupLocation}
          </ThemedText>
          <ThemedText size={13} weight="bold">
            {item.dropoffLocation}
          </ThemedText>
        </View>
      </View>

      {/* Trip Info */}
      <View style={styles.tripInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
          <ThemedText size={12} weight="bold">
            {item.distance}
          </ThemedText>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <Ionicons name="time" size={16} color={COLORS.primary} />
          <ThemedText size={12} weight="bold">
            {item.estimatedTime}
          </ThemedText>
        </View>
      </View>

      {/* Actions */}
      {activeTab === "available" ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButtonSecondary, { borderColor: COLORS.primary }]}>
            <ThemedText size={13} weight="bold" color={COLORS.primary}>
              Rechazar
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButtonPrimary, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="checkmark" size={18} color="#fff" />
            <ThemedText color="#fff" weight="bold" size={13}>
              Aceptar
            </ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <ThemedText size={13} weight="bold" color={COLORS.success}>
            Viaje Completado
          </ThemedText>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText size={28} weight="bold">
          Viajes
        </ThemedText>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "available" && [styles.tabButtonActive, { borderBottomColor: COLORS.primary }],
          ]}
          onPress={() => setActiveTab("available")}>
          <Ionicons
            name="send"
            size={18}
            color={activeTab === "available" ? COLORS.primary : COLORS.gray}
          />
          <ThemedText
            size={14}
            weight={activeTab === "available" ? "bold" : "normal"}
            color={activeTab === "available" ? COLORS.primary : COLORS.gray}>
            Disponibles
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "completed" && [styles.tabButtonActive, { borderBottomColor: COLORS.primary }],
          ]}
          onPress={() => setActiveTab("completed")}>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={activeTab === "completed" ? COLORS.primary : COLORS.gray}
          />
          <ThemedText
            size={14}
            weight={activeTab === "completed" ? "bold" : "normal"}
            color={activeTab === "completed" ? COLORS.primary : COLORS.gray}>
            Completados
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <FlatList
        data={trips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="send" size={48} color={COLORS.gray} />
            <ThemedText size={16} color={COLORS.gray}>
              {activeTab === "available" ? "No hay viajes disponibles" : "Sin viajes completados"}
            </ThemedText>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomWidth: 3,
  },
  listContent: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  tripCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: `${COLORS.warning}20`,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  pickupTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  fareBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  routeSection: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: COLORS.lightGray,
    borderBottomColor: COLORS.lightGray,
  },
  routeMarkers: {
    alignItems: "center",
    gap: SPACING.sm,
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.lightGray,
  },
  routeDetails: {
    flex: 1,
    justifyContent: "space-around",
  },
  tripInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  infoDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.lightGray,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  actionButtonSecondary: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonPrimary: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: SPACING.md,
  },
});
