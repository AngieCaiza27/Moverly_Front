import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../components/ui/themed-text";
import { COLORS } from "../constants/Colors";

export default function RegisterTypeScreen() {
  const router = useRouter();

  const handleSelectType = (type: "user" | "driver") => {
    router.push(`/register?type=${type}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={[styles.backButton, { marginTop: 50 }]}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Logo + Título */}
      <View style={{ alignItems: "center", marginBottom: 40, marginTop: 0 }}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 180, height: 180, borderRadius: 20 }}
        />
        <ThemedText
          size={32}
          weight="bold"
          style={[styles.title, { color: COLORS.primary }]}
        >
          Moverly
        </ThemedText>
        <ThemedText style={{ color: "#A0AABA", marginTop: 8 }}>
          Únete a nuestra comunidad
        </ThemedText>
      </View>

      {/* Title */}
      <ThemedText size={20} weight="bold" style={styles.sectionTitle}>
        ¿Cómo te quieres registrar?
      </ThemedText>

      <ThemedText size={13} color="#A0AABA" style={styles.subtitle}>
        Selecciona el tipo de cuenta que mejor se adapte a ti
      </ThemedText>

      {/* User Registration Card */}
      <TouchableOpacity
        style={styles.typeCard}
        onPress={() => handleSelectType("user")}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${COLORS.info}20` }]}>
          <Ionicons name="person" size={32} color={COLORS.info} />
        </View>
        <View style={styles.cardContent}>
          <ThemedText size={16} weight="bold" color="#fff">
            Cliente
          </ThemedText>
          <ThemedText size={12} color="#A0AABA" style={styles.cardDescription}>
            Solicita mudanzas y servicios de transporte
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Driver Registration Card */}
      <TouchableOpacity
        style={styles.typeCard}
        onPress={() => handleSelectType("driver")}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${COLORS.success}20` }]}>
          <Ionicons name="car" size={32} color={COLORS.success} />
        </View>
        <View style={styles.cardContent}>
          <ThemedText size={16} weight="bold" color="#fff">
            Conductor
          </ThemedText>
          <ThemedText size={12} color="#A0AABA" style={styles.cardDescription}>
            Ofrece servicios y gana dinero
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <ThemedText size={13} weight="bold" color="#A0AABA" style={styles.benefitsTitle}>
          AMBOS TIPOS INCLUYEN
        </ThemedText>

        <View style={styles.benefitRow}>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
          <ThemedText size={12} color="#A0AABA" style={styles.benefitText}>
            Verificación de seguridad
          </ThemedText>
        </View>

        <View style={styles.benefitRow}>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
          <ThemedText size={12} color="#A0AABA" style={styles.benefitText}>
            Soporte 24/7
          </ThemedText>
        </View>

        <View style={styles.benefitRow}>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
          <ThemedText size={12} color="#A0AABA" style={styles.benefitText}>
            Historial de transacciones
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09295d",
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  title: {
    marginTop: 8,
  },
  sectionTitle: {
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  typeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardDescription: {
    marginTop: 2,
  },
  benefitsSection: {
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  benefitsTitle: {
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  benefitText: {
    marginLeft: 10,
    flex: 1,
  },
});
