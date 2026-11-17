import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/ui/themed-text";
import { COLORS, RADIUS, SPACING } from "../../constants/Colors";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    id: "1",
    question: "¿Cómo puedo cambiar mis datos personales?",
    answer:
      "Ve a Editar Perfil en la sección de Configuración de Cuenta, donde podrás actualizar tu nombre, correo electrónico y contraseña.",
  },
  {
    id: "2",
    question: "¿Cómo agrego una cuenta bancaria?",
    answer:
      "En Métodos de Pago, completa la información de tu cuenta bancaria incluyendo número de cuenta, banco y tipo de cuenta. Tus pagos se depositarán en esta cuenta.",
  },
  {
    id: "3",
    question: "¿Cuándo recibo mis pagos?",
    answer:
      "Los pagos se procesan automáticamente al final de cada semana. El dinero llegará a tu cuenta bancaria dentro de 1-2 días hábiles.",
  },
  {
    id: "4",
    question: "¿Qué documentos necesito para ser chofer?",
    answer:
      "Necesitas: Cédula de Ciudadanía, Licencia de Conducción vigente, Certificado de Cooperativa y Antecedentes Penales. Todos deben estar al día.",
  },
  {
    id: "5",
    question: "¿Cómo sé cuánto ganaré en un viaje?",
    answer:
      "La tarifa se calcula según: distancia, tiempo estimado y demanda. Verás el precio exacto antes de aceptar cada viaje.",
  },
  {
    id: "6",
    question: "¿Qué hacer si tengo un problema con un pasajero?",
    answer:
      "Puedes reportar el incidente desde el historial de viajes. Nuestro equipo de soporte revisará tu reporte y tomará las acciones necesarias.",
  },
  {
    id: "7",
    question: "¿Puedo cambiar mi estado de en línea a ocupado?",
    answer:
      "Sí, desde la pantalla principal tienes un selector de estado. Puedes cambiar entre En Línea, Ocupado y Fuera de Línea según lo necesites.",
  },
  {
    id: "8",
    question: "¿Cómo calculo mis ganancias?",
    answer:
      "Toda tu información de ganancias está disponible en tu perfil con un desglose semanal y mensual. Puedes ver todos tus viajes y ganancias en cualquier momento.",
  },
];

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <ThemedText size={18} weight="bold" color="black">
          Ayuda y Soporte
        </ThemedText>
        <View style={{ width: 28 }} />
      </View>

      {/* Intro Section */}
      <View style={styles.introSection}>
        <ThemedText size={16} weight="bold" color="black" style={styles.introTitle}>
          Preguntas Frecuentes
        </ThemedText>
        <ThemedText size={12} color={COLORS.gray}>
          Encuentra respuestas a las preguntas más comunes sobre cómo usar Moverly como chofer.
        </ThemedText>
      </View>

      {/* FAQ Items */}
      <View style={styles.faqContainer}>
        {FAQS.map((faq) => (
          <View key={faq.id}>
            <TouchableOpacity
              style={styles.faqHeader}
              onPress={() => toggleExpand(faq.id)}>
              <View style={styles.questionContainer}>
                <Ionicons
                  name={expandedId === faq.id ? "chevron-down" : "chevron-forward"}
                  size={20}
                  color={COLORS.primary}
                  style={styles.chevron}
                />
                <ThemedText size={14} weight="bold" color="black" style={styles.question}>
                  {faq.question}
                </ThemedText>
              </View>
            </TouchableOpacity>

            {expandedId === faq.id && (
              <View style={styles.answerContainer}>
                <ThemedText size={12} color={COLORS.gray} style={styles.answer}>
                  {faq.answer}
                </ThemedText>
              </View>
            )}
            <View style={styles.divider} />
          </View>
        ))}
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <ThemedText size={14} weight="bold" color="black" style={styles.contactTitle}>
          ¿No encuentras lo que buscas?
        </ThemedText>
        <TouchableOpacity style={[styles.contactButton, { backgroundColor: COLORS.primary }]}>
          <Ionicons name="mail" size={18} color="#fff" />
          <ThemedText color="#fff" weight="bold" size={14}>
            Contactar Soporte
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
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
  introSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  introTitle: {
    marginBottom: SPACING.sm,
  },
  faqContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  faqHeader: {
    paddingVertical: SPACING.md,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  chevron: {
    minWidth: 20,
  },
  question: {
    flex: 1,
  },
  answerContainer: {
    paddingLeft: SPACING.lg,
    paddingBottom: SPACING.md,
    paddingRight: SPACING.md,
  },
  answer: {
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SPACING.sm,
  },
  contactSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  contactTitle: {
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  contactButton: {
    flexDirection: "row",
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
  spacer: {
    height: SPACING.lg,
  },
});
