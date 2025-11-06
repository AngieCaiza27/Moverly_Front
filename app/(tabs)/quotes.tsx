import { router, useLocalSearchParams } from "expo-router";
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, SPACING, RADIUS } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

export default function QuotesScreen() {
  const { vehicle } = useLocalSearchParams();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [precio, setPrecio] = useState(0);
  const [showCompanies, setShowCompanies] = useState(false);

  useEffect(() => {
    switch (vehicle) {
      case "Camioneta":
        setPrecio(35);
        break;
      case "Camión":
        setPrecio(60);
        break;
      case "Tráiler":
        setPrecio(90);
        break;
      default:
        setPrecio(0);
    }
  }, [vehicle]);

  // Compañías simuladas
  const companies = [
    {
      id: 1,
      name: "Mudanzas Express",
      rating: 4.8,
      price: precio + 5,
      logo: require("../../assets/images/company1.jpg"),
    },
    {
      id: 2,
      name: "Transporte Andino",
      rating: 4.6,
      price: precio + 10,
      logo: require("../../assets/images/company1.jpg"),
    },
    {
      id: 3,
      name: "Full Move S.A.",
      rating: 4.9,
      price: precio + 15,
      logo: require("../../assets/images/company1.jpg"),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {!showCompanies ? (
        <>
          {/* Título */}
          <ThemedText size={26} weight="bold" style={styles.title}>
            Cotización de mudanza
          </ThemedText>

          {/* Card del vehículo */}
          <View style={styles.vehicleCard}>
            <Ionicons
              name={
                vehicle === "Camioneta"
                  ? "car-outline"
                  : vehicle === "Camión"
                    ? "bus-outline"
                    : "trail-sign-outline"
              }
              size={42}
              color={COLORS.white2}
            />
            <ThemedText weight="bold" size={18} style={styles.title2}>
              {vehicle || "Selecciona un vehículo"}
            </ThemedText>
          </View>

          {/* Formulario */}
          <ThemedText weight="bold" size={16} style={[styles.sectionTitle, { color: COLORS.black }]}>
            Detalles de tu mudanza
          </ThemedText>

          <InputField icon="pin-outline" placeholder="Origen" value={origen} onChangeText={setOrigen} />
          <InputField icon="navigate-outline" placeholder="Destino" value={destino} onChangeText={setDestino} />
          <InputField icon="calendar-outline" placeholder="Fecha (dd/mm/aaaa)" value={fecha} onChangeText={setFecha} />
          <InputField icon="time-outline" placeholder="Hora (HH:mm)" value={hora} onChangeText={setHora} />

          {/* Precio estimado */}
          <View style={styles.priceBox}>
            <ThemedText weight="bold" size={18} style={{ color: COLORS.black }}>
              Precio estimado:
            </ThemedText>
            <ThemedText size={22} weight="bold" style={{ color: COLORS.primary }}>
              ${precio.toFixed(2)}
            </ThemedText>
          </View>

          {/* Botón */}
          <TouchableOpacity style={styles.confirmButton} onPress={() => setShowCompanies(true)}>
            <ThemedText style={styles.confirmText}>Confirmar cotización</ThemedText>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/*  Nueva sección de compañías */}
          <ThemedText size={26} weight="bold" style={styles.title}>
            Compañías disponibles
          </ThemedText>

          {/* Subheader con detalles */}
          <ThemedText size={14} color={COLORS.gray} style={{ marginBottom: SPACING.sm }}>
            Av. Siempre Viva 742 → Calle Reforma 123 {"\n"}Hoy, 15:00 · {vehicle}
          </ThemedText>

          {/* 🔹 Controles de filtro */}
          <View style={styles.filterRow}>
            <View style={styles.dropdown}>
              <Ionicons name="funnel-outline" size={18} color={COLORS.primary} />
              <TouchableOpacity>
                <ThemedText style={styles.dropdownText}>Precio más bajo ▼</ThemedText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={18} color={COLORS.primary} />
              <ThemedText style={styles.filterText}>Filtros</ThemedText>
            </TouchableOpacity>
          </View>

          {/*  Listado de compañías */}
          {companies.map((c) => (
            <View key={c.id} style={styles.companyCard}>
              <Image source={c.logo} style={styles.companyLogo} />

              <View style={{ flex: 1 }}>
                <ThemedText weight="bold" size={16}>{c.name}</ThemedText>
                <ThemedText color={COLORS.gray} size={14}>
                   {c.rating.toFixed(1)} ({Math.floor(Math.random() * 200)} reseñas)
                </ThemedText>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                  <Ionicons name="time-outline" size={16} color={COLORS.gray} />
                  <ThemedText color={COLORS.gray} size={13} style={{ marginLeft: 4 }}>
                    2-3 horas · {vehicle}
                  </ThemedText>
                </View>

                {/* Etiquetas */}
                <View style={styles.badgeRow}>
                  <View style={styles.badge}>
                    <ThemedText size={12} style={{ color: COLORS.primary }}>Seguro incluido</ThemedText>
                  </View>
                  <View style={styles.badgeLight}>
                    <ThemedText size={12} style={{ color: COLORS.primary }}>Disponible hoy</ThemedText>
                  </View>
                </View>
              </View>

              {/* Precio */}
              <View style={{ alignItems: "flex-end" }}>
                <ThemedText weight="bold" size={18} style={{ color: COLORS.primary }}>
                  ${c.price.toFixed(2)}
                </ThemedText>
                <ThemedText color={COLORS.gray} size={12}>MXN</ThemedText>

                {/* Botón seleccionar */}
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={() => router.push("/(tabs)/moves")}
                >
                  <ThemedText style={styles.selectText}>Seleccionar</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Botón para regresar */}
          <TouchableOpacity
            style={[styles.confirmButton, { marginTop: 20 }]}
            onPress={() => setShowCompanies(false)}
          >
            <ThemedText style={styles.confirmText}>Volver a editar</ThemedText>
          </TouchableOpacity>

        </>
      )}
    </ScrollView>
  );
}

/* -------- COMPONENTE InputField -------- */

function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.inputField}>
      <Ionicons name={icon} size={22} color={COLORS.primary} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
}


