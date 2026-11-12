import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { clamp, drift, EXPO_IN, EXPO_OUT, IN_OUT, QUINT_OUT } from "../lib/motion";

/**
 * Whole-scene camera: ambient drift + optional pull-back after a headline lands.
 * Wrap a scene's content in this so everything moves together.
 */
export const Camera: React.FC<{
  children: React.ReactNode;
  /** Frame where a settle pull-back starts (scale 1 -> pullTo over 36 frames). */
  pullAt?: number;
  pullTo?: number;
  pullDur?: number;
  /** Initial scale (e.g. start slightly zoomed in). */
  from?: number;
  driftAmount?: number;
  seed?: number;
  origin?: string;
  style?: React.CSSProperties;
}> = ({ children, pullAt, pullTo = 0.72, pullDur = 40, from = 1, driftAmount = 1, seed = 1, origin = "50% 50%", style }) => {
  const f = useCurrentFrame();
  const d = drift(f, seed, driftAmount);
  const pull = pullAt !== undefined ? interpolate(f, [pullAt, pullAt + pullDur], [from, pullTo], { ...clamp, easing: EXPO_OUT }) : from;
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${d.x}px, ${d.y}px) scale(${pull * d.scale})`,
        transformOrigin: origin,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/**
 * Scene enter/exit: outgoing content slides up and blurs out, incoming
 * content blurs in. Applied to every scene automatically (~14 frames).
 */
export const SceneDissolve: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  inFrames?: number;
  outFrames?: number;
  /** "whip" exits with a fast push-in + zoom blur instead of the default dissolve. */
  exit?: "dissolve" | "push" | "none";
  enter?: "dissolve" | "pull" | "none";
}> = ({ children, durationInFrames, inFrames = 14, outFrames = 14, exit = "dissolve", enter = "dissolve" }) => {
  const f = useCurrentFrame();
  const pin = enter === "none" ? 1 : interpolate(f, [0, inFrames], [0, 1], { ...clamp, easing: QUINT_OUT });
  const pout = exit === "none" ? 0 : interpolate(f, [durationInFrames - outFrames, durationInFrames], [0, 1], { ...clamp, easing: EXPO_IN });
  let transform = "";
  let blur = 0;
  let opacity = 1;
  if (enter === "pull") {
    transform += ` scale(${1.18 - 0.18 * pin})`;
    blur += (1 - pin) * 18;
    opacity *= Math.min(1, pin * 1.6);
  } else {
    transform += ` translateY(${(1 - pin) * 26}px)`;
    blur += (1 - pin) * 12;
    opacity *= Math.min(1, pin * 1.6);
  }
  if (exit === "push") {
    transform += ` scale(${1 + pout * pout * 1.6})`;
    blur += pout * 26;
    opacity *= 1 - pout;
  } else {
    transform += ` translateY(${-pout * 30}px)`;
    blur += pout * 22;
    opacity *= 1 - pout;
  }
  return (
    <AbsoluteFill style={{ transform, filter: blur > 0.1 ? `blur(${blur}px)` : undefined, opacity }}>{children}</AbsoluteFill>
  );
};

/**
 * 3D camera dive: perspective camera tilts (rotateX/rotateY) and dives toward a
 * target, then settles. Optional heavy motion blur ONLY during the fast part.
 */
export const CameraDive3D: React.FC<{
  children: React.ReactNode;
  start: number;
  dur?: number;
  fromRotateX?: number;
  fromRotateY?: number;
  fromRotateZ?: number;
  fromZ?: number;
  fromX?: number;
  fromY?: number;
  perspective?: number;
  /** Render CameraMotionBlur while the move is fast (expensive). */
  motionBlur?: boolean;
  blurFrames?: number;
}> = ({
  children,
  start,
  dur = 90,
  fromRotateX = 62,
  fromRotateY = 0,
  fromRotateZ = -24,
  fromZ = -900,
  fromX = 900,
  fromY = 500,
  perspective = 1100,
  motionBlur = false,
  blurFrames = 26,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + dur], [0, 1], { ...clamp, easing: EXPO_OUT });
  const py = interpolate(f, [start, start + dur * 0.3], [0, 1], { ...clamp, easing: QUINT_OUT });
  const inner = (
    <AbsoluteFill style={{ perspective, perspectiveOrigin: "50% 45%" }}>
      <AbsoluteFill
        style={{
          transformStyle: "preserve-3d",
          transform: `translate3d(${(1 - p) * fromX}px, ${(1 - py) * fromY}px, ${(1 - p) * fromZ}px) rotateX(${(1 - p) * fromRotateX}deg) rotateY(${(1 - p) * fromRotateY}deg) rotateZ(${(1 - p) * fromRotateZ}deg)`,
          opacity: Math.min(1, interpolate(f, [start, start + 8], [0, 1], clamp)),
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
  const fast = motionBlur && f >= start && f < start + blurFrames;
  return fast ? (
    <CameraMotionBlur samples={6} shutterAngle={200}>
      {inner}
    </CameraMotionBlur>
  ) : (
    inner
  );
};

/** Horizontal whip pan helper: returns x offset for a whip from a to b. */
export const whip = (frame: number, at: number, from: number, to: number, dur = 12) =>
  interpolate(frame, [at, at + dur], [from, to], { ...clamp, easing: IN_OUT });
