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
  Alert,
} from "react-native";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function QuotesScreen() {
  const params = useLocalSearchParams();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>((params.vehicle as string) || null);
  const [origen, setOrigen] = useState<string | null>(null);
  const [destino, setDestino] = useState<string | null>(null);
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState<Date | null>(null);
  const [precio, setPrecio] = useState(0);
  const [showMap, setShowMap] = useState<"origen" | "destino" | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [assignedDriver, setAssignedDriver] = useState<any>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  // Opciones de vehículos disponibles
  const vehicleOptions = [
    {
      name: "Camioneta",
      icon: "car",
      description: "Ideal para mudanzas pequeñas",
      price: 2850,
      capacity: "Hasta 2 toneladas",
    },
    {
      name: "Camión",
      icon: "bus",
      description: "Para mudanzas medianas",
      price: 3500,
      capacity: "Hasta 5 toneladas",
    },
    {
      name: "Tráiler",
      icon: "trail-sign",
      description: "Para mudanzas grandes",
      price: 4800,
      capacity: "Hasta 10 toneladas",
    },
  ];

  // Configura el precio según el vehículo
  useEffect(() => {
    const selectedOption = vehicleOptions.find(v => v.name === selectedVehicle);
    setPrecio(selectedOption?.price || 0);
  }, [selectedVehicle]);

  const handleSelectVehicle = (vehicleName: string) => {
    setSelectedVehicle(vehicleName);
    setShowVehicleModal(false);
  };

  // Mock de choferes disponibles
  const drivers = [
    {
      id: 1,
      name: "Carlos Méndez",
      rating: 4.9,
      trips: 342,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "+593 99 123 4567",
      vehicle: "Camioneta Toyota",
      plate: "ABC-1234",
      experience: "8 años",
    },
    {
      id: 2,
      name: "Miguel Ruiz",
      rating: 4.7,
      trips: 278,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      phone: "+593 98 765 4321",
      vehicle: "Camión Chevrolet",
      plate: "XYZ-5678",
      experience: "6 años",
    },
    {
      id: 3,
      name: "Luis Paredes",
      rating: 4.8,
      trips: 195,
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      phone: "+593 97 456 7890",
      vehicle: "Tráiler Freightliner",
      plate: "LMN-9012",
      experience: "10 años",
    },
  ];

  // Confirmación de fecha y hora
  const handleConfirmDate = (selectedDate: Date) => {
    setFecha(selectedDate);
    setDatePickerVisibility(false);
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

  const handleConfirmQuote = () => {
    // Validaciones detalladas
    if (!origen || origen.trim() === "") {
      Alert.alert(
        "Dirección de Origen Requerida",
        "Por favor ingresa la dirección de donde se recogerán tus pertenencias."
      );
      return;
    }
    
    if (!destino || destino.trim() === "") {
      Alert.alert(
        "Dirección de Destino Requerida",
        "Por favor ingresa la dirección a donde se entregarán tus pertenencias."
      );
      return;
    }
    
    if (!selectedVehicle) {
      Alert.alert(
        "Vehículo no Seleccionado",
        "Por favor selecciona el tipo de vehículo que necesitas para tu mudanza."
      );
      setShowVehicleModal(true);
      return;
    }
    
    if (!fecha) {
      Alert.alert(
        "Fecha Requerida",
        "Por favor selecciona la fecha en que necesitas la mudanza."
      );
      return;
    }
    
    if (!hora) {
      Alert.alert(
        "Hora Requerida",
        "Por favor selecciona la hora aproximada de tu mudanza."
      );
      return;
    }
    
    // Validar que la fecha no sea en el pasado
    const now = new Date();
    const selectedDateTime = new Date(fecha);
    selectedDateTime.setHours(hora.getHours(), hora.getMinutes());
    
    if (selectedDateTime < now) {
      Alert.alert(
        "Fecha Inválida",
        "No puedes programar una mudanza en el pasado. Por favor selecciona una fecha y hora futuras."
      );
      return;
    }
    
    // Asignar chofer automáticamente (simulación)
    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
    setAssignedDriver(randomDriver);
    
    Alert.alert(
      "¡Cotización Procesada!",
      "Se está buscando el mejor conductor disponible para tu mudanza."
    );
  };

  const handleConfirmDriver = () => {
    if (!assignedDriver) return;
    
    Alert.alert(
      "Mudanza confirmada",
      `Tu mudanza ha sido asignada a ${assignedDriver.name}. Te contactará pronto.`,
      [
        {
          text: "Ver mi viaje",
          onPress: () => router.push({
            pathname: "/(tabs)/moves",
            params: {
              driver: JSON.stringify(assignedDriver),
              origen,
              destino,
              fecha: fecha?.toISOString(),
              hora: hora?.toISOString(),
              precio: precio.toString(),
              vehicle: selectedVehicle as string,
            }
          }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!assignedDriver ? (
          <>
            {/* Encabezado */}
            <View style={styles.headerContainer}>
              <View style={styles.headerIconContainer}>
                <Ionicons name="cube" size={32} color={COLORS.primary} />
              </View>
              <ThemedText size={28} weight="bold" style={styles.title}>
                Nueva Mudanza
              </ThemedText>
              <ThemedText size={14} color={COLORS.textSecondary} style={{ textAlign: "center", marginTop: 4 }}>
                Completa los datos para asignar un chofer
              </ThemedText>
            </View>

            {/* Tarjeta de vehículo - Clickeable para seleccionar */}
            <TouchableOpacity 
              style={[styles.vehicleCard, !selectedVehicle && styles.vehicleCardEmpty]}
              onPress={() => setShowVehicleModal(true)}
              activeOpacity={0.7}
            >
              <View style={[styles.vehicleIconWrapper, !selectedVehicle && { backgroundColor: COLORS.textSecondary }]}>
                <Ionicons
                  name={
                    selectedVehicle === "Camioneta"
                      ? "car"
                      : selectedVehicle === "Camión"
                        ? "bus"
                        : selectedVehicle === "Tráiler"
                        ? "trail-sign"
                        : "help"
                  }
                  size={36}
                  color={COLORS.white2}
                />
              </View>
              <View style={{ flex: 1, marginLeft: SPACING.md }}>
                <ThemedText weight="bold" size={18} color={selectedVehicle ? COLORS.text : COLORS.textSecondary}>
                  {selectedVehicle || "Selecciona un vehículo"}
                </ThemedText>
                <ThemedText size={13} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  {selectedVehicle === "Camioneta" ? "Ideal para mudanzas pequeñas" : 
                   selectedVehicle === "Camión" ? "Para mudanzas medianas" : 
                   selectedVehicle === "Tráiler" ? "Para mudanzas grandes" :
                   "Toca para elegir"}
                </ThemedText>
              </View>
              {selectedVehicle ? (
                <View style={styles.priceBadge}>
                  <ThemedText size={12} color={COLORS.primary} weight="bold">
                    ${precio}
                  </ThemedText>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
              )}
            </TouchableOpacity>

            {/* Sección de ruta */}
            <View style={styles.sectionHeader}>
              <Ionicons name="map" size={22} color={COLORS.primary} />
              <ThemedText weight="bold" size={18} style={{ marginLeft: 8, color: COLORS.text }}>
                Ruta de mudanza
              </ThemedText>
            </View>

            {/* Origen */}
            <TouchableOpacity onPress={() => setShowMap("origen")} activeOpacity={0.7}>
              <View style={styles.inputCard}>
                <View style={[styles.inputIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                  <Ionicons name="location" size={22} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1, marginLeft: SPACING.md }}>
                  <ThemedText size={12} color={COLORS.textSecondary} weight="bold">
                    ORIGEN
                  </ThemedText>
                  <ThemedText size={15} color={COLORS.text} style={{ marginTop: 4 }}>
                    {origen || "Seleccionar punto de partida"}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
              </View>
            </TouchableOpacity>

            {/* Destino */}
            <TouchableOpacity onPress={() => setShowMap("destino")} activeOpacity={0.7}>
              <View style={styles.inputCard}>
                <View style={[styles.inputIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                  <Ionicons name="navigate" size={22} color={COLORS.secondary} />
                </View>
                <View style={{ flex: 1, marginLeft: SPACING.md }}>
                  <ThemedText size={12} color={COLORS.textSecondary} weight="bold">
                    DESTINO
                  </ThemedText>
                  <ThemedText size={15} color={COLORS.text} style={{ marginTop: 4 }}>
                    {destino || "Seleccionar punto de llegada"}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
              </View>
            </TouchableOpacity>

            {/* Sección de horario */}
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={22} color={COLORS.primary} />
              <ThemedText weight="bold" size={18} style={{ marginLeft: 8, color: COLORS.text }}>
                Fecha y hora
              </ThemedText>
            </View>

            <View style={styles.dateTimeRow}>
              {/* Fecha */}
              <TouchableOpacity 
                style={styles.dateTimeCard} 
                onPress={() => setDatePickerVisibility(true)}
                activeOpacity={0.7}
              >
                <View style={[styles.inputIconContainer, { backgroundColor: COLORS.accent + '15' }]}>
                  <Ionicons name="calendar" size={20} color={COLORS.accent} />
                </View>
                <View style={{ flex: 1, marginLeft: SPACING.sm }}>
                  <ThemedText size={11} color={COLORS.textSecondary} weight="bold">
                    FECHA
                  </ThemedText>
                  <ThemedText size={13} color={COLORS.text} style={{ marginTop: 2 }}>
                    {fecha ? formatFecha(fecha) : "Seleccionar"}
                  </ThemedText>
                </View>
              </TouchableOpacity>

              {/* Hora */}
              <TouchableOpacity 
                style={styles.dateTimeCard} 
                onPress={() => setTimePickerVisibility(true)}
                activeOpacity={0.7}
              >
                <View style={[styles.inputIconContainer, { backgroundColor: COLORS.accent + '15' }]}>
                  <Ionicons name="time" size={20} color={COLORS.accent} />
                </View>
                <View style={{ flex: 1, marginLeft: SPACING.sm }}>
                  <ThemedText size={11} color={COLORS.textSecondary} weight="bold">
                    HORA
                  </ThemedText>
                  <ThemedText size={13} color={COLORS.text} style={{ marginTop: 2 }}>
                    {hora ? formatHora(hora) : "Seleccionar"}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>

            {/* Resumen de precio */}
            <View style={styles.priceCard}>
              <View style={{ flex: 1 }}>
                <ThemedText size={14} color={COLORS.textSecondary}>
                  Precio estimado
                </ThemedText>
                <ThemedText size={13} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  Incluye seguro y ayudantes
                </ThemedText>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <ThemedText size={28} weight="bold" color={COLORS.primary}>
                  ${precio}
                </ThemedText>
                <ThemedText size={12} color={COLORS.textSecondary}>
                  USD
                </ThemedText>
              </View>
            </View>

            {/* Botón principal */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmQuote}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-circle" size={24} color={COLORS.white2} style={{ marginRight: 8 }} />
              <ThemedText style={styles.confirmText}>Buscar chofer disponible</ThemedText>
              <Ionicons name="arrow-forward" size={24} color={COLORS.white2} style={{ marginLeft: 8 }} />
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
                      if (showMap === "origen") setOrigen("Av. Cevallos y Montalvo, Ambato");
                      else setDestino("Calle Rocafuerte, Baños de Agua Santa");
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
        ) : assignedDriver ? (
          <>
            {/* Chofer asignado */}
            <View style={styles.successHeader}>
              <View style={styles.successIconContainer}>
                <Ionicons name="checkmark-circle" size={64} color={COLORS.primary} />
              </View>
              <ThemedText size={26} weight="bold" style={{ color: COLORS.text, textAlign: "center", marginTop: SPACING.md }}>
                ¡Chofer asignado!
              </ThemedText>
              <ThemedText size={14} color={COLORS.textSecondary} style={{ textAlign: "center", marginTop: 4 }}>
                Tu mudanza ha sido confirmada
              </ThemedText>
            </View>

            {/* Tarjeta del chofer */}
            <View style={styles.driverCard}>
              <Image 
                source={{ uri: assignedDriver.avatar }} 
                style={styles.driverAvatar}
              />
              <View style={styles.driverBadge}>
                <Ionicons name="star" size={16} color={COLORS.accent} />
                <ThemedText size={13} weight="bold" style={{ color: COLORS.white2, marginLeft: 4 }}>
                  {assignedDriver.rating}
                </ThemedText>
              </View>
            </View>

            <View style={styles.driverInfoCard}>
              <ThemedText size={22} weight="bold" color={COLORS.text} style={{ textAlign: "center" }}>
                {assignedDriver.name}
              </ThemedText>
              
              {/* Stats Badges */}
              <View style={styles.driverStatsRow}>
                <View style={styles.statBadge}>
                  <View style={styles.statIconContainer}>
                    <Ionicons name="checkmark-done-circle" size={20} color={COLORS.primary} />
                  </View>
                  <View style={{ marginLeft: 8 }}>
                    <ThemedText size={18} weight="bold" color={COLORS.text}>
                      {assignedDriver.trips}
                    </ThemedText>
                    <ThemedText size={11} color={COLORS.textSecondary}>
                      Viajes
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.statBadge}>
                  <View style={styles.statIconContainer}>
                    <Ionicons name="time" size={20} color={COLORS.secondary} />
                  </View>
                  <View style={{ marginLeft: 8 }}>
                    <ThemedText size={18} weight="bold" color={COLORS.text}>
                      {assignedDriver.experience}
                    </ThemedText>
                    <ThemedText size={11} color={COLORS.textSecondary}>
                      Experiencia
                    </ThemedText>
                  </View>
                </View>
              </View>

              <View style={styles.driverDetailsGrid}>
                <View style={styles.driverDetailItem}>
                  <View style={[styles.detailIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                    <Ionicons name="car" size={24} color={COLORS.primary} />
                  </View>
                  <ThemedText size={11} color={COLORS.textSecondary} style={{ marginTop: 6, textAlign: 'center' }}>
                    VEHÍCULO
                  </ThemedText>
                  <ThemedText size={13} weight="bold" color={COLORS.text} style={{ marginTop: 2, textAlign: 'center' }}>
                    {assignedDriver.vehicle}
                  </ThemedText>
                </View>

                <View style={styles.driverDetailItem}>
                  <View style={[styles.detailIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                    <Ionicons name="card" size={24} color={COLORS.secondary} />
                  </View>
                  <ThemedText size={11} color={COLORS.textSecondary} style={{ marginTop: 6, textAlign: 'center' }}>
                    PLACA
                  </ThemedText>
                  <ThemedText size={13} weight="bold" color={COLORS.text} style={{ marginTop: 2, textAlign: 'center' }}>
                    {assignedDriver.plate}
                  </ThemedText>
                </View>

                <View style={styles.driverDetailItem}>
                  <View style={[styles.detailIconContainer, { backgroundColor: COLORS.accent + '15' }]}>
                    <Ionicons name="call" size={24} color={COLORS.accent} />
                  </View>
                  <ThemedText size={11} color={COLORS.textSecondary} style={{ marginTop: 6, textAlign: 'center' }}>
                    TELÉFONO
                  </ThemedText>
                  <ThemedText size={13} weight="bold" color={COLORS.text} style={{ marginTop: 2, textAlign: 'center' }}>
                    {assignedDriver.phone}
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Resumen de la mudanza */}
            <View style={styles.summaryCard}>
              <ThemedText size={18} weight="bold" color={COLORS.text} style={{ marginBottom: SPACING.md }}>
                Resumen de la mudanza
              </ThemedText>

              <View style={styles.summaryRow}>
                <View style={styles.summaryIcon}>
                  <Ionicons name="location" size={18} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText size={12} color={COLORS.textSecondary}>Origen</ThemedText>
                  <ThemedText size={14} color={COLORS.text} style={{ marginTop: 2 }}>{origen}</ThemedText>
                </View>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <View style={styles.summaryIcon}>
                  <Ionicons name="navigate" size={18} color={COLORS.secondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText size={12} color={COLORS.textSecondary}>Destino</ThemedText>
                  <ThemedText size={14} color={COLORS.text} style={{ marginTop: 2 }}>{destino}</ThemedText>
                </View>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <View style={styles.summaryIcon}>
                  <Ionicons name="calendar" size={18} color={COLORS.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText size={12} color={COLORS.textSecondary}>Fecha y hora</ThemedText>
                  <ThemedText size={14} color={COLORS.text} style={{ marginTop: 2 }}>
                    {fecha ? formatFecha(fecha) : ""} · {hora ? formatHora(hora) : ""}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <View style={styles.summaryIcon}>
                  <Ionicons name="cash" size={18} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText size={12} color={COLORS.textSecondary}>Total a pagar</ThemedText>
                  <ThemedText size={20} weight="bold" color={COLORS.primary} style={{ marginTop: 2 }}>
                    ${precio} USD
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Botones de acción */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmDriver}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-done" size={24} color={COLORS.white2} style={{ marginRight: 8 }} />
              <ThemedText style={styles.confirmText}>Confirmar mudanza</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setAssignedDriver(null)}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
              <ThemedText style={styles.secondaryButtonText}>Editar datos</ThemedText>
            </TouchableOpacity>
          </>
        ) : null}

        {/* Modal de selección de vehículo */}
        <Modal
          visible={showVehicleModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowVehicleModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.vehicleModalContent}>
              <View style={styles.vehicleModalHeader}>
                <ThemedText weight="bold" size={22} color={COLORS.text}>
                  Selecciona tu vehículo
                </ThemedText>
                <TouchableOpacity onPress={() => setShowVehicleModal(false)}>
                  <Ionicons name="close" size={28} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.vehicleModalBody} showsVerticalScrollIndicator={false}>
                {vehicleOptions.map((vehicle, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.vehicleOption,
                      selectedVehicle === vehicle.name && styles.vehicleOptionSelected
                    ]}
                    onPress={() => handleSelectVehicle(vehicle.name)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.vehicleOptionIcon,
                      selectedVehicle === vehicle.name 
                        ? { backgroundColor: COLORS.primary }
                        : { backgroundColor: COLORS.primary + '15' }
                    ]}>
                      <Ionicons 
                        name={vehicle.icon as any} 
                        size={32} 
                        color={selectedVehicle === vehicle.name ? COLORS.white2 : COLORS.primary} 
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: SPACING.md }}>
                      <ThemedText weight="bold" size={18} color={COLORS.text}>
                        {vehicle.name}
                      </ThemedText>
                      <ThemedText size={13} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                        {vehicle.description}
                      </ThemedText>
                      <View style={styles.capacityBadge}>
                        <Ionicons name="cube-outline" size={14} color={COLORS.secondary} />
                        <ThemedText size={12} color={COLORS.secondary} style={{ marginLeft: 4 }}>
                          {vehicle.capacity}
                        </ThemedText>
                      </View>
                    </View>
                    <View style={styles.vehicleOptionPrice}>
                      <ThemedText size={14} color={COLORS.textSecondary}>
                        Desde
                      </ThemedText>
                      <ThemedText weight="bold" size={20} color={COLORS.primary}>
                        ${vehicle.price}
                      </ThemedText>
                    </View>
                    {selectedVehicle === vehicle.name && (
                      <View style={styles.selectedCheckmark}>
                        <Ionicons name="checkmark-circle" size={28} color={COLORS.primary} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.vehicleModalFooter}>
                <TouchableOpacity
                  style={[
                    styles.confirmVehicleButton,
                    !selectedVehicle && styles.confirmVehicleButtonDisabled
                  ]}
                  onPress={() => setShowVehicleModal(false)}
                  disabled={!selectedVehicle}
                >
                  <ThemedText 
                    weight="bold" 
                    size={16} 
                    style={{ color: selectedVehicle ? COLORS.white2 : COLORS.textSecondary }}
                  >
                    {selectedVehicle ? `Confirmar ${selectedVehicle}` : "Selecciona un vehículo"}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de mapa */}
        <Modal visible={!!showMap} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowMap(null)}
              >
                <Ionicons name="close-circle" size={32} color={COLORS.textSecondary} />
              </TouchableOpacity>
              
              <Image
                source={{
                  uri: "https://media.canalnet.tv/2021/09/MAPS-BONDI-1-254x414.png",
                }}
                style={styles.mapImage}
              />
              
              <View style={{ padding: SPACING.lg }}>
                <ThemedText size={18} weight="bold" color={COLORS.text} style={{ textAlign: "center" }}>
                  {showMap === "origen" ? "Punto de partida" : "Punto de llegada"}
                </ThemedText>
                <ThemedText size={14} color={COLORS.textSecondary} style={{ textAlign: "center", marginTop: 8 }}>
                  {showMap === "origen"
                    ? "Selecciona desde dónde comenzará tu mudanza"
                    : "Selecciona a dónde llegará tu mudanza"}
                </ThemedText>
                
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    if (showMap === "origen") setOrigen("Av. Los Guaytambos, Ambato");
                    else setDestino("Calle García Moreno, Pelileo");
                    setShowMap(null);
                  }}
                >
                  <Ionicons name="checkmark" size={24} color={COLORS.white2} />
                  <ThemedText style={styles.modalButtonText}>Confirmar ubicación</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Date & Time Pickers */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------- ESTILOS -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },

  /* Header */
  headerContainer: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.text,
    textAlign: "center",
  },

  /* Vehicle Card */
  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white2,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  vehicleCardEmpty: {
    borderWidth: 2,
    borderColor: COLORS.primary + '30',
    borderStyle: 'dashed',
  },
  vehicleIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  priceBadge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },

  /* Section Headers */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },

  /* Input Cards */
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white2,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  inputIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Date Time Row */
  dateTimeRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  dateTimeCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white2,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },

  /* Price Card */
  priceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white2,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: COLORS.primary + '30',
  },

  /* Buttons */
  confirmButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  confirmText: {
    color: COLORS.white2,
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: COLORS.white2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },

  /* Modal */
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: COLORS.white2,
    width: "90%",
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.large,
  },
  modalCloseButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
    backgroundColor: COLORS.white2,
    borderRadius: 20,
  },
  mapImage: {
    width: "100%",
    height: 250,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    marginTop: SPACING.lg,
    ...SHADOWS.medium,
  },
  modalButtonText: {
    color: COLORS.white2,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },

  /* Driver Assigned View */
  successHeader: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  successIconContainer: {
    marginBottom: SPACING.md,
  },
  driverCard: {
    alignItems: "center",
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  driverAvatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: COLORS.primary,
  },
  driverBadge: {
    position: 'absolute',
    bottom: 0,
    right: '30%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    ...SHADOWS.medium,
  },
  driverInfoCard: {
    backgroundColor: COLORS.white2,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  driverStatsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '20',
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white2,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  driverDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  driverDetailItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    padding: SPACING.md,
    paddingVertical: SPACING.md + 4,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border + '15',
  },
  detailIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCard: {
    backgroundColor: COLORS.white2,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.border + '30',
    marginVertical: SPACING.sm,
  },
  
  /* Vehicle Selection Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  vehicleModalContent: {
    backgroundColor: COLORS.white2,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    maxHeight: '85%',
  },
  vehicleModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '30',
  },
  vehicleModalBody: {
    padding: SPACING.lg,
  },
  vehicleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  vehicleOptionSelected: {
    backgroundColor: COLORS.primary + '10',
    borderColor: COLORS.primary,
  },
  vehicleOptionIcon: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capacityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.secondary + '15',
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  vehicleOptionPrice: {
    alignItems: 'flex-end',
    marginLeft: SPACING.sm,
  },
  selectedCheckmark: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
  },
  vehicleModalFooter: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border + '30',
  },
  confirmVehicleButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  confirmVehicleButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
});
