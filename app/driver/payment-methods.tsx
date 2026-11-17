import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Input from "../../components/ui/Input";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../constants/Colors";

export default function PaymentMethodsScreen() {
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("Ahorros");

  const handleSaveAccount = () => {
    // TODO: Implement save account logic
    console.log("Guardando cuenta bancaria...", { accountHolder, accountNumber, bankName, accountType });
    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <ThemedText size={18} weight="bold" color="black">
          Métodos de Pago
        </ThemedText>
        <View style={{ width: 28 }} />
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={[styles.infoBadge, { backgroundColor: `${COLORS.info}20` }]}>
          <Ionicons name="information-circle" size={20} color={COLORS.info} />
          <ThemedText size={12} color={COLORS.info} style={{ flex: 1, marginLeft: SPACING.sm }}>
            Agrega una cuenta bancaria para recibir tus pagos de forma segura
          </ThemedText>
        </View>
      </View>

      {/* Bank Account Form */}
      <View style={styles.sectionContainer}>
        <ThemedText size={16} weight="bold" color="black" style={styles.sectionTitle}>
          Información de Cuenta Bancaria
        </ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText size={12} color={COLORS.gray} style={styles.inputLabel}>
            Nombre del Titulár
          </ThemedText>
          <Input
            placeholder="Ingresa el nombre del titulár"
            value={accountHolder}
            onChangeText={setAccountHolder}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText size={12} color={COLORS.gray} style={styles.inputLabel}>
            Banco
          </ThemedText>
          <Input
            placeholder="Ej: Bancolombia, BBVA, Davivienda"
            value={bankName}
            onChangeText={setBankName}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText size={12} color={COLORS.gray} style={styles.inputLabel}>
            Número de Cuenta
          </ThemedText>
          <Input
            placeholder="Ingresa tu número de cuenta"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText size={12} color={COLORS.gray} style={styles.inputLabel}>
            Tipo de Cuenta
          </ThemedText>
          <View style={styles.accountTypeContainer}>
            {["Ahorros", "Corriente"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.accountTypeButton,
                  accountType === type && {
                    backgroundColor: COLORS.primary,
                    borderColor: COLORS.primary,
                  },
                ]}
                onPress={() => setAccountType(type)}>
                <ThemedText
                  size={14}
                  weight="bold"
                  color={accountType === type ? "#fff" : COLORS.gray}>
                  {type}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
        onPress={handleSaveAccount}>
        <ThemedText color="#fff" weight="bold" size={16}>
          Guardar Cuenta
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  infoSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
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
  accountTypeContainer: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignItems: "center",
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
