import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DriverHomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Bienvenido, Chofer
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Gestiona tus viajes y ganancias
        </ThemedText>
      </View>

      {/* Status Card */}
      <View style={[styles.statusCard, { backgroundColor: colors.tint }]}>
        <View style={styles.statusContent}>
          <View style={styles.statusItem}>
            <IconSymbol size={24} name="checkmark.circle.fill" color="#fff" />
            <View style={{ marginLeft: 12 }}>
              <ThemedText style={styles.statusLabel} lightColor="#fff" darkColor="#fff">
                Estado
              </ThemedText>
              <ThemedText
                type="defaultSemiBold"
                style={styles.statusValue}
                lightColor="#fff"
                darkColor="#fff">
                En Línea
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity style={[styles.toggleButton, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
            <ThemedText
              style={styles.toggleText}
              lightColor="#fff"
              darkColor="#fff">
              Ir Offline
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { borderLeftColor: colors.tint }]}>
          <View style={styles.statIcon}>
            <IconSymbol size={28} name="car.fill" color={colors.tint} />
          </View>
          <View style={styles.statContent}>
            <ThemedText style={styles.statLabel}>Viajes Hoy</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              5
            </ThemedText>
          </View>
        </View>

        <View style={[styles.statCard, { borderLeftColor: '#4CAF50' }]}>
          <View style={styles.statIcon}>
            <IconSymbol size={28} name="dollarsign.circle.fill" color="#4CAF50" />
          </View>
          <View style={styles.statContent}>
            <ThemedText style={styles.statLabel}>Ganancias Hoy</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              $45.50
            </ThemedText>
          </View>
        </View>

        <View style={[styles.statCard, { borderLeftColor: '#FF9800' }]}>
          <View style={styles.statIcon}>
            <IconSymbol size={28} name="star.fill" color="#FF9800" />
          </View>
          <View style={styles.statContent}>
            <ThemedText style={styles.statLabel}>Calificación</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              4.8
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Current Trip */}
      <View style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Viaje Actual
        </ThemedText>
        <View style={[styles.tripCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.tripHeader}>
            <View>
              <ThemedText style={styles.tripFrom}>📍 Cra 7 No. 23-45</ThemedText>
              <ThemedText style={styles.tripTo}>📍 Av. Paseo 100 No. 50</ThemedText>
            </View>
            <View style={styles.tripTime}>
              <ThemedText style={styles.tripDuration}>12 min</ThemedText>
              <ThemedText style={styles.tripDistance}>4.5 km</ThemedText>
            </View>
          </View>
          <View style={styles.tripPassenger}>
            <View style={styles.passengerAvatar}>
              <IconSymbol size={20} name="person.fill" color="#fff" />
            </View>
            <View style={styles.passengerInfo}>
              <ThemedText type="defaultSemiBold">Juan Pérez</ThemedText>
              <ThemedText style={styles.passengerRating}>⭐ 4.9 • 25 viajes</ThemedText>
            </View>
          </View>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.actionButtonText} lightColor="#fff" darkColor="#fff">
              Ver Detalles
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Trips */}
      <View style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Próximos Viajes
        </ThemedText>

        <TouchableOpacity style={[styles.tripListItem, { borderLeftColor: '#2196F3' }]}>
          <View style={styles.tripListContent}>
            <ThemedText type="defaultSemiBold">María García</ThemedText>
            <ThemedText style={styles.tripListTime}>En 15 minutos</ThemedText>
          </View>
          <IconSymbol size={20} name="chevron.right" color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tripListItem, { borderLeftColor: '#4CAF50' }]}>
          <View style={styles.tripListContent}>
            <ThemedText type="defaultSemiBold">Carlos López</ThemedText>
            <ThemedText style={styles.tripListTime}>En 45 minutos</ThemedText>
          </View>
          <IconSymbol size={20} name="chevron.right" color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Acciones Rápidas
        </ThemedText>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.cardBackground }]}>
            <IconSymbol size={32} name="phone.fill" color={colors.tint} />
            <ThemedText style={styles.actionCardText}>Llamar</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.cardBackground }]}>
            <IconSymbol size={32} name="envelope.fill" color="#4CAF50" />
            <ThemedText style={styles.actionCardText}>Mensaje</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.cardBackground }]}>
            <IconSymbol size={32} name="mappin.and.ellipse" color="#FF9800" />
            <ThemedText style={styles.actionCardText}>Ruta</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.cardBackground }]}>
            <IconSymbol size={32} name="info.circle.fill" color="#9C27B0" />
            <ThemedText style={styles.actionCardText}>Soporte</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  statusCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    opacity: 0.9,
  },
  statusValue: {
    fontSize: 16,
    marginTop: 2,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  statIcon: {
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  tripCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tripFrom: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  tripTo: {
    fontSize: 13,
    fontWeight: '500',
  },
  tripTime: {
    alignItems: 'flex-end',
  },
  tripDuration: {
    fontSize: 12,
    fontWeight: '600',
  },
  tripDistance: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },
  tripPassenger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginBottom: 12,
  },
  passengerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerRating: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  tripListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  tripListContent: {
    flex: 1,
  },
  tripListTime: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionCardText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
