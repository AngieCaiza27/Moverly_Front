import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, SPACING, RADIUS } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { router } from "expo-router";



export default function HomeScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState("Camioneta");
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner con overlay */}
      <View style={styles.bannerContainer}>
        <Image
          source={require("../../assets/images/home-banner.png")}
          style={styles.bannerImage}
        />

        {/* Opaque overlay */}
        <View style={styles.bannerOverlayDark} />

        {/* Textos encima */}
        <View style={styles.bannerOverlay}>
          <ThemedText size={28} weight="bold" style={styles.bannerText}>
            Hola, Angie 👋
          </ThemedText>
          <ThemedText size={16} style={styles.bannerSubText}>
            ¿A dónde te llevamos hoy?
          </ThemedText>
        </View>
      </View>


      {/* Card principal */}
      <TouchableOpacity style={styles.card}>
        <Ionicons name="location-outline" size={28} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: SPACING.sm }}>
          <ThemedText weight="bold" size={3}>Solicitar mudanza</ThemedText>
          <ThemedText color={COLORS.gray} size={14}>
            Reserva un camión en minutos
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
      </TouchableOpacity>

      {/* Accesos rápidos */}
      <View style={styles.quickActions}>
        <ActionButton icon="home-outline" text="Casa" />
        <ActionButton icon="briefcase-outline" text="Trabajo" />
        <ActionButton icon="star-outline" text="Favoritos" />
      </View>

      {/* Tamaño del vehículo */}
      <View style={{ marginTop: SPACING.xl, backgroundColor: COLORS.white, padding: SPACING.md, borderRadius: RADIUS.lg }}>
        <ThemedText
          weight="bold"
          size={20}
          style={{ color: COLORS.text, marginBottom: SPACING.sm }}
        >
          Tamaño del vehículo
        </ThemedText>

        <View style={styles.vehicleOptions}>
          <VehicleSize
            text="Camioneta"
            icon="car-outline"
            onSelect={() => setSelectedVehicle("Camioneta")}
            selected={selectedVehicle === "Camioneta"}
          />
          <VehicleSize
            text="Camión"
            icon="bus-outline"
            onSelect={() => setSelectedVehicle("Camión")}
            selected={selectedVehicle === "Camión"}
          />
          <VehicleSize
            text="Tráiler"
            icon="trail-sign-outline"
            onSelect={() => setSelectedVehicle("Trailer")}
            selected={selectedVehicle === "Trailer"}
          />
        </View>

        <TouchableOpacity
          style={styles.quoteButton}
          onPress={() => router.push({ pathname: "/(tabs)/quotes", params: { vehicle: selectedVehicle } })}
        >
          <ThemedText style={styles.quoteButtonText}>
            Obtener cotización
          </ThemedText>
        </TouchableOpacity>
      </View>


      <ThemedText
        weight="bold"
        size={20}
        style={{
          marginTop: SPACING.lg,
          marginBottom: SPACING.sm,
          color: COLORS.text,
          textAlign: "center",
        }}
      >
        ¿Cómo funciona?
      </ThemedText>


      <View style={styles.stepsBox}>
        <StepItem
          icon="pin-outline"
          title="Indica tu origen y destino"
          text="Dinos desde dónde hasta dónde te mudas"
        />
        <StepItem
          icon="cube-outline"
          title="Escoge el vehículo"
          text="Camioneta, camión o trailer"
        />
        <StepItem
          icon="card-outline"
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
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <TouchableOpacity style={styles.actionBtn}>
      <Ionicons name={icon} size={26} color={COLORS.primary} />
      <ThemedText
        size={13}
        style={{ color: COLORS.text, marginTop: 4, textAlign: "center" }}
      >
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}


function StepItem({
  icon,
  title,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.stepItem}>
      <Ionicons name={icon} size={28} color={COLORS.primary} />
      <View style={{ flex: 1, marginLeft: SPACING.sm }}>
        <ThemedText weight="bold">{title}</ThemedText>
        <ThemedText color={COLORS.gray} size={14}>{text}</ThemedText>
      </View>
    </View>
  );
}

function VehicleSize({
  icon,
  text,
  onSelect,
  selected,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onSelect: () => void;
  selected: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.vehicleCard,
        selected && { borderWidth: 2, borderColor: COLORS.primary },
      ]}
      onPress={onSelect}
    >
      <Ionicons name={icon} size={28} color={COLORS.primary} />
      <ThemedText size={14} style={{ color: COLORS.text, marginTop: 6 }}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}


/* -------- ESTILOS -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  quickActions: {
    flexDirection: "row",
    marginTop: SPACING.lg,
    justifyContent: "space-between",
  },
  actionBtn: {
    width: 95,
    height: 95,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  stepsBox: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  bannerContainer: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: SPACING.lg,
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  bannerOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  bannerText: {
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  bannerSubText: {
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerOverlayDark: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.35)", // opacidad ajustable (0.25 - 0.50)
  },
  vehicleOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },

  vehicleCard: {
    flex: 1,
    height: 95,
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  quoteButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: "center",
  },

  quoteButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },



});
