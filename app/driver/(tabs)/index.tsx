import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Linking, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../../constants/Colors";

type DriverStatus = "online" | "busy" | "offline";
type PaymentMethod = "card" | "transfer" | "cash";
type ModalStep = "trip-details" | "confirm-end" | "transfer" | "cash-confirmed" | "trip-confirmed";

export default function DriverHomeScreen() {
  const [driverStatus, setDriverStatus] = useState<DriverStatus>("online");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [currentModalStep, setCurrentModalStep] = useState<ModalStep>("trip-details");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card"); // Mock payment method
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; text: string; sender: "driver" | "passenger" }>>([
    { id: "1", text: "Hola, ya estoy en camino", sender: "driver" },
    { id: "2", text: "Perfecto, en 5 minutos llego", sender: "passenger" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const statusConfig: Record<DriverStatus, { label: string; color: string; icon: string }> = {
    online: { label: "En Línea", color: COLORS.success, icon: "checkmark-circle" },
    busy: { label: "Ocupado", color: COLORS.warning, icon: "radio-button-on" },
    offline: { label: "No Disponible", color: COLORS.error, icon: "close-circle" },
  };

  const currentStatus = statusConfig[driverStatus];

  const handleStatusChange = (newStatus: DriverStatus) => {
    setDriverStatus(newStatus);
    setShowStatusMenu(false);
  };

  const handleConcludeTrip = () => {
    setCurrentModalStep("confirm-end");
  };

  const handleConfirmConclude = () => {
    // Verificar el método de pago
    if (paymentMethod === "card") {
      setCurrentModalStep("trip-confirmed");
    } else if (paymentMethod === "transfer") {
      setCurrentModalStep("transfer");
    } else if (paymentMethod === "cash") {
      setCurrentModalStep("cash-confirmed");
    }
  };

  const handleCloseTripFlow = () => {
    setShowTripDetails(false);
    setCurrentModalStep("trip-details");
  };

  const handleCallPassenger = () => {
    setShowCallModal(true);
  };

  const handleConfirmCall = () => {
    const phoneNumber = "+573001234567";
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert("Error", "No se pudo realizar la llamada");
    });
    setShowCallModal(false);
  };

  const handleSendMessage = () => {
    setShowChatModal(true);
  };

  const handleOpenRoute = () => {
    setShowRouteModal(true);
  };

  const handleSupport = () => {
    router.push("/driver/faq");
  };

  const handleNotifications = () => {
    router.push("/driver/notifications");
  };

  const handleSendChatMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([
        ...chatMessages,
        { id: Date.now().toString(), text: chatInput, sender: "driver" },
      ]);
      setChatInput("");
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText size={28} weight="bold" color="black" style={styles.headerTitle}>
            Bienvenido, Chofer 👋
          </ThemedText>
          <ThemedText size={16} style={styles.headerSubtitle}>
            Gestiona tus viajes y ganancias
          </ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={handleNotifications}>
          <Ionicons name="notifications" size={24} color={COLORS.primary} />
          <View style={styles.notificationBadge}>
            <ThemedText size={10} weight="bold" color="#fff">
              3
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>

      {/* Status Card */}
      <TouchableOpacity 
        style={[styles.statusCard, { backgroundColor: currentStatus.color }]}
        onPress={() => setShowStatusMenu(true)}>
        <View style={styles.statusContent}>
          <View style={styles.statusItem}>
            <Ionicons name={currentStatus.icon as any} size={24} color="#fff" />
            <View style={{ marginLeft: 12 }}>
              <ThemedText color="#fff" size={12}>
                Estado
              </ThemedText>
              <ThemedText weight="bold" color="#fff" size={14}>
                {currentStatus.label}
              </ThemedText>
            </View>
          </View>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Status Menu Modal */}
      <Modal
        visible={showStatusMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStatusMenu(false)}>
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowStatusMenu(false)}>
          <View style={styles.statusMenu}>
            <ThemedText size={16} weight="bold" style={styles.menuTitle}>
              Cambiar Estado
            </ThemedText>
            
            <TouchableOpacity 
              style={[styles.statusOption, driverStatus === "online" && styles.statusOptionSelected]}
              onPress={() => handleStatusChange("online")}>
              <Ionicons 
                name="checkmark-circle" 
                size={24} 
                color={driverStatus === "online" ? COLORS.success : COLORS.gray} 
              />
              <ThemedText 
                size={14} 
                weight={driverStatus === "online" ? "bold" : "regular"}
                style={styles.statusOptionText}>
                En Línea
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.statusOption, driverStatus === "busy" && styles.statusOptionSelected]}
              onPress={() => handleStatusChange("busy")}>
              <Ionicons 
                name="radio-button-on" 
                size={24} 
                color={driverStatus === "busy" ? COLORS.warning : COLORS.gray} 
              />
              <ThemedText 
                size={14} 
                weight={driverStatus === "busy" ? "bold" : "regular"}
                style={styles.statusOptionText}>
                Ocupado
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.statusOption, driverStatus === "offline" && styles.statusOptionSelected]}
              onPress={() => handleStatusChange("offline")}>
              <Ionicons 
                name="close-circle" 
                size={24} 
                color={driverStatus === "offline" ? COLORS.error : COLORS.gray} 
              />
              <ThemedText 
                size={14} 
                weight={driverStatus === "offline" ? "bold" : "regular"}
                style={styles.statusOptionText}>
                No Disponible
              </ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Trip Details Modal */}
      <Modal
        visible={showTripDetails}
        transparent
        animationType="slide"
        onRequestClose={() => handleCloseTripFlow()}>
        <View style={styles.tripDetailsContainer}>
          <View style={styles.tripDetailsHeader}>
            <TouchableOpacity onPress={() => handleCloseTripFlow()}>
              <Ionicons name="close" size={28} color="black" />
            </TouchableOpacity>
            <ThemedText size={18} weight="bold" color="black">
              {currentModalStep === "confirm-end" ? "Confirmar" : "Detalles del Viaje"}
            </ThemedText>
            <View style={{ width: 28 }} />
          </View>

          {currentModalStep === "trip-details" && (
            <ScrollView style={styles.tripDetailsContent} showsVerticalScrollIndicator={false}>
            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="map" size={60} color={COLORS.gray} />
                <ThemedText size={14} color={COLORS.gray} style={{ marginTop: 8 }}>
                  Ruta: Cra 7 No. 23-45 → Av. Paseo 100 No. 50
                </ThemedText>
              </View>
            </View>

            {/* Route Details */}
            <View style={styles.detailsSection}>
              <ThemedText size={16} weight="bold" color="black" style={{ marginBottom: 12 }}>
                Ruta
              </ThemedText>
              <View style={styles.routeItem}>
                <View style={styles.routeMarker}>
                  <Ionicons name="location" size={20} color={COLORS.success} />
                </View>
                <View style={styles.routeInfo}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Origen
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    Cra 7 No. 23-45
                  </ThemedText>
                </View>
              </View>

              <View style={styles.routeLine} />

              <View style={styles.routeItem}>
                <View style={styles.routeMarker}>
                  <Ionicons name="flag" size={20} color={COLORS.error} />
                </View>
                <View style={styles.routeInfo}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Destino
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    Av. Paseo 100 No. 50
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Trip Info */}
            <View style={styles.detailsSection}>
              <ThemedText size={16} weight="bold" color="black" style={{ marginBottom: 12 }}>
                Información del Viaje
              </ThemedText>
              <View style={styles.infoRow}>
                <Ionicons name="time" size={20} color={COLORS.primary} />
                <View style={styles.infoContent}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Duración Estimada
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    12 minutos
                  </ThemedText>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="navigate" size={20} color={COLORS.primary} />
                <View style={styles.infoContent}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Distancia
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    4.5 km
                  </ThemedText>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="cash" size={20} color={COLORS.primary} />
                <View style={styles.infoContent}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Tarifa Estimada
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    $18.500
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Passenger Info */}
            <View style={styles.detailsSection}>
              <ThemedText size={16} weight="bold" color="black" style={{ marginBottom: 12 }}>
                Información del Pasajero
              </ThemedText>
              <View style={styles.passengerCard}>
                <View style={[styles.passengerAvatar, { backgroundColor: COLORS.primary, width: 60, height: 60 }]}>
                  <Ionicons name="person" size={32} color="#fff" />
                </View>
                <View style={styles.passengerDetails}>
                  <ThemedText size={16} weight="bold" color="black">
                    Juan Pérez
                  </ThemedText>
                  <ThemedText size={12} color={COLORS.gray}>
                    ⭐ 4.9 • 25 viajes
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.detailsActions}>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
                onPress={() => {
                  const phoneNumber = "+573001234567";
                  Linking.openURL(`tel:${phoneNumber}`);
                }}>
                <Ionicons name="call" size={20} color="#fff" />
                <ThemedText color="#fff" weight="bold" size={14}>
                  Llamar
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.success }]} onPress={handleConcludeTrip}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <ThemedText color="#fff" weight="bold" size={14}>
                  Concluir Viaje
                </ThemedText>
              </TouchableOpacity>
            </View>
            </ScrollView>
          )}

          {currentModalStep === "confirm-end" && (
            <View style={styles.confirmEndContainer}>
              <View style={styles.confirmIcon}>
                <Ionicons name="help-circle" size={64} color={COLORS.warning} />
              </View>
              <ThemedText size={20} weight="bold" color="black" style={styles.confirmTitle}>
                ¿Concluir viaje?
              </ThemedText>
              <ThemedText size={14} color={COLORS.gray} style={styles.confirmMessage}>
                Asegúrate de que el pasajero haya descendido y verifica que hayas recibido el pago correctamente.
              </ThemedText>
              <View style={styles.confirmActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: COLORS.gray }]}
                  onPress={() => setCurrentModalStep("trip-details")}>
                  <ThemedText color="#fff" weight="bold" size={14}>
                    Cancelar
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: COLORS.success }]}
                  onPress={handleConfirmConclude}>
                  <ThemedText color="#fff" weight="bold" size={14}>
                    Confirmar
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {currentModalStep === "transfer" && (
            <ScrollView style={styles.tripDetailsContent} showsVerticalScrollIndicator={false}>
              <View style={styles.paymentSection}>
                <View style={styles.paymentIcon}>
                  <Ionicons name="card" size={50} color={COLORS.primary} />
                </View>
                <ThemedText size={20} weight="bold" color="black" style={styles.paymentTitle}>
                  Datos de Transferencia
                </ThemedText>
                <ThemedText size={12} color={COLORS.gray} style={styles.paymentSubtitle}>
                  Proporciona los siguientes datos al pasajero:
                </ThemedText>

                <View style={styles.transferInfo}>
                  <View style={styles.infoRow}>
                    <ThemedText size={12} color={COLORS.gray}>
                      Banco
                    </ThemedText>
                    <ThemedText size={14} weight="bold" color="black">
                      Banco Bogotá
                    </ThemedText>
                  </View>
                  <View style={styles.infoRow}>
                    <ThemedText size={12} color={COLORS.gray}>
                      Titular
                    </ThemedText>
                    <ThemedText size={14} weight="bold" color="black">
                      Carlos Rodríguez
                    </ThemedText>
                  </View>
                  <View style={styles.infoRow}>
                    <ThemedText size={12} color={COLORS.gray}>
                      Número de Cuenta
                    </ThemedText>
                    <ThemedText size={14} weight="bold" color="black">
                      123456789
                    </ThemedText>
                  </View>
                  <View style={styles.infoRow}>
                    <ThemedText size={12} color={COLORS.gray}>
                      Concepto
                    </ThemedText>
                    <ThemedText size={14} weight="bold" color="black">
                      Viaje Moverly - Ref: 12345
                    </ThemedText>
                  </View>
                  <View style={styles.infoRow}>
                    <ThemedText size={12} color={COLORS.gray}>
                      Monto
                    </ThemedText>
                    <ThemedText size={14} weight="bold" color={COLORS.success}>
                      $18.500
                    </ThemedText>
                  </View>
                </View>

                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
                  onPress={() => setCurrentModalStep("trip-confirmed")}>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <ThemedText color="#fff" weight="bold" size={14}>
                    Comprobante Recibido
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}

          {currentModalStep === "cash-confirmed" && (
            <View style={styles.confirmEndContainer}>
              <View style={styles.confirmIcon}>
                <Ionicons name="cash" size={64} color={COLORS.success} />
              </View>
              <ThemedText size={20} weight="bold" color="black" style={styles.confirmTitle}>
                Confirmar pago en efectivo
              </ThemedText>
              <ThemedText size={14} color={COLORS.gray} style={styles.confirmMessage}>
                ¿Confirmaste que recibiste $18.500 en efectivo del pasajero?
              </ThemedText>
              <View style={styles.confirmActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: COLORS.gray }]}
                  onPress={() => setCurrentModalStep("trip-details")}>
                  <ThemedText color="#fff" weight="bold" size={14}>
                    No, revisar
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: COLORS.success }]}
                  onPress={() => setCurrentModalStep("trip-confirmed")}>
                  <ThemedText color="#fff" weight="bold" size={14}>
                    Sí, confirmado
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {currentModalStep === "trip-confirmed" && (
            <View style={styles.confirmEndContainer}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
              </View>
              <ThemedText size={24} weight="bold" color="black" style={styles.successTitle}>
                ¡Viaje Completado!
              </ThemedText>
              <ThemedText size={14} color={COLORS.gray} style={styles.successMessage}>
                El viaje ha sido registrado exitosamente en tu historial.
              </ThemedText>
              <View style={styles.successStats}>
                <View style={styles.statItem}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Ganancia
                  </ThemedText>
                  <ThemedText size={18} weight="bold" color={COLORS.success}>
                    $18.500
                  </ThemedText>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Calificación
                  </ThemedText>
                  <ThemedText size={18} weight="bold" color={COLORS.warning}>
                    ⭐ 4.9
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: COLORS.primary, width: "100%", paddingVertical: SPACING.lg }]}
                onPress={() => handleCloseTripFlow()}>
                <ThemedText color="#fff" weight="bold" size={16}>
                  Volver al Inicio
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      {/* Chat Modal */}
      <Modal
        visible={showChatModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowChatModal(false)}>
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setShowChatModal(false)}>
              <Ionicons name="close" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.chatHeaderInfo}>
              <ThemedText size={16} weight="bold" color="black">
                Juan Pérez
              </ThemedText>
              <ThemedText size={12} color={COLORS.gray}>
                ⭐ 4.9
              </ThemedText>
            </View>
            <View style={{ width: 28 }} />
          </View>

          <FlatList
            data={chatMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.chatMessage,
                  item.sender === "driver" ? styles.driverMessage : styles.passengerMessage,
                ]}>
                <ThemedText
                  size={14}
                  color={item.sender === "driver" ? "#fff" : "black"}
                  style={styles.chatMessageText}>
                  {item.text}
                </ThemedText>
              </View>
            )}
            contentContainerStyle={styles.chatMessages}
          />

          <View style={styles.chatInputContainer}>
            <TextInput
              style={styles.chatInput}
              placeholder="Escribe un mensaje..."
              placeholderTextColor={COLORS.gray}
              value={chatInput}
              onChangeText={setChatInput}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendButton, { opacity: chatInput.trim() ? 1 : 0.5 }]}
              onPress={handleSendChatMessage}
              disabled={!chatInput.trim()}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Call Confirmation Modal */}
      <Modal
        visible={showCallModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCallModal(false)}>
        <View style={styles.callModalOverlay}>
          <View style={styles.callModalContent}>
            <View style={styles.callIcon}>
              <Ionicons name="call" size={60} color={COLORS.primary} />
            </View>
            <ThemedText size={20} weight="bold" color="black" style={styles.callTitle}>
              Llamar a Pasajero
            </ThemedText>
            <ThemedText size={14} color={COLORS.gray} style={styles.callMessage}>
              ¿Deseas llamar a Juan Pérez?
            </ThemedText>
            <View style={styles.callActions}>
              <TouchableOpacity
                style={[styles.callButton, { backgroundColor: COLORS.gray }]}
                onPress={() => setShowCallModal(false)}>
                <ThemedText color="#fff" weight="bold" size={14}>
                  Cancelar
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.callButton, { backgroundColor: COLORS.primary }]}
                onPress={handleConfirmCall}>
                <Ionicons name="call" size={18} color="#fff" />
                <ThemedText color="#fff" weight="bold" size={14}>
                  Llamar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Route Modal */}
      <Modal
        visible={showRouteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRouteModal(false)}>
        <View style={styles.tripDetailsContainer}>
          <View style={styles.tripDetailsHeader}>
            <TouchableOpacity onPress={() => setShowRouteModal(false)}>
              <Ionicons name="close" size={28} color="black" />
            </TouchableOpacity>
            <ThemedText size={18} weight="bold" color="black">
              Ruta del Viaje
            </ThemedText>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={styles.tripDetailsContent} showsVerticalScrollIndicator={false}>
            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="map" size={60} color={COLORS.gray} />
                <ThemedText size={14} color={COLORS.gray} style={{ marginTop: 8 }}>
                  Ruta: Cra 7 No. 23-45 → Av. Paseo 100 No. 50
                </ThemedText>
              </View>
            </View>

            {/* Route Details */}
            <View style={styles.detailsSection}>
              <ThemedText size={16} weight="bold" color="black" style={{ marginBottom: 12 }}>
                Ruta
              </ThemedText>
              <View style={styles.routeItem}>
                <View style={styles.routeMarker}>
                  <Ionicons name="location" size={20} color={COLORS.success} />
                </View>
                <View style={styles.routeInfo}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Origen
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    Cra 7 No. 23-45
                  </ThemedText>
                </View>
              </View>

              <View style={styles.routeLine} />

              <View style={styles.routeItem}>
                <View style={styles.routeMarker}>
                  <Ionicons name="flag" size={20} color={COLORS.error} />
                </View>
                <View style={styles.routeInfo}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Destino
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    Av. Paseo 100 No. 50
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Trip Info */}
            <View style={styles.detailsSection}>
              <ThemedText size={16} weight="bold" color="black" style={{ marginBottom: 12 }}>
                Información de la Ruta
              </ThemedText>
              <View style={styles.infoRow}>
                <Ionicons name="time" size={20} color={COLORS.primary} />
                <View style={styles.infoContent}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Duración Estimada
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    12 minutos
                  </ThemedText>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="navigate" size={20} color={COLORS.primary} />
                <View style={styles.infoContent}>
                  <ThemedText size={12} color={COLORS.gray}>
                    Distancia
                  </ThemedText>
                  <ThemedText size={14} weight="bold" color="black">
                    4.5 km
                  </ThemedText>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="car" size={24} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <ThemedText size={12} color={COLORS.gray}>
              Viajes Hoy
            </ThemedText>
            <ThemedText size={20} weight="bold" color="black">
              5
            </ThemedText>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.success }]}>
            <Ionicons name="cash" size={24} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <ThemedText size={12} color={COLORS.gray}>
              Ganancias Hoy
            </ThemedText>
            <ThemedText size={20} weight="bold" color="black">
              $45.50
            </ThemedText>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.warning }]}>
            <Ionicons name="star" size={24} color="#fff" />
          </View>
          <View style={styles.statContent}>
            <ThemedText size={12} color={COLORS.gray}>
              Calificación
            </ThemedText>
            <ThemedText size={20} weight="bold" color="black">
              4.8
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Current Trip */}
      <View style={styles.sectionContainer}>
        <ThemedText weight="bold" size={18} color="black" style={styles.sectionTitle}>
          Viaje Actual
        </ThemedText>
        <View style={styles.tripCard}>
          <View style={styles.tripHeader}>
            <View>
              <ThemedText size={13} weight="bold" color="black" style={styles.tripFrom}>
                📍 Cra 7 No. 23-45
              </ThemedText>
              <ThemedText size={13} weight="bold" color="black" style={styles.tripTo}>
                📍 Av. Paseo 100 No. 50
              </ThemedText>
            </View>
            <View style={styles.tripTime}>
              <ThemedText size={12} weight="bold" color="black">
                12 min
              </ThemedText>
              <ThemedText size={11} color={COLORS.gray} style={styles.tripDistance}>
                4.5 km
              </ThemedText>
            </View>
          </View>
          <View style={styles.tripPassenger}>
            <View style={[styles.passengerAvatar, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="person" size={20} color="#fff" />
            </View>
            <View style={styles.passengerInfo}>
              <ThemedText weight="bold" color="black">Juan Pérez</ThemedText>
              <ThemedText size={11} color={COLORS.gray} style={styles.passengerRating}>
                ⭐ 4.9 • 25 viajes
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
            onPress={() => setShowTripDetails(true)}>
            <ThemedText color="#fff" weight="bold" size={14}>
              Ver Detalles
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.sectionContainer}>
        <ThemedText weight="bold" size={18} color="black" style={styles.sectionTitle}>
          Acciones Rápidas
        </ThemedText>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={handleCallPassenger}>
            <Ionicons name="call" size={32} color={COLORS.primary} />
            <ThemedText size={12} weight="bold" color="black">
              Llamar
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleSendMessage}>
            <Ionicons name="mail" size={32} color={COLORS.success} />
            <ThemedText size={12} weight="bold" color="black">
              Mensaje
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleOpenRoute}>
            <Ionicons name="map" size={32} color={COLORS.warning} />
            <ThemedText size={12} weight="bold" color="black">
              Ruta
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleSupport}>
            <Ionicons name="information-circle" size={32} color={COLORS.secondary} />
            <ThemedText size={12} weight="bold" color="black">
              Soporte
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: SPACING.md,
    paddingTop: SPACING.xl,
  },
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {
    color: COLORS.gray,
  },
  statusCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statusContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },
  statsContainer: {
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  statContent: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  tripCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  tripFrom: {
    marginBottom: SPACING.sm,
  },
  tripTo: {
    marginBottom: 0,
  },
  tripTime: {
    alignItems: "flex-end",
  },
  tripDistance: {
    marginTop: SPACING.sm,
  },
  tripPassenger: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderTopColor: COLORS.lightGray,
    borderBottomColor: COLORS.lightGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: SPACING.md,
  },
  passengerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerRating: {
    marginTop: SPACING.sm,
  },
  actionButton: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  tripListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
  },
  tripListContent: {
    flex: 1,
  },
  tripListTime: {
    marginTop: SPACING.sm,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    justifyContent: "space-between",
  },
  actionCard: {
    flex: 1,
    minWidth: "45%",
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  statusMenu: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  menuTitle: {
    marginBottom: SPACING.md,
    color: "black",
  },
  statusOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  statusOptionSelected: {
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  statusOptionText: {
    color: "black",
  },
  tripDetailsContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: SPACING.xl,
  },
  tripDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tripDetailsContent: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  mapContainer: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS.lg,
    gap: SPACING.md,
  },
  detailsSection: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  routeMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  routeInfo: {
    flex: 1,
    justifyContent: "center",
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: COLORS.lightGray,
    marginLeft: 19,
    marginVertical: SPACING.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  infoContent: {
    flex: 1,
  },
  passengerCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    gap: SPACING.md,
  },
  passengerDetails: {
    flex: 1,
  },
  detailsActions: {
    gap: SPACING.md,
    marginVertical: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  confirmEndContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  confirmIcon: {
    marginBottom: SPACING.lg,
  },
  confirmTitle: {
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  confirmMessage: {
    textAlign: "center",
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  confirmActions: {
    width: "100%",
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  paymentSection: {
    paddingVertical: SPACING.lg,
  },
  paymentIcon: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  paymentTitle: {
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  paymentSubtitle: {
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  transferInfo: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  successIcon: {
    marginBottom: SPACING.lg,
  },
  successTitle: {
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  successMessage: {
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  successStats: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: SPACING.sm,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.lightGray,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: SPACING.xl,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  chatHeaderInfo: {
    flex: 1,
    alignItems: "center",
  },
  chatMessages: {
    flexGrow: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    justifyContent: "flex-end",
  },
  chatMessage: {
    maxWidth: "80%",
    marginVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  driverMessage: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary,
  },
  passengerMessage: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.background,
  },
  chatMessageText: {
    lineHeight: 20,
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    gap: SPACING.sm,
  },
  chatInput: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: "black",
    fontSize: 14,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  callModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  callModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    alignItems: "center",
    width: "100%",
  },
  callIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  callTitle: {
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  callMessage: {
    marginBottom: SPACING.xl,
    textAlign: "center",
  },
  callActions: {
    width: "100%",
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  callButton: {
    flexDirection: "row",
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
  notificationButton: {
    position: "relative",
    padding: SPACING.sm,
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
