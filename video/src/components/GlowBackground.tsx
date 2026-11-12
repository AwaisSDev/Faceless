import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme";

type Glow = { x: number; y: number; r: number; color: string; o: number };

/**
 * Off-white (light) or near-black (dark) base with very blurred yellow/orange
 * glows bleeding in from the edges and corners. Glows drift slowly so the frame
 * is never dead.
 */
export const GlowBackground: React.FC<{ dark?: boolean; intensity?: number; variant?: number }> = ({
  dark = false,
  intensity = 1,
  variant = 0,
}) => {
  const f = useCurrentFrame();
  const glows: Glow[] = dark
    ? [
        { x: 50, y: 118, r: 900, color: "rgba(255,190,10,0.55)", o: 1 },
        { x: -6, y: -8, r: 620, color: "rgba(255,138,0,0.28)", o: 1 },
        { x: 106, y: 8, r: 560, color: "rgba(255,214,10,0.20)", o: 1 },
      ]
    : [
        { x: 104, y: -10, r: 720, color: "rgba(255,214,10,0.42)", o: 1 },
        { x: -8, y: 108, r: 760, color: "rgba(255,138,0,0.26)", o: 1 },
        { x: 100, y: 112, r: 520, color: "rgba(255,184,0,0.18)", o: 1 },
      ];
  const rot = variant * 1.7;
  return (
    <AbsoluteFill style={{ background: dark ? C.bgDark : C.bg, overflow: "hidden" }}>
      {glows.map((g, i) => {
        const dx = 2.2 * Math.sin(f / (220 + i * 40) + i * 2 + rot);
        const dy = 1.8 * Math.cos(f / (260 + i * 30) + i + rot);
        const pulse = 1 + 0.06 * Math.sin(f / 150 + i * 1.3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${g.x + dx}%`,
              top: `${g.y + dy}%`,
              width: g.r * 2 * pulse,
              height: g.r * 1.5 * pulse,
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background: `radial-gradient(closest-side, ${g.color}, transparent)`,
              opacity: g.o * intensity,
              filter: "blur(40px)",
            }}
          />
        );
      })}
      {dark && (
        <AbsoluteFill
          style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
        />
      )}
    </AbsoluteFill>
  );
};
