import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    pickupLocation: "Av. Cevallos y Montalvo, Ambato",
    dropoffLocation: "Mall de los Andes, Ambato",
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
    pickupLocation: "Parque Montalvo, Centro Ambato",
    dropoffLocation: "Terminal Terrestre Ambato",
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
    pickupLocation: "Av. Los Guaytambos, Ambato",
    dropoffLocation: "Ficoa, Barrio La Joya",
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
    pickupLocation: "Parque Provincial de la Familia",
    dropoffLocation: "Av. Atahualpa, Ambato",
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
    pickupLocation: "Hospital Regional Ambato",
    dropoffLocation: "Av. Indoamérica, Ambato",
    distance: "5.2 km",
    estimatedTime: "16 min",
    fare: "$18.100",
    pickupTime: "Hoy 13:15",
    status: "completed",
  },
];

export default function DriverTripsScreen() {
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available");
  const [availableTrips, setAvailableTrips] = useState<Trip[]>(AVAILABLE_TRIPS);

  const trips = activeTab === "available" ? availableTrips : COMPLETED_TRIPS;

  const handleAcceptTrip = async (trip: Trip) => {
    try {
      // Guardar viaje aceptado en AsyncStorage
      await AsyncStorage.setItem('@assigned_trip', JSON.stringify(trip));
      
      // Eliminar de la lista de disponibles
      setAvailableTrips(availableTrips.filter(t => t.id !== trip.id));
      
      Alert.alert(
        "¡Viaje Aceptado!",
        `Has aceptado el viaje hacia ${trip.dropoffLocation}`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.log('Error al aceptar viaje:', error);
    }
  };

  const handleRejectTrip = (trip: Trip) => {
    Alert.alert(
      "Rechazar Viaje",
      "¿Estás seguro de rechazar este viaje?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Rechazar",
          style: "destructive",
          onPress: () => {
            setAvailableTrips(availableTrips.filter(t => t.id !== trip.id));
          }
        }
      ]
    );
  };

  const renderTripCard = ({ item }: { item: Trip }) => (
    <View style={styles.tripCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.passengerInfo}>
          <View style={styles.passengerRow}>
            <ThemedText weight="bold" color="black" size={15}>
              {item.passengerName}
            </ThemedText>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={COLORS.warning} />
              <ThemedText size={11} weight="bold" color="black">
                {item.passengerRating}
              </ThemedText>
            </View>
          </View>
          <ThemedText size={12} color={COLORS.gray}>
            {item.pickupTime}
          </ThemedText>
        </View>
        {activeTab === "available" && (
          <View style={[styles.fareBadge, { backgroundColor: COLORS.success }]}>
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
            <Ionicons name="location" size={16} color="#fff" />
          </View>
          <View style={styles.routeLine} />
          <View style={[styles.marker, { backgroundColor: COLORS.secondary }]}>
            <Ionicons name="flag" size={16} color="#fff" />
          </View>
        </View>
        <View style={styles.routeDetails}>
          <ThemedText size={13} weight="bold" color="black">
            {item.pickupLocation}
          </ThemedText>
          <ThemedText size={13} weight="bold" color="black">
            {item.dropoffLocation}
          </ThemedText>
        </View>
      </View>

      {/* Trip Info */}
      <View style={styles.tripInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="navigate" size={16} color={COLORS.primary} />
          <ThemedText size={12} weight="bold" color="black">
            {item.distance}
          </ThemedText>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={16} color={COLORS.secondary} />
          <ThemedText size={12} weight="bold" color="black">
            {item.estimatedTime}
          </ThemedText>
        </View>
      </View>

      {/* Actions */}
      {activeTab === "available" ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButtonSecondary, { borderColor: COLORS.error }]}
            onPress={() => handleRejectTrip(item)}>
            <Ionicons name="close" size={18} color={COLORS.error} />
            <ThemedText size={13} weight="bold" color={COLORS.error}>
              Rechazar
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButtonPrimary, { backgroundColor: COLORS.success }]}
            onPress={() => handleAcceptTrip(item)}>
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
        <View>
          <ThemedText size={24} weight="bold" color="black">
            Viajes Disponibles
          </ThemedText>
          <ThemedText size={14} color={COLORS.gray}>
            Selecciona un viaje para comenzar
          </ThemedText>
        </View>
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
            name="car-sport"
            size={18}
            color={activeTab === "available" ? COLORS.primary : COLORS.gray}
          />
          <ThemedText
            size={14}
            weight={activeTab === "available" ? "bold" : "regular"}
            color={activeTab === "available" ? COLORS.primary : COLORS.gray}>
            Disponibles ({availableTrips.length})
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "completed" && [styles.tabButtonActive, { borderBottomColor: COLORS.primary }],
          ]}
          onPress={() => setActiveTab("completed")}>
          <Ionicons
            name="checkmark-done"
            size={18}
            color={activeTab === "completed" ? COLORS.primary : COLORS.gray}
          />
          <ThemedText
            size={14}
            weight={activeTab === "completed" ? "bold" : "regular"}
            color={activeTab === "completed" ? COLORS.primary : COLORS.gray}>
            Completados
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <FlatList
        bounces={false}
        data={trips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingTop: SPACING.xl + 20,
    paddingBottom: SPACING.lg,
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
    flexGrow: 1,
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
    gap: SPACING.md,
  },
  tripCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
  actionButtonPrimary: {
    flex: 1,
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.lg,
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
