import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { useFontsReady } from "../lib/fonts";
import { clamp, EXPO_OUT, mixColor, QUINT_OUT } from "../lib/motion";
import { C, FONT_HEAD, gradientText } from "../theme";

export type KineticProps = {
  /** Words separated by spaces. Wrap the keyword in *asterisks* for the gradient. */
  text: string;
  /** Frame (scene-relative) where the first word starts. */
  start: number;
  /** Explicit start frame per word (overrides start + stagger), e.g. synced to voice cues. */
  wordStarts?: number[];
  size?: number;
  weight?: number;
  font?: string;
  stagger?: number;
  /** Extra frames before the last (punch) word. */
  punchGap?: number;
  /** Live layout reflow: the line stays centred and existing words slide as new ones join. */
  reflow?: boolean;
  align?: "center" | "left";
  dark?: boolean;
  /** Frame where the whole line blur-dissolves out (slides up + blurs). */
  exitAt?: number;
  exitDur?: number;
  /** Keep words this colour instead of ink (e.g. muted subtitles). */
  color?: string;
  /** Skip the warm colour sweep (subtitles). */
  noSweep?: boolean;
  maxWidth?: number;
  letterSpacing?: number;
  style?: React.CSSProperties;
  /** Rise distance in px (default 36). */
  riseDist?: number;
};

type Tok = { text: string; key: boolean };

/** Split into words; *wrapped spans* (one or more words) become keywords. */
const parse = (text: string): Tok[] => {
  let inKey = false;
  return text
    .split(" ")
    .filter(Boolean)
    .map((w) => {
      const opens = w.startsWith("*");
      const closes = /\*[.,!?:;]*$/.test(w) && (w.length > 1 || !opens);
      const key = inKey || opens;
      if (opens) inKey = true;
      if (closes) inKey = false;
      return { text: w.replace(/\*/g, ""), key };
    });
};

export const Kinetic: React.FC<KineticProps> = ({
  text,
  start,
  wordStarts,
  size = 120,
  weight = 800,
  font = FONT_HEAD,
  stagger = 11,
  punchGap = 6,
  reflow = false,
  align = "center",
  dark = false,
  exitAt,
  exitDur = 16,
  color,
  noSweep = false,
  maxWidth = 1680,
  letterSpacing = -0.035,
  style,
  riseDist = 36,
}) => {
  const frame = useCurrentFrame();
  const ready = useFontsReady();
  const toks = useMemo(() => parse(text), [text]);

  const { widths, space, fontSize } = useMemo(() => {
    if (!ready) return { widths: toks.map(() => 0), space: 0, fontSize: size };
    const m = (t: string, fs: number) =>
      measureText({ text: t, fontFamily: font, fontSize: fs, fontWeight: String(weight), letterSpacing: `${letterSpacing}em` }).width;
    let fs = size;
    let ws = toks.map((t) => m(t.text, fs));
    let sp = fs * 0.26;
    const total = ws.reduce((a, b) => a + b, 0) + sp * (toks.length - 1);
    if (total > maxWidth) {
      fs = (size * maxWidth) / total;
      ws = toks.map((t) => m(t.text, fs));
      sp = fs * 0.26;
    }
    return { widths: ws, space: sp, fontSize: fs };
  }, [ready, toks, size, font, weight, maxWidth, letterSpacing]);

  if (!ready) return null;

  const starts = toks.map((_, i) => {
    if (wordStarts && wordStarts[i] !== undefined) return wordStarts[i];
    return start + i * stagger + (i === toks.length - 1 && toks.length > 1 ? punchGap : 0);
  });

  // Layout weight of each word (reflow grows it in with expo-out over 30 frames).
  const lw = toks.map((_, i) =>
    reflow ? interpolate(frame, [starts[i], starts[i] + 30], [0, 1], { ...clamp, easing: EXPO_OUT }) : 1,
  );
  const lineW = toks.reduce((acc, _, i) => acc + (widths[i] + (i > 0 ? space : 0)) * lw[i], 0);
  const fullW = widths.reduce((a, b) => a + b, 0) + space * (toks.length - 1);
  const originX = align === "center" ? -(reflow ? lineW : fullW) / 2 : 0;

  const ex = exitAt !== undefined ? interpolate(frame, [exitAt, exitAt + exitDur], [0, 1], { ...clamp, easing: QUINT_OUT }) : 0;

  const inkTo = color ?? (dark ? "#FFFFFF" : C.ink);
  const sweepFrom = dark ? C.yellow : C.orange;

  let cursor = originX;
  return (
    <div
      style={{
        position: "relative",
        height: fontSize * 1.18,
        width: "100%",
        opacity: 1 - ex,
        transform: `translateY(${-ex * 28}px)`,
        filter: ex > 0 ? `blur(${ex * 16}px)` : undefined,
        ...style,
      }}
    >
      {toks.map((t, i) => {
        const x = cursor + (i > 0 ? space * lw[i] : 0);
        cursor = x + widths[i] * lw[i];
        const local = frame - starts[i];
        const p = interpolate(local, [0, 18], [0, 1], { ...clamp, easing: QUINT_OUT });
        if (local < 0) return null;
        const gap = reflow ? (1 - interpolate(local, [0, 10], [0, 1], { ...clamp, easing: QUINT_OUT })) * 36 : 0;
        const op = interpolate(local, [0, 8], [0, 1], clamp);
        const blur = (1 - p) * 10;
        const sweep = interpolate(local, [6, 36], [0, t.text.length + 4], clamp);
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: align === "center" ? `calc(50% + ${x + gap}px)` : x + gap,
              top: 0,
              fontFamily: font,
              fontWeight: weight,
              fontSize,
              letterSpacing: `${letterSpacing}em`,
              lineHeight: 1.12,
              whiteSpace: "pre",
              opacity: op,
              transform: `translateY(${(1 - p) * riseDist}px) scale(${1.08 - 0.08 * p})`,
              transformOrigin: "left bottom",
              filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
            }}
          >
            {t.key ? (
              <span
                style={{
                  ...gradientText(dark),
                  backgroundSize: "200% 100%",
                  backgroundPosition: `${50 + 50 * Math.sin(frame / 48)}% 0`,
                  paddingRight: "0.04em",
                }}
              >
                {t.text}
              </span>
            ) : noSweep ? (
              <span style={{ color: inkTo }}>{t.text}</span>
            ) : (
              t.text.split("").map((ch, k) => (
                <span key={k} style={{ color: mixColor(sweepFrom, inkTo, (sweep - k) / 4) }}>
                  {ch}
                </span>
              ))
            )}
          </span>
        );
      })}
    </div>
  );
};

/** Centred block of stacked kinetic lines, e.g. a headline + subtitle. */
export const KineticStack: React.FC<{ children: React.ReactNode; gap?: number; style?: React.CSSProperties }> = ({
  children,
  gap = 8,
  style,
}) => <div style={{ display: "flex", flexDirection: "column", gap, width: "100%", ...style }}>{children}</div>;
