import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, POP, QUINT_OUT, settle } from "../lib/motion";
import { C, FONT_HEAD } from "../theme";

/** "faceless." wordmark, Manrope 800, lowercase, yellow period. */
export const Wordmark: React.FC<{ size?: number; dark?: boolean; start?: number; animate?: boolean }> = ({
  size = 200,
  dark = true,
  start = 0,
  animate = true,
}) => {
  const f = useCurrentFrame();
  const letters = "faceless".split("");
  const dot = animate ? settle(f, start + letters.length * 3 + 10, 60, POP) : 1;
  return (
    <div
      style={{
        fontFamily: FONT_HEAD,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.055em",
        lineHeight: 1,
        color: dark ? "#fff" : C.ink,
        display: "flex",
        alignItems: "baseline",
        whiteSpace: "pre",
      }}
    >
      {letters.map((ch, i) => {
        const p = animate ? interpolate(f, [start + i * 3, start + i * 3 + 20], [0, 1], { ...clamp, easing: QUINT_OUT }) : 1;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: Math.min(1, p * 2),
              transform: `translateY(${(1 - p) * 0.25 * size}px)`,
              filter: p < 1 ? `blur(${(1 - p) * 12}px)` : undefined,
            }}
          >
            {ch}
          </span>
        );
      })}
      <span
        style={{
          display: "inline-block",
          color: C.yellow,
          transform: `scale(${dot}) translateY(${(1 - dot) * -0.4 * size}px)`,
          transformOrigin: "50% 80%",
          textShadow: dark ? `0 0 ${size * 0.25}px rgba(255,214,10,0.55)` : undefined,
        }}
      >
        .
      </span>
    </div>
  );
};
