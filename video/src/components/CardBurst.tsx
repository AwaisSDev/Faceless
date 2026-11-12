import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { clamp } from "../lib/motion";
import { FONT_BODY, FONT_HEAD } from "../theme";

const GRADS = [
  ["#FF8A00", "#FFD60A"],
  ["#1F1F1F", "#FF8A00"],
  ["#FFB800", "#FF5E3A"],
  ["#2B2B2B", "#5A5A5A"],
  ["#FFD60A", "#FFF4B8"],
  ["#FF6A00", "#7A2E00"],
  ["#0F0F0F", "#FFB800"],
  ["#FFCF40", "#FF8A00"],
];

const TITLES = [
  "Wait for it...",
  "He did NOT expect that",
  "Nobody saw this coming",
  "This is insane",
  "Did you notice this?",
  "POV: day one",
  "Watch the end",
  "1 in a million",
  "Best moment ever",
  "He actually did it",
  "No way this worked",
  "Look at the cops",
];

const VIEWS = ["1.2M", "384K", "2.1M", "96K", "742K", "5.3M", "218K", "1.8M", "63K", "910K", "3.4M", "455K"];

/** A fake Shorts thumbnail: gradient-filled vertical card with a title + views. */
export const ShortCard: React.FC<{ i: number; w?: number; title?: string; views?: string; style?: React.CSSProperties }> = ({
  i,
  w = 300,
  title,
  views,
  style,
}) => {
  const g = GRADS[i % GRADS.length];
  const h = w * (16 / 9);
  const dark = i % 2 === 1 || i % 4 === 3;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: w * 0.07,
        background: `linear-gradient(${150 + (i * 37) % 60}deg, ${g[0]}, ${g[1]})`,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "18%",
          top: "22%",
          width: "64%",
          height: "36%",
          borderRadius: "50%",
          background: dark ? "rgba(255,214,10,0.35)" : "rgba(255,255,255,0.45)",
          filter: `blur(${w * 0.08}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: w * 0.07,
          right: w * 0.07,
          top: h * 0.38,
          fontFamily: FONT_HEAD,
          fontWeight: 800,
          fontSize: w * 0.105,
          lineHeight: 1.05,
          color: "#fff",
          textAlign: "center",
          textShadow: "0 2px 10px rgba(0,0,0,0.45)",
          letterSpacing: "-0.02em",
        }}
      >
        {title ?? TITLES[i % TITLES.length]}
      </div>
      <div
        style={{
          position: "absolute",
          left: w * 0.06,
          bottom: w * 0.06,
          display: "flex",
          alignItems: "center",
          gap: w * 0.025,
          fontFamily: FONT_BODY,
          fontWeight: 700,
          fontSize: w * 0.065,
          color: "#fff",
          textShadow: "0 1px 6px rgba(0,0,0,0.5)",
        }}
      >
        <svg width={w * 0.07} height={w * 0.07} viewBox="0 0 24 24">
          <path d="M6 4l14 8-14 8z" fill="#fff" />
        </svg>
        {views ?? VIEWS[i % VIEWS.length]} views
      </div>
    </div>
  );
};

/**
 * Burst / tunnel of Shorts thumbnails flying past the camera in 3D.
 * Cards spawn on a ring outside the frame and travel through the camera.
 */
export const CardBurst: React.FC<{
  start: number;
  count?: number;
  spawnEvery?: number;
  life?: number;
  dir?: "toward" | "away";
  cardW?: number;
}> = ({ start, count = 22, spawnEvery = 7, life = 70, dir = "toward", cardW = 300 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ perspective: 900, perspectiveOrigin: "50% 50%", overflow: "hidden" }}>
      {new Array(count).fill(0).map((_, i) => {
        const spawn = start + i * spawnEvery;
        const u = (f - spawn) / life;
        if (u < 0 || u > 1) return null;
        const ang = random(`a${i}`) * Math.PI * 2;
        const ring = 380 + random(`r${i}`) * 520;
        const zA = dir === "toward" ? -3200 : 500;
        const zB = dir === "toward" ? 700 : -3200;
        const z = interpolate(u, [0, 1], [zA, zB]);
        const x = Math.cos(ang) * ring;
        const y = Math.sin(ang) * ring * 0.62;
        const ry = (random(`y${i}`) * 2 - 1) * 35;
        const rz = (random(`z${i}`) * 2 - 1) * 14;
        const rx = (random(`x${i}`) * 2 - 1) * 10;
        const op = interpolate(u, [0, 0.12, 0.86, 1], [0, 1, 1, 0], clamp);
        // Depth of field: near-camera cards blur.
        const near = interpolate(z, [-400, 600], [0, 14], clamp);
        const far = interpolate(z, [-3200, -2000], [6, 0], clamp);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%,-50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${ry}deg) rotateZ(${rz}deg) rotateX(${rx}deg)`,
              opacity: op,
              filter: near + far > 0.3 ? `blur(${near + far}px)` : undefined,
            }}
          >
            <ShortCard i={i} w={cardW} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
