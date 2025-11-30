import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DriverProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <View style={[styles.profileImage, { backgroundColor: colors.tint }]}>
            <IconSymbol size={48} name="person.fill" color="#fff" />
          </View>
          <TouchableOpacity style={styles.editImageButton}>
            <IconSymbol size={16} name="camera.fill" color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <ThemedText type="title" style={styles.profileName}>
            Carlos Rodríguez
          </ThemedText>
          <ThemedText style={styles.profileStatus}>Chofer Verificado ✓</ThemedText>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <IconSymbol
                  key={i}
                  size={16}
                  name={i < 4 ? 'star.fill' : 'star'}
                  color="#FF9800"
                />
              ))}
            </View>
            <ThemedText style={styles.ratingText}>4.8 • 247 viajes</ThemedText>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={[styles.statsCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>$2,345.50</ThemedText>
            <ThemedText style={styles.statLabel}>Ganancias Esta Semana</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>42</ThemedText>
            <ThemedText style={styles.statLabel}>Viajes Completados</ThemedText>
          </View>
        </View>

        <View style={[styles.statsCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>98%</ThemedText>
            <ThemedText style={styles.statLabel}>Aceptación</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>1.2 h</ThemedText>
            <ThemedText style={styles.statLabel}>Tiempo Promedio</ThemedText>
          </View>
        </View>
      </View>

      {/* Vehicle Information */}
      <View style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Información del Vehículo
        </ThemedText>
        <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <IconSymbol size={20} name="car.fill" color={colors.tint} />
              <ThemedText style={styles.labelText}>Modelo</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold">Toyota Corolla 2023</ThemedText>
          </View>

          <View style={[styles.infoRow, styles.infoDivider]}>
            <View style={styles.infoLabel}>
              <IconSymbol size={20} name="number" color={colors.tint} />
              <ThemedText style={styles.labelText}>Placa</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold">ABC-1234</ThemedText>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <IconSymbol size={20} name="checkmark.seal.fill" color={colors.tint} />
              <ThemedText style={styles.labelText}>Estado Vehículo</ThemedText>
            </View>
            <View style={styles.statusBadge}>
              <IconSymbol size={12} name="circle.fill" color="#4CAF50" />
              <ThemedText style={styles.statusBadgeText}>Verificado</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Document Status */}
      <View style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Estado de Documentos
        </ThemedText>

        <View style={[styles.documentItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.documentIcon}>
            <IconSymbol size={24} name="doc.fill" color="#4CAF50" />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText type="defaultSemiBold">Cédula de Ciudadanía</ThemedText>
            <ThemedText style={styles.documentDate}>Vence: 15 Dic 2025</ThemedText>
          </View>
          <View style={[styles.badgeSuccess]}>
            <IconSymbol size={16} name="checkmark" color="#fff" />
          </View>
        </View>

        <View style={[styles.documentItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.documentIcon}>
            <IconSymbol size={24} name="doc.fill" color="#4CAF50" />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText type="defaultSemiBold">Licencia de Conducción</ThemedText>
            <ThemedText style={styles.documentDate}>Vence: 10 Ago 2026</ThemedText>
          </View>
          <View style={[styles.badgeSuccess]}>
            <IconSymbol size={16} name="checkmark" color="#fff" />
          </View>
        </View>

        <View style={[styles.documentItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.documentIcon}>
            <IconSymbol size={24} name="doc.fill" color="#FFC107" />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText type="defaultSemiBold">Certificado de Seguro</ThemedText>
            <ThemedText style={styles.documentDate}>Vence: 30 Nov 2024</ThemedText>
          </View>
          <View style={[styles.badgeWarning]}>
            <IconSymbol size={16} name="exclamationmark" color="#fff" />
          </View>
        </View>

        <View style={[styles.documentItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.documentIcon}>
            <IconSymbol size={24} name="doc.fill" color="#F44336" />
          </View>
          <View style={styles.documentInfo}>
            <ThemedText type="defaultSemiBold">Revisión Técnico Mecánica</ThemedText>
            <ThemedText style={styles.documentDate}>Vence: 5 Nov 2024</ThemedText>
          </View>
          <View style={[styles.badgeError]}>
            <IconSymbol size={16} name="exclamationmark" color="#fff" />
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Configuración de Cuenta
        </ThemedText>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingIcon}>
            <IconSymbol size={20} name="person.fill" color={colors.tint} />
          </View>
          <ThemedText style={styles.settingText}>Editar Perfil</ThemedText>
          <IconSymbol size={16} name="chevron.right" color={colors.tabIconDefault} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingIcon}>
            <IconSymbol size={20} name="lock.fill" color={colors.tint} />
          </View>
          <ThemedText style={styles.settingText}>Cambiar Contraseña</ThemedText>
          <IconSymbol size={16} name="chevron.right" color={colors.tabIconDefault} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingIcon}>
            <IconSymbol size={20} name="creditcard.fill" color={colors.tint} />
          </View>
          <ThemedText style={styles.settingText}>Métodos de Pago</ThemedText>
          <IconSymbol size={16} name="chevron.right" color={colors.tabIconDefault} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingIcon}>
            <IconSymbol size={20} name="bell.fill" color={colors.tint} />
          </View>
          <ThemedText style={styles.settingText}>Notificaciones</ThemedText>
          <IconSymbol size={16} name="chevron.right" color={colors.tabIconDefault} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingIcon}>
            <IconSymbol size={20} name="questionmark.circle.fill" color={colors.tint} />
          </View>
          <ThemedText style={styles.settingText}>Ayuda y Soporte</ThemedText>
          <IconSymbol size={16} name="chevron.right" color={colors.tabIconDefault} />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#F44336' }]}>
        <IconSymbol size={18} name="arrowshape.left.fill" color="#fff" />
        <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    marginBottom: 2,
  },
  profileStatus: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
  },
  ratingContainer: {
    gap: 6,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    opacity: 0.6,
  },
  statsSection: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statsCard: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.6,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoDivider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  labelText: {
    fontSize: 13,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    gap: 12,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  documentInfo: {
    flex: 1,
  },
  documentDate: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  badgeSuccess: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeWarning: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeError: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 8,
    gap: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  settingText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});
