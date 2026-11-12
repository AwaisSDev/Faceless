import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, settle } from "../lib/motion";
import { C, FONT_BODY } from "../theme";

/**
 * White rounded card with a soft shadow that slides in with depth (slight 3D
 * tilt, blur while moving).
 */
export const UICard: React.FC<{
  children?: React.ReactNode;
  at: number;
  w?: number | string;
  h?: number | string;
  from?: "bottom" | "left" | "right" | "top";
  tilt?: number;
  dark?: boolean;
  radius?: number;
  pad?: number;
  style?: React.CSSProperties;
  exitAt?: number;
}> = ({ children, at, w, h, from = "bottom", tilt = 14, dark = false, radius = 32, pad = 36, style, exitAt }) => {
  const f = useCurrentFrame();
  const p = settle(f, at);
  const dist = 120;
  const dx = from === "left" ? -dist : from === "right" ? dist : 0;
  const dy = from === "bottom" ? dist : from === "top" ? -dist : 0;
  const rx = from === "bottom" ? tilt : from === "top" ? -tilt : 0;
  const ry = from === "left" ? -tilt : from === "right" ? tilt : 0;
  const ex = exitAt !== undefined ? interpolate(f, [exitAt, exitAt + 16], [0, 1], { ...clamp, easing: EXPO_OUT }) : 0;
  if (f < at) return null;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        background: dark ? "#141414" : "#FFFFFF",
        boxShadow: dark
          ? "0 30px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 24px 70px rgba(20,16,0,0.09), 0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(10,10,10,0.05)",
        padding: pad,
        fontFamily: FONT_BODY,
        color: dark ? "#fff" : C.ink,
        transform: `perspective(1400px) translate3d(${(1 - p) * dx}px, ${(1 - p) * dy - ex * 30}px, ${(1 - p) * -160}px) rotateX(${(1 - p) * rx}deg) rotateY(${(1 - p) * ry}deg)`,
        opacity: Math.min(1, p * 2) * (1 - ex),
        filter: (1 - p) * 10 + ex * 14 > 0.2 ? `blur(${(1 - p) * 10 + ex * 14}px)` : undefined,
        position: "relative",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Small helper: element that rises + de-blurs at a frame. */
export const Reveal: React.FC<{
  at: number;
  children: React.ReactNode;
  dist?: number;
  blur?: number;
  style?: React.CSSProperties;
  dx?: number;
  exitAt?: number;
}> = ({ at, children, dist = 26, blur = 9, style, dx = 0, exitAt }) => {
  const f = useCurrentFrame();
  const p = settle(f, at);
  const ex = exitAt !== undefined ? interpolate(f, [exitAt, exitAt + 14], [0, 1], { ...clamp, easing: EXPO_OUT }) : 0;
  if (f < at) return null;
  const b = (1 - p) * blur + ex * 12;
  return (
    <div
      style={{
        opacity: Math.min(1, p * 2) * (1 - ex),
        transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dist - ex * 20}px)`,
        filter: b > 0.2 ? `blur(${b}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
