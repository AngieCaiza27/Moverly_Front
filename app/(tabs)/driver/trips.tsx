import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Trip {
  id: string;
  passengerName: string;
  passengerRating: number;
  pickupLocation: string;
  dropoffLocation: string;
  distance: string;
  estimatedTime: string;
  fare: string;
  pickupTime: string;
  status: 'available' | 'completed' | 'cancelled';
}

const AVAILABLE_TRIPS: Trip[] = [
  {
    id: '1',
    passengerName: 'Ana Martínez',
    passengerRating: 4.9,
    pickupLocation: 'Cra 11 No. 100',
    dropoffLocation: 'Centro Comercial Premium',
    distance: '6.2 km',
    estimatedTime: '18 min',
    fare: '$18.500',
    pickupTime: 'Ahora',
    status: 'available',
  },
  {
    id: '2',
    passengerName: 'Roberto Silva',
    passengerRating: 4.7,
    pickupLocation: 'Av. Carrera 50 No. 25',
    dropoffLocation: 'Terminal de Transporte',
    distance: '8.1 km',
    estimatedTime: '22 min',
    fare: '$24.300',
    pickupTime: 'En 3 min',
    status: 'available',
  },
  {
    id: '3',
    passengerName: 'Sofía López',
    passengerRating: 5.0,
    pickupLocation: 'Centro Comercial El Hueco',
    dropoffLocation: 'Residencial Las Flores',
    distance: '4.8 km',
    estimatedTime: '15 min',
    fare: '$16.200',
    pickupTime: 'En 5 min',
    status: 'available',
  },
];

const COMPLETED_TRIPS: Trip[] = [
  {
    id: '101',
    passengerName: 'Carlos Mendoza',
    passengerRating: 4.8,
    pickupLocation: 'Estación de Policía',
    dropoffLocation: 'Cra 8 No. 45',
    distance: '3.5 km',
    estimatedTime: '12 min',
    fare: '$12.800',
    pickupTime: 'Hoy 14:30',
    status: 'completed',
  },
  {
    id: '102',
    passengerName: 'Laura Gómez',
    passengerRating: 4.6,
    pickupLocation: 'Centro Médico San Rafael',
    dropoffLocation: 'Av. Paseo 100',
    distance: '5.2 km',
    estimatedTime: '16 min',
    fare: '$18.100',
    pickupTime: 'Hoy 13:15',
    status: 'completed',
  },
];

export default function DriverTripsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available');

  const trips = activeTab === 'available' ? AVAILABLE_TRIPS : COMPLETED_TRIPS;

  const renderTripCard = ({ item }: { item: Trip }) => (
    <View style={[styles.tripCard, { backgroundColor: colors.cardBackground }]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.passengerInfo}>
          <View style={styles.passengerRow}>
            <ThemedText type="defaultSemiBold" style={styles.passengerName}>
              {item.passengerName}
            </ThemedText>
            <View style={styles.ratingBadge}>
              <IconSymbol size={12} name="star.fill" color="#FF9800" />
              <ThemedText style={styles.ratingText}>{item.passengerRating}</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.pickupTime}>{item.pickupTime}</ThemedText>
        </View>
        {activeTab === 'available' && (
          <View style={[styles.fareBadge, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.fareText} lightColor="#fff" darkColor="#fff">
              {item.fare}
            </ThemedText>
          </View>
        )}
      </View>

      {/* Route */}
      <View style={styles.routeSection}>
        <View style={styles.routeMarkers}>
          <View style={[styles.marker, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.markerText}>A</ThemedText>
          </View>
          <View style={styles.routeLine} />
          <View style={[styles.marker, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.markerText}>B</ThemedText>
          </View>
        </View>
        <View style={styles.routeDetails}>
          <ThemedText style={styles.locationLabel}>{item.pickupLocation}</ThemedText>
          <ThemedText style={styles.locationLabel}>{item.dropoffLocation}</ThemedText>
        </View>
      </View>

      {/* Trip Info */}
      <View style={styles.tripInfo}>
        <View style={styles.infoItem}>
            <IconSymbol size={16} name="arrow.right" color={colors.tint} />
            <ThemedText style={styles.infoText}>{item.distance}</ThemedText>
          </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <IconSymbol size={16} name="clock.fill" color={colors.tint} />
          <ThemedText style={styles.infoText}>{item.estimatedTime}</ThemedText>
        </View>
      </View>

      {/* Actions */}
      {activeTab === 'available' ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButtonSecondary, { borderColor: colors.tint }]}>
            <ThemedText style={[styles.actionButtonText, { color: colors.tint }]}>
              Rechazar
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButtonPrimary, { backgroundColor: colors.tint }]}>
            <IconSymbol size={18} name="checkmark" color="#fff" />
            <ThemedText style={styles.acceptButtonText}>Aceptar</ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.completedBadge}>
          <IconSymbol size={16} name="checkmark.circle.fill" color="#4CAF50" />
          <ThemedText style={styles.completedText}>Viaje Completado</ThemedText>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Viajes
        </ThemedText>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'available' && [styles.tabButtonActive, { borderBottomColor: colors.tint }],
          ]}
          onPress={() => setActiveTab('available')}>
          <IconSymbol
            size={18}
            name="paperplane.fill"
            color={activeTab === 'available' ? colors.tint : colors.tabIconDefault}
          />
          <ThemedText
            style={[
              styles.tabText,
              activeTab === 'available' && { color: colors.tint, fontWeight: '600' },
            ]}>
            Disponibles
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'completed' && [styles.tabButtonActive, { borderBottomColor: colors.tint }],
          ]}
          onPress={() => setActiveTab('completed')}>
          <IconSymbol
            size={18}
            name="checkmark.circle.fill"
            color={activeTab === 'completed' ? colors.tint : colors.tabIconDefault}
          />
          <ThemedText
            style={[
              styles.tabText,
              activeTab === 'completed' && { color: colors.tint, fontWeight: '600' },
            ]}>
            Completados
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <FlatList
        data={trips}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <IconSymbol size={48} name="paperplane.fill" color={colors.tabIconDefault} />
            <ThemedText style={styles.emptyText}>
              {activeTab === 'available' ? 'No hay viajes disponibles' : 'Sin viajes completados'}
            </ThemedText>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 16 : 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  tripCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  passengerName: {
    fontSize: 15,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(255,152,0,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pickupTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  fareBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  fareText: {
    fontSize: 16,
    fontWeight: '700',
  },
  routeSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  routeMarkers: {
    alignItems: 'center',
    gap: 6,
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  routeDetails: {
    flex: 1,
    justifyContent: 'space-around',
  },
  locationLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 8,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButtonSecondary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonPrimary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  acceptButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  completedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
});
