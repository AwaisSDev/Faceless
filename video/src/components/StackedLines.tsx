import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, mix } from "../lib/motion";
import { C, FONT_HEAD } from "../theme";
import { Kinetic } from "./KineticText";
import { measureText } from "@remotion/layout-utils";
import { useFontsReady } from "../lib/fonts";

export type StackLine = { text: string; at: number };

/**
 * Stacked-lines finale: lines stack one under another; when a new line lands
 * the older lines fade to gray and the stack shifts up. The newest line has a
 * coloured keyword (wrap in *asterisks*) with small yellow dots on each side.
 */
export const StackedLines: React.FC<{
  lines: StackLine[];
  size?: number;
  dark?: boolean;
  pitch?: number;
  /** Keep the stack centred on the newest line (true) or on the whole block. */
  followNewest?: boolean;
  width?: number;
}> = ({ lines, size = 88, dark = false, pitch, followNewest = false, width = 1600 }) => {
  const f = useCurrentFrame();
  const ready = useFontsReady();
  const P = pitch ?? Math.round(size * 1.34);
  // Number of lines that have arrived, with smooth shift (8-frame expo-out).
  const arrived = lines.reduce(
    (acc, L, j) => (j === 0 ? acc : acc + interpolate(f, [L.at, L.at + 14], [0, 1], { ...clamp, easing: EXPO_OUT })),
    0,
  );
  const activeIdx = lines.reduce((acc, L, j) => (f >= L.at ? j : acc), 0);
  const shiftY = followNewest ? -arrived * P : -(arrived * P) / 2;

  // Dots follow the newest line.
  const newest = lines[activeIdx];
  const dotP = interpolate(f, [newest.at, newest.at + 18], [0, 1], { ...clamp, easing: EXPO_OUT });
  const dotFromY = activeIdx > 0 ? (activeIdx - 1) * P : 0;
  const dotY = mix(dotFromY, activeIdx * P, dotP);
  const moving = activeIdx > 0 && dotP < 1;
  const textW = ready
    ? Math.min(width, measureText({ text: newest.text.replace(/\*/g, ""), fontFamily: FONT_HEAD, fontSize: size, fontWeight: "800", letterSpacing: "-0.035em" }).width)
    : 0;
  const dotsIn = interpolate(f, [lines[0].at + 10, lines[0].at + 28], [0, 1], { ...clamp, easing: EXPO_OUT });

  return (
    <div style={{ position: "relative", width: "100%", height: 0, transform: `translateY(${shiftY}px)` }}>
      {lines.map((L, j) => {
        if (f < L.at) return null;
        const dim = j < activeIdx ? interpolate(f, [lines[j + 1].at, lines[j + 1].at + 12], [0, 1], clamp) : 0;
        return (
          <div
            key={j}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: j * P - size * 0.6,
              opacity: 1 - dim * 0.58,
              filter: dim > 0 ? `grayscale(${dim})` : undefined,
            }}
          >
            <Kinetic text={L.text} start={L.at} size={size} dark={dark} riseDist={16} maxWidth={width} />
          </div>
        );
      })}
      {[-1, 1].map((side) => (
        <div
          key={side}
          style={{
            position: "absolute",
            left: `calc(50% + ${side * (textW / 2 + 54)}px)`,
            top: dotY - size * 0.6 + size * 0.62,
            width: 22 * (moving ? 1 + 2.4 * Math.sin(dotP * Math.PI) : 1),
            height: 22,
            borderRadius: 11,
            transform: `translate(-50%,-50%) scale(${dotsIn})`,
            background: `radial-gradient(circle at 35% 30%, #FFF6B0, ${C.yellow} 45%, ${C.amber})`,
            boxShadow: `0 0 24px rgba(255,214,10,0.7)`,
            filter: moving ? "blur(1.5px)" : undefined,
            fontFamily: FONT_HEAD,
          }}
        />
      ))}
    </div>
  );
};
