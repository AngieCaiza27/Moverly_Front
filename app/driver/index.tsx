import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../constants/Colors";

export default function DriverHomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText size={28} weight="bold" color="black" style={styles.headerTitle}>
          Bienvenido, Chofer 👋
        </ThemedText>
        <ThemedText size={16} style={styles.headerSubtitle}>
          Gestiona tus viajes y ganancias
        </ThemedText>
      </View>

      {/* Status Card */}
      <View style={[styles.statusCard, { backgroundColor: COLORS.primary }]}>
        <View style={styles.statusContent}>
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <View style={{ marginLeft: 12 }}>
              <ThemedText color="#fff" size={12}>
                Estado
              </ThemedText>
              <ThemedText weight="bold" color="#fff" size={14}>
                En Línea
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity style={[styles.toggleButton, { backgroundColor: "rgba(255,255,255,0.3)" }]}>
            <ThemedText color="#fff" size={12} weight="bold">
              Ir Offline
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="car" size={24} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <ThemedText size={12} color={COLORS.gray}>
              Viajes Hoy
            </ThemedText>
            <ThemedText size={20} weight="bold" color="black">
              5
            </ThemedText>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.success }]}>
            <Ionicons name="cash" size={24} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <ThemedText size={12} color={COLORS.gray}>
              Ganancias Hoy
            </ThemedText>
            <ThemedText size={20} weight="bold" color="black">
              $45.50
            </ThemedText>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.warning }]}>
            <Ionicons name="star" size={24} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <ThemedText size={12} color={COLORS.gray}>
              Calificación
            </ThemedText>
            <ThemedText size={20} weight="bold" color="black">
              4.8
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Current Trip */}
      <View style={styles.sectionContainer}>
        <ThemedText weight="bold" size={18} color="black" style={styles.sectionTitle}>
          Viaje Actual
        </ThemedText>
        <View style={styles.tripCard}>
          <View style={styles.tripHeader}>
            <View>
              <ThemedText size={13} weight="bold" color="black" style={styles.tripFrom}>
                📍 Cra 7 No. 23-45
              </ThemedText>
              <ThemedText size={13} weight="bold" color="black" style={styles.tripTo}>
                📍 Av. Paseo 100 No. 50
              </ThemedText>
            </View>
            <View style={styles.tripTime}>
              <ThemedText size={12} weight="bold" color="black">
                12 min
              </ThemedText>
              <ThemedText size={11} color={COLORS.gray} style={styles.tripDistance}>
                4.5 km
              </ThemedText>
            </View>
          </View>
          <View style={styles.tripPassenger}>
            <View style={[styles.passengerAvatar, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="person" size={20} color="#fff" />
            </View>
            <View style={styles.passengerInfo}>
              <ThemedText weight="bold" color="black">Juan Pérez</ThemedText>
              <ThemedText size={11} color={COLORS.gray} style={styles.passengerRating}>
                ⭐ 4.9 • 25 viajes
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.primary }]}>
            <ThemedText color="#fff" weight="bold" size={14}>
              Ver Detalles
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Trips */}
      <View style={styles.sectionContainer}>
        <ThemedText weight="bold" size={18} color="black" style={styles.sectionTitle}>
          Próximos Viajes
        </ThemedText>

        <TouchableOpacity style={[styles.tripListItem, { borderLeftColor: COLORS.info }]}>
          <View style={styles.tripListContent}>
            <ThemedText weight="bold" color="black">María García</ThemedText>
            <ThemedText size={12} color={COLORS.gray} style={styles.tripListTime}>
              En 15 minutos
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tripListItem, { borderLeftColor: COLORS.success }]}>
          <View style={styles.tripListContent}>
            <ThemedText weight="bold" color="black">Carlos López</ThemedText>
            <ThemedText size={12} color={COLORS.gray} style={styles.tripListTime}>
              En 45 minutos
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.sectionContainer}>
        <ThemedText weight="bold" size={18} color="black" style={styles.sectionTitle}>
          Acciones Rápidas
        </ThemedText>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="call" size={32} color={COLORS.primary} />
            <ThemedText size={12} weight="bold" color="black">
              Llamar
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="mail" size={32} color={COLORS.success} />
            <ThemedText size={12} weight="bold" color="black">
              Mensaje
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="map" size={32} color={COLORS.warning} />
            <ThemedText size={12} weight="bold" color="black">
              Ruta
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="information-circle" size={32} color={COLORS.secondary} />
            <ThemedText size={12} weight="bold" color="black">
              Soporte
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  header: {
    paddingVertical: SPACING.md,
    paddingTop: SPACING.lg,
  },
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {
    color: COLORS.gray,
  },
  statusCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statusContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },
  statsContainer: {
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  statContent: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  tripCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  tripFrom: {
    marginBottom: SPACING.sm,
  },
  tripTo: {
    marginBottom: 0,
  },
  tripTime: {
    alignItems: "flex-end",
  },
  tripDistance: {
    marginTop: SPACING.sm,
  },
  tripPassenger: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderTopColor: COLORS.lightGray,
    borderBottomColor: COLORS.lightGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: SPACING.md,
  },
  passengerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerRating: {
    marginTop: SPACING.sm,
  },
  actionButton: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  tripListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
  },
  tripListContent: {
    flex: 1,
  },
  tripListTime: {
    marginTop: SPACING.sm,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  actionCard: {
    width: "48%",
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
});
