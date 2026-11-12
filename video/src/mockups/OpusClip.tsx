import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, QUINT_OUT, settle } from "../lib/motion";
import { TypingBar } from "../components/TypingBar";
import { FakeFrame } from "./FakeFrame";
import { Icon, OpusClipLogo } from "./icons";

const INTER = "Inter, Arial, sans-serif";
const LIME = "#D2EA78";

/** Score badge exactly like OpusClip's: dark rounded square, "SCORE" label, lime number. */
export const ScoreBadge: React.FC<{ score: number; size?: number }> = ({ score, size = 1 }) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${4 * size}px ${8 * size}px ${5 * size}px`,
      borderRadius: 8 * size,
      background: "rgba(40,48,52,0.92)",
      fontFamily: INTER,
      lineHeight: 1,
    }}
  >
    <span style={{ fontSize: 8 * size, color: "#9AA4A8", fontWeight: 600, letterSpacing: "0.04em" }}>SCORE</span>
    <span style={{ fontSize: 20 * size, color: LIME, fontWeight: 700, marginTop: 2 * size }}>{score}</span>
  </div>
);

/** Top bar of the OpusClip web app. */
const TopBar: React.FC<{ credits?: number }> = ({ credits = 150 }) => (
  <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 28px", gap: 26, borderBottom: "1px solid #1C1C1C" }}>
    <OpusClipLogo h={30} />
    <div style={{ display: "flex", gap: 22, fontSize: 15, color: "#9A9A9A", fontWeight: 500 }}>
      <span style={{ color: "#fff" }}>Home</span>
      <span>Brand templates</span>
      <span>Calendar</span>
    </div>
    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#1B1C1E", borderRadius: 999, padding: "8px 14px", fontSize: 14, color: "#fff", fontWeight: 600 }}>
        <Icon name="sparkles" size={16} color={LIME} /> {credits} credits
      </div>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#FFD60A,#FF8A00)" }} />
    </div>
  </div>
);

export type OpusStage = "home" | "settings" | "processing" | "results";

/**
 * OpusClip web app (dark): link bar, clip settings, processing, results list
 * with SCORE badges. `stage` + frames drive it from the scene.
 */
export const OpusClipApp: React.FC<{
  width?: number;
  height?: number;
  link: string;
  typeAt: number;
  lengthAt: number;
  ratioAt: number;
  getAt: number;
  resultsAt: number;
  credits?: number;
}> = ({ width = 1500, height = 860, link, typeAt, lengthAt, ratioAt, getAt, resultsAt, credits = 150 }) => {
  const f = useCurrentFrame();
  const proc = interpolate(f, [getAt + 10, resultsAt - 10], [0, 1], clamp);
  const showResults = f >= resultsAt;
  const homeOut = interpolate(f, [resultsAt - 14, resultsAt], [0, 1], { ...clamp, easing: QUINT_OUT });
  const clips = [
    { s: 99, t: "He did NOT expect the cops to do this", d: "0:32", k: "city" as const },
    { s: 97, t: "The reaction when the plane took off", d: "0:41", k: "stream" as const },
    { s: 94, t: "Nobody noticed this detail on day one", d: "0:28", k: "city" as const },
    { s: 91, t: "This chase went completely wrong", d: "0:37", k: "stream" as const },
    { s: 88, t: "Best moment of the whole stream", d: "0:24", k: "city" as const },
  ];
  return (
    <div style={{ width, height, background: "#000", borderRadius: 22, overflow: "hidden", fontFamily: INTER, color: "#fff", position: "relative", boxShadow: "0 50px 140px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)" }}>
      <TopBar credits={showResults ? credits - 45 : credits} />
      {/* HOME: link bar + settings */}
      {!showResults && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 64, bottom: 0, opacity: 1 - homeOut, filter: homeOut > 0 ? `blur(${homeOut * 10}px)` : undefined }}>
          <div style={{ textAlign: "center", marginTop: 70, fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>Turn a long video into viral clips</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 34 }}>
            <TypingBar
              text={link}
              start={typeAt}
              placeholder="Drop a video link or upload a file"
              width={760}
              height={74}
              fontSize={22}
              dark
              barBg="#1B1B1D"
              textColor="#fff"
              trailColor={LIME}
              icon={<Icon name="link" size={24} color="#9A9A9A" />}
            />
            <div
              data-id="get"
              style={{
                height: 64,
                padding: "0 30px",
                borderRadius: 999,
                background: "#fff",
                color: "#000",
                fontWeight: 600,
                fontSize: 19,
                display: "flex",
                alignItems: "center",
                transform: `scale(${f >= getAt && f < getAt + 8 ? 0.94 : 1})`,
              }}
            >
              Get clips
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 15, color: "#777", marginTop: 14 }}>or upload a file · 1 credit = 1 minute of video</div>
          {/* settings row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 40 }}>
            {[
              { k: "Clip model", v: "ClipAnything", at: -1 },
              { k: "Genre", v: "Gaming", at: -1 },
              { k: "Clip length", v: f >= lengthAt ? "20s - 45s" : "Auto (0m-3m)", at: lengthAt },
              { k: "Aspect ratio", v: f >= ratioAt ? "9:16" : "16:9", at: ratioAt },
            ].map((o) => {
              const lit = o.at > 0 && f >= o.at ? interpolate(f, [o.at, o.at + 14], [0, 1], clamp) : 0;
              return (
                <div key={o.k} style={{ background: "#141416", border: `1px solid ${lit ? LIME : "#262628"}`, borderRadius: 14, padding: "14px 20px", width: 230, height: 75, boxSizing: "border-box", boxShadow: lit ? `0 0 0 4px rgba(210,234,120,${0.18 * lit})` : undefined }}>
                  <div style={{ fontSize: 13, color: "#8A8A8A", fontWeight: 500 }}>{o.k}</div>
                  <div style={{ fontSize: 19, fontWeight: 600, marginTop: 6, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    {o.v} <span style={{ color: "#666", fontSize: 13 }}>▾</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* processing */}
          {f >= getAt + 6 && (
            <div style={{ margin: "48px auto 0", width: 760, background: "#111113", borderRadius: 18, padding: "22px 26px", border: "1px solid #232325" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 120, height: 68, borderRadius: 10, overflow: "hidden", position: "relative" }}>
                  <FakeFrame kind="city" seed={2} moving={false} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>GTA 6 launch stream (trimmed, 45 min)</div>
                  <div style={{ fontSize: 14, color: "#8A8A8A", marginTop: 6 }}>
                    {proc < 0.35 ? "Uploading..." : proc < 0.75 ? "Finding the best moments..." : "Adding captions and reframing..."} {Math.round(proc * 100)}%
                  </div>
                  <div style={{ height: 6, background: "#232325", borderRadius: 9, marginTop: 10, overflow: "hidden" }}>
                    <div style={{ width: `${proc * 100}%`, height: "100%", background: LIME, borderRadius: 9 }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* RESULTS */}
      {showResults && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 64, bottom: 0, padding: "26px 34px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>Original clips (12)</div>
            <div style={{ fontSize: 14, color: "#8A8A8A", background: "#141416", borderRadius: 999, padding: "6px 12px" }}>Sorted by virality score</div>
            <div style={{ marginLeft: "auto", fontSize: 14, color: "#8A8A8A" }}>9:16 · 20s - 45s</div>
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 22 }}>
            {clips.map((c, i) => {
              const p = settle(f, resultsAt + 6 + i * 6);
              return (
                <div key={i} data-clip={i} style={{ width: (width - 68 - 4 * 18) / 5, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 30}px)`, filter: p < 0.99 ? `blur(${(1 - p) * 8}px)` : undefined }}>
                  <div style={{ position: "relative", aspectRatio: "9/16", borderRadius: 14, overflow: "hidden", background: "#111" }}>
                    <FakeFrame kind={c.k} seed={i} moving={false} />
                    <div style={{ position: "absolute", left: 10, bottom: 10 }}>
                      <ScoreBadge score={c.s} size={1.3} />
                    </div>
                    <div style={{ position: "absolute", right: 10, top: 10, fontSize: 13, fontWeight: 600, background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "3px 7px" }}>{c.d}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginTop: 10, lineHeight: 1.3 }}>{c.t}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    {["Edit", "Download"].map((b) => (
                      <div key={b} style={{ fontSize: 13, fontWeight: 600, background: "#1B1C1E", borderRadius: 8, padding: "6px 12px", color: "#ddd" }}>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/** OpusClip-style pricing card (dark). */
export const OpusPlanCard: React.FC<{
  name: string;
  tagline: string;
  price: string;
  items: { t: string; at: number }[];
  highlight?: boolean;
  at: number;
  w?: number;
}> = ({ name, tagline, price, items, highlight = false, at, w = 560 }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        width: w,
        background: "#0A0A0B",
        borderRadius: 22,
        padding: "34px 38px 38px",
        border: highlight ? "2px solid #fff" : "1px solid #26262A",
        fontFamily: INTER,
        color: "#fff",
        boxShadow: "0 40px 120px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 700 }}>{name}</div>
      <div style={{ fontSize: 18, color: "#9A9A9A", marginTop: 6 }}>{tagline}</div>
      <div style={{ fontSize: 50, fontWeight: 700, marginTop: 20, letterSpacing: "-0.02em" }}>
        {price}
        <span style={{ fontSize: 20, color: "#bbb" }}>/mo</span>
      </div>
      <div style={{ marginTop: 22, height: 54, borderRadius: 10, background: highlight ? "#fff" : "transparent", border: highlight ? "none" : "1px solid #3A3A3E", color: highlight ? "#000" : "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 17 }}>
        Start your free trial
        <span style={{ fontSize: 11, fontWeight: 500, color: highlight ? "#555" : "#888" }}>No credit card required</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 26 }}>
        {items.map((it, i) => {
          const p = interpolate(f, [it.at, it.at + 16], [0, 1], { ...clamp, easing: EXPO_OUT });
          return (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 21, opacity: 0.25 + 0.75 * p, transform: `translateX(${(1 - p) * 10}px)` }}>
              <Icon name="check" size={20} color={p > 0.5 ? LIME : "#777"} stroke={2.6} /> {it.t}
            </div>
          );
        })}
      </div>
      {f < at ? null : null}
    </div>
  );
};
