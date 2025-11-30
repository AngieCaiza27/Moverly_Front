import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, SPACING, RADIUS } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function QuotesScreen() {
  const { vehicle } = useLocalSearchParams();
  const [origen, setOrigen] = useState<string | null>(null);
  const [destino, setDestino] = useState<string | null>(null);
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState<Date | null>(null);
  const [precio, setPrecio] = useState(0);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showMap, setShowMap] = useState<"origen" | "destino" | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  // Configura el precio según el vehículo
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

  // Mock de compañías disponibles
  const companies = [
    {
      id: 1,
      name: "Mudanzas Águila",
      rating: 4.8,
      reviews: 156,
      price: 2850,
      logo: "https://img.freepik.com/vector-premium/inspiracion-plantilla-vectorial-diseno-logotipo-realtor-store_139372-1131.jpg?semt=ais_hybrid&w=740&q=80",
      time: "2-3 horas",
    },
    {
      id: 2,
      name: "Transporte Andino",
      rating: 4.6,
      reviews: 121,
      price: 2950,
      logo: "https://img.freepik.com/vector-premium/diseno-logotipo-hermoso-unico-empresas-comercio-electronico-minorista_1253202-242279.jpg?semt=ais_hybrid&w=740&q=80",
      time: "3-4 horas",
    },
    {
      id: 3,
      name: "Full Move S.A.",
      rating: 4.9,
      reviews: 98,
      price: 3100,
      logo: "https://uploads.turbologo.com/uploads/design/preview_image/757785/preview_image20210713-19572-3hnxyo.png",
      time: "2 horas",
    },
  ];

  // Confirmación de fecha y hora
  const handleConfirmDate = (selectedDate: Date) => {
    setFecha(selectedDate);
    setDatePickerVisibility(false);
    // Al elegir fecha, abrimos hora automáticamente
    setTimeout(() => setTimePickerVisibility(true), 300);
  };
  const handleConfirmTime = (selectedTime: Date) => {
    setHora(selectedTime);
    setTimePickerVisibility(false);
  };

  const formatFecha = (d: Date | null) =>
    d ? d.toLocaleDateString("es-EC", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
  const formatHora = (d: Date | null) =>
    d ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {!showCompanies ? (
          <>
            {/* ---------- ENCABEZADO ---------- */}
            <ThemedText size={26} weight="bold" style={styles.title}>
              Cotización de mudanza
            </ThemedText>

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

            {/* ---------- FORMULARIO ---------- */}
            <ThemedText weight="bold" size={16} style={styles.sectionTitle}>
              Detalles de tu mudanza
            </ThemedText>

            {/* Origen */}
            <TouchableOpacity onPress={() => setShowMap("origen")}>
              <InputField
                icon="pin-outline"
                placeholder={origen ? origen : "Seleccionar origen"}
                editable={false}
              />
            </TouchableOpacity>

            {/* Destino */}
            <TouchableOpacity onPress={() => setShowMap("destino")}>
              <InputField
                icon="navigate-outline"
                placeholder={destino ? destino : "Seleccionar destino"}
                editable={false}
              />
            </TouchableOpacity>

            {/* Fecha */}
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <InputField
                icon="calendar-outline"
                placeholder={fecha ? formatFecha(fecha) : "Seleccionar fecha"}
                editable={false}
              />
            </TouchableOpacity>

            {/* Hora */}
            <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
              <InputField
                icon="time-outline"
                placeholder={hora ? formatHora(hora) : "Seleccionar hora"}
                editable={false}
              />
            </TouchableOpacity>

            {/* Precio estimado */}
            <View style={styles.priceBox}>
              <ThemedText weight="bold" size={18} style={{ color: COLORS.text }}>
                Precio estimado:
              </ThemedText>
              <ThemedText size={22} weight="bold" style={{ color: COLORS.primary }}>
                ${precio.toFixed(2)}
              </ThemedText>
            </View>

            {/* Botón principal */}
            <TouchableOpacity
              style={[styles.confirmButton, { marginBottom: 40 }]}
              onPress={() => setShowCompanies(true)}
            >
              <ThemedText style={styles.confirmText}>Confirmar cotización</ThemedText>
            </TouchableOpacity>

            {/* ---------- MODAL MAPA ---------- */}
            <Modal visible={!!showMap} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                  <Image
                    source={{
                      uri: "https://media.canalnet.tv/2021/09/MAPS-BONDI-1-254x414.png",
                    }}
                    style={styles.mapImage}
                  />
                  <ThemedText style={{ marginVertical: 10, textAlign: "center" }}>
                    {showMap === "origen"
                      ? "Selecciona tu punto de partida"
                      : "Selecciona tu destino"}
                  </ThemedText>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      if (showMap === "origen") setOrigen("Av. Siempre Viva 742");
                      else setDestino("Calle Reforma 123");
                      setShowMap(null);
                    }}
                  >
                    <ThemedText style={styles.modalButtonText}>Confirmar ubicación</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* ---------- SELECTORES ---------- */}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={() => setDatePickerVisibility(false)}
              locale="es-ES"
              minimumDate={new Date()}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={() => setTimePickerVisibility(false)}
              is24Hour
            />
          </>
        ) : (
          <>
            {/* ---------- LISTA DE COMPAÑÍAS ---------- */}
            <ThemedText size={26} weight="bold" style={styles.title}>
              Compañías disponibles
            </ThemedText>
            <ThemedText size={14} color={COLORS.gray} style={{ marginBottom: 10, textAlign: "center" }}>
              {origen} → {destino} {"\n"}
              {fecha ? formatFecha(fecha) : ""} · {hora ? formatHora(hora) : ""} · {vehicle}
            </ThemedText>

            {companies.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.companyCard,
                  selectedCompany === c.id && { borderColor: COLORS.primary, borderWidth: 1.5 },
                ]}
                onPress={() => setSelectedCompany(c.id)}
              >
                <Image source={{ uri: c.logo }} style={styles.companyLogo} />
                <View style={{ flex: 1 }}>
                  <ThemedText weight="bold" size={16}>
                    {c.name}
                  </ThemedText>
                  <ThemedText color={COLORS.gray} size={13}>
                    ⭐ {c.rating} ({c.reviews} reseñas)
                  </ThemedText>
                  <View style={{ flexDirection: "row", marginTop: 4 }}>
                    <Ionicons name="time-outline" size={15} color={COLORS.gray} />
                    <ThemedText color={COLORS.gray} size={13} style={{ marginLeft: 4 }}>
                      {c.time} · {vehicle}
                    </ThemedText>
                  </View>
                  <View style={styles.badgeRow}>
                    <View style={styles.badge}>
                      <ThemedText size={12} style={{ color: COLORS.primary }}>
                        Seguro incluido
                      </ThemedText>
                    </View>
                    <View style={styles.badgeLight}>
                      <ThemedText size={12} style={{ color: COLORS.primary }}>
                        Disponible hoy
                      </ThemedText>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <ThemedText weight="bold" size={18} style={{ color: COLORS.primary }}>
                    ${c.price}
                  </ThemedText>
                  <ThemedText color={COLORS.gray} size={12}>
                    MXN
                  </ThemedText>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.confirmButton,
                { marginTop: 25, backgroundColor: COLORS.black },
              ]}
              onPress={() => router.push("/(tabs)/moves")}
            >
              <ThemedText style={styles.confirmText}>Confirmar compañía</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, { marginTop: 15 }]}
              onPress={() => setShowCompanies(false)}
            >
              <ThemedText style={styles.confirmText}>Volver a editar</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------- COMPONENTE INPUTFIELD -------- */
