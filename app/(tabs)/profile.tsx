import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../../components/ui/Button";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING, SHADOWS } from "../../constants/Colors";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  
  // Estados para modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  
  // Datos de ejemplo; idealmente vienen de contexto / API
  const user = {
    name: "Angie Caiza",
    email: "angie@example.com",
    phone: "+52 55 1234 5678",
    avatar: avatarUri,
    memberSince: "Enero 2024",
  };

  // Cargar avatar guardado al iniciar
  useEffect(() => {
    loadAvatar();
  }, []);

  async function loadAvatar() {
    try {
      const savedAvatar = await AsyncStorage.getItem('@user_avatar');
      if (savedAvatar) {
        setAvatarUri(savedAvatar);
      }
    } catch (error) {
      console.log('Error al cargar avatar:', error);
    }
  }

  async function saveAvatar(uri: string) {
    try {
      await AsyncStorage.setItem('@user_avatar', uri);
      setAvatarUri(uri);
    } catch (error) {
      console.log('Error al guardar avatar:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen');
    }
  }

  // Estadísticas del usuario
  const stats = [
    { icon: "cube-outline", label: "Mudanzas", value: "12", color: COLORS.primary },
    { icon: "document-text-outline", label: "Cotizaciones", value: "5", color: COLORS.secondary },
    { icon: "star", label: "Calificación", value: "4.8", color: COLORS.accent },
  ];

  function handleEditProfile() {
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedPhone(user.phone);
    setShowEditModal(true);
  }

  function handleSaveProfile() {
    if (!editedName.trim() || !editedEmail.trim() || !editedPhone.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    // Aquí se conectaría con la API para actualizar el perfil
    Alert.alert(
      "Perfil actualizado",
      "Tus datos han sido actualizados exitosamente",
      [
        {
          text: "OK",
          onPress: () => {
            setShowEditModal(false);
            // Actualizar los datos del usuario
            user.name = editedName;
            user.email = editedEmail;
            user.phone = editedPhone;
          },
        },
      ]
    );
  }

  function handleChangePassword() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(true);
  }

  function handleSavePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }
    // Aquí se conectaría con la API
    Alert.alert(
      "Contraseña actualizada",
      "Tu contraseña ha sido cambiada exitosamente",
      [
        {
          text: "OK",
          onPress: () => setShowPasswordModal(false),
        },
      ]
    );
  }

  async function handleChangePhoto() {
    Alert.alert(
      "Cambiar foto de perfil",
      "Selecciona una opción",
      [
        { text: "Tomar foto", onPress: openCamera },
        { text: "Elegir de galería", onPress: openGallery },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  }

  async function openCamera() {
    try {
      // Solicitar permisos de cámara
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos permiso para acceder a tu cámara'
        );
        return;
      }

      // Abrir cámara
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await saveAvatar(result.assets[0].uri);
        Alert.alert('Éxito', 'Foto de perfil actualizada');
      }
    } catch (error) {
      console.log('Error al abrir cámara:', error);
      Alert.alert('Error', 'No se pudo acceder a la cámara');
    }
  }

  async function openGallery() {
    try {
      // Solicitar permisos de galería
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos permiso para acceder a tu galería de fotos'
        );
        return;
      }

      // Abrir galería
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await saveAvatar(result.assets[0].uri);
        Alert.alert('Éxito', 'Foto de perfil actualizada');
      }
    } catch (error) {
      console.log('Error al abrir galería:', error);
      Alert.alert('Error', 'No se pudo acceder a la galería');
    }
  }

  function handleHelpCenter() {
    // Navegar a la pantalla de FAQ si existe
    Alert.alert(
      "Centro de Ayuda",
      "¿Cómo podemos ayudarte?\n\n" +
      "• Preguntas frecuentes\n" +
      "• Soporte técnico\n" +
      "• Contactar con un agente\n" +
      "• Reportar un problema",
      [
        { text: "Cerrar" },
      ]
    );
  }

  function handlePrivacy() {
    Alert.alert(
      "Configuración de Privacidad",
      "Gestiona tu privacidad:\n\n" +
      "• Datos personales\n" +
      "• Permisos de ubicación\n" +
      "• Notificaciones\n" +
      "• Compartir información",
      [
        { text: "Aceptar" },
      ]
    );
  }

  function handleTerms() {
    Alert.alert(
      "Términos y Condiciones",
      "Versión 2.0 - Actualizada: Diciembre 2024\n\n" +
      "Al usar Moverly, aceptas nuestros términos de servicio. " +
      "Consulta nuestra política de privacidad para más información sobre " +
      "cómo manejamos tus datos.",
      [
        { text: "Cerrar" },
      ]
    );
  }

  function handleLogout() {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Cerrar sesión", 
        style: "destructive",
        onPress: () => router.replace("/login") 
      },
    ]);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header con gradiente */}
      <View style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <ThemedText weight="bold" size={28} style={{ color: COLORS.white2 }}>
                Mi Perfil
              </ThemedText>
              <ThemedText size={14} style={{ color: COLORS.white2, opacity: 0.85, marginTop: 4 }}>
                Gestiona tu cuenta
              </ThemedText>
            </View>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => {
                Alert.alert(
                  "Configuración",
                  "Opciones de configuración",
                  [
                    { text: "Notificaciones", onPress: () => Alert.alert("Notificaciones", "Configurar notificaciones push, email y SMS") },
                    { text: "Idioma", onPress: () => Alert.alert("Idioma", "Español (ES)") },
                    { text: "Cancelar", style: "cancel" },
                  ]
                );
              }}
            >
              <Ionicons name="settings-outline" size={24} color={COLORS.white2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta de perfil principal */}
        <View style={[styles.profileCard, SHADOWS.large]}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <ThemedText weight="bold" size={32} style={{ color: COLORS.white2 }}>
                    {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </ThemedText>
                </View>
              )}
              <TouchableOpacity
                style={styles.editAvatarButton}
                onPress={handleChangePhoto}
              >
                <Ionicons name="camera" size={16} color={COLORS.white2} />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfoSection}>
              <ThemedText weight="bold" size={22} color={COLORS.text}>
                {user.name}
              </ThemedText>
              <View style={styles.infoRow}>
                <Ionicons name="mail-outline" size={14} color={COLORS.textSecondary} />
                <ThemedText size={14} color={COLORS.textSecondary} style={{ marginLeft: 6 }}>
                  {user.email}
                </ThemedText>
              </View>
              <View style={[styles.infoRow, { marginTop: 4 }]}>
                <Ionicons name="call-outline" size={14} color={COLORS.textSecondary} />
                <ThemedText size={14} color={COLORS.textSecondary} style={{ marginLeft: 6 }}>
                  {user.phone}
                </ThemedText>
              </View>
              <View style={styles.memberBadge}>
                <Ionicons name="shield-checkmark" size={14} color={COLORS.secondary} />
                <ThemedText size={12} color={COLORS.secondary} weight="bold" style={{ marginLeft: 4 }}>
                  Miembro desde {user.memberSince}
                </ThemedText>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Ionicons name="pencil" size={18} color={COLORS.white2} />
            <ThemedText size={15} weight="bold" style={{ color: COLORS.white2, marginLeft: 8 }}>
              Editar Perfil
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, SHADOWS.medium]}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <ThemedText weight="bold" size={24} color={COLORS.text} style={{ marginTop: 12 }}>
                {stat.value}
              </ThemedText>
              <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 4 }}>
                {stat.label}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Sección de Servicios */}
        <View style={[styles.section, SHADOWS.medium]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="briefcase" size={20} color={COLORS.primary} />
            </View>
            <ThemedText weight="bold" size={18} color={COLORS.text}>
              Servicios
            </ThemedText>
          </View>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push({ pathname: '/(tabs)/moves' })}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: COLORS.primary + '15' }]}>
                <Ionicons name="car" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.menuTextContainer}>
                <ThemedText weight="bold" size={15} color={COLORS.text}>
                  Mis Mudanzas
                </ThemedText>
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  Ver mudanzas activas
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push({ pathname: '/(tabs)/quotes' })}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: COLORS.secondary + '15' }]}>
                <Ionicons name="document-text" size={20} color={COLORS.secondary} />
              </View>
              <View style={styles.menuTextContainer}>
                <ThemedText weight="bold" size={15} color={COLORS.text}>
                  Mis Cotizaciones
                </ThemedText>
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  Cotizaciones pendientes
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomWidth: 0 }]} 
            onPress={() => router.push({ pathname: '/(tabs)/history' })}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: COLORS.accent + '15' }]}>
                <Ionicons name="time" size={20} color={COLORS.accent} />
              </View>
              <View style={styles.menuTextContainer}>
                <ThemedText weight="bold" size={15} color={COLORS.text}>
                  Historial
                </ThemedText>
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  Ver pedidos anteriores
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Sección de Configuración */}
        <View style={[styles.section, SHADOWS.medium]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} />
            </View>
            <ThemedText weight="bold" size={18} color={COLORS.text}>
              Seguridad y Privacidad
            </ThemedText>
          </View>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleChangePassword}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: COLORS.info + '15' }]}>
                <Ionicons name="key" size={20} color={COLORS.info} />
              </View>
              <View style={styles.menuTextContainer}>
                <ThemedText weight="bold" size={15} color={COLORS.text}>
                  Cambiar Contraseña
                </ThemedText>
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  Actualiza tu contraseña
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={handlePrivacy}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: COLORS.warning + '15' }]}>
                <Ionicons name="lock-closed" size={20} color={COLORS.warning} />
              </View>
              <View style={styles.menuTextContainer}>
                <ThemedText weight="bold" size={15} color={COLORS.text}>
                  Privacidad
                </ThemedText>
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  Configuración de privacidad
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Sección de Ayuda */}
        <View style={[styles.section, SHADOWS.medium]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="help-circle" size={20} color={COLORS.primary} />
            </View>
            <ThemedText weight="bold" size={18} color={COLORS.text}>
              Soporte
            </ThemedText>
          </View>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleHelpCenter}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: COLORS.success + '15' }]}>
                <Ionicons name="help-circle" size={20} color={COLORS.success} />
              </View>
              <View style={styles.menuTextContainer}>
                <ThemedText weight="bold" size={15} color={COLORS.text}>
                  Centro de Ayuda
                </ThemedText>
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  Encuentra respuestas
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={handleTerms}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: COLORS.textSecondary + '15' }]}>
                <Ionicons name="document" size={20} color={COLORS.textSecondary} />
              </View>
              <View style={styles.menuTextContainer}>
                <ThemedText weight="bold" size={15} color={COLORS.text}>
                  Términos y Condiciones
                </ThemedText>
                <ThemedText size={12} color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                  Leer términos del servicio
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity 
          style={[styles.logoutButton, SHADOWS.medium]} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
          <ThemedText weight="bold" size={16} style={{ color: COLORS.error, marginLeft: 12 }}>
            Cerrar Sesión
          </ThemedText>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal de Editar Perfil */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText weight="bold" size={20} color={COLORS.text}>
                Editar Perfil
              </ThemedText>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Ionicons name="close" size={28} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <ThemedText size={14} color={COLORS.textSecondary} weight="bold">
                  Nombre completo
                </ThemedText>
                <TextInput
                  style={styles.modalInput}
                  value={editedName}
                  onChangeText={setEditedName}
                  placeholder="Ingresa tu nombre"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText size={14} color={COLORS.textSecondary} weight="bold">
                  Correo electrónico
                </ThemedText>
                <TextInput
                  style={styles.modalInput}
                  value={editedEmail}
                  onChangeText={setEditedEmail}
                  placeholder="correo@ejemplo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText size={14} color={COLORS.textSecondary} weight="bold">
                  Teléfono
                </ThemedText>
                <TextInput
                  style={styles.modalInput}
                  value={editedPhone}
                  onChangeText={setEditedPhone}
                  placeholder="+52 55 1234 5678"
                  keyboardType="phone-pad"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowEditModal(false)}
              >
                <ThemedText size={16} weight="bold" color={COLORS.textSecondary}>
                  Cancelar
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveProfile}
              >
                <ThemedText size={16} weight="bold" style={{ color: COLORS.white2 }}>
                  Guardar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de Cambiar Contraseña */}
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText weight="bold" size={20} color={COLORS.text}>
                Cambiar Contraseña
              </ThemedText>
              <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
                <Ionicons name="close" size={28} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <ThemedText size={14} color={COLORS.textSecondary} weight="bold">
                  Contraseña actual
                </ThemedText>
                <TextInput
                  style={styles.modalInput}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Ingresa tu contraseña actual"
                  secureTextEntry
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText size={14} color={COLORS.textSecondary} weight="bold">
                  Nueva contraseña
                </ThemedText>
                <TextInput
                  style={styles.modalInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Mínimo 6 caracteres"
                  secureTextEntry
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText size={14} color={COLORS.textSecondary} weight="bold">
                  Confirmar contraseña
                </ThemedText>
                <TextInput
                  style={styles.modalInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Repite la nueva contraseña"
                  secureTextEntry
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowPasswordModal(false)}
              >
                <ThemedText size={16} weight="bold" color={COLORS.textSecondary}>
                  Cancelar
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSavePassword}
              >
                <ThemedText size={16} weight="bold" style={{ color: COLORS.white2 }}>
                  Guardar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...SHADOWS.large,
  },
  headerContent: {
    paddingHorizontal: SPACING.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  profileCard: {
    backgroundColor: COLORS.white2,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: -SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: COLORS.white2,
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white2,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white2,
  },
  userInfoSection: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.secondary + '15',
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    ...SHADOWS.small,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white2,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    backgroundColor: COLORS.white2,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '30',
  },
  sectionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '30',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuTextContainer: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white2,
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.md,
    marginTop: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.error + '30',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white2,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingBottom: SPACING.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '30',
  },
  modalBody: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  modalInput: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.xs,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancel: {
    backgroundColor: COLORS.lightGray,
  },
  modalButtonSave: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.small,
  },
});
