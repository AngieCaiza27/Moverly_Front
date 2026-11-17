import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

import Button from "../components/ui/Button";
import FormInput from "../components/ui/FormInput";
import ThemedText from "../components/ui/themed-text";
import { COLORS } from "../constants/Colors";

//  Validación
const schema = yup.object({
  name: yup.string().required("Requerido"),
  email: yup.string().email("Correo inválido").required("Requerido"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Requerido"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Requerido"),
});

export default function RegisterScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const userType = (type as "user" | "driver") || "user";

  const { control, handleSubmit } = useForm({
    defaultValues: { name: "", email: "", password: "", confirm: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (userType === "driver") {
      // Para conductores, guardar datos y pasar a documentos
      router.push("/register-documents");
    } else {
      // Para clientes, ir al login
      router.replace("/login");
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
      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { marginTop: 0 }]}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Logo + Título */}
      <View style={{ alignItems: "center", marginBottom: 24, marginTop: 0 }}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 180, height: 180, borderRadius: 20 }}
        />
        <ThemedText
          size={32}
          weight="bold"
          style={[styles.title, { color: COLORS.primary }]}
        >
          Crear Cuenta
        </ThemedText>
        <ThemedText style={{ color: "#A0AABA", marginTop: 4 }}>
          {userType === "driver"
            ? "Regístrate como Conductor"
            : "Regístrate como Cliente"}
        </ThemedText>
      </View>

      {/* Inputs */}
      <FormInput
        control={control}
        name="name"
        placeholder="Nombre completo"
        leftIcon="person-outline"
      />

      <FormInput
        control={control}
        name="email"
        placeholder="Correo electrónico"
        leftIcon="mail-outline"
      />

      <FormInput
        control={control}
        name="password"
        placeholder="Contraseña"
        secureTextEntry
        leftIcon="lock-closed-outline"
      />

      <FormInput
        control={control}
        name="confirm"
        placeholder="Confirmar contraseña"
        secureTextEntry
        leftIcon="lock-closed-outline"
      />

      {/* Botón */}
      <Button 
        title={userType === "driver" ? "Siguiente" : "Crear cuenta"} 
        onPress={handleSubmit(onSubmit)}
      />

      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{ marginTop: 16, alignSelf: "center" }}
      >
        <ThemedText style={{ color: COLORS.primary }}>
          ¿Ya tienes cuenta? Inicia sesión
        </ThemedText>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos
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
});
