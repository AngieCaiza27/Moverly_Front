import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../../constants/Colors";

export default function DriverProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <View style={[styles.profileImage, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="person" size={48} color="#fff" />
          </View>
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <ThemedText size={20} weight="bold" color="black">
            Carlos Rodríguez
          </ThemedText>
          <ThemedText size={12} color={COLORS.gray} style={styles.profileStatus}>
            Chofer Verificado ✓
          </ThemedText>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={16}
                  color={i < 4 ? COLORS.warning : COLORS.lightGray}
                />
              ))}
            </View>
            <ThemedText size={12} color={COLORS.gray}>
              4.8 • 247 viajes
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <ThemedText size={18} weight="bold" color="black">
              $2,345.50
            </ThemedText>
            <ThemedText size={11} color={COLORS.gray} style={styles.statLabel}>
              Ganancias Esta Semana
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText size={18} weight="bold" color="black">
              42
            </ThemedText>
            <ThemedText size={11} color={COLORS.gray} style={styles.statLabel}>
              Viajes Completados
            </ThemedText>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <ThemedText size={18} weight="bold" color="black">
              98%
            </ThemedText>
            <ThemedText size={11} color={COLORS.gray} style={styles.statLabel}>
              Aceptación
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText size={18} weight="bold" color="black">
              1.2 h
            </ThemedText>
            <ThemedText size={11} color={COLORS.gray} style={styles.statLabel}>
              Tiempo Promedio
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Vehicle Information */}
      <View style={styles.sectionContainer}>
        <ThemedText size={18} weight="bold" color="black" style={styles.sectionTitle}>
          Información del Vehículo
        </ThemedText>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <Ionicons name="car" size={20} color={COLORS.primary} />
              <ThemedText size={13} color={COLORS.gray}>
                Modelo
              </ThemedText>
            </View>
            <ThemedText size={14} weight="bold" color="black">
              Toyota Corolla 2023
            </ThemedText>
          </View>

          <View style={[styles.infoRow, styles.infoDivider]}>
            <View style={styles.infoLabel}>
              <Ionicons name="id-card" size={20} color={COLORS.primary} />
              <ThemedText size={13} color={COLORS.gray}>
                Placa
              </ThemedText>
            </View>
            <ThemedText size={14} weight="bold" color="black">
              ABC-1234
            </ThemedText>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <Ionicons name="checkmark-done-circle" size={20} color={COLORS.primary} />
              <ThemedText size={13} color={COLORS.gray}>
                Estado Vehículo
              </ThemedText>
            </View>
            <View style={styles.statusBadge}>
              <Ionicons name="radio-button-on" size={12} color={COLORS.success} />
              <ThemedText size={12} weight="bold" color={COLORS.success}>
                Verificado
              </ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Document Status */}
      <View style={styles.sectionContainer}>
        <ThemedText size={18} weight="bold" color="black" style={styles.sectionTitle}>
          Estado de Documentos
        </ThemedText>

        <View style={styles.documentItem}>
          <View style={[styles.documentIcon, { backgroundColor: `${COLORS.success}20` }]}>
            <Ionicons name="document-text" size={24} color={COLORS.success} />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText weight="bold" color="black" size={14}>
              Cédula de Ciudadanía
            </ThemedText>
            <ThemedText size={12} color={COLORS.gray}>
              Vence: 15 Dic 2025
            </ThemedText>
          </View>
          <View style={[styles.badgeSuccess]}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
        </View>

        <View style={styles.documentItem}>
          <View style={[styles.documentIcon, { backgroundColor: `${COLORS.success}20` }]}>
            <Ionicons name="document-text" size={24} color={COLORS.success} />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText weight="bold" color="black" size={14}>
              Licencia de Conducción
            </ThemedText>
            <ThemedText size={12} color={COLORS.gray}>
              Vence: 10 Ago 2026
            </ThemedText>
          </View>
          <View style={[styles.badgeSuccess]}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
        </View>

        <View style={styles.documentItem}>
          <View style={[styles.documentIcon, { backgroundColor: `${COLORS.warning}20` }]}>
            <Ionicons name="document-text" size={24} color={COLORS.warning} />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText weight="bold" color="black" size={14}>
              Certificado de Cooperativa
            </ThemedText>
            <ThemedText size={12} color={COLORS.gray}>
              Vence: 30 Nov 2024
            </ThemedText>
          </View>
          <View style={[styles.badgeWarning]}>
            <Ionicons name="alert" size={16} color="#fff" />
          </View>
        </View>

        <View style={styles.documentItem}>
          <View style={[styles.documentIcon, { backgroundColor: `${COLORS.error}20` }]}>
            <Ionicons name="document-text" size={24} color={COLORS.error} />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText weight="bold" color="black" size={14}>
              Antecedentes Penales
            </ThemedText>
            <ThemedText size={12} color={COLORS.gray}>
              Vence: 5 Nov 2024
            </ThemedText>
          </View>
          <View style={[styles.badgeError]}>
            <Ionicons name="alert" size={16} color="#fff" />
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.sectionContainer}>
        <ThemedText size={18} weight="bold" color="black" style={styles.sectionTitle}>
          Configuración de Cuenta
        </ThemedText>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push("/driver/edit-profile")}>
          <View style={styles.settingIcon}>
            <Ionicons name="person" size={20} color={COLORS.info} />
          </View>
          <ThemedText size={14} weight="bold" color="black" style={styles.settingText}>
            Editar Perfil
          </ThemedText>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push("/driver/payment-methods")}>
          <View style={styles.settingIcon}>
            <Ionicons name="card" size={20} color={COLORS.info} />
          </View>
          <ThemedText size={14} weight="bold" color="black" style={styles.settingText}>
            Métodos de Pago
          </ThemedText>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push("/driver/faq")}>
          <View style={styles.settingIcon}>
            <Ionicons name="help-circle" size={20} color={COLORS.info} />
          </View>
          <ThemedText size={14} weight="bold" color="black" style={styles.settingText}>
            Ayuda y Soporte
          </ThemedText>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: COLORS.error }]}
        onPress={() => router.replace("/login")}>
        <Ionicons name="log-out" size={18} color="#fff" />
        <ThemedText color="#fff" weight="bold" size={14}>
          Cerrar Sesión
        </ThemedText>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    paddingTop: SPACING.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.info,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  profileStatus: {
    marginBottom: SPACING.md,
  },
  ratingContainer: {
    gap: SPACING.sm,
  },
  ratingStars: {
    flexDirection: "row",
    gap: 2,
  },
  statsSection: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statsCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: "row",
  },
  statItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    textAlign: "center",
    marginTop: SPACING.sm,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.lightGray,
  },
  sectionContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
  },
  infoDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  infoLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  documentInfo: {
    flex: 1,
  },
  badgeSuccess: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.success,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeWarning: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.warning,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeError: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.error,
    justifyContent: "center",
    alignItems: "center",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  settingText: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
  spacer: {
    height: SPACING.lg,
  },
});
