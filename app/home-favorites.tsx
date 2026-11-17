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

type FavoriteType = 'company' | 'route';

type Favorite = {
  id: string;
  type: FavoriteType;
  name: string;
  description: string;
  rating?: number;
  totalTrips?: number;
  from?: string;
  to?: string;
  avgPrice?: number;
};

const MOCK_FAVORITES: Favorite[] = [
  {
    id: "1",
    type: "company",
    name: "Mudanzas Águila Express",
    description: "Servicio rápido y confiable",
    rating: 4.8,
    totalTrips: 12,
  },
  {
    id: "2",
    type: "route",
    name: "Ruta CDMX - Guadalajara",
    description: "Tu ruta más frecuente",
    from: "Ciudad de México",
    to: "Guadalajara, Jalisco",
    totalTrips: 8,
    avgPrice: 2850,
  },
  {
    id: "3",
    type: "company",
    name: "Express Logistics MX",
    description: "Excelente atención al cliente",
    rating: 4.9,
    totalTrips: 5,
  },
  {
    id: "4",
    type: "route",
    name: "Ruta CDMX - Puebla",
    description: "Ruta corta y económica",
    from: "Ciudad de México",
    to: "Puebla",
    totalTrips: 6,
    avgPrice: 1850,
  },
];

export default function HomeFavoritesScreen() {
  const insets = useSafeAreaInsets();
  const [favorites, setFavorites] = useState<Favorite[]>(MOCK_FAVORITES);
  const [filter, setFilter] = useState<'all' | FavoriteType>('all');

  const handleRemoveFavorite = (id: string) => {
    Alert.alert(
      "Eliminar favorito",
      "¿Estás seguro de que deseas eliminar este favorito?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setFavorites(favorites.filter((fav) => fav.id !== id));
          },
        },
      ]
    );
  };

  const filteredFavorites = filter === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.type === filter);

  const companiesCount = favorites.filter(f => f.type === 'company').length;
  const routesCount = favorites.filter(f => f.type === 'route').length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="star" size={32} color={COLORS.white} />
          </View>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <ThemedText weight="bold" size={24} color={COLORS.white}>
              Mis Favoritos
            </ThemedText>
            <ThemedText size={14} color={COLORS.white} style={{ opacity: 0.85, marginTop: 4 }}>
              Empresas y rutas que más usas
            </ThemedText>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="business" size={20} color={COLORS.white} />
            <View style={{ marginLeft: SPACING.xs }}>
              <ThemedText weight="bold" size={18} color={COLORS.white}>{companiesCount}</ThemedText>
              <ThemedText size={11} color={COLORS.white} style={{ opacity: 0.8 }}>Empresas</ThemedText>
            </View>
          </View>
          <View style={[styles.statBox, { marginLeft: SPACING.md }]}>
            <Ionicons name="navigate" size={20} color={COLORS.white} />
            <View style={{ marginLeft: SPACING.xs }}>
              <ThemedText weight="bold" size={18} color={COLORS.white}>{routesCount}</ThemedText>
              <ThemedText size={11} color={COLORS.white} style={{ opacity: 0.8 }}>Rutas</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="apps" 
            size={20} 
            color={filter === 'all' ? COLORS.primary : COLORS.textSecondary} 
          />
          <ThemedText 
            size={14} 
            weight={filter === 'all' ? 'bold' : 'regular'}
            color={filter === 'all' ? COLORS.primary : COLORS.textSecondary}
            style={{ marginLeft: SPACING.xs }}
          >
            Todos
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'company' && styles.filterButtonActive]}
          onPress={() => setFilter('company')}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="business" 
            size={20} 
            color={filter === 'company' ? COLORS.primary : COLORS.textSecondary} 
          />
          <ThemedText 
            size={14} 
            weight={filter === 'company' ? 'bold' : 'regular'}
            color={filter === 'company' ? COLORS.primary : COLORS.textSecondary}
            style={{ marginLeft: SPACING.xs }}
          >
            Empresas
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'route' && styles.filterButtonActive]}
          onPress={() => setFilter('route')}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="navigate" 
            size={20} 
            color={filter === 'route' ? COLORS.primary : COLORS.textSecondary} 
          />
          <ThemedText 
            size={14} 
            weight={filter === 'route' ? 'bold' : 'regular'}
            color={filter === 'route' ? COLORS.primary : COLORS.textSecondary}
            style={{ marginLeft: SPACING.xs }}
          >
            Rutas
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        bounces={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de favoritos */}
        {filteredFavorites.map((favorite) => (
          <View key={favorite.id} style={[styles.favoriteCard, SHADOWS.medium]}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: favorite.type === 'company' ? COLORS.secondary + '15' : COLORS.primary + '15' }
              ]}>
                <Ionicons 
                  name={favorite.type === 'company' ? 'business' : 'navigate'} 
                  size={24} 
                  color={favorite.type === 'company' ? COLORS.secondary : COLORS.primary} 
                />
              </View>
              <View style={{ flex: 1, marginLeft: SPACING.md }}>
                <ThemedText weight="bold" size={16} color={COLORS.text}>
                  {favorite.name}
                </ThemedText>
                <ThemedText size={13} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  {favorite.description}
                </ThemedText>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveFavorite(favorite.id)}
                style={styles.favoriteIcon}
                activeOpacity={0.7}
              >
                <Ionicons name="star" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Información específica */}
            {favorite.type === 'company' ? (
              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Ionicons name="star" size={16} color={COLORS.primary} />
                  <ThemedText size={13} color={COLORS.text} style={{ marginLeft: SPACING.xs }}>
                    Calificación: <ThemedText weight="bold" size={13}>{favorite.rating}/5.0</ThemedText>
                  </ThemedText>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <ThemedText size={13} color={COLORS.text} style={{ marginLeft: SPACING.xs }}>
                    {favorite.totalTrips} mudanzas realizadas
                  </ThemedText>
                </View>
              </View>
            ) : (
              <View style={styles.routeContainer}>
                <View style={styles.routeRow}>
                  <View style={styles.routeDot}>
                    <Ionicons name="radio-button-on" size={14} color={COLORS.primary} />
                  </View>
                  <ThemedText size={13} color={COLORS.text} style={{ marginLeft: SPACING.sm, flex: 1 }}>
                    {favorite.from}
                  </ThemedText>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routeRow}>
                  <View style={styles.routeDot}>
                    <Ionicons name="location" size={14} color={COLORS.secondary} />
                  </View>
                  <ThemedText size={13} color={COLORS.text} style={{ marginLeft: SPACING.sm, flex: 1 }}>
                    {favorite.to}
                  </ThemedText>
                </View>
                <View style={styles.routeStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="repeat" size={14} color={COLORS.info} />
                    <ThemedText size={12} color={COLORS.textSecondary} style={{ marginLeft: 4 }}>
                      {favorite.totalTrips} viajes
                    </ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="cash-outline" size={14} color={COLORS.success} />
                    <ThemedText size={12} color={COLORS.textSecondary} style={{ marginLeft: 4 }}>
                      ~${favorite.avgPrice?.toLocaleString()} promedio
                    </ThemedText>
                  </View>
                </View>
              </View>
            )}

            {/* Botón de acción */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert('Usar favorito', `Iniciar mudanza con ${favorite.name}`)}
              activeOpacity={0.7}
            >
              <ThemedText size={13} color={COLORS.primary} weight="bold">
                {favorite.type === 'company' ? 'Solicitar mudanza' : 'Usar esta ruta'}
              </ThemedText>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Estado vacío */}
        {filteredFavorites.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="star-outline" size={64} color={COLORS.primary} />
            </View>
            <ThemedText weight="bold" size={18} color={COLORS.text} style={{ marginTop: SPACING.lg }}>
              No hay favoritos
            </ThemedText>
            <ThemedText size={14} color={COLORS.textSecondary} style={{ marginTop: SPACING.sm, textAlign: 'center' }}>
              {filter === 'all' 
                ? 'Comienza a marcar empresas y rutas\ncomo favoritas para acceso rápido'
                : `No tienes ${filter === 'company' ? 'empresas' : 'rutas'} favoritas\naún en esta categoría`
              }
            </ThemedText>
          </View>
        )}
      </ScrollView>
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
  statsContainer: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },

  /* Filtros */
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  filterButtonActive: {
    borderBottomColor: COLORS.primary,
  },

  /* ScrollView */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingBottom: SPACING.lg,
  },

  /* Tarjetas de favoritos */
  favoriteCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    padding: SPACING.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  infoContainer: {
    marginBottom: SPACING.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },

  /* Rutas */
  routeContainer: {
    marginBottom: SPACING.sm,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: COLORS.border,
    marginLeft: 11,
    marginVertical: 2,
  },
  routeStats: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
    gap: SPACING.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },

  /* Botón de acción */
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary + '10',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
    marginTop: SPACING.sm,
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
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
