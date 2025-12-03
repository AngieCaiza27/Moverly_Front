import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../constants/Colors";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "trip" | "payment" | "system" | "message";
  timestamp: string;
  read: boolean;
  icon: string;
  color: string;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nuevo viaje disponible",
      message: "Hay un viaje de $45.000 desde Centro a Chapinero",
      type: "trip",
      timestamp: "Hace 2 minutos",
      read: false,
      icon: "car",
      color: COLORS.info,
    },
    {
      id: "2",
      title: "Pago recibido",
      message: "Se acreditaron $145.000 en tu cuenta bancaria",
      type: "payment",
      timestamp: "Hace 15 minutos",
      read: false,
      icon: "cash",
      color: COLORS.success,
    },
    {
      id: "3",
      title: "Nuevo mensaje",
      message: "Juan García: ¿A qué hora llegas?",
      type: "message",
      timestamp: "Hace 1 hora",
      read: true,
      icon: "chatbubble",
      color: COLORS.primary,
    },
    {
      id: "4",
      title: "Actualización de política",
      message: "Se han actualizado los términos y condiciones de servicio",
      type: "system",
      timestamp: "Hace 3 horas",
      read: true,
      icon: "information-circle",
      color: COLORS.warning,
    },
    {
      id: "5",
      title: "Viaje completado",
      message: "Tu viaje a Usaquén ha sido completado exitosamente",
      type: "trip",
      timestamp: "Ayer",
      read: true,
      icon: "checkmark-circle",
      color: COLORS.success,
    },
    {
      id: "6",
      title: "Recordatorio de documentos",
      message: "Tu licencia vence en 30 días",
      type: "system",
      timestamp: "Ayer",
      read: true,
      icon: "warning",
      color: COLORS.error,
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    handleMarkAsRead(notification.id);
    setSelectedNotification(notification);
    setShowDetailModal(true);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.notificationItemUnread,
      ]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}>
      {/* Left icon badge */}
      <View style={[styles.iconBadge, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon as any} size={20} color="#fff" />
      </View>

      {/* Content */}
      <View style={styles.notificationContent}>
        <ThemedText
          size={14}
          weight={!item.read ? "bold" : "regular"}
          color="black"
          numberOfLines={1}>
          {item.title}
        </ThemedText>
        <ThemedText
          size={12}
          color={COLORS.gray}
          numberOfLines={2}
          style={styles.notificationMessage}>
          {item.message}
        </ThemedText>
        <ThemedText size={10} color={COLORS.gray} style={styles.timestamp}>
          {item.timestamp}
        </ThemedText>
      </View>

      {/* Right actions */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(item.id)}>
        <Ionicons name="close" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <ThemedText size={18} weight="bold" color="black">
            Notificaciones
          </ThemedText>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <ThemedText size={10} weight="bold" color="#fff">
                {unreadCount}
              </ThemedText>
            </View>
          )}
        </View>
        <View style={{ width: 28 }} />
      </View>

      {/* Action buttons */}
      {notifications.length > 0 && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleMarkAllAsRead}>
            <Ionicons name="checkmark-done-sharp" size={16} color={COLORS.info} />
            <ThemedText size={12} color={COLORS.info} weight="bold">
              Marcar todas
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleClearAll}>
            <Ionicons name="trash" size={16} color={COLORS.error} />
            <ThemedText size={12} color={COLORS.error} weight="bold">
              Limpiar
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {/* Notifications list or empty state */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off" size={60} color={COLORS.lightGray} />
          <ThemedText
            size={16}
            weight="bold"
            color={COLORS.gray}
            style={styles.emptyText}>
            No hay notificaciones
          </ThemedText>
          <ThemedText size={12} color={COLORS.gray}>
            Aquí aparecerán tus notificaciones importantes
          </ThemedText>
        </View>
      )}

      {/* Detail Modal */}
      {selectedNotification && (
        <Modal
          visible={showDetailModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowDetailModal(false)}>
          <View style={styles.detailContainer}>
            {/* Detail Header */}
            <View style={styles.detailHeader}>
              <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                <Ionicons name="close" size={28} color={COLORS.primary} />
              </TouchableOpacity>
              <View style={{ width: 28 }} />
            </View>

            {/* Detail Content */}
            <ScrollView
              style={styles.detailContent}
              showsVerticalScrollIndicator={false}>
              {/* Icon */}
              <View
                style={[
                  styles.detailIconBadge,
                  { backgroundColor: selectedNotification.color },
                ]}>
                <Ionicons
                  name={selectedNotification.icon as any}
                  size={48}
                  color="#fff"
                />
              </View>

              {/* Title and message */}
              <ThemedText
                size={20}
                weight="bold"
                color="black"
                style={styles.detailTitle}>
                {selectedNotification.title}
              </ThemedText>

              <ThemedText
                size={14}
                color={COLORS.gray}
                style={styles.detailMessage}>
                {selectedNotification.message}
              </ThemedText>

              {/* Type badge */}
              <View style={styles.typeBadgeContainer}>
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor:
                        selectedNotification.type === "trip"
                          ? COLORS.info
                          : selectedNotification.type === "payment"
                            ? COLORS.success
                            : selectedNotification.type === "message"
                              ? COLORS.primary
                              : COLORS.warning,
                    },
                  ]}>
                  <ThemedText
                    size={12}
                    weight="bold"
                    color="#fff"
                    style={{ textTransform: "capitalize" }}>
                    {selectedNotification.type === "trip"
                      ? "Viaje"
                      : selectedNotification.type === "payment"
                        ? "Pago"
                        : selectedNotification.type === "message"
                          ? "Mensaje"
                          : "Sistema"}
                  </ThemedText>
                </View>

                <ThemedText size={12} color={COLORS.gray}>
                  {selectedNotification.timestamp}
                </ThemedText>
              </View>

              {/* Action based on type */}
              {selectedNotification.type === "trip" && (
                <TouchableOpacity style={styles.detailAction}>
                  <ThemedText size={14} weight="bold" color="#fff">
                    Ver detalles del viaje
                  </ThemedText>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
              )}

              {selectedNotification.type === "payment" && (
                <TouchableOpacity style={styles.detailAction}>
                  <ThemedText size={14} weight="bold" color="#fff">
                    Ver historial de pagos
                  </ThemedText>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
              )}

              {selectedNotification.type === "message" && (
                <TouchableOpacity style={styles.detailAction}>
                  <ThemedText size={14} weight="bold" color="#fff">
                    Responder mensaje
                  </ThemedText>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
              )}

              <View style={styles.spacer} />
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  unreadBadge: {
    backgroundColor: COLORS.error,
    borderRadius: RADIUS.full,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: "#f5f5f5",
    gap: SPACING.xs,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
  },
  notificationItemUnread: {
    backgroundColor: "#f9f9f9",
    borderLeftColor: COLORS.info,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    marginVertical: SPACING.xs,
  },
  timestamp: {
    marginTop: SPACING.xs,
  },
  deleteButton: {
    padding: SPACING.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  emptyText: {
    marginTop: SPACING.md,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.xl,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  detailIconBadge: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: SPACING.lg,
  },
  detailTitle: {
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  detailMessage: {
    marginBottom: SPACING.lg,
    lineHeight: 22,
    textAlign: "center",
  },
  typeBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  typeBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  detailAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    marginTop: SPACING.xl,
  },
  spacer: {
    height: SPACING.lg,
  },
});
