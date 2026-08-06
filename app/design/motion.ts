// ========================================
// Benchmark AI Design System
// motion.ts
// ========================================

export const Motion = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    hero: 0.8,
  },

  easing: {
    default: "easeOut",
    smooth: "easeInOut",
    spring: "spring",
  },

  scale: {
    hover: 1.03,
    press: 0.98,
  },

  opacity: {
    hidden: 0,
    visible: 1,
  },

  y: {
    hidden: 24,
    visible: 0,
  },

  blur: {
    hidden: 8,
    visible: 0,
  },
};

export const Animations = {
  heroReveal: {
    opacity: Motion.opacity.hidden,
    y: Motion.y.hidden,
    filter: `blur(${Motion.blur.hidden}px)`,
  },

  cardReveal: {
    opacity: Motion.opacity.hidden,
    y: 16,
  },

  hover: {
    scale: Motion.scale.hover,
  },

  press: {
    scale: Motion.scale.press,
  },

  floating: {
    y: [-4, 4],
  },

  glow: {
    opacity: [0.5, 1, 0.5],
  },
};