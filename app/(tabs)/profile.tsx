import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../constants/Colors";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  // Datos de ejemplo; idealmente vienen de contexto / API
  const user = {
    name: "Angie Caiza",
    email: "angie@example.com",
    avatar: null as string | null,
  };

  function handleLogout() {
    // Lógica de logout: limpiar storage, tokens, etc. Por ahora redirige a login
    Alert.alert("Cerrar sesión", "¿Deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sí", onPress: () => router.replace("/login") },
    ]);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: SPACING.xs + insets.top }}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <ThemedText weight="bold" size={24} style={{ color: COLORS.white }}>
                {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <ThemedText weight="bold" size={20} color={COLORS.text}>{user.name}</ThemedText>
          <ThemedText color={COLORS.gray} size={14} style={{ marginTop: 6 }}>{user.email}</ThemedText>
        </View>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => Alert.alert('Editar perfil', 'Funcionalidad en desarrollo')}
        >
          <Ionicons name="pencil-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <ThemedText weight="bold" size={18} color={COLORS.text} style={{ marginBottom: SPACING.sm }}>Cuenta</ThemedText>

  <TouchableOpacity style={styles.row} onPress={() => router.push({ pathname: '/(tabs)/moves' })}>
          <View style={styles.rowLeft}>
            <Ionicons name="car-outline" size={22} color={COLORS.primary} />
            <ThemedText style={styles.rowText} color={COLORS.text}>Mis mudanzas</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>

  <TouchableOpacity style={styles.row} onPress={() => router.push({ pathname: '/(tabs)/quotes' })}>
          <View style={styles.rowLeft}>
            <Ionicons name="document-text-outline" size={22} color={COLORS.primary} />
            <ThemedText style={styles.rowText} color={COLORS.text}>Mis cotizaciones</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>

  <TouchableOpacity style={styles.row} onPress={() => router.push({ pathname: '/(tabs)/history' })}>
          <View style={styles.rowLeft}>
            <Ionicons name="time-outline" size={22} color={COLORS.primary} />
            <ThemedText style={styles.rowText} color={COLORS.text}>Historial</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <ThemedText weight="bold" size={18} color={COLORS.text} style={{ marginBottom: SPACING.sm }}>Seguridad</ThemedText>

        <TouchableOpacity
          style={styles.row}
          onPress={() => Alert.alert('Cambiar contraseña', 'Funcionalidad en desarrollo')}
        >
          <View style={styles.rowLeft}>
            <Ionicons name="key-outline" size={22} color={COLORS.primary} />
            <ThemedText style={styles.rowText} color={COLORS.text}>Cambiar contraseña</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { alignItems: 'center' }]}>
        <Button title="Cerrar sesión" variant="outline" onPress={handleLogout} fullWidth={false} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  header: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatarContainer: {
    marginRight: SPACING.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 72,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 72,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  editBtn: {
    padding: SPACING.sm,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    marginLeft: SPACING.sm,
  },
});
