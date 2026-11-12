import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { useFontsReady } from "../lib/fonts";
import { clamp, IN_OUT, mixColor } from "../lib/motion";
import { C, FONT_BODY } from "../theme";

/** Characters typed by `frame` at ~27 chars/s with small holds at punctuation. */
export const typedCount = (text: string, frame: number, start: number, cps = 27) => {
  let t = start;
  let n = 0;
  const per = 60 / cps;
  for (let i = 0; i < text.length; i++) {
    t += per + (/[.,:/]/.test(text[i]) ? 2.5 : 0) + (text[i] === " " ? 0.8 : 0);
    if (frame >= t) n = i + 1;
    else break;
  }
  return n;
};

export const typingEnd = (text: string, start: number, cps = 27) => {
  let t = start;
  const per = 60 / cps;
  for (let i = 0; i < text.length; i++) t += per + (/[.,:/]/.test(text[i]) ? 2.5 : 0) + (text[i] === " " ? 0.8 : 0);
  return Math.ceil(t);
};

/**
 * Rounded search/chat bar where text types in letter by letter with a cursor.
 * When the text gets wider than the bar, the "camera" whips sideways to follow
 * the cursor.
 */
export const TypingBar: React.FC<{
  text: string;
  start: number;
  placeholder?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  dark?: boolean;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  cps?: number;
  style?: React.CSSProperties;
  barBg?: string;
  textColor?: string;
  trailColor?: string;
}> = ({
  text,
  start,
  placeholder = "",
  width = 1200,
  height = 120,
  fontSize = 44,
  dark = false,
  icon,
  button,
  cps = 27,
  style,
  barBg,
  textColor,
  trailColor,
}) => {
  const f = useCurrentFrame();
  const ready = useFontsReady();
  const n = typedCount(text, f, start, cps);
  const end = typingEnd(text, start, cps);
  const ink = textColor ?? (dark ? "#fff" : C.ink);
  const trail = trailColor ?? (dark ? C.yellow : C.orange);
  const fullW = useMemo(
    () => (ready ? measureText({ text, fontFamily: FONT_BODY, fontSize, fontWeight: "500" }).width : 0),
    [ready, text, fontSize],
  );
  const typedW = ready && n > 0 ? measureText({ text: text.slice(0, n), fontFamily: FONT_BODY, fontSize, fontWeight: "500" }).width : 0;
  const leftPad = icon ? height * 0.95 : height * 0.4;
  const rightPad = button ? height * 2.6 : height * 0.4;
  const avail = width - leftPad - rightPad;
  // Whip-follow: shift text left in steps once the cursor passes 85% of the field.
  const steps = Math.max(0, Math.floor((typedW - avail * 0.85) / (avail * 0.45)) + 1);
  const stepSize = avail * 0.45;
  const crossAt = (k: number) => {
    // frame when typedW first exceeded threshold k (approximate by proportion).
    const thresholdW = avail * 0.85 + (k - 1) * stepSize;
    const charIdx = Math.min(text.length, Math.ceil((thresholdW / Math.max(1, fullW)) * text.length));
    let t = start;
    const per = 60 / cps;
    for (let i = 0; i < charIdx; i++) t += per + (/[.,:/]/.test(text[i]) ? 2.5 : 0) + (text[i] === " " ? 0.8 : 0);
    return t;
  };
  let shift = 0;
  for (let k = 1; k <= steps; k++) {
    shift += interpolate(f, [crossAt(k), crossAt(k) + 12], [0, stepSize], { ...clamp, easing: IN_OUT });
  }
  const cursorOn = f < end + 30 ? true : Math.floor((f - end) / 30) % 2 === 0;
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: height / 2,
        background: barBg ?? (dark ? "rgba(255,255,255,0.08)" : "#fff"),
        boxShadow: dark ? "inset 0 0 0 1px rgba(255,255,255,0.12)" : "0 18px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(10,10,10,0.06)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      {icon && (
        <div style={{ position: "absolute", left: height * 0.32, top: "50%", transform: "translateY(-50%)", display: "flex" }}>{icon}</div>
      )}
      <div style={{ position: "absolute", left: leftPad, width: avail, height: "100%", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: `translate(${-shift}px, -50%)`,
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize,
            whiteSpace: "pre",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
          }}
        >
          {n === 0 ? (
            <span style={{ color: dark ? "rgba(255,255,255,0.45)" : C.muted }}>{placeholder}</span>
          ) : (
            text
              .slice(0, n)
              .split("")
              .map((ch, k) => (
                <span key={k} style={{ color: mixColor(trail, ink, (n - k) / 12) }}>
                  {ch}
                </span>
              ))
          )}
          {cursorOn && (
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: fontSize * 1.1,
                marginLeft: n === 0 ? 0 : 3,
                background: dark ? "#fff" : C.ink,
                borderRadius: 2,
                position: n === 0 ? "absolute" : "relative",
                left: n === 0 ? -6 : undefined,
              }}
            />
          )}
        </div>
      </div>
      {button && (
        <div style={{ position: "absolute", right: height * 0.14, top: "50%", transform: "translateY(-50%)", display: "flex" }}>{button}</div>
      )}
    </div>
  );
};
