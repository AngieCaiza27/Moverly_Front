// constants/Colors.ts
export const COLORS = {
  primary: '#FF6B35',      // Naranja principal Moverly
  secondary: '#4ECDC4',    // Verde azulado
  accent: '#FFB84D',       // Amarillo/naranja claro
  background: '#F7F7F7',   // Fondo claro
  white2: '#ffffffff',
  white: '#e5e6e8ff',
  black: '#000000',
  gray: '#757575',
  lightGray: '#E0E0E0',
  darkGray: '#424242',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
  text: '#212121',
  textLight: '#757575',
  textSecondary: '#616161',
  border: '#E0E0E0',
  inputBackground: '#F5F5F5',
  disabled: '#BDBDBD',
  shadow: '#00000029',
  fondo: '#09295d',
} as const;

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  heading: 28,
  title: 32,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export type ColorKey = keyof typeof COLORS;
export type SizeKey = keyof typeof SIZES;
export type SpacingKey = keyof typeof SPACING;