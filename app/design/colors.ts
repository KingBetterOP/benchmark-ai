// ========================================
// Benchmark AI Design System
// colors.ts
// ========================================

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;

  background: string;
  surface: string;
  border: string;

  text: string;
  textMuted: string;

  glow: string;

  gradient: {
    from: string;
    via: string;
    to: string;
  };
};

export const BaseColors = {
  white: "#FFFFFF",

  black: "#09090B",

  zinc900: "#18181B",

  zinc800: "#27272A",

  zinc700: "#3F3F46",

  gray400: "#A1A1AA",

  gray300: "#D4D4D8",

  success: "#22C55E",

  warning: "#F59E0B",

  danger: "#EF4444",
};

export const TechnologyColors: ThemeColors = {
  primary: "#3B82F6",

  secondary: "#2563EB",

  accent: "#60A5FA",

  background: "#09090B",

  surface: "#111827",

  border: "#1E3A8A",

  text: "#F8FAFC",

  textMuted: "#CBD5E1",

  glow: "rgba(59,130,246,0.45)",

  gradient: {
    from: "#0F172A",
    via: "#111827",
    to: "#1D4ED8",
  },
};