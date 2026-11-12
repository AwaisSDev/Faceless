import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, mix } from "../lib/motion";
import { C, FONT_BODY, FONT_HEAD } from "../theme";
import { Icon } from "../mockups/icons";

export type Focus = { at: number; x: number; y: number; z: number };

/**
 * Camera inside a UI: children are laid out in "content" coordinates at
 * (originX, originY). Each focus target pans + zooms so content point (x, y)
 * lands on the screen point `screen` at zoom z (expo-out, 42 frames).
 * A focus with z = 1 and x/y = null-ish returns to the overview.
 */
export const FocusCamera: React.FC<{
  children: React.ReactNode;
  focuses: Focus[];
  originX: number;
  originY: number;
  screen?: { x: number; y: number };
  dur?: number;
}> = ({ children, focuses, originX, originY, screen = { x: 960, y: 470 }, dur = 42 }) => {
  const f = useCurrentFrame();
  const cam = (fc: Focus | null) => {
    if (!fc || fc.z === 1) return { tx: 0, ty: 0, z: 1 };
    return { tx: screen.x - fc.z * (originX + fc.x), ty: screen.y - fc.z * (originY + fc.y), z: fc.z };
  };
  let cur = cam(null);
  focuses.forEach((fc, i) => {
    if (f < fc.at) return;
    const prev = cam(i === 0 ? null : focuses[i - 1]);
    const next = cam(fc);
    const p = interpolate(f, [fc.at, fc.at + dur], [0, 1], { ...clamp, easing: EXPO_OUT });
    cur = { tx: mix(prev.tx, next.tx, p), ty: mix(prev.ty, next.ty, p), z: mix(prev.z, next.z, p) };
  });
  return (
    <AbsoluteFill style={{ transform: `translate(${cur.tx}px, ${cur.ty}px) scale(${cur.z})`, transformOrigin: "0 0" }}>
      <div style={{ position: "absolute", left: originX, top: originY }}>{children}</div>
    </AbsoluteFill>
  );
};

/** Full-screen placeholder for an optional real screen recording. */
export const SlotCard: React.FC<{ text: string; flag: string }> = ({ text, flag }) => {
  const f = useCurrentFrame();
  const blink = Math.floor(f / 30) % 2 === 0;
  const p = interpolate(f, [0, 20], [0, 1], { ...clamp, easing: EXPO_OUT });
  return (
    <AbsoluteFill style={{ background: "#0B0B0B", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 1500,
          height: 760,
          borderRadius: 40,
          border: "4px dashed rgba(255,214,10,0.55)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          transform: `scale(${0.96 + 0.04 * p})`,
          opacity: p,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: FONT_BODY, fontWeight: 800, fontSize: 40, letterSpacing: "0.18em", color: "#fff" }}>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#EF4444", opacity: blink ? 1 : 0.25, boxShadow: "0 0 20px rgba(239,68,68,0.8)" }} />
          SCREEN RECORDING
        </div>
        <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 64, lineHeight: 1.15, color: C.yellow, textAlign: "center", maxWidth: 1260, letterSpacing: "-0.03em" }}>{text}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 26, color: "rgba(255,255,255,0.5)" }}>
          <Icon name="film" size={26} color="rgba(255,255,255,0.5)" /> Optional slot, 10 to 20 s. Remove it with SLOTS.{flag} = false in src/videos/video2/scenes.ts
        </div>
      </div>
    </AbsoluteFill>
  );
};
