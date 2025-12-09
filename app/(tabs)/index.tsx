import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState } from "react";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState("Camioneta");

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={require("../../assets/images/home-banner.png")}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlayGradient} />

        <View style={styles.bannerContent}>
          <View style={styles.greetingBadge}>
            <Ionicons name="sunny" size={20} color={COLORS.accent} />
            <ThemedText size={13} style={{ color: COLORS.white2, marginLeft: 6 }}>Buenos días</ThemedText>
          </View>
          <ThemedText size={32} weight="bold" style={styles.bannerText}>
            Hola, Angie 👋
          </ThemedText>
          <ThemedText size={16} style={styles.bannerSubText}>
            ¿A dónde te llevamos hoy?
          </ThemedText>
        </View>
      </View>

      {/* Botón principal */}
      <TouchableOpacity
        style={styles.mainActionCard}
        onPress={() => router.push({ pathname: "/(tabs)/quotes", params: { vehicle: selectedVehicle } })}
        activeOpacity={0.8}
      >
        <View style={styles.mainActionIcon}>
          <Ionicons name="location" size={28} color={COLORS.white2} />
        </View>
        <View style={{ flex: 1, marginLeft: SPACING.md }}>
          <ThemedText weight="bold" size={18} color={COLORS.text}>Solicitar mudanza</ThemedText>
          <ThemedText color={COLORS.textSecondary} size={13} style={{ marginTop: 2 }}>
            Reserva un camión en minutos
          </ThemedText>
        </View>
        <View style={styles.arrowContainer}>
          <Ionicons name="arrow-forward" size={22} color={COLORS.primary} />
        </View>
      </TouchableOpacity>

      {/* Accesos rápidos */}
      <View style={styles.sectionHeader}>
        <ThemedText weight="bold" size={20} style={styles.sectionTitle}>
          Accesos rápidos
        </ThemedText>
        <ThemedText size={13} color={COLORS.textSecondary}>
          Tus ubicaciones favoritas
        </ThemedText>
      </View>

      <View style={styles.quickActions}>
        <ActionButton icon="home" text="Casa" route="/home-house" color={COLORS.primary} />
        <ActionButton icon="briefcase" text="Trabajo" route="/home-work" color={COLORS.secondary} />
        <ActionButton icon="star" text="Favoritos" route="/home-favorites" color={COLORS.accent} />
      </View>

      {/* Tamaño del vehículo */}
      <View style={styles.vehicleSection}>
        <View style={styles.sectionHeader}>
          <ThemedText weight="bold" size={20} style={styles.sectionTitle}>
            Tamaño del vehículo
          </ThemedText>
          <ThemedText size={13} color={COLORS.textSecondary}>
            Selecciona el que necesites
          </ThemedText>
        </View>

        <View style={styles.vehicleOptions}>
          <VehicleSize
            text="Camioneta"
            icon="car"
            subtitle="Pequeña"
            onSelect={() => setSelectedVehicle("Camioneta")}
            selected={selectedVehicle === "Camioneta"}
          />
          <VehicleSize
            text="Camión"
            icon="bus"
            subtitle="Mediano"
            onSelect={() => setSelectedVehicle("Camión")}
            selected={selectedVehicle === "Camión"}
          />
          <VehicleSize
            text="Tráiler"
            icon="trail-sign"
            subtitle="Grande"
            onSelect={() => setSelectedVehicle("Tráiler")}
            selected={selectedVehicle === "Tráiler"}
          />
        </View>

        <TouchableOpacity
          style={styles.quoteButton}
          onPress={() =>
            router.push({ pathname: "/(tabs)/quotes", params: { vehicle: selectedVehicle } })
          }
          activeOpacity={0.8}
        >
          <Ionicons name="calculator" size={20} color={COLORS.white2} style={{ marginRight: 8 }} />
          <ThemedText style={styles.quoteButtonText}>Obtener cotización</ThemedText>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white2} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>

      {/* Cómo funciona */}
      <View style={styles.sectionHeader}>
        <ThemedText weight="bold" size={20} style={styles.sectionTitle}>
          ¿Cómo funciona?
        </ThemedText>
        <ThemedText size={13} color={COLORS.textSecondary}>
          En 3 simples pasos
        </ThemedText>
      </View>

      <View style={styles.stepsBox}>
        <StepItem 
          icon="location"
          number="1"
          title="Indica tu origen y destino"
          text="Dinos desde dónde hasta dónde te mudas"
        />
        <StepItem
          icon="car"
          number="2"
          title="Escoge el vehículo"
          text="Camioneta, camión o tráiler"
        />
        <StepItem
          icon="checkmark-circle"
          number="3"
          title="Confirma y paga"
          text="Paga de forma segura y monitorea tu viaje"
        />
      </View>
    </ScrollView>
  );
}

