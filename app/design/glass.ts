// ========================================
// Benchmark AI Design System
// glass.ts
// ========================================

export const Glass = {
  light: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    backdropFilter: "blur(12px)",
  },

  medium: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
  },

  strong: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(20px)",
  },
} as const;