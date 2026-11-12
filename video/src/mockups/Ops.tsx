import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, mix, settle } from "../lib/motion";
import { FakeFrame } from "./FakeFrame";
import { Icon, InstagramLogo, TikTokLogo, WhopLogo, YouTubeLogo } from "./icons";

const INTER = "Inter, Arial, sans-serif";
const ORANGE = "#FA4616";

/* ------------------------------------------------------------------ */
/* Whop Content Rewards: "My campaigns" dashboard                      */
/* ------------------------------------------------------------------ */
export type CampaignRow = { name: string; owner: string; rate: string; left: number; status: "Active" | "Low budget" | "Ended"; rulesUpdated?: boolean };

export const WhopDashboard: React.FC<{
  rows: CampaignRow[];
  hl?: "budget" | "rate" | "rules" | null;
  width?: number;
  at?: number;
}> = ({ rows, hl = null, width = 1300, at = 0 }) => {
  const f = useCurrentFrame();
  const cell = (key: "budget" | "rate" | "rules") =>
    hl === key ? { background: "#FFF5CC", boxShadow: "inset 0 0 0 3px #FFD60A", borderRadius: 10 } : {};
  return (
    <div style={{ width, background: "#FAFAFA", borderRadius: 18, overflow: "hidden", fontFamily: INTER, color: "#141212", boxShadow: "0 40px 120px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)" }}>
      <div style={{ height: 62, background: "#fff", display: "flex", alignItems: "center", gap: 26, padding: "0 26px", borderBottom: "1px solid #EEE" }}>
        <WhopLogo h={24} />
        <span style={{ fontSize: 15, fontWeight: 600 }}>My campaigns</span>
        <span style={{ fontSize: 15, color: "#777" }}>Submissions</span>
        <span style={{ fontSize: 15, color: "#777" }}>Payouts</span>
        <div style={{ marginLeft: "auto", fontSize: 14, color: "#777" }}>Today</div>
      </div>
      <div style={{ padding: "20px 26px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.4fr 1fr 1.6fr 1.2fr", fontSize: 13, color: "#8A8A8A", fontWeight: 600, padding: "0 14px 10px" }}>
          <span>Campaign</span>
          <span style={{ padding: "0 8px" }}>Rate / 1K</span>
          <span style={{ padding: "0 8px" }}>Budget left</span>
          <span style={{ padding: "0 8px" }}>Status</span>
        </div>
        {rows.map((r, i) => {
          const p = settle(f, at + i * 6);
          const tone = r.status === "Active" ? ["#E3F7E8", "#1A7F3C"] : r.status === "Low budget" ? ["#FFF1D6", "#A15C00"] : ["#FFE4E1", "#C2261B"];
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2.4fr 1fr 1.6fr 1.2fr",
                alignItems: "center",
                background: "#fff",
                border: "1px solid #EEE",
                borderRadius: 14,
                padding: "14px",
                marginBottom: 10,
                opacity: Math.min(1, p * 2),
                transform: `translateY(${(1 - p) * 16}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden", position: "relative" }}>
                  <FakeFrame kind={(["city", "podcast", "stream", "blocks"] as const)[i % 4]} seed={i} moving={false} />
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: "#777", display: "flex", gap: 8, alignItems: "center" }}>
                    {r.owner}
                    {r.rulesUpdated && (
                      <span style={{ ...cell("rules"), fontSize: 12, fontWeight: 700, color: "#A15C00", background: hl === "rules" ? "#FFF5CC" : "#FFF1D6", padding: "2px 8px", borderRadius: 6 }}>Rules updated</span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, padding: "8px", ...cell("rate") }}>{r.rate}</div>
              <div style={{ padding: "8px", ...cell("budget") }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{Math.round(r.left * 100)}%</div>
                <div style={{ height: 6, background: "#EEE", borderRadius: 9, marginTop: 6 }}>
                  <div style={{ width: `${r.left * 100}%`, height: "100%", background: r.left < 0.15 ? "#C2261B" : ORANGE, borderRadius: 9 }} />
                </div>
              </div>
              <div style={{ padding: "0 8px" }}>
                <span style={{ fontSize: 13, fontWeight: 700, background: tone[0], color: tone[1], padding: "5px 10px", borderRadius: 8 }}>{r.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Posting schedule (calendar day view)                                */
/* ------------------------------------------------------------------ */
export const PostingSchedule: React.FC<{ at: number; width?: number; slotsAt: number[] }> = ({ at, width = 1100, slotsAt }) => {
  const f = useCurrentFrame();
  const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
  const posts = [
    { h: 0, logo: <YouTubeLogo h={16} word={false} />, name: "YouTube Shorts", c: "#FFE5E5" },
    { h: 2.5, logo: <TikTokLogo h={20} />, name: "TikTok", c: "#E6FBFB" },
    { h: 5, logo: <InstagramLogo h={20} />, name: "Instagram Reels", c: "#FCE7F6" },
  ];
  const rowH = 62;
  return (
    <div style={{ width, background: "#fff", borderRadius: 22, overflow: "hidden", fontFamily: INTER, color: "#141212", boxShadow: "0 40px 120px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)", opacity: Math.min(1, settle(f, at) * 2) }}>
      <div style={{ height: 64, display: "flex", alignItems: "center", gap: 16, padding: "0 26px", borderBottom: "1px solid #EEE" }}>
        <Icon name="calendar" size={24} color="#141212" />
        <span style={{ fontSize: 20, fontWeight: 700 }}>Posting schedule</span>
        <span style={{ fontSize: 15, color: "#777" }}>Today · 1 clip, 3 platforms</span>
      </div>
      <div style={{ position: "relative", padding: "12px 26px 18px" }}>
        {hours.map((h, i) => (
          <div key={h} style={{ height: rowH, display: "flex", alignItems: "flex-start", borderTop: i ? "1px dashed #EEE" : "none" }}>
            <span style={{ width: 80, fontSize: 13, color: "#999", marginTop: 6 }}>{h}</span>
          </div>
        ))}
        {posts.map((p, i) => {
          const s = settle(f, slotsAt[i] ?? at);
          if (f < (slotsAt[i] ?? at)) return null;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 120 + i * 40,
                right: 40 + (2 - i) * 40,
                top: 12 + p.h * rowH + 6,
                height: rowH - 12,
                borderRadius: 12,
                background: p.c,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 16px",
                fontSize: 16,
                fontWeight: 700,
                opacity: s,
                transform: `translateX(${(1 - s) * 40}px)`,
                boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
              }}
            >
              {p.logo} {p.name}
              <span style={{ fontWeight: 500, color: "#666" }}>· "He did NOT expect the cops to do this"</span>
            </div>
          );
        })}
        {[0, 1].map((k) => {
          const s = settle(f, (slotsAt[k + 1] ?? at) + 10);
          if (f < (slotsAt[k + 1] ?? at) + 10) return null;
          const y1 = 12 + posts[k].h * rowH + rowH / 2;
          const y2 = 12 + posts[k + 1].h * rowH + rowH / 2;
          return (
            <div key={k} style={{ position: "absolute", right: 14, top: y1, height: (y2 - y1) * s, width: 3, background: "#FFB800", borderRadius: 2 }}>
              <span style={{ position: "absolute", right: 10, top: (y2 - y1) / 2 - 12, fontSize: 13, fontWeight: 700, color: "#A15C00", whiteSpace: "nowrap", opacity: s }}>2.5 h</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Tracking sheet (spreadsheet)                                        */
/* ------------------------------------------------------------------ */
export type TrackRow = { date: string; hook: string; moment: string; yt: number; tt: number; ig: number; paid: string };

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : String(n));

export const TrackingSheet: React.FC<{
  rows: TrackRow[];
  rowAt: (i: number) => number;
  /** Frame where rows sort by total views. */
  sortAt?: number;
  /** Frame where the top 5 get highlighted. */
  topAt?: number;
  /** Highlight a column of tags (moment) in the top rows. */
  tagAt?: number;
  width?: number;
}> = ({ rows, rowAt, sortAt, topAt, tagAt, width = 1500 }) => {
  const f = useCurrentFrame();
  const cols = ["Date", "Hook", "Moment", "YT Shorts", "TikTok", "Reels", "Whop status"];
  const grid = "110px 1fr 150px 120px 110px 110px 160px";
  const rowH = 54;
  const total = (r: TrackRow) => r.yt + r.tt + r.ig;
  const order = rows.map((r, i) => ({ r, i })).sort((a, b) => total(b.r) - total(a.r));
  const rank = new Map(order.map((o, k) => [o.i, k]));
  const sortP = sortAt !== undefined ? interpolate(f, [sortAt, sortAt + 40], [0, 1], { ...clamp, easing: EXPO_OUT }) : 0;
  return (
    <div style={{ width, background: "#fff", borderRadius: 18, overflow: "hidden", fontFamily: INTER, color: "#202124", boxShadow: "0 40px 120px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)" }}>
      <div style={{ height: 54, display: "flex", alignItems: "center", gap: 12, padding: "0 20px", background: "#F8F9FA", borderBottom: "1px solid #E3E3E3" }}>
        <div style={{ width: 26, height: 30, borderRadius: 4, background: "#1E8E3E", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 14, height: 14, border: "2px solid #fff", borderRadius: 2 }} />
        </div>
        <span style={{ fontSize: 18, fontWeight: 600 }}>Clip tracker</span>
        {sortAt !== undefined && f >= sortAt && (
          <span style={{ marginLeft: 16, fontSize: 13, fontWeight: 600, background: "#E8F0FE", color: "#1967D2", borderRadius: 6, padding: "4px 10px" }}>Sorted by views ↓</span>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: grid, fontSize: 13, fontWeight: 700, color: "#5F6368", background: "#F1F3F4", borderBottom: "1px solid #E3E3E3" }}>
        {cols.map((c) => (
          <div key={c} style={{ padding: "10px 12px", borderRight: "1px solid #E3E3E3" }}>
            {c}
          </div>
        ))}
      </div>
      <div style={{ position: "relative", height: rows.length * rowH }}>
        {rows.map((r, i) => {
          const at = rowAt(i);
          const p = settle(f, at);
          if (f < at) return null;
          const y = mix(i, rank.get(i) ?? i, sortP) * rowH;
          const isTop = topAt !== undefined && f >= topAt && (rank.get(i) ?? 99) < 5;
          const isBottom = topAt !== undefined && f >= topAt && (rank.get(i) ?? 0) >= rows.length - 2;
          const typed = Math.min(r.hook.length, Math.floor((f - at) * 1.2));
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: y,
                height: rowH,
                display: "grid",
                gridTemplateColumns: grid,
                alignItems: "center",
                fontSize: 15,
                background: isTop ? "#FFF8D6" : isBottom ? "#FAFAFA" : "#fff",
                borderBottom: "1px solid #EEE",
                opacity: Math.min(1, p * 2) * (isBottom ? 0.45 : 1),
                transform: `translateX(${(1 - p) * 20}px)`,
              }}
            >
              <div style={{ padding: "0 12px", color: "#5F6368" }}>{r.date}</div>
              <div style={{ padding: "0 12px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden" }}>{r.hook.slice(0, typed)}</div>
              <div style={{ padding: "0 12px" }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: 6,
                    background: tagAt !== undefined && f >= tagAt && isTop && r.moment === "Reaction" ? "#FFD60A" : "#F1F3F4",
                  }}
                >
                  {r.moment}
                </span>
              </div>
              <div style={{ padding: "0 12px", fontVariantNumeric: "tabular-nums" }}>{fmt(Math.round(r.yt * Math.min(1, (f - at) / 30)))}</div>
              <div style={{ padding: "0 12px", fontVariantNumeric: "tabular-nums" }}>{fmt(Math.round(r.tt * Math.min(1, (f - at) / 30)))}</div>
              <div style={{ padding: "0 12px", fontVariantNumeric: "tabular-nums" }}>{fmt(Math.round(r.ig * Math.min(1, (f - at) / 30)))}</div>
              <div style={{ padding: "0 12px", fontWeight: 700, fontSize: 14, color: r.paid === "Approved" ? "#1E8E3E" : r.paid === "No campaign" ? "#9AA0A6" : "#B06000" }}>{r.paid}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Whop submission dialog                                              */
/* ------------------------------------------------------------------ */
export const WhopSubmit: React.FC<{ at: number; submitAt: number; link: string; width?: number }> = ({ at, submitAt, link, width = 760 }) => {
  const f = useCurrentFrame();
  const p = settle(f, at);
  const typed = Math.max(0, Math.min(link.length, Math.floor((f - at - 20) * 0.6)));
  const done = f >= submitAt + 12;
  return (
    <div style={{ width, background: "#fff", borderRadius: 22, padding: 30, fontFamily: INTER, color: "#141212", boxShadow: "0 40px 120px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.05)", opacity: Math.min(1, p * 2), transform: `scale(${0.95 + 0.05 * p})` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <WhopLogo h={22} word={false} />
        <span style={{ fontSize: 22, fontWeight: 700 }}>Submit your clip</span>
      </div>
      <div style={{ fontSize: 14, color: "#777", marginTop: 6 }}>Launch Week Clips · $1.50 per 1K views</div>
      <div style={{ marginTop: 18, height: 54, borderRadius: 12, border: "1.5px solid #E2E2E2", display: "flex", alignItems: "center", gap: 10, padding: "0 14px", fontSize: 17 }}>
        <Icon name="link" size={18} color="#888" />
        <span>{link.slice(0, typed)}</span>
        {typed < link.length && <span style={{ width: 2, height: 22, background: "#141212" }} />}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        {[<YouTubeLogo key="y" h={16} word={false} />, <TikTokLogo key="t" h={20} />, <InstagramLogo key="i" h={20} />].map((l, i) => (
          <div key={i} style={{ padding: "8px 12px", borderRadius: 10, border: i === 0 ? `2px solid ${ORANGE}` : "1px solid #E2E2E2", display: "flex" }}>
            {l}
          </div>
        ))}
        <div
          style={{
            marginLeft: "auto",
            background: done ? "#1A7F3C" : ORANGE,
            color: "#fff",
            borderRadius: 999,
            padding: "12px 24px",
            fontWeight: 700,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transform: `scale(${f >= submitAt && f < submitAt + 8 ? 0.93 : 1})`,
          }}
        >
          {done ? (
            <>
              <Icon name="check" size={18} stroke={3} /> Submitted · pending review
            </>
          ) : (
            "Submit"
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* YouTube long-form thumbnail card + description with chapters        */
/* ------------------------------------------------------------------ */
export const LongformCard: React.FC<{ title: string; dur: string; kind: "city" | "podcast" | "blocks" | "stream"; thumbText: string; w?: number; seed?: number }> = ({
  title,
  dur,
  kind,
  thumbText,
  w = 520,
  seed = 0,
}) => (
  <div style={{ width: w, fontFamily: "Roboto, Inter, Arial, sans-serif", color: "#0F0F0F" }}>
    <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
      <FakeFrame kind={kind} seed={seed} moving={false} />
      <div style={{ position: "absolute", left: "5%", top: "8%", fontFamily: "Manrope, Inter", fontWeight: 800, fontSize: w * 0.1, lineHeight: 0.95, color: "#fff", WebkitTextStroke: `${w * 0.005}px #000`, textShadow: "0 4px 0 #000", letterSpacing: "-0.03em", maxWidth: "70%" }}>
        {thumbText}
      </div>
      <div style={{ position: "absolute", right: 10, bottom: 10, background: "rgba(0,0,0,0.8)", color: "#fff", fontSize: 14, fontWeight: 600, borderRadius: 6, padding: "3px 7px" }}>{dur}</div>
    </div>
    <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#FFD60A,#FF8A00)", flex: "0 0 auto" }} />
      <div>
        <div style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 15, color: "#606060", marginTop: 4 }}>Your Channel</div>
      </div>
    </div>
  </div>
);

export const ChaptersDescription: React.FC<{ at: number; width?: number }> = ({ at, width = 620 }) => {
  const f = useCurrentFrame();
  const chapters = [
    ["0:00", "Intro"],
    ["0:42", "The hidden island"],
    ["2:15", "Secret car spawn"],
    ["4:30", "Easter eggs downtown"],
    ["7:05", "The best view in the game"],
    ["10:20", "What I missed"],
  ];
  return (
    <div style={{ width, background: "#F2F2F2", borderRadius: 16, padding: "20px 22px", fontFamily: "Roboto, Inter, Arial, sans-serif", color: "#0F0F0F" }}>
      <div style={{ fontSize: 15, fontWeight: 600 }}>48K views · 2 days ago</div>
      <div style={{ fontSize: 15, marginTop: 8, color: "#333" }}>Everything I found in my first 10 hours.</div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 14 }}>Chapters</div>
      {chapters.map(([t, n], i) => {
        const p = interpolate(f, [at + i * 8, at + i * 8 + 14], [0, 1], clamp);
        return (
          <div key={t} style={{ fontSize: 15, marginTop: 6, opacity: p, transform: `translateX(${(1 - p) * 10}px)` }}>
            <span style={{ color: "#065FD4", fontWeight: 600 }}>{t}</span> {n}
          </div>
        );
      })}
    </div>
  );
};
