import { View, Image, StyleSheet, TouchableOpacity, SafeAreaView, Linking, Alert } from "react-native";
import ThemedText from "../components/ui/themed-text";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DriverScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parsear la información del chofer recibida
  const driver = params.driver ? JSON.parse(params.driver as string) : null;

  if (!driver) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>No se encontró información del chofer</ThemedText>
      </SafeAreaView>
    );
  }

  const handleCall = () => {
    if (driver.phone) {
      Linking.openURL(`tel:${driver.phone}`);
    } else {
      Alert.alert("Número no disponible", "No se pudo obtener el número del chofer");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <ThemedText size={20} weight="bold" color={COLORS.text}>
          Información del chofer
        </ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: driver.avatar }} style={styles.photo} />
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={18} color={COLORS.accent} />
            <ThemedText size={14} weight="bold" style={{ color: COLORS.white2, marginLeft: 4 }}>
              {driver.rating}
            </ThemedText>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <ThemedText weight="bold" size={24} color={COLORS.text} style={{ textAlign: 'center' }}>
            {driver.name}
          </ThemedText>
          <ThemedText size={14} color={COLORS.textSecondary} style={{ textAlign: 'center', marginTop: 4 }}>
            {driver.trips} viajes completados • {driver.experience}
          </ThemedText>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: COLORS.primary + '15' }]}>
                <Ionicons name="car" size={24} color={COLORS.primary} />
              </View>
              <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 8 }}>
                Vehículo
              </ThemedText>
              <ThemedText size={14} weight="bold" color={COLORS.text} style={{ marginTop: 4, textAlign: 'center' }}>
                {driver.vehicle}
              </ThemedText>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: COLORS.secondary + '15' }]}>
                <Ionicons name="card" size={24} color={COLORS.secondary} />
              </View>
              <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 8 }}>
                Placa
              </ThemedText>
              <ThemedText size={14} weight="bold" color={COLORS.text} style={{ marginTop: 4 }}>
                {driver.plate}
              </ThemedText>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: COLORS.accent + '15' }]}>
                <Ionicons name="call" size={24} color={COLORS.accent} />
              </View>
              <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 8 }}>
                Teléfono
              </ThemedText>
              <ThemedText size={12} weight="bold" color={COLORS.text} style={{ marginTop: 4, textAlign: 'center' }}>
                {driver.phone}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Botones */}
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Ionicons name="call" size={20} color={COLORS.white2} />
          <ThemedText style={styles.callButtonText}>Llamar al chofer</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.messageButton}
          onPress={() =>
            router.push({
              pathname: "/chat-driver",
              params: { driver: JSON.stringify(driver) }
            })
          }
        >
          <Ionicons name="chatbubble-ellipses" size={20} color={COLORS.primary} />
          <ThemedText style={styles.messageButtonText}>Enviar mensaje</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: COLORS.primary,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 0,
    right: '30%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    ...SHADOWS.medium,
  },
  infoCard: {
    backgroundColor: COLORS.white2,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  detailIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  callButtonText: {
    color: COLORS.white2,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: COLORS.white2,
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },
  messageButtonText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
