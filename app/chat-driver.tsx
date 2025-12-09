import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "../components/ui/themed-text";
import { COLORS, RADIUS, SPACING, SHADOWS } from "../constants/Colors";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const driver = params.driver ? JSON.parse(params.driver as string) : null;
  
  const [messages, setMessages] = useState([
    { id: 1, from: "driver", text: "¡Hola! Ya estoy en camino 😄" },
    { id: 2, from: "user", text: "Perfecto, gracias!" },
  ]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages([...messages, { id: Date.now(), from: "user", text }]);
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          
          {driver && (
            <View style={styles.driverInfo}>
              <Image source={{ uri: driver.avatar }} style={styles.driverAvatar} />
              <View style={{ marginLeft: SPACING.sm }}>
                <ThemedText size={16} weight="bold" color={COLORS.text}>
                  {driver.name}
                </ThemedText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.onlineDot} />
                  <ThemedText size={12} color={COLORS.textSecondary}>
                    En línea
                  </ThemedText>
                </View>
              </View>
            </View>
          )}
          
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          contentContainerStyle={styles.messagesList}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.from === "user" ? styles.userBubble : styles.driverBubble,
              ]}
            >
              <ThemedText style={[
                styles.bubbleText,
                item.from === "user" && { color: COLORS.white2 }
              ]}>{item.text}</ThemedText>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje…"
              placeholderTextColor={COLORS.textSecondary}
              value={text}
              onChangeText={setText}
              multiline
            />
            <TouchableOpacity 
              onPress={sendMessage}
              style={styles.sendButton}
              disabled={!text.trim()}
            >
              <Ionicons 
                name="send" 
                size={24} 
                color={text.trim() ? COLORS.primary : COLORS.textSecondary} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '20',
    ...SHADOWS.small,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  infoButton: {
    padding: SPACING.sm,
  },
  messagesList: {
    padding: SPACING.lg,
    flexGrow: 1,
  },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginVertical: 4,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  driverBubble: {
    backgroundColor: COLORS.white2,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: COLORS.white2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border + '20',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    ...SHADOWS.small,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    fontSize: 15,
    maxHeight: 100,
    color: COLORS.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
