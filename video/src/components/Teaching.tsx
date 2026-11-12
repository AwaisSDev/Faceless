import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, mix, QUINT_OUT, settle } from "../lib/motion";
import { C, FONT_BODY, FONT_HEAD, gradientText } from "../theme";
import { Kinetic } from "./KineticText";

/** Calm teaching layout: headline at the top, bullets blurring in on cue. */
export const BulletList: React.FC<{
  items: { text: string; at: number; sub?: string }[];
  size?: number;
  dark?: boolean;
  numbered?: boolean;
  check?: boolean;
  gap?: number;
  width?: number;
}> = ({ items, size = 46, dark = false, numbered = false, check = false, gap = 26, width = 1300 }) => {
  const f = useCurrentFrame();
  const activeIdx = items.reduce((a, it, i) => (f >= it.at ? i : a), -1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, width }}>
      {items.map((it, i) => {
        const p = settle(f, it.at);
        if (f < it.at) return null;
        const active = i === activeIdx;
        const tick = interpolate(f, [it.at + 8, it.at + 26], [0, 1], { ...clamp, easing: QUINT_OUT });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: size * 0.6,
              opacity: Math.min(1, p * 2) * (active || activeIdx < 0 ? 1 : 0.55),
              transform: `translateY(${(1 - p) * 26}px)`,
              filter: p < 0.99 ? `blur(${(1 - p) * 10}px)` : undefined,
            }}
          >
            <div
              style={{
                flex: "0 0 auto",
                width: size * 1.25,
                height: size * 1.25,
                borderRadius: size * 0.36,
                background: check ? (dark ? "rgba(255,214,10,0.14)" : "#FFF4C2") : dark ? "rgba(255,255,255,0.08)" : "#fff",
                boxShadow: dark ? "inset 0 0 0 1px rgba(255,255,255,0.1)" : "0 8px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT_HEAD,
                fontWeight: 800,
                fontSize: size * 0.62,
                color: dark ? C.yellow : C.orange,
              }}
            >
              {check ? (
                <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24">
                  <path
                    d="M4 12.5l5 5L20 6.5"
                    fill="none"
                    stroke={dark ? C.yellow : C.orange}
                    strokeWidth={3.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={30}
                    strokeDashoffset={30 * (1 - tick)}
                  />
                </svg>
              ) : numbered ? (
                i + 1
              ) : (
                <div style={{ width: size * 0.28, height: size * 0.28, borderRadius: "50%", background: dark ? C.yellow : C.orange }} />
              )}
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 600,
                  fontSize: size,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.18,
                  color: dark ? "#fff" : C.ink,
                }}
              >
                {it.text}
              </div>
              {it.sub && (
                <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: size * 0.62, color: dark ? "rgba(255,255,255,0.6)" : C.muted, marginTop: 4 }}>
                  {it.sub}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Section headline used in teaching layouts (top of frame). */
export const Headline: React.FC<{ text: string; at: number; size?: number; dark?: boolean; kicker?: string; align?: "center" | "left"; maxWidth?: number }> = ({
  text,
  at,
  size = 84,
  dark = false,
  kicker,
  align = "center",
  maxWidth = 1680,
}) => {
  const f = useCurrentFrame();
  const kp = interpolate(f, [at - 6, at + 14], [0, 1], { ...clamp, easing: QUINT_OUT });
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start" }}>
      {kicker && (
        <div
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: dark ? C.yellow : C.orange,
            marginBottom: 14,
            opacity: kp,
            filter: kp < 1 ? `blur(${(1 - kp) * 8}px)` : undefined,
            transform: `translateY(${(1 - kp) * 12}px)`,
          }}
        >
          {kicker}
        </div>
      )}
      <Kinetic text={text} start={at} size={size} dark={dark} align={align} reflow={align === "center"} maxWidth={maxWidth} />
    </div>
  );
};

/** Highlight ring that moves between target rectangles (springy, no overshoot). */
export const HighlightRing: React.FC<{
  targets: { at: number; x: number; y: number; w: number; h: number; r?: number }[];
  color?: string;
  until?: number;
}> = ({ targets, color = C.yellow, until }) => {
  const f = useCurrentFrame();
  if (f < targets[0].at) return null;
  if (until !== undefined && f > until + 14) return null;
  let cur = targets[0];
  let prev = targets[0];
  let idx = 0;
  targets.forEach((t, i) => {
    if (f >= t.at) {
      idx = i;
      cur = t;
      prev = targets[Math.max(0, i - 1)];
    }
  });
  const p = idx === 0 ? 1 : interpolate(f, [cur.at, cur.at + 26], [0, 1], { ...clamp, easing: EXPO_OUT });
  const appear = settle(f, targets[0].at);
  const fadeOut = until !== undefined ? interpolate(f, [until, until + 14], [1, 0], clamp) : 1;
  const x = mix(prev.x, cur.x, p);
  const y = mix(prev.y, cur.y, p);
  const w = mix(prev.w, cur.w, p);
  const h = mix(prev.h, cur.h, p);
  const pulse = 1 + 0.015 * Math.sin(f / 9);
  const pad = 10;
  return (
    <div
      style={{
        position: "absolute",
        left: x - pad,
        top: y - pad,
        width: w + pad * 2,
        height: h + pad * 2,
        borderRadius: (cur.r ?? 18) + pad,
        border: `5px solid ${color}`,
        boxShadow: `0 0 0 8px ${color}33, 0 0 40px ${color}88`,
        transform: `scale(${(0.9 + 0.1 * appear) * pulse})`,
        opacity: appear * fadeOut,
        pointerEvents: "none",
        zIndex: 40,
      }}
    />
  );
};

