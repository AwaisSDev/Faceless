import { Easing, interpolate, interpolateColors, random, spring } from "remotion";

/** Easings measured from the reference (see README > Motion language). */
export const EXPO_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const QUINT_OUT = Easing.bezier(0.22, 1, 0.36, 1);
export const EXPO_IN = Easing.bezier(0.7, 0, 0.84, 0);
export const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

/** Near-critical spring: no visible overshoot, ~0.4 s settle. */
export const SETTLE = { damping: 26, stiffness: 180, mass: 1 };
/** One small bounce (~8%). Use sparingly. */
export const POP = { damping: 12, stiffness: 160, mass: 1 };

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0..1 progress over [start, start+dur] with an easing. */
export const prog = (frame: number, start: number, dur: number, easing = QUINT_OUT) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing });

export const settle = (frame: number, start: number, fps = 60, config = SETTLE) =>
  spring({ frame: frame - start, fps, config });

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const mixColor = (a: string, b: string, t: number) =>
  interpolateColors(Math.max(0, Math.min(1, t)), [0, 1], [a, b]);

/** Standard "rise + de-blur" entrance values. */
export const rise = (p: number, dist = 26, blurPx = 9) => ({
  opacity: Math.min(1, p * 2.2),
  transform: `translateY(${(1 - p) * dist}px)`,
  filter: p >= 0.999 ? "none" : `blur(${(1 - p) * blurPx}px)`,
});

/** Seeded random in [-1, 1]. */
export const rnd = (seed: string | number) => random(seed) * 2 - 1;

/** Gentle never-dead ambient drift (scale + translate). */
export const drift = (frame: number, seed = 1, amount = 1) => {
  const s = 1 + 0.018 * amount * Math.sin(frame / 260 + seed);
  const x = 7 * amount * Math.sin(frame / 310 + seed * 2.1);
  const y = 5 * amount * Math.cos(frame / 280 + seed * 1.3);
  return { scale: s, x, y };
};
