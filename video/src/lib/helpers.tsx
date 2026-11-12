import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_IN, QUINT_OUT } from "./motion";

/**
 * Render children only inside [from, to). Children fade/blur out over `out`
 * frames before `to` (blur-dissolve), and fade/blur in over `inF` after `from`.
 */
export const Phase: React.FC<{
  from: number;
  to?: number;
  out?: number;
  inF?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  exitLift?: number;
  enterRise?: number;
}> = ({ from, to = 1e9, out = 14, inF = 0, children, style, exitLift = 26, enterRise = 0 }) => {
  const f = useCurrentFrame();
  if (f < from || f >= to) return null;
  const pin = inF > 0 ? interpolate(f, [from, from + inF], [0, 1], { ...clamp, easing: QUINT_OUT }) : 1;
  const pout = out > 0 ? interpolate(f, [to - out, to], [0, 1], { ...clamp, easing: EXPO_IN }) : 0;
  const blur = (1 - pin) * 12 + pout * 20;
  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(1, pin * 1.6) * (1 - pout),
        transform: `translateY(${(1 - pin) * enterRise - pout * exitLift}px)`,
        filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Absolutely positioned box helper. */
export const At: React.FC<{ x: number; y: number; w?: number; h?: number; center?: boolean; children: React.ReactNode; style?: React.CSSProperties }> = ({
  x,
  y,
  w,
  h,
  center = false,
  children,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      transform: center ? "translate(-50%,-50%)" : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Full-width centred row at a given y. */
export const Row: React.FC<{ y: number; children: React.ReactNode; style?: React.CSSProperties; gap?: number }> = ({ y, children, style, gap = 0 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", alignItems: "center", gap, ...style }}>
    {children}
  </div>
);
