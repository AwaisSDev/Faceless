import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT } from "../lib/motion";
import { Icon, InstagramLogo, TikTokLogo, WhopLogo, YouTubeLogo } from "./icons";

const INTER = "Inter, Arial, sans-serif";
const ORANGE = "#FA4616";

export type Campaign = {
  title: string;
  owner: string;
  rate: string; // per 1K views
  minPayout: string;
  maxPayout: string;
  budgetUsed: number;
  budgetTotal: number;
  clippers: number;
  status?: "Active" | "Paused" | "Ended";
};

export const DEMO_CAMPAIGN: Campaign = {
  title: "Clip our GTA 6 launch streams",
  owner: "Launch Week Clips",
  rate: "$1.50",
  minPayout: "$5.00",
  maxPayout: "$300.00",
  budgetUsed: 6200,
  budgetTotal: 20000,
  clippers: 148,
  status: "Active",
};

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/**
 * Recreation of a Whop Content Rewards campaign page (light theme): banner,
 * status row, per-platform rate boxes (Per 1K views / Min payout / Max payout),
 * budget card with progress bar, brief and requirements.
 */
export const WhopCampaignPage: React.FC<{
  c?: Campaign;
  /** Override budget used (animate draining). */
  used?: number;
  width?: number;
  scale?: number;
  showBrief?: boolean;
}> = ({ c = DEMO_CAMPAIGN, used, width = 1180, scale = 1, showBrief = true }) => {
  const u = (n: number) => n * scale;
  const b = used ?? c.budgetUsed;
  const pct = Math.min(1, b / c.budgetTotal);
  const ended = pct >= 0.999;
  const platforms = [
    { name: "YouTube", logo: <YouTubeLogo h={u(14)} word={false} /> },
    { name: "TikTok", logo: <TikTokLogo h={u(16)} /> },
    { name: "Instagram", logo: <InstagramLogo h={u(16)} /> },
  ];
  return (
    <div style={{ width: u(width), background: "#FAFAFA", fontFamily: INTER, color: "#141212", borderRadius: u(18), overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: u(64), background: "#fff", display: "flex", alignItems: "center", padding: `0 ${u(28)}px`, borderBottom: "1px solid #EEE", gap: u(28) }}>
        <WhopLogo h={u(26)} />
        <span style={{ fontSize: u(15), color: "#555", fontWeight: 500 }}>Content Rewards</span>
        <span style={{ fontSize: u(15), color: "#555", fontWeight: 500 }}>Discover</span>
        <div style={{ marginLeft: "auto", background: ORANGE, color: "#fff", borderRadius: 999, padding: `${u(9)}px ${u(18)}px`, fontWeight: 600, fontSize: u(14) }}>Dashboard</div>
      </div>
      <div style={{ padding: `${u(22)}px ${u(34)}px ${u(28)}px` }}>
        {/* banner */}
        <div style={{ position: "relative", height: u(200), borderRadius: u(14), overflow: "hidden", background: "linear-gradient(120deg,#1B1B1B 0%,#3A2410 45%,#FA4616 100%)" }}>
          <div style={{ position: "absolute", right: u(-40), top: u(-60), width: u(420), height: u(420), borderRadius: "50%", background: "radial-gradient(circle,#FFB800 0%,transparent 65%)", opacity: 0.5 }} />
          <div style={{ position: "absolute", left: u(22), bottom: u(20), color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: u(8), fontSize: u(13), fontWeight: 600, opacity: 0.9 }}>
              <div style={{ width: u(20), height: u(20), borderRadius: u(5), background: "#FFD60A" }} /> {c.owner}
            </div>
            <div style={{ fontSize: u(26), fontWeight: 700, marginTop: u(6), letterSpacing: "-0.02em" }}>{c.title}</div>
          </div>
        </div>
        {/* status row */}
        <div style={{ display: "flex", alignItems: "center", gap: u(16), margin: `${u(14)}px 0`, fontSize: u(14), fontWeight: 500 }}>
          <span style={{ display: "flex", alignItems: "center", gap: u(6), color: ended ? "#C2261B" : "#1A7F3C" }}>
            <span style={{ width: u(8), height: u(8), borderRadius: "50%", background: ended ? "#C2261B" : "#22C55E" }} />
            {ended ? "Ended" : c.status}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: u(6) }}>
            <Icon name="users" size={u(16)} color="#141212" /> {c.clippers}
          </span>
          <span style={{ color: ORANGE, fontWeight: 700 }}>CPM</span>
          <div style={{ marginLeft: "auto", background: ended ? "#F3B3A1" : ORANGE, color: "#fff", borderRadius: 999, padding: `${u(10)}px ${u(22)}px`, fontWeight: 600 }}>
            {ended ? "Campaign ended" : "Join Campaign"}
          </div>
        </div>
        {/* platform rate boxes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: u(12) }}>
          {platforms.map((p) => (
            <div key={p.name} data-box={p.name} style={{ background: "#fff", border: "1px solid #EAEAEA", borderRadius: u(12), overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: u(8), padding: `${u(12)}px ${u(14)}px`, fontSize: u(15), fontWeight: 600, borderBottom: "1px solid #F0F0F0" }}>
                {p.logo} {p.name}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                {[
                  ["Per 1K views", c.rate],
                  ["Min payout", c.minPayout],
                  ["Max payout", c.maxPayout],
                ].map(([k, v], j) => (
                  <div key={k} style={{ padding: `${u(10)}px ${u(12)}px ${u(14)}px`, borderLeft: j ? "1px solid #F0F0F0" : undefined }}>
                    <div style={{ fontSize: u(11.5), color: "#8A8A8A" }}>{k}</div>
                    <div style={{ fontSize: u(17), fontWeight: 600, marginTop: u(6) }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* budget + reference */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: u(12), marginTop: u(12) }}>
          <div style={{ background: "#fff", border: "1px solid #EAEAEA", borderRadius: u(12), padding: u(16) }}>
            <div style={{ fontSize: u(14), fontWeight: 600, display: "flex", alignItems: "center", gap: u(8) }}>
              <Icon name="chart" size={u(15)} color="#141212" /> Budget
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: u(12) }}>
              <span style={{ fontSize: u(22), fontWeight: 700 }}>
                {money(b)} <span style={{ color: "#8A8A8A", fontWeight: 500 }}>/ {money(c.budgetTotal)}</span>
              </span>
              <span style={{ fontSize: u(13), color: "#8A8A8A" }}>{money(c.budgetTotal - b)} remaining</span>
            </div>
            <div style={{ height: u(8), background: "#EEE", borderRadius: 99, marginTop: u(12), overflow: "hidden" }}>
              <div style={{ width: `${pct * 100}%`, height: "100%", background: ended ? "#C2261B" : ORANGE, borderRadius: 99 }} />
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #EAEAEA", borderRadius: u(12), padding: u(16) }}>
            <div style={{ fontSize: u(14), fontWeight: 600, display: "flex", alignItems: "center", gap: u(8) }}>
              <Icon name="book" size={u(15)} color="#141212" /> Requirements
            </div>
            {showBrief &&
              ["Clips 20 to 60 seconds", "Add your own hook + captions", "Tag the creator in the caption"].map((t) => (
                <div key={t} style={{ fontSize: u(13.5), color: "#333", marginTop: u(9), display: "flex", gap: u(8), alignItems: "center" }}>
                  <Icon name="check" size={u(14)} color="#1A7F3C" stroke={3} /> {t}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Content Rewards discover card (thumbnail, owner, title, budget bar, rate pill). */
export const WhopDiscoverCard: React.FC<{ title: string; owner: string; used: string; total: string; pct: number; rate: string; kind?: number; w?: number }> = ({
  title,
  owner,
  used,
  total,
  pct,
  rate,
  kind = 0,
  w = 340,
}) => {
  const grads = ["linear-gradient(135deg,#2A2A2A,#FA4616)", "linear-gradient(135deg,#FFB800,#FF5E3A)", "linear-gradient(135deg,#1E3A6A,#5B8CFF)", "linear-gradient(135deg,#0F0F0F,#FFD60A)"];
  return (
    <div style={{ width: w, background: "#fff", borderRadius: 16, overflow: "hidden", fontFamily: INTER, color: "#141212", border: "1px solid #EAEAEA", boxShadow: "0 18px 50px rgba(0,0,0,0.08)" }}>
      <div style={{ height: w * 0.52, background: grads[kind % 4] }} />
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 14, color: "#555", fontWeight: 600 }}>{owner}</div>
        <div style={{ fontSize: 19, fontWeight: 700, marginTop: 6, letterSpacing: "-0.01em" }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, fontSize: 14 }}>
          <span style={{ fontWeight: 600 }}>
            {used}/{total}
          </span>
          <span style={{ background: "#E3F7E8", color: "#1A7F3C", fontWeight: 700, borderRadius: 8, padding: "4px 10px" }}>{rate}/1K</span>
        </div>
        <div style={{ height: 6, background: "#EEE", borderRadius: 9, marginTop: 10 }}>
          <div style={{ width: `${pct * 100}%`, height: "100%", background: ORANGE, borderRadius: 9 }} />
        </div>
      </div>
    </div>
  );
};

/** Animated budget value helper: drains from `from` to total between frames. */
export const useBudgetDrain = (from: number, total: number, at: number, dur: number) => {
  const f = useCurrentFrame();
  return interpolate(f, [at, at + dur], [from, total], { ...clamp, easing: EXPO_OUT });
};
