import { View, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from "react-native";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function MovesScreen() {
  const params = useLocalSearchParams();
  
  // Parsear la información recibida
  const driver = params.driver ? JSON.parse(params.driver as string) : null;
  const origen = params.origen as string;
  const destino = params.destino as string;
  const fecha = params.fecha ? new Date(params.fecha as string) : null;
  const hora = params.hora ? new Date(params.hora as string) : null;
  const precio = params.precio ? parseFloat(params.precio as string) : 0;
  const vehicle = params.vehicle as string;

  const formatFecha = (d: Date | null) =>
    d ? d.toLocaleDateString("es-EC", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
  const formatHora = (d: Date | null) =>
    d ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <ThemedText size={22} weight="bold" color={COLORS.text}>
            Seguimiento en vivo
          </ThemedText>
          <View style={{ width: 40 }} />
        </View>

        {/* Estado del viaje */}
        <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Ionicons name="car-sport" size={32} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <ThemedText size={18} weight="bold" color={COLORS.text}>
              En camino al origen
            </ThemedText>
            <ThemedText size={13} color={COLORS.textSecondary} style={{ marginTop: 4 }}>
              Llegada estimada: {hora ? formatHora(hora) : "Calculando..."}
            </ThemedText>
          </View>
        </View>

        {/* Mapa */}
        <View style={styles.mapContainer}>
          <Image
            source={require("../../assets/images/tile.png")} 
            style={styles.mapImage}
          />
          <View style={styles.mapOverlay}>
            <View style={styles.etaBadge}>
              <Ionicons name="time" size={16} color={COLORS.white2} />
              <ThemedText size={13} weight="bold" style={{ color: COLORS.white2, marginLeft: 4 }}>
                15 min
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Información del chofer */}
        {driver && (
          <View style={styles.driverCard}>
            <Image 
              source={{ uri: driver.avatar }} 
              style={styles.driverAvatar}
            />
            <View style={{ flex: 1, marginLeft: SPACING.md }}>
              <ThemedText size={18} weight="bold" color={COLORS.text}>
                {driver.name}
              </ThemedText>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Ionicons name="star" size={16} color={COLORS.accent} />
                <ThemedText size={13} color={COLORS.textSecondary} style={{ marginLeft: 4 }}>
                  {driver.rating} • {driver.trips} viajes
                </ThemedText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Ionicons name="car" size={14} color={COLORS.textSecondary} />
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginLeft: 4 }}>
                  {driver.vehicle} • {driver.plate}
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => router.push({
                pathname: "/driver-info",
                params: { driver: JSON.stringify(driver) }
              })}
            >
              <Ionicons name="call" size={20} color={COLORS.white2} />
            </TouchableOpacity>
          </View>
        )}

        {/* Detalles del viaje */}
        <View style={styles.tripDetailsCard}>
          <ThemedText size={18} weight="bold" color={COLORS.text} style={{ marginBottom: SPACING.md }}>
            Detalles del viaje
          </ThemedText>

          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: COLORS.primary + '15' }]}>
              <Ionicons name="location" size={18} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText size={12} color={COLORS.textSecondary}>Origen</ThemedText>
              <ThemedText size={14} color={COLORS.text} style={{ marginTop: 2 }}>
                {origen || "No especificado"}
              </ThemedText>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: COLORS.secondary + '15' }]}>
              <Ionicons name="navigate" size={18} color={COLORS.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText size={12} color={COLORS.textSecondary}>Destino</ThemedText>
              <ThemedText size={14} color={COLORS.text} style={{ marginTop: 2 }}>
                {destino || "No especificado"}
              </ThemedText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="calendar" size={16} color={COLORS.textSecondary} />
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginLeft: 6 }}>
                  Fecha
                </ThemedText>
              </View>
              <ThemedText size={14} weight="bold" color={COLORS.text} style={{ marginTop: 4 }}>
                {fecha ? formatFecha(fecha) : "No especificada"}
              </ThemedText>
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="car" size={16} color={COLORS.textSecondary} />
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginLeft: 6 }}>
                  Vehículo
                </ThemedText>
              </View>
              <ThemedText size={14} weight="bold" color={COLORS.text} style={{ marginTop: 4 }}>
                {vehicle || "N/A"}
              </ThemedText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <ThemedText size={14} color={COLORS.textSecondary}>
              Total a pagar
            </ThemedText>
            <ThemedText size={24} weight="bold" color={COLORS.primary}>
              ${precio} USD
            </ThemedText>
          </View>
        </View>

        {/* Timeline de progreso */}
        <View style={styles.timelineCard}>
          <ThemedText size={18} weight="bold" color={COLORS.text} style={{ marginBottom: SPACING.md }}>
            Estado del viaje
          </ThemedText>

          <TimelineItem
            active
            icon="checkmark-circle"
            title="Chofer asignado"
            text="Tu chofer ha aceptado el viaje"
          />
          <TimelineItem
            active
            icon="car"
            title="En camino al origen"
            text="El chofer se dirige a tu ubicación"
          />
          <TimelineItem
            active={false}
            icon="cube"
            title="Carga en proceso"
            text="Preparando tus pertenencias"
          />
          <TimelineItem
            active={false}
            icon="navigate"
            title="En ruta al destino"
            text="Viaje en progreso"
          />
          <TimelineItem
            active={false}
            icon="home"
            title="Llegada al destino"
            text="Descarga de pertenencias"
          />
          <TimelineItem
            active={false}
            icon="star"
            title="Viaje completado"
            text="Por favor califica tu experiencia"
            isLast
          />
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => router.push({
              pathname: "/chat-driver",
              params: { driver: JSON.stringify(driver) }
            })}
          >
            <Ionicons name="chatbubble-ellipses" size={20} color={COLORS.white2} />
            <ThemedText style={styles.chatButtonText}>Chat con el chofer</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => {}}
          >
            <Ionicons name="help-circle" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------- TIMELINE COMPONENT -------- */

