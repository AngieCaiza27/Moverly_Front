import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import ThemedText from "../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../constants/Colors";

interface DocumentUpload {
  id: string;
  name: string;
  label: string;
  fileName: string | null;
  uploaded: boolean;
}

export default function RegisterDocumentsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [documents, setDocuments] = useState<DocumentUpload[]>([
    {
      id: "cedula",
      name: "cedula",
      label: "Cédula de Ciudadanía",
      fileName: null,
      uploaded: false,
    },
    {
      id: "licencia",
      name: "licencia",
      label: "Licencia de Conducir",
      fileName: null,
      uploaded: false,
    },
    {
      id: "cooperativa",
      name: "cooperativa",
      label: "Certificado de Cooperativa",
      fileName: null,
      uploaded: false,
    },
    {
      id: "antecedentes",
      name: "antecedentes",
      label: "Antecedentes Penales",
      fileName: null,
      uploaded: false,
    },
  ]);

  const handleUploadDocument = (docId: string) => {
    const docLabel = documents.find((d) => d.id === docId)?.label;
    
    // Simular selección de archivo con opciones realistas
    Alert.alert(
      "Cargar Documento",
      `Seleccionar PDF para: ${docLabel}`,
      [
        {
          text: "Seleccionar desde dispositivo",
          onPress: () => {
            // Simular carga exitosa de archivo
            const randomFileName = `${docId}_${new Date().getTime()}.pdf`;
            setDocuments((prev) =>
              prev.map((doc) =>
                doc.id === docId
                  ? {
                      ...doc,
                      fileName: randomFileName,
                      uploaded: true,
                    }
                  : doc
              )
            );
            Alert.alert("✓ Éxito", `${docLabel} cargado correctamente`);
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              fileName: null,
              uploaded: false,
            }
          : doc
      )
    );
  };

  const allDocumentsUploaded = documents.every((doc) => doc.uploaded);

  const handleContinue = () => {
    if (!allDocumentsUploaded) {
      Alert.alert(
        "Documentos incompletos",
        "Por favor, carga todos los documentos requeridos"
      );
      return;
    }

    // Aquí se conectaría con la API para crear la cuenta
    Alert.alert("¡Éxito!", "Tu cuenta de conductor ha sido creada", [
      {
        text: "Ir a login",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <ThemedText size={28} weight="bold" color="white">
          Documentos Requeridos
        </ThemedText>
        <ThemedText size={13} color={COLORS.gray} style={styles.subtitle}>
          Carga los documentos necesarios para verificar tu identidad
        </ThemedText>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(documents.filter((d) => d.uploaded).length / documents.length) * 100}%`,
              },
            ]}
          />
        </View>
        <ThemedText size={12} color={COLORS.gray} style={styles.progressText}>
          {documents.filter((d) => d.uploaded).length} de {documents.length}{" "}
          documentos
        </ThemedText>
      </View>

      {/* Documents list */}
      <View style={styles.documentsSection}>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <View style={styles.documentInfo}>
                <View
                  style={[
                    styles.iconContainer,
                    doc.uploaded && styles.iconContainerUploaded,
                  ]}
                >
                  <Ionicons
                    name={doc.uploaded ? "checkmark" : "document-text"}
                    size={24}
                    color={doc.uploaded ? "#fff" : COLORS.primary}
                  />
                </View>
                <View style={styles.labelContainer}>
                  <ThemedText size={14} weight="bold" color={doc.uploaded ? COLORS.success : "#fff"}>
                    {doc.label}
                  </ThemedText>
                  <ThemedText size={12} color="#A0AABA">
                    {doc.uploaded ? "✓ Documento cargado" : "PDF requerido"}
                  </ThemedText>
                </View>
              </View>

              {doc.uploaded && (
                <TouchableOpacity
                  onPress={() => handleDeleteDocument(doc.id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash" size={18} color={COLORS.error} />
                </TouchableOpacity>
              )}
            </View>

            {doc.fileName && (
              <View style={styles.fileInfo}>
                <Ionicons name="document" size={16} color={COLORS.success} />
                <ThemedText size={11} color={COLORS.success}>
                  {doc.fileName}
                </ThemedText>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.uploadButton,
                doc.uploaded && styles.uploadButtonUploaded,
              ]}
              onPress={() => handleUploadDocument(doc.id)}
            >
              <Ionicons
                name={doc.uploaded ? "reload" : "cloud-upload"}
                size={16}
                color={doc.uploaded ? COLORS.success : COLORS.primary}
              />
              <ThemedText
                size={12}
                weight="bold"
                color={doc.uploaded ? COLORS.success : COLORS.primary}
              >
                {doc.uploaded ? "Cambiar" : "Cargar"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Info box */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={20} color={COLORS.info} />
        <View style={styles.infoContent}>
          <ThemedText size={12} weight="bold" color="white">
            Requisitos de documentos
          </ThemedText>
          <ThemedText size={11} color={COLORS.white} style={styles.infoText}>
            • Los documentos deben ser en formato PDF
            • Asegúrate de que sean legibles y actualizados
            • Todos los documentos son obligatorios
          </ThemedText>
        </View>
      </View>

      {/* Continue button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: allDocumentsUploaded ? COLORS.success : COLORS.gray },
        ]}
        onPress={handleContinue}
        disabled={!allDocumentsUploaded}
      >
        <ThemedText size={14} weight="bold" color="#fff">
          Continuar
        </ThemedText>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09295d",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: SPACING.md,
    marginTop: SPACING.lg,
  },
  header: {
    paddingHorizontal: SPACING.md,
    marginVertical: SPACING.lg,
  },
  subtitle: {
    marginTop: SPACING.sm,
    color: "#A0AABA",
  },
  progressContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.success,
  },
  progressText: {
    textAlign: "center",
    color: "#A0AABA",
  },
  documentsSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  documentCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderRightColor: "rgba(255, 255, 255, 0.1)",
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  documentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  documentInfo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: `${COLORS.primary}25`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  iconContainerUploaded: {
    backgroundColor: COLORS.success,
  },
  labelContainer: {
    flex: 1,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    backgroundColor: "rgba(33, 150, 243, 0.15)",
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: SPACING.md,
    gap: SPACING.xs,
  },
  uploadButtonUploaded: {
    borderColor: COLORS.success,
  },
  deleteButton: {
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: `${COLORS.error}15`,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 193, 7, 0.15)",
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(255, 193, 7, 0.3)",
  },
  infoContent: {
    flex: 1,
  },
  infoText: {
    marginTop: SPACING.xs,
    lineHeight: 16,
    color: "#A0AABA",
  },
  continueButton: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  spacer: {
    height: SPACING.lg,
  },
});