function InputField({ icon, placeholder, editable = true }: any) {
  return (
    <View style={styles.inputField}>
      <Ionicons name={icon} size={22} color={COLORS.primary} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        editable={editable}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
}

/* -------- ESTILOS -------- */
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  title: {
  marginBottom: 25,
  color: COLORS.primary,
  textAlign: "center",
  marginTop: 25, // 🔹 Agrega un margen superior para bajar el título
},
vehicleCard: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center", // 🔹 Centra verticalmentep
  backgroundColor: "#09295d",
  paddingVertical: 25, // 🔹 Aumenta el alto general
  borderRadius: 16,
  marginBottom: 25,
  gap: 18, // 🔹 Separa el ícono y el texto
},
title2: {
  color: COLORS.white,
  fontSize: 20, // 🔹 Un poco más grande
  fontWeight: "bold",
  textAlignVertical: "center", // 🔹 Mejor alineación vertical
},

  sectionTitle: { color: COLORS.text, marginBottom: 10 },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  textInput: { flex: 1, marginLeft: 10, fontSize: 16, color: "#09295d", textAlign: "center" },
  priceBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmText: { color: COLORS.white, fontWeight: "bold", fontSize: 16 },
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalBox: { backgroundColor: COLORS.white, width: "85%", borderRadius: 16, padding: 16, alignItems: "center" },
  mapImage: { width: "100%", height: 200, borderRadius: 12 },
  modalButton: { backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10 },
  modalButtonText: { color: COLORS.white, fontWeight: "bold" },
  companyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  companyLogo: { width: 50, height: 50, borderRadius: 12, marginRight: 10 },
  badgeRow: { flexDirection: "row", marginTop: 6, gap: 6 },
  badge: { backgroundColor: "#FFF1E6", borderRadius: 12, paddingVertical: 2, paddingHorizontal: 8 },
  badgeLight: { backgroundColor: "#E8F5E9", borderRadius: 12, paddingVertical: 2, paddingHorizontal: 8 },
});
