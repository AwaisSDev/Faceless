import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, QUINT_OUT, rise } from "../lib/motion";
import { C, FONT_BODY, FONT_HEAD, gradientText } from "../theme";

/**
 * Big animated count-up number in huge Manrope with the gradient,
 * plus a short label underneath.
 */
export const CountUp: React.FC<{
  start: number;
  to: number;
  from?: number;
  dur?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  size?: number;
  dark?: boolean;
  align?: "center" | "left";
}> = ({ start, to, from = 0, dur = 60, decimals = 0, prefix = "", suffix = "", label, size = 220, dark = false, align = "center" }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + dur], [0, 1], { ...clamp, easing: EXPO_OUT });
  const e = interpolate(f, [start, start + 20], [0, 1], { ...clamp, easing: QUINT_OUT });
  const v = from + (to - from) * p;
  const txt = v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const lp = interpolate(f, [start + 14, start + 34], [0, 1], { ...clamp, easing: QUINT_OUT });
  if (f < start) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start" }}>
      <div
        style={{
          fontFamily: FONT_HEAD,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          fontVariantNumeric: "tabular-nums",
          ...gradientText(dark),
          ...rise(e, 40, 14),
          paddingBottom: size * 0.06,
        }}
      >
        {prefix}
        {txt}
        {suffix}
      </div>
      {label && (
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 600,
            fontSize: Math.max(30, size * 0.17),
            color: dark ? "rgba(255,255,255,0.72)" : C.muted,
            letterSpacing: "-0.01em",
            ...rise(lp, 16, 8),
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
