import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Input from "../../components/ui/Input";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../constants/Colors";

export default function EditProfileScreen() {
  const [name, setName] = useState("Carlos Rodríguez");
  const [email, setEmail] = useState("carlos.rodriguez@email.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveChanges = () => {
    // TODO: Implement save changes logic
    console.log("Guardando cambios...", { name, email });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <ThemedText size={18} weight="bold" color="black">
          Editar Perfil
        </ThemedText>
        <View style={{ width: 28 }} />
      </View>

      {/* Profile Section */}
      <View style={styles.sectionContainer}>
        <ThemedText size={16} weight="bold" color="black" style={styles.sectionTitle}>
          Información Personal
        </ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText size={12} color={COLORS.gray} style={styles.inputLabel}>
            Nombre Completo
          </ThemedText>
          <Input
            placeholder="Ingresa tu nombre"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText size={12} color={COLORS.gray} style={styles.inputLabel}>
            Correo Electrónico
          </ThemedText>
          <Input
            placeholder="Ingresa tu correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Password Section */}
      <View style={styles.sectionContainer}>
        <ThemedText size={16} weight="bold" color="black" style={styles.sectionTitle}>
          Cambiar Contraseña
        </ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText size={12} color={COLORS.gray} style={styles.inputLabel}>
            Nueva Contraseña
          </ThemedText>
          <Input
            placeholder="Ingresa nueva contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText size={12} color={COLORS.gray} style={styles.inputLabel}>
            Confirmar Contraseña
          </ThemedText>
          <Input
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: COLORS.success }]}
        onPress={handleSaveChanges}>
        <ThemedText color="#fff" weight="bold" size={16}>
          Guardar Cambios
        </ThemedText>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    paddingTop: SPACING.xl + 20,
  },
  sectionContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    marginBottom: SPACING.sm,
  },
  saveButton: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  spacer: {
    height: SPACING.lg,
  },
});
