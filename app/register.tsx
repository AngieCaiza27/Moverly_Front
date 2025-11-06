import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "expo-router";

import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
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

  const { control, handleSubmit } = useForm({
    defaultValues: { name: "", email: "", password: "", confirm: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    // Aquí luego conectamos API
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {/* Logo + Título */}
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 220, height: 220, borderRadius: 20 }}
        />
        {/* 🔸 Texto principal */}
        <ThemedText
          size={34}
          weight="bold"
          style={[styles.title, { color: COLORS.primary }]}
        >
          Crear Cuenta
        </ThemedText>
        <ThemedText style={{ color: "#7A8A93" }}>
          ¡Es rápido y fácil!
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
      <Button title="Crear cuenta" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{ marginTop: 16, alignSelf: "center" }}
      >
        <ThemedText style={{ color: COLORS.primary }}>
          ¿Ya tienes cuenta? Inicia sesión
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondo,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    marginTop: 8,
  },
});
