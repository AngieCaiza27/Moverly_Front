import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../components/ui/Button";
import ThemedText from "../components/ui/themed-text";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../constants/Colors";

type WorkAddress = {
  id: string;
  label: string;
  company: string;
  address: string;
  details: string;
  phone?: string;
  isDefault: boolean;
};

const MOCK_WORK_ADDRESSES: WorkAddress[] = [
  {
    id: "1",
    label: "Oficina Principal",
    company: "TechCorp Solutions",
    address: "Paseo de la Reforma 250, Cuauhtémoc, CDMX",
    details: "Torre B, Piso 15, Oficina 1501",
    phone: "+52 55 1234 5678",
    isDefault: true,
  },
  {
    id: "2",
    label: "Sucursal Norte",
    company: "TechCorp Solutions",
    address: "Av. Constituyentes 950, Miguel Hidalgo, CDMX",
    details: "Edificio corporativo, Recepción planta baja",
    phone: "+52 55 8765 4321",
    isDefault: false,
  },
];

export default function HomeWorkScreen() {
  const insets = useSafeAreaInsets();
  const [addresses, setAddresses] = useState<WorkAddress[]>(MOCK_WORK_ADDRESSES);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddAddress = () => {
    setShowAddForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      "Eliminar dirección",
      "¿Estás seguro de que deseas eliminar esta dirección laboral?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setAddresses(addresses.filter((addr) => addr.id !== id));
          },
        },
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="briefcase" size={32} color={COLORS.white} />
          </View>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <ThemedText weight="bold" size={24} color={COLORS.white}>
              Direcciones Laborales
            </ThemedText>
            <ThemedText size={14} color={COLORS.white} style={{ opacity: 0.85, marginTop: 4 }}>
              Gestiona tus ubicaciones de trabajo
            </ThemedText>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta de agregar dirección */}
        <TouchableOpacity
          style={[styles.addCard, SHADOWS.medium]}
          onPress={handleAddAddress}
          activeOpacity={0.7}
        >
          <View style={styles.addIconContainer}>
            <Ionicons name="add-circle" size={48} color={COLORS.secondary} />
          </View>
          <ThemedText weight="bold" size={16} color={COLORS.secondary} style={{ marginTop: SPACING.md }}>
            Agregar dirección laboral
          </ThemedText>
          <ThemedText size={13} color={COLORS.textSecondary} style={{ marginTop: SPACING.xs, textAlign: 'center' }}>
            Añade oficinas, sucursales o centros de trabajo
          </ThemedText>
        </TouchableOpacity>

        {/* Contador de direcciones */}
        <View style={styles.counterContainer}>
          <Ionicons name="business" size={18} color={COLORS.secondary} />
          <ThemedText size={14} color={COLORS.textSecondary} style={{ marginLeft: SPACING.xs }}>
            {addresses.length} {addresses.length === 1 ? 'ubicación laboral' : 'ubicaciones laborales'}
          </ThemedText>
        </View>

        {/* Lista de direcciones */}
        {addresses.map((address) => (
          <View key={address.id} style={[styles.addressCard, SHADOWS.medium]}>
            {/* Header de la tarjeta */}
            <View style={styles.addressHeader}>
              <View style={styles.addressIconContainer}>
                <Ionicons name="business" size={22} color={COLORS.secondary} />
              </View>
              <View style={{ flex: 1, marginLeft: SPACING.md }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                  <ThemedText weight="bold" size={16} color={COLORS.text}>
                    {address.label}
                  </ThemedText>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Ionicons name="star" size={12} color={COLORS.accent} />
                      <ThemedText size={10} weight="bold" color={COLORS.accent} style={{ marginLeft: 4 }}>
                        Principal
                      </ThemedText>
                    </View>
                  )}
                </View>
                <ThemedText size={13} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  {address.company}
                </ThemedText>
              </View>
            </View>

            {/* Divisor */}
            <View style={styles.divider} />

            {/* Dirección */}
            <View style={styles.addressInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={18} color={COLORS.primary} />
                <ThemedText size={14} color={COLORS.text} style={{ marginLeft: SPACING.sm, flex: 1 }}>
                  {address.address}
                </ThemedText>
              </View>

              {address.details && (
                <View style={[styles.infoRow, { marginTop: SPACING.sm }]}>
                  <Ionicons name="information-circle-outline" size={18} color={COLORS.accent} />
                  <ThemedText size={13} color={COLORS.textSecondary} style={{ marginLeft: SPACING.sm, flex: 1 }}>
                    {address.details}
                  </ThemedText>
                </View>
              )}

              {address.phone && (
                <View style={[styles.infoRow, { marginTop: SPACING.sm }]}>
                  <Ionicons name="call-outline" size={18} color={COLORS.info} />
                  <ThemedText size={13} color={COLORS.textSecondary} style={{ marginLeft: SPACING.sm, flex: 1 }}>
                    {address.phone}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Acciones */}
            <View style={styles.actionsContainer}>
              {!address.isDefault && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleSetDefault(address.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="star-outline" size={18} color={COLORS.accent} />
                  <ThemedText size={13} color={COLORS.accent} weight="bold" style={{ marginLeft: SPACING.xs }}>
                    Marcar como principal
                  </ThemedText>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.actionButton, { marginLeft: SPACING.sm }]}
                onPress={() => Alert.alert('Editar', `Editar ${address.label}`)}
                activeOpacity={0.7}
              >
                <Ionicons name="create-outline" size={18} color={COLORS.secondary} />
                <ThemedText size={13} color={COLORS.secondary} weight="bold" style={{ marginLeft: SPACING.xs }}>
                  Editar
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { marginLeft: SPACING.sm }]}
                onPress={() => handleDeleteAddress(address.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                <ThemedText size={13} color={COLORS.error} weight="bold" style={{ marginLeft: SPACING.xs }}>
                  Eliminar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Estado vacío */}
        {addresses.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="briefcase-outline" size={64} color={COLORS.secondary} />
            </View>
            <ThemedText weight="bold" size={18} color={COLORS.text} style={{ marginTop: SPACING.lg }}>
              No hay direcciones laborales
            </ThemedText>
            <ThemedText size={14} color={COLORS.textSecondary} style={{ marginTop: SPACING.sm, textAlign: 'center' }}>
              Agrega tus ubicaciones de trabajo para{' \n'}gestionar mejor tus mudanzas corporativas
            </ThemedText>
          </View>
        )}
      </ScrollView>

      {/* Botón flotante inferior */}
      {addresses.length > 0 && (
        <View style={[styles.floatingButtonContainer, { paddingBottom: insets.bottom + SPACING.md }]}>
          <Button
            title="Agregar nueva ubicación"
            onPress={handleAddAddress}
            fullWidth
            style={styles.floatingButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* Header */
  header: {
    backgroundColor: COLORS.secondary,
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

  /* ScrollView */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },

  /* Tarjeta de agregar */
  addCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary + '30',
    borderStyle: 'dashed',
  },
  addIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Contador */
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  /* Tarjetas de dirección */
  addressCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent + '20',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
    marginLeft: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  addressInfo: {
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  /* Acciones */
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border + '30',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.xs,
  },

  /* Estado vacío */
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xxl * 2,
    paddingHorizontal: SPACING.xl,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.secondary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Botón flotante */
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    ...SHADOWS.large,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
  },
  floatingButton: {
    ...SHADOWS.medium,
  },
});
