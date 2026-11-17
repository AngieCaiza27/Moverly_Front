import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../../constants/Colors";

type Order = {
  id: string;
  company: string;
  number: string;
  from: string;
  fromAddress: string;
  to: string;
  toAddress: string;
  datetime: string;
  price: number;
  distance: string;
  vehicleType: string;
  driver: string;
  duration: string;
  status: "proximo" | "en-curso" | "completado";
};

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    company: "Mudanzas Águila Express",
    number: "#MUD-2024-001",
    from: "Ambato",
    fromAddress: "Av. Cevallos y Montalvo, Ambato",
    to: "Baños de Agua Santa",
    toAddress: "Calle Ambato 123, Baños",
    datetime: "05 Dic, 14:30",
    price: 2850.00,
    distance: "42 km",
    vehicleType: "Camión 3.5 ton",
    driver: "Carlos Méndez",
    duration: "1h 15min",
    status: "completado",
  },
  {
    id: "2",
    company: "Fletes Rápidos del Norte",
    number: "#FLE-2024-058",
    from: "Ambato",
    fromAddress: "Av. Los Guaytambos, Ambato",
    to: "Pelileo",
    toAddress: "Calle García Moreno, Pelileo",
    datetime: "28 Nov, 09:15",
    price: 4200.50,
    distance: "18 km",
    vehicleType: "Camioneta pickup",
    driver: "Roberto Sánchez",
    duration: "35min",
    status: "completado",
  },
  {
    id: "3",
    company: "Mudanzas Seguras Premium",
    number: "#SEG-2024-142",
    from: "Ciudad de México",
    fromAddress: "Polanco, Miguel Hidalgo",
    to: "Puebla",
    toAddress: "Angelópolis, San Andrés Cholula",
    datetime: "20 Nov, 08:00",
    price: 3200.00,
    distance: "127 km",
    vehicleType: "Camión 5 ton",
    driver: "Miguel Torres",
    duration: "2h 30min",
    status: "completado",
  },
  {
    id: "4",
    company: "Express Logistics MX",
    number: "#EXP-2024-089",
    from: "Tijuana, Baja California",
    fromAddress: "Zona Río, Tijuana",
    to: "Mexicali, BC",
    toAddress: "Centro Cívico, Mexicali",
    datetime: "15 Nov, 16:45",
    price: 1850.75,
    distance: "187 km",
    vehicleType: "Van de carga",
    driver: "Luis Hernández",
    duration: "2h 15min",
    status: "completado",
  },
  {
    id: "5",
    company: "Mudanzas del Pacífico",
    number: "#PAC-2024-203",
    from: "Guadalajara, Jalisco",
    fromAddress: "Zapopan Centro",
    to: "Puerto Vallarta, Jalisco",
    toAddress: "Zona Hotelera Norte",
    datetime: "10 Nov, 11:00",
    price: 5600.00,
    distance: "332 km",
    vehicleType: "Camión 7 ton",
    driver: "Fernando Ramírez",
    duration: "5h 10min",
    status: "completado",
  },
  {
    id: "6",
    company: "Transportes Confiables SA",
    number: "#TRA-2024-176",
    from: "Mérida, Yucatán",
    fromAddress: "Paseo de Montejo 456",
    to: "Cancún, Quintana Roo",
    toAddress: "Zona Hotelera, Cancún",
    datetime: "05 Nov, 07:30",
    price: 4750.25,
    distance: "319 km",
    vehicleType: "Camioneta grande",
    driver: "José López",
    duration: "4h 35min",
    status: "completado",
  },
  {
    id: "7",
    company: "Fletes y Mudanzas Unidos",
    number: "#UNI-2024-095",
    from: "Toluca, Estado de México",
    fromAddress: "Centro Histórico, Toluca",
    to: "Cuernavaca, Morelos",
    toAddress: "Las Palmas, Cuernavaca",
    datetime: "01 Nov, 13:20",
    price: 2100.00,
    distance: "165 km",
    vehicleType: "Camioneta mediana",
    driver: "Pedro García",
    duration: "3h 15min",
    status: "completado",
  },
  {
    id: "8",
    company: "Mudanzas Relámpago",
    number: "#REL-2024-234",
    from: "León, Guanajuato",
    fromAddress: "Blvd. Adolfo López Mateos",
    to: "San Miguel de Allende, GTO",
    toAddress: "Centro Histórico",
    datetime: "28 Oct, 10:00",
    price: 1650.50,
    distance: "95 km",
    vehicleType: "Van pequeña",
    driver: "Antonio Martínez",
    duration: "1h 45min",
    status: "completado",
  },
  {
    id: "9",
    company: "Express Cargo Solutions",
    number: "#CAR-2024-312",
    from: "Veracruz, Veracruz",
    fromAddress: "Puerto de Veracruz",
    to: "Xalapa, Veracruz",
    toAddress: "Centro, Xalapa",
    datetime: "22 Oct, 15:45",
    price: 1425.00,
    distance: "105 km",
    vehicleType: "Camioneta pickup",
    driver: "Ricardo Flores",
    duration: "2h 10min",
    status: "completado",
  },
  {
    id: "10",
    company: "Mudanzas Elite Internacional",
    number: "#ELI-2024-067",
    from: "Hermosillo, Sonora",
    fromAddress: "Blvd. Luis Encinas",
    to: "Culiacán, Sinaloa",
    toAddress: "Desarrollo Urbano Tres Ríos",
    datetime: "18 Oct, 06:00",
    price: 6850.75,
    distance: "628 km",
    vehicleType: "Camión 10 ton",
    driver: "Sergio Ortiz",
    duration: "8h 50min",
    status: "completado",
  },
];

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

  // Estados para el buscador
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedDate, setAppliedDate] = useState("");

  // Mostrar únicamente pedidos completados y aplicar filtros si hay alguno activo
  const filtered = MOCK_ORDERS.filter((o) => o.status === "completado")
    .filter((o) => {
      if (!appliedSearch) return true;
      const q = appliedSearch.toLowerCase();
      return [o.company, o.number, o.from, o.to].some((f) => f.toLowerCase().includes(q));
    })
    .filter((o) => {
      if (!appliedDate) return true;
      return o.datetime.toLowerCase().includes(appliedDate.toLowerCase());
    });

  function statusBadge(status: Order["status"]) {
    if (status === "proximo") return { label: "Confirmado", bg: COLORS.primary, color: COLORS.white };
    if (status === "en-curso") return { label: "En curso", bg: COLORS.secondary, color: COLORS.white };
    return { label: "Completado", bg: COLORS.lightGray, color: COLORS.text };
  }

  function onPressOrder(order: Order) {
    const details = `
📦 ${order.number}

📍 RUTA
Origen: ${order.from}
${order.fromAddress}

Destino: ${order.to}
${order.toAddress}

🚚 DETALLES DEL SERVICIO
Vehículo: ${order.vehicleType}
Conductor: ${order.driver}
Distancia: ${order.distance}
Duración: ${order.duration}

📅 Fecha: ${order.datetime}

💵 Total pagado: $${order.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
    `.trim();
    
    Alert.alert(
      order.company, 
      details,
      [
        {
          text: "Ver factura",
          onPress: () => Alert.alert("Factura", "La factura será enviada a tu correo electrónico")
        },
        {
          text: "Contactar soporte",
          onPress: () => Alert.alert("Soporte", "¿En qué podemos ayudarte con este pedido?")
        },
        {
          text: "Cerrar",
          style: "cancel"
        }
      ]
    );
  }

  function handleRepeatOrder(order: Order) {
    Alert.alert(
      "Repetir pedido",
      `¿Deseas crear una nueva cotización con la misma ruta?\n\nOrigen: ${order.from}\nDestino: ${order.to}`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, cotizar",
          onPress: () => {
            // Navegar a la pantalla de cotización con datos precargados
            router.push({ pathname: '/(tabs)/quotes' });
            Alert.alert("Éxito", "Los datos han sido precargados en tu nueva cotización");
          }
        }
      ]
    );
  }

  function handleRateService(order: Order) {
    Alert.alert(
      "Calificar servicio",
      `Califica tu experiencia con ${order.company}`,
      [
        { text: "⭐", onPress: () => submitRating(order, 1) },
        { text: "⭐⭐", onPress: () => submitRating(order, 2) },
        { text: "⭐⭐⭐", onPress: () => submitRating(order, 3) },
        { text: "⭐⭐⭐⭐", onPress: () => submitRating(order, 4) },
        { text: "⭐⭐⭐⭐⭐", onPress: () => submitRating(order, 5) },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  }

  function submitRating(order: Order, rating: number) {
    Alert.alert(
      "¡Gracias!",
      `Tu calificación de ${rating} estrellas ha sido registrada para ${order.company}`,
      [
        {
          text: "Agregar comentario",
          onPress: () => Alert.alert("Comentario", "Funcionalidad de comentarios en desarrollo")
        },
        {
          text: "OK"
        }
      ]
    );
  }

  function renderItem({ item }: { item: Order }) {
    const badge = statusBadge(item.status);

    return (
      <TouchableOpacity 
        style={[styles.card, SHADOWS.medium]} 
        onPress={() => onPressOrder(item)}
        activeOpacity={0.7}
      >
        {/* Header de la tarjeta */}
        <View style={styles.cardHeader}>
          <View style={styles.companyIconContainer}>
            <Ionicons name="business" size={20} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <ThemedText weight="bold" size={16} color={COLORS.text}>{item.company}</ThemedText>
            <ThemedText color={COLORS.textSecondary} size={12} style={{ marginTop: 2 }}>{item.number}</ThemedText>
          </View>
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <ThemedText size={11} weight="bold" style={{ color: badge.color }}>{badge.label}</ThemedText>
          </View>
        </View>

        {/* Divisor sutil */}
        <View style={styles.divider} />

        {/* Información de ruta simplificada */}
        <View style={styles.routeContainer}>
          <View style={styles.locationRow}>
            <View style={[styles.iconCircle, { backgroundColor: COLORS.primary + '15' }]}>
              <Ionicons name="radio-button-on" size={16} color={COLORS.primary} />
            </View>
            <View style={styles.locationInfo}>
              <ThemedText size={11} color={COLORS.textSecondary} weight="bold">ORIGEN</ThemedText>
              <ThemedText weight="bold" size={15} color={COLORS.text} style={{ marginTop: 2 }}>{item.from}</ThemedText>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.locationRow}>
            <View style={[styles.iconCircle, { backgroundColor: COLORS.secondary + '15' }]}>
              <Ionicons name="location" size={16} color={COLORS.secondary} />
            </View>
            <View style={styles.locationInfo}>
              <ThemedText size={11} color={COLORS.textSecondary} weight="bold">DESTINO</ThemedText>
              <ThemedText weight="bold" size={15} color={COLORS.text} style={{ marginTop: 2 }}>{item.to}</ThemedText>
            </View>
          </View>
        </View>

        {/* Footer con fecha y precio */}
        <View style={styles.cardFooter}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
            <ThemedText color={COLORS.textSecondary} size={13} style={{ marginLeft: SPACING.xs }}>{item.datetime}</ThemedText>
          </View>
          <View style={styles.priceTag}>
            <ThemedText size={10} color={COLORS.white} style={{ opacity: 0.85 }}>Total</ThemedText>
            <ThemedText weight="bold" size={16} color={COLORS.white} style={{ marginTop: 1 }}>
              ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </ThemedText>
          </View>
        </View>

        {/* Botón para ver detalles */}
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => onPressOrder(item)}
          activeOpacity={0.7}
        >
          <ThemedText size={13} color={COLORS.primary} weight="bold">Ver detalles completos</ThemedText>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Botones de acción para pedidos completados */}
        {item.status === "completado" && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: COLORS.secondary + '15', borderColor: COLORS.secondary }]}
              onPress={() => handleRepeatOrder(item)}
            >
              <Ionicons name="repeat" size={16} color={COLORS.secondary} />
              <ThemedText size={12} color={COLORS.secondary} weight="bold" style={{ marginLeft: 4 }}>
                Repetir
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: COLORS.accent + '15', borderColor: COLORS.accent }]}
              onPress={() => handleRateService(item)}
            >
              <Ionicons name="star" size={16} color={COLORS.accent} />
              <ThemedText size={12} color={COLORS.accent} weight="bold" style={{ marginLeft: 4 }}>
                Calificar
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {item.status === "proximo" ? (
          <View style={styles.actionButtons}>
            <Button title="Reprogramar" variant="outline" size="small" />
            <View style={{ width: SPACING.sm }} />
            <Button title="Cancelar" variant="secondary" size="small" />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.headerBox]}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="time" size={32} color={COLORS.white} />
          </View>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <ThemedText weight="bold" size={24} style={styles.headerTitle}>
              Historial de pedidos
            </ThemedText>
            <ThemedText size={14} style={styles.headerSubtitle}>
              Revisa tus pedidos anteriores
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Buscador y filtro por fecha */}
      <View style={styles.searchContainer}>
        <View style={styles.searchCard}>
          {/* 🔍 Fila 1: Buscar por empresa */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Buscar por empresa..."
                placeholderTextColor={COLORS.textSecondary}
                style={styles.searchInput}
              />
              {searchText ? (
                <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearIcon}>
                  <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity 
              style={styles.searchButton}
              onPress={() => setAppliedSearch(searchText)}
              activeOpacity={0.8}
            >
              <Ionicons name="search" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* 📅 Fila 2: Buscar por fecha */}
          <View style={[styles.searchRow, { marginTop: SPACING.md }]}>
            <TouchableOpacity 
              style={styles.dateInputContainer} 
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="calendar" size={20} color={COLORS.primary} style={styles.searchIcon} />
              <ThemedText color={selectedDate ? COLORS.text : COLORS.textSecondary} style={{ flex: 1 }}>
                {selectedDate ? formatDate(selectedDate) : "Seleccionar fecha..."}
              </ThemedText>
              <Ionicons name="chevron-down" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.searchButton}
              onPress={() => {
                if (!selectedDate) return setAppliedDate("");
                setAppliedDate(formatDate(selectedDate));
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="filter" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Botón limpiar filtros */}
          {(appliedSearch || appliedDate) && (
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={() => {
                setAppliedSearch("");
                setAppliedDate("");
                setSearchText("");
                setSelectedDate(null);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle" size={16} color={COLORS.primary} />
              <ThemedText color={COLORS.primary} size={13} weight="bold" style={{ marginLeft: SPACING.xs }}>
                Limpiar filtros
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate ?? new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}

      </View>


      <FlatList
        bounces={false}
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1, padding: SPACING.lg, paddingBottom: SPACING.lg }}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyBox}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="file-tray-outline" size={48} color={COLORS.primary} />
            </View>
            <ThemedText weight="bold" size={18} style={{ marginTop: SPACING.lg, color: COLORS.text }}>No hay pedidos</ThemedText>
            <ThemedText size={14} style={{ marginTop: SPACING.xs, color: COLORS.textSecondary, textAlign: 'center' }}>Aún no tienes pedidos completados{"\n"}en tu historial</ThemedText>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* ---------------- HEADER ---------------- */
  headerBox: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...SHADOWS.large,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.white2,
  },
  headerSubtitle: {
    color: COLORS.white2,
    marginTop: 4,
    opacity: 0.85,
  },

  /* ---------------- SEARCH AREA ---------------- */
  searchContainer: {
    marginTop: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
    zIndex: 10,
  },
  searchCard: {
    backgroundColor: COLORS.white2,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 48,
    marginRight: SPACING.sm,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 0,
  },
  clearIcon: {
    padding: SPACING.xs,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 48,
    marginRight: SPACING.sm,
  },
  clearFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.primary + '10',
    borderRadius: RADIUS.full,
    alignSelf: 'center',
  },

  /* ---------------- CARDS ---------------- */
  card: {
    backgroundColor: COLORS.white2,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  routeContainer: {
    marginVertical: SPACING.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.border,
    marginLeft: 15,
    marginVertical: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priceTag: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.sm + 2,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.primary + '10',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border + '30',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  emptyBox: {
    marginTop: SPACING.xxl * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------------- TABS (si los usas después) ---------------- */
  tabs: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  tab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },
  tabActive: {
    backgroundColor: COLORS.primary + "20",
  },
  tabText: {
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});


function formatDate(d: Date) {
  const today = new Date();
  if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) {
    return 'Hoy';
  }
  try {
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  } catch (e) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
  }
}