/* -------- ESTILOS -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: 60, // 🔹 más espacio superior
    paddingBottom: 100,
  },
  title: {
    marginBottom: SPACING.lg,
    color: COLORS.primary,
    textAlign: "center",
  },
  title2: {
    color: COLORS.white2,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: SPACING.sm,
  },
  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D1F4A",
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    gap: 10,
  },
  sectionTitle: {
    marginBottom: SPACING.sm,
    fontSize: 16,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    marginBottom: SPACING.sm,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#0D1F4A",
    textAlign: "center",
    marginLeft: 8,
  },
  priceBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmText: {
    color: COLORS.white2,
    fontWeight: "bold",
    fontSize: 16,
  },
  /* --- Cards de compañías --- */
  companyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: SPACING.md,
  },
  filterRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: SPACING.md,
},
dropdown: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: COLORS.white,
  borderRadius: RADIUS.lg,
  paddingHorizontal: 12,
  paddingVertical: 8,
  elevation: 2,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 3,
},
dropdownText: {
  marginLeft: 6,
  fontSize: 14,
  color: COLORS.text,
},
filterBtn: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: COLORS.white,
  borderRadius: RADIUS.lg,
  paddingHorizontal: 12,
  paddingVertical: 8,
  elevation: 2,
},
filterText: {
  marginLeft: 6,
  fontSize: 14,
  color: COLORS.text,
},
badgeRow: {
  flexDirection: "row",
  marginTop: 6,
  gap: 6,
},
badge: {
  backgroundColor: "#FFF1E6",
  borderRadius: 12,
  paddingVertical: 2,
  paddingHorizontal: 8,
},
badgeLight: {
  backgroundColor: "#E8F5E9",
  borderRadius: 12,
  paddingVertical: 2,
  paddingHorizontal: 8,
},
selectBtn: {
  marginTop: 6,
  backgroundColor: COLORS.black,
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
},
selectText: {
  color: COLORS.white,
  fontSize: 13,
  textAlign: "center",
  fontWeight: "bold",
},

});
