import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { useScene } from "../lib/scene";
import { C, EASE_OUT, FONT_BODY } from "../theme";

/**
 * Burned-in subtitle captions. Chunks and per-word timing come from the
 * scene's voiceover, so they re-time automatically when real audio is added.
 */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { chunks, dark } = useScene();
  const chunk = chunks.find((c) => frame >= c.start && frame < c.end);
  if (!chunk) return null;

  const t = frame - chunk.start;
  const inP = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp", easing: EASE_OUT });
  const outP = interpolate(frame, [chunk.end - 5, chunk.end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = Math.min(inP, outP);

  // Active word = last word whose start has passed (stays lit through pauses).
  let active = -1;
  chunk.words.forEach((w, i) => {
    if (frame >= w.start - 1) active = i;
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 52,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          padding: dark ? "10px 26px" : "14px 30px 16px",
          borderRadius: 26,
          background: dark ? "rgba(255,255,255,0.045)" : "rgba(14,14,14,0.80)",
          boxShadow: dark ? "none" : "0 12px 40px rgba(0,0,0,0.18)",
          border: dark ? "1px solid rgba(255,255,255,0.06)" : "none",
          backdropFilter: "blur(14px)",
          opacity,
          transform: `translateY(${(1 - inP) * 10}px)`,
          filter: `blur(${(1 - inP) * 6}px)`,
          textAlign: "center",
          fontFamily: FONT_BODY,
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.28,
          letterSpacing: -0.4,
          color: "#fff",
        }}
      >
        {chunk.words.map((w, i) => {
          const isActive = i === active;
          const lit = interpolate(frame, [w.start - 2, w.start + 3], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fade = isActive ? lit : i < active ? 0 : 0;
          return (
            <React.Fragment key={i}>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  color: dark
                    ? isActive
                      ? C.yellow
                      : "rgba(255,255,255,0.86)"
                    : isActive
                      ? C.ink
                      : "rgba(255,255,255,0.86)",
                  padding: "0 4px",
                  zIndex: 1,
                }}
              >
                {!dark && (
                  <span
                    style={{
                      position: "absolute",
                      inset: "4px -1px 2px",
                      borderRadius: 9,
                      background: C.yellow,
                      opacity: fade,
                      transform: `scaleX(${0.7 + 0.3 * fade})`,
                      zIndex: -1,
                    }}
                  />
                )}
                {w.text}
              </span>{" "}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