/* -------- COMPONENTES -------- */

function ActionButton({
  icon,
  text,
  route,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  route: string;
  color: string;
}) {
  return (
    <TouchableOpacity
      style={styles.actionBtn}
      onPress={() => router.push(route as any)}
      activeOpacity={0.7}
    >
      <View style={[styles.actionIconContainer, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={26} color={color} />
      </View>
      <ThemedText size={13} weight="bold" style={styles.actionText}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}


function StepItem({ icon, number, title, text }: { icon: keyof typeof Ionicons.glyphMap; number: string; title: string; text: string; }) {
  return (
    <View style={styles.stepItem}>
      <View style={styles.stepIconContainer}>
        <View style={styles.stepNumber}>
          <ThemedText weight="bold" size={14} color={COLORS.primary}>{number}</ThemedText>
        </View>
        <Ionicons name={icon} size={28} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: SPACING.md }}>
        <ThemedText weight="bold" size={15} color="#000000">{title}</ThemedText>
        <ThemedText color={COLORS.textSecondary} size={13} style={{ marginTop: 2 }}>{text}</ThemedText>
      </View>
    </View>
  );
}

function VehicleSize({
  icon,
  text,
  subtitle,
  onSelect,
  selected,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  subtitle: string;
  onSelect: () => void;
  selected: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.vehicleCard,
        selected && styles.vehicleCardSelected,
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={[styles.vehicleIconContainer, selected && styles.vehicleIconSelected]}>
        <Ionicons name={icon} size={32} color={selected ? COLORS.white2 : COLORS.primary} />
      </View>
      <ThemedText size={14} weight="bold" style={{ color: selected ? COLORS.primary : COLORS.text, marginTop: 8 }}>
        {text}
      </ThemedText>
      <ThemedText size={11} style={{ color: COLORS.textSecondary, marginTop: 2 }}>
        {subtitle}
      </ThemedText>
      {selected && (
        <View style={styles.selectedBadge}>
          <Ionicons name="checkmark" size={14} color={COLORS.white2} />
        </View>
      )}
    </TouchableOpacity>
  );
}

/* -------- ESTILOS -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: 120,
  },
  
  /* Banner */
  bannerContainer: {
    width: "100%",
    height: 200,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.xl,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerOverlayGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  bannerContent: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
  },
  greetingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginBottom: 8,
  },
  bannerText: {
    color: COLORS.white2,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerSubText: {
    color: COLORS.white2,
    marginTop: 4,
    opacity: 0.95,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  /* Botón principal */
  mainActionCard: {
    backgroundColor: COLORS.white2,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  mainActionIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Secciones */
  sectionHeader: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.text,
  },

  /* Accesos rápidos */
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: COLORS.white2,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  actionText: {
    color: COLORS.text,
    marginTop: 4,
    textAlign: "center",
  },

  /* Sección de vehículos */
  vehicleSection: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.white2,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  vehicleOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  vehicleCard: {
    flex: 1,
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  vehicleCardSelected: {
    backgroundColor: COLORS.primary + '10',
    borderColor: COLORS.primary,
  },
  vehicleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleIconSelected: {
    backgroundColor: COLORS.primary,
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  quoteButtonText: {
    color: COLORS.white2,
    fontWeight: "bold",
    fontSize: 16,
  },

  /* Pasos */
  stepsBox: {
    backgroundColor: COLORS.white2,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '30',
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
});
