import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

import FormInput from "../components/ui/FormInput";
import ThemedText from "../components/ui/themed-text";
import { COLORS } from "../constants/Colors";

const schema = yup.object({
  email: yup.string().email("Correo inválido").required("Requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
});

export default function LoginScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    // Detectar si es cliente o chofer según el email
    if (data.email.startsWith("chofer@")) {
      router.replace("/driver");
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo + Título */}
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 220, height: 220, borderRadius: 20 }}
          />
          <ThemedText
            size={34}
            weight="bold"
            style={[styles.title, { color: COLORS.primary }]}
          >
            Moverly
          </ThemedText>
          <ThemedText style={{ color: "#7A8A93" }}>
            Mudarte nunca fue tan fácil
          </ThemedText>
      </View>

      {/* Campos con FormInput */}
      <FormInput
        control={control}
        name="email"
        placeholder="Correo"
        leftIcon="mail-outline"
      />

      <FormInput
        control={control}
        name="password"
        placeholder="Contraseña"
        secureTextEntry
        leftIcon="lock-closed-outline"
      />

      {/* Botón de iniciar sesión */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleSubmit(onSubmit)}
      >
        <ThemedText style={styles.primaryButtonText}>Iniciar sesión</ThemedText>
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginVertical: 16 }}>
        <ThemedText style={{ color: "#7A8A93" }}>o</ThemedText>
      </View>

      {/* Botón de crear cuenta */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/register-type")}
      >
        <ThemedText style={styles.secondaryButtonText}>Crear cuenta</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/forgot-password")}
        style={{ marginTop: 16 }}
      >
        <ThemedText
          style={{
            textAlign: "center",
            color: COLORS.primary,
            fontSize: 14,
          }}
        >
          ¿Olvidaste tu contraseña?
        </ThemedText>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09295d",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingTop: 60,
    justifyContent: "center",
  },
  title: {
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#A0AABA",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    color: "#A0AABA",
    fontWeight: "bold",
    fontSize: 16,
  },
});
