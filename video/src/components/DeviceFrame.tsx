import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, QUINT_OUT, settle } from "../lib/motion";
import { C, FONT_BODY } from "../theme";

/** Simple CSS phone (no photo). Screen content goes in children (9:19.5). */
export const Phone: React.FC<{ w?: number; children?: React.ReactNode; style?: React.CSSProperties; light?: boolean }> = ({
  w = 400,
  children,
  style,
  light = false,
}) => {
  const h = w * 2.06;
  const bez = w * 0.035;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: w * 0.16,
        background: light ? "linear-gradient(145deg,#F2F2F2,#D9D9D9)" : "linear-gradient(145deg,#2A2A2A,#0B0B0B)",
        padding: bez,
        boxSizing: "border-box",
        boxShadow: "0 40px 100px rgba(0,0,0,0.28), 0 0 0 2px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.12)",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: w * 0.13,
          overflow: "hidden",
          position: "relative",
          background: "#000",
        }}
      >
        {children}
        <div
          style={{
            position: "absolute",
            top: w * 0.03,
            left: "50%",
            width: w * 0.3,
            height: w * 0.085,
            transform: "translateX(-50%)",
            borderRadius: w * 0.05,
            background: "#000",
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
};

/** Simple CSS laptop (no photo). Screen content goes in children (16:10). */
export const Laptop: React.FC<{ w?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({ w = 1300, children, style }) => {
  const sh = w * 0.625;
  return (
    <div style={{ width: w, position: "relative", ...style }}>
      <div
        style={{
          width: w,
          height: sh,
          borderRadius: w * 0.025,
          background: "#0E0E0E",
          padding: w * 0.016,
          boxSizing: "border-box",
          boxShadow: "0 40px 120px rgba(0,0,0,0.25), inset 0 0 0 2px rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: w * 0.008, overflow: "hidden", position: "relative", background: "#fff" }}>
          {children}
        </div>
      </div>
      <div
        style={{
          width: w * 1.14,
          marginLeft: -w * 0.07,
          height: w * 0.028,
          borderRadius: `0 0 ${w * 0.03}px ${w * 0.03}px`,
          background: "linear-gradient(180deg,#D8D8D8,#A9A9A9)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: w * 0.16,
            height: w * 0.01,
            transform: "translateX(-50%)",
            borderRadius: `0 0 ${w * 0.01}px ${w * 0.01}px`,
            background: "#9A9A9A",
          }}
        />
      </div>
    </div>
  );
};

/** Frosted floating caption pill under a device, e.g. "Posting 24/7". */
export const CaptionPill: React.FC<{ text: string; at: number; size?: number; style?: React.CSSProperties }> = ({ text, at, size = 46, style }) => {
  const f = useCurrentFrame();
  const p = settle(f, at);
  if (f < at) return null;
  const words = text.split(" ");
  return (
    <div
      style={{
        display: "inline-flex",
        gap: size * 0.28,
        padding: `${size * 0.42}px ${size * 0.9}px`,
        borderRadius: 999,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)",
        boxShadow:
          "inset 0 -14px 24px rgba(0,0,0,0.07), inset 0 4px 10px rgba(255,255,255,0.9), 0 18px 50px rgba(0,0,0,0.12)",
        fontFamily: FONT_BODY,
        fontWeight: 600,
        fontSize: size,
        letterSpacing: "-0.02em",
        color: C.ink,
        transform: `scale(${0.94 + 0.06 * p})`,
        opacity: Math.min(1, p * 2),
        ...style,
      }}
    >
      {words.map((w, i) => {
        const q = interpolate(f, [at + 6 + i * 10, at + 24 + i * 10], [0, 1], { ...clamp, easing: QUINT_OUT });
        return (
          <span key={i} style={{ opacity: q, filter: q < 1 ? `blur(${(1 - q) * 8}px)` : undefined, transform: `translateY(${(1 - q) * 14}px)`, display: "inline-block" }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Gradient stage behind device mockups. */
export const GradientStage: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 60,
        borderRadius: 48,
        background: `radial-gradient(120% 90% at ${30 + 8 * Math.sin(f / 200)}% 0%, #FFE680 0%, #FFC94A 35%, #FF9D2E 70%, #FF8A00 100%)`,
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