function TimelineItem({ active, icon, title, text, isLast }: any) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineIconWrapper}>
        <View
          style={[
            styles.timelineIcon,
            { backgroundColor: active ? COLORS.primary : COLORS.inputBackground },
          ]}
        >
          <Ionicons 
            name={icon} 
            size={20} 
            color={active ? COLORS.white2 : COLORS.textSecondary} 
          />
        </View>
        {!isLast && (
          <View
            style={[
              styles.timelineLine,
              { backgroundColor: active ? COLORS.primary : COLORS.border },
            ]}
          />
        )}
      </View>

      <View style={styles.timelineContent}>
        <ThemedText
          weight="bold"
          size={15}
          color={active ? COLORS.text : COLORS.textSecondary}
        >
          {title}
        </ThemedText>
        <ThemedText 
          size={13} 
          color={COLORS.textSecondary}
          style={{ marginTop: 2 }}
        >
          {text}
        </ThemedText>
      </View>
    </View>
  );
}

/* -------- ESTILOS -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white2,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },

  /* Status Card */
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white2,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: COLORS.primary + '20',
  },
  statusIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Map */
  mapContainer: {
    position: 'relative',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  mapImage: {
    width: "100%",
    height: 200,
  },
  mapOverlay: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  },
  etaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    ...SHADOWS.medium,
  },

  /* Driver Card */
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white2,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.medium,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },

  /* Trip Details Card */
  tripDetailsCard: {
    backgroundColor: COLORS.white2,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.medium,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.border,
    marginLeft: 19,
    marginVertical: SPACING.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border + '30',
    marginVertical: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* Timeline Card */
  timelineCard: {
    backgroundColor: COLORS.white2,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.medium,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  timelineIconWrapper: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: SPACING.xs,
  },
  timelineContent: {
    flex: 1,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.md,
  },

  /* Action Buttons */
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    ...SHADOWS.medium,
  },
  chatButtonText: {
    color: COLORS.white2,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  helpButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white2,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: COLORS.primary + '30',
  },
});
