import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "expo-router";

import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import ThemedText from "../components/ui/themed-text";
import { COLORS } from "../constants/Colors";

const schema = yup.object({
  email: yup.string().email("Correo inválido").required("Requerido"),
});

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    // Aquí luego conectaremos con API real
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {/* Icon / Branding */}
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Image
          source={require("../assets/images/candado.png")}
          style={{ width: 200, height: 200, borderRadius: 20 }}
        />
        <ThemedText size={26} weight="bold" style={{ marginTop: 8 }}>
          Recuperar contraseña
        </ThemedText>
        <ThemedText style={{ color: "#7A8A93", textAlign: "center", marginTop: 4 }}>
          Ingresa tu correo y te enviaremos instrucciones
        </ThemedText>
      </View>

      {/* Input email */}
      <FormInput
        control={control}
        name="email"
        placeholder="Correo electrónico"
        leftIcon="mail-outline"
      />

      {/* Submit */}
      <Button title="Enviar enlace" onPress={handleSubmit(onSubmit)} />

      {/* Back */}
      <TouchableOpacity onPress={() => router.push("/login")} style={{ marginTop: 16 }}>
        <ThemedText style={{ textAlign: "center", color: COLORS.primary }}>
          Volver al inicio de sesión
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondo,
    padding: 20,
    justifyContent: "center",
  },
});