/** macOS-style pointer that glides between points and clicks. */
export const Cursor: React.FC<{
  path: { at: number; x: number; y: number; click?: boolean }[];
  scale?: number;
  until?: number;
}> = ({ path, scale = 1.4, until }) => {
  const f = useCurrentFrame();
  if (f < path[0].at - 10) return null;
  if (until !== undefined && f > until) return null;
  let i = 0;
  path.forEach((p, k) => {
    if (f >= p.at) i = k;
  });
  const a = path[i];
  const b = path[Math.min(i + 1, path.length - 1)];
  const moveStart = a.at + (a.click ? 14 : 4);
  const moveEnd = b.at;
  const t = b === a || moveEnd <= moveStart ? 1 : interpolate(f, [moveStart, moveEnd], [0, 1], { ...clamp, easing: EXPO_OUT });
  const x = mix(a.x, b.x, t);
  const y = mix(a.y, b.y, t);
  const clickT = a.click ? f - a.at : 999;
  const press = clickT >= 0 && clickT < 10 ? 0.86 : 1;
  const appear = interpolate(f, [path[0].at - 10, path[0].at], [0, 1], clamp);
  return (
    <>
      {a.click && clickT >= 0 && clickT < 26 && (
        <div
          style={{
            position: "absolute",
            left: a.x,
            top: a.y,
            width: 20 + clickT * 3.4,
            height: 20 + clickT * 3.4,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            border: `4px solid ${C.yellow}`,
            opacity: 1 - clickT / 26,
            zIndex: 60,
          }}
        />
      )}
      <svg
        width={28 * scale}
        height={40 * scale}
        viewBox="0 0 28 40"
        style={{ position: "absolute", left: x - 4, top: y - 2, transform: `scale(${press})`, transformOrigin: "4px 2px", opacity: appear, zIndex: 61, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))" }}
      >
        <path d="M3 2 L3 32 L10.5 25 L15.5 37 L21 34.5 L16 23 L26 23 Z" fill="#0A0A0A" stroke="#fff" strokeWidth={2.4} strokeLinejoin="round" />
      </svg>
    </>
  );
};

/** Keyword chip / tag. */
export const Chip: React.FC<{ children: React.ReactNode; dark?: boolean; style?: React.CSSProperties; tone?: "yellow" | "plain" | "red" | "green" }> = ({
  children,
  dark,
  style,
  tone = "plain",
}) => {
  const bg =
    tone === "yellow" ? C.yellow : tone === "red" ? "#FFE4E1" : tone === "green" ? "#E3F7E8" : dark ? "rgba(255,255,255,0.08)" : "#fff";
  const fg = tone === "yellow" ? C.ink : tone === "red" ? "#C2261B" : tone === "green" ? "#1A7F3C" : dark ? "#fff" : C.ink;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 22px",
        borderRadius: 999,
        background: bg,
        color: fg,
        fontFamily: FONT_BODY,
        fontWeight: 600,
        fontSize: 30,
        boxShadow: tone === "plain" && !dark ? "0 6px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const GradText: React.FC<{ children: React.ReactNode; dark?: boolean; style?: React.CSSProperties }> = ({ children, dark, style }) => (
  <span style={{ ...gradientText(!!dark), ...style }}>{children}</span>
);

/** Animated arrow/connector line between two points (draws on). */
export const Connector: React.FC<{ x1: number; y1: number; x2: number; y2: number; at: number; dur?: number; color?: string; dashed?: boolean; width?: number }> = ({
  x1,
  y1,
  x2,
  y2,
  at,
  dur = 24,
  color = C.ink,
  dashed = false,
  width = 4,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + dur], [0, 1], { ...clamp, easing: EXPO_OUT });
  if (f < at) return null;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <div
      style={{
        position: "absolute",
        left: x1,
        top: y1 - width / 2,
        width: len * p,
        height: width,
        transform: `rotate(${ang}deg)`,
        transformOrigin: "0 50%",
        background: dashed ? `repeating-linear-gradient(90deg, ${color} 0 14px, transparent 14px 26px)` : color,
        borderRadius: width,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -2,
          top: "50%",
          width: 0,
          height: 0,
          transform: "translateY(-50%)",
          borderLeft: `${width * 4}px solid ${color}`,
          borderTop: `${width * 2.6}px solid transparent`,
          borderBottom: `${width * 2.6}px solid transparent`,
          opacity: p > 0.6 ? 1 : 0,
        }}
      />
    </div>
  );
};
