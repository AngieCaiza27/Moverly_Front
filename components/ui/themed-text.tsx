import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { COLORS } from "../../constants/Colors";

interface ThemedTextProps extends TextProps {
  weight?: "regular" | "medium" | "bold";
  size?: number;
  color?: string;
}

const fontWeightMap = {
  regular: "400",
  medium: "600",
  bold: "700",
} as const;

export default function ThemedText({
  style,
  weight = "regular",
  size = 16,
  color,
  ...props
}: ThemedTextProps) {
  const theme = useColorScheme();
  const defaultColor =
    color ||
    (theme === "dark" ? COLORS.white : COLORS.text); // Usa tu paleta

  return (
    <RNText
      style={[
        styles.text,
        { color: defaultColor, fontSize: size, fontWeight: fontWeightMap[weight] },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});
