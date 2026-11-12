import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, IN_OUT } from "../lib/motion";
import { FakeFrame } from "./FakeFrame";
import { Icon, YouTubeLogo } from "./icons";

const ROBOTO = "Roboto, Inter, Arial, sans-serif";

type Short = { title: string; channel: string; likes: string; comments: string; kind: "city" | "podcast" | "blocks" | "stream"; seed: number };

export const DEFAULT_SHORTS: Short[] = [
  { title: "He did NOT see that coming", channel: "@clipvault", likes: "48K", comments: "312", kind: "podcast", seed: 1 },
  { title: "The cops in this game are insane", channel: "@nightdrive.clips", likes: "112K", comments: "1.2K", kind: "city", seed: 0 },
  { title: "Brother saved the whole server", channel: "@blockstories", likes: "23K", comments: "189", kind: "blocks", seed: 2 },
  { title: "Wait for his reaction...", channel: "@streammoments", likes: "67K", comments: "540", kind: "stream", seed: 1 },
  { title: "Nobody expected this ending", channel: "@clipvault", likes: "91K", comments: "804", kind: "podcast", seed: 3 },
];

/** One YouTube Shorts screen (mobile player UI). */
export const ShortsScreen: React.FC<{ s: Short; scale?: number }> = ({ s, scale = 1 }) => {
  const u = (n: number) => n * scale;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", fontFamily: ROBOTO, color: "#fff" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: "16%", bottom: "16%" }}>
        <FakeFrame kind={s.kind} seed={s.seed} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 18%, transparent 62%, rgba(0,0,0,0.75) 100%)" }} />
      {/* top bar */}
      <div style={{ position: "absolute", top: u(46), left: u(18), right: u(18), display: "flex", justifyContent: "flex-end", gap: u(22) }}>
        <Icon name="search" size={u(26)} />
        <Icon name="more" size={u(26)} />
      </div>
      {/* right rail */}
      <div style={{ position: "absolute", right: u(10), bottom: u(96), display: "flex", flexDirection: "column", alignItems: "center", gap: u(16) }}>
        {[
          ["like", s.likes],
          ["dislike", "Dislike"],
          ["comment", s.comments],
          ["share", "Share"],
          ["remix", "Remix"],
        ].map(([ic, label]) => (
          <div key={ic} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: u(4) }}>
            <div style={{ width: u(46), height: u(46), borderRadius: "50%", background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={ic} size={u(24)} fill={ic === "like" || ic === "dislike" || ic === "comment" ? "#fff" : "none"} stroke={ic === "like" || ic === "dislike" ? 0 : 2.2} />
            </div>
            <span style={{ fontSize: u(12.5), fontWeight: 500 }}>{label}</span>
          </div>
        ))}
        <div style={{ width: u(38), height: u(38), borderRadius: u(8), background: "linear-gradient(135deg,#FFB800,#FF5E3A)", border: `${u(2)}px solid #fff` }} />
      </div>
      {/* bottom meta */}
      <div style={{ position: "absolute", left: u(14), right: u(70), bottom: u(28) }}>
        <div style={{ display: "flex", alignItems: "center", gap: u(8), marginBottom: u(10) }}>
          <div style={{ width: u(30), height: u(30), borderRadius: "50%", background: "linear-gradient(135deg,#FFD60A,#FF8A00)" }} />
          <span style={{ fontSize: u(14), fontWeight: 500 }}>{s.channel}</span>
          <span style={{ fontSize: u(13), fontWeight: 500, background: "#fff", color: "#0F0F0F", borderRadius: 999, padding: `${u(6)}px ${u(12)}px` }}>Subscribe</span>
        </div>
        <div style={{ fontSize: u(15), fontWeight: 400, lineHeight: 1.3 }}>{s.title}</div>
      </div>
      {/* progress */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: u(8), height: u(3), background: "rgba(255,255,255,0.25)" }}>
        <div style={{ width: "42%", height: "100%", background: "#FF0033" }} />
      </div>
    </div>
  );
};

/** Shorts feed that swipes up to the next video every `every` frames (loops). */
export const ShortsFeed: React.FC<{ start?: number; every?: number; shorts?: Short[]; scale?: number }> = ({
  start = 0,
  every = 100,
  shorts = DEFAULT_SHORTS,
  scale = 1,
}) => {
  const f = useCurrentFrame();
  const local = Math.max(0, f - start);
  const k = Math.floor(local / every);
  const within = local - k * every;
  const swipeStart = every - 22;
  const t = f < start ? 0 : interpolate(within, [swipeStart, every], [0, 1], { ...clamp, easing: IN_OUT });
  const n = shorts.length;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${-t * 100}%)` }}>
        <ShortsScreen s={shorts[k % n]} scale={scale} />
      </div>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - t) * 100}%)` }}>
        <ShortsScreen s={shorts[(k + 1) % n]} scale={scale} />
      </div>
    </div>
  );
};

/** YouTube long-form watch page (desktop, dark theme). */
export const YouTubeWatch: React.FC<{ title?: string; progress?: number; scale?: number }> = ({
  title = "Every secret I found in GTA 6 (12 minutes)",
  progress = 0.36,
  scale = 1,
}) => {
  const u = (n: number) => n * scale;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0F0F0F", fontFamily: ROBOTO, color: "#F1F1F1", overflow: "hidden" }}>
      <div style={{ height: u(56), display: "flex", alignItems: "center", padding: `0 ${u(20)}px`, gap: u(16) }}>
        <div style={{ display: "flex", flexDirection: "column", gap: u(4) }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: u(18), height: u(2), background: "#fff" }} />
          ))}
        </div>
        <YouTubeLogo h={u(20)} dark />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ width: "48%", height: u(38), borderRadius: 999, border: "1px solid #303030", background: "#121212", display: "flex", alignItems: "center", padding: `0 ${u(14)}px`, color: "#888", fontSize: u(14) }}>Search</div>
        </div>
        <div style={{ width: u(32), height: u(32), borderRadius: "50%", background: "linear-gradient(135deg,#FFD60A,#FF8A00)" }} />
      </div>
      <div style={{ display: "flex", gap: u(22), padding: `${u(10)}px ${u(24)}px` }}>
        <div style={{ flex: 1 }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: u(12), overflow: "hidden", background: "#000" }}>
            <FakeFrame kind="city" seed={2} />
            <div style={{ position: "absolute", left: u(12), right: u(12), bottom: u(12) }}>
              <div style={{ height: u(4), background: "rgba(255,255,255,0.3)", borderRadius: 2 }}>
                <div style={{ width: `${progress * 100}%`, height: "100%", background: "#FF0033", borderRadius: 2, position: "relative" }}>
                  <div style={{ position: "absolute", right: -u(6), top: -u(4), width: u(12), height: u(12), borderRadius: "50%", background: "#FF0033" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: u(14), marginTop: u(8), alignItems: "center", fontSize: u(12) }}>
                <Icon name="pause" size={u(18)} />
                <span>4:21 / 12:04</span>
                <span style={{ opacity: 0.8 }}>• Chapter 2: Hidden places</span>
              </div>
            </div>
          </div>
          <div style={{ fontSize: u(20), fontWeight: 700, marginTop: u(12) }}>{title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: u(12), marginTop: u(10) }}>
            <div style={{ width: u(40), height: u(40), borderRadius: "50%", background: "linear-gradient(135deg,#FFD60A,#FF8A00)" }} />
            <div>
              <div style={{ fontSize: u(15), fontWeight: 600 }}>nightdrive</div>
              <div style={{ fontSize: u(12), color: "#AAA" }}>Your channel</div>
            </div>
            <div style={{ marginLeft: u(12), background: "#F1F1F1", color: "#0F0F0F", fontWeight: 600, fontSize: u(14), borderRadius: 999, padding: `${u(9)}px ${u(16)}px` }}>Subscribe</div>
            <div style={{ marginLeft: "auto", display: "flex", gap: u(8) }}>
              {["Like", "Share", "Save"].map((l) => (
                <div key={l} style={{ background: "#272727", borderRadius: 999, padding: `${u(9)}px ${u(16)}px`, fontSize: u(14), fontWeight: 500 }}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ width: "30%", display: "flex", flexDirection: "column", gap: u(10) }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: "flex", gap: u(8) }}>
              <div style={{ position: "relative", width: u(150), aspectRatio: "16/9", borderRadius: u(8), overflow: "hidden", flex: "0 0 auto" }}>
                <FakeFrame kind={(["city", "blocks", "podcast", "stream", "city"] as const)[i]} seed={i} moving={false} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ height: u(10), background: "#3A3A3A", borderRadius: 4, marginBottom: u(6) }} />
                <div style={{ height: u(10), width: "70%", background: "#3A3A3A", borderRadius: 4, marginBottom: u(8) }} />
                <div style={{ height: u(8), width: "50%", background: "#262626", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** YouTube Studio "Earn" eligibility card (light theme). */
export const StudioEligibility: React.FC<{
  start: number;
  rows: { label: string; sub: string; at: number; pct: number; value: string; or?: boolean }[];
  title?: string;
  subtitle?: string;
  width?: number;
}> = ({ start, rows, title = "Join YouTube Partner Program", subtitle = "Requirements to apply", width = 980 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width, borderRadius: 16, background: "#fff", boxShadow: "0 30px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", fontFamily: ROBOTO, color: "#0D0D0D", overflow: "hidden" }}>
      <div style={{ height: 64, display: "flex", alignItems: "center", gap: 14, padding: "0 26px", borderBottom: "1px solid #E5E5E5" }}>
        <YouTubeLogo h={24} word={false} />
        <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Studio</span>
        <span style={{ marginLeft: 18, fontSize: 15, color: "#606060" }}>Earn</span>
      </div>
      <div style={{ padding: "26px 30px 30px" }}>
        <div style={{ fontSize: 26, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 16, color: "#606060", marginTop: 4, marginBottom: 18 }}>{subtitle}</div>
        {rows.map((r, i) => {
          const p = interpolate(f, [r.at, r.at + 50], [0, 1], { ...clamp, easing: EXPO_OUT });
          const vis = interpolate(f, [r.at - 4, r.at + 12], [0, 1], clamp);
          return (
            <React.Fragment key={i}>
              {r.or && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "6px 0 10px", opacity: vis, color: "#606060", fontSize: 14, fontWeight: 600, letterSpacing: "0.1em" }}>
                  <div style={{ flex: 1, height: 1, background: "#E5E5E5" }} />
                  OR
                  <div style={{ flex: 1, height: 1, background: "#E5E5E5" }} />
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "14px 0", opacity: vis, transform: `translateY(${(1 - vis) * 12}px)`, filter: vis < 1 ? `blur(${(1 - vis) * 6}px)` : undefined }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: `conic-gradient(#065FD4 ${r.pct * p * 360}deg, #E5E5E5 0)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#fff" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.01em" }}>{r.value}</div>
                  <div style={{ fontSize: 17, color: "#606060" }}>
                    {r.label} <span style={{ color: "#909090" }}>· {r.sub}</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/** YouTube channel page (desktop, dark): banner, faceless avatar, tabs, Shorts shelf. */
export const ChannelPage: React.FC<{ width?: number; avatarRing?: number }> = ({ width = 1300, avatarRing = 0 }) => {
  const f = useCurrentFrame();
  const titles = ["Wait for it...", "He did NOT expect that", "Nobody saw this coming", "Did you notice this?", "POV: day one", "Watch the end"];
  const views = ["1.2M", "384K", "96K", "742K", "218K", "63K"];
  return (
    <div style={{ width, background: "#0F0F0F", borderRadius: 22, overflow: "hidden", fontFamily: ROBOTO, color: "#F1F1F1", boxShadow: "0 50px 140px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)" }}>
      <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 22px", gap: 16 }}>
        <YouTubeLogo h={22} dark />
        <div style={{ flex: 1 }} />
        <Icon name="search" size={22} />
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#FFD60A,#FF8A00)" }} />
      </div>
      <div style={{ margin: "0 26px", height: 170, borderRadius: 16, background: "linear-gradient(110deg,#0B0B0B 0%,#2A1A04 45%,#FFB800 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 40, top: 40, fontFamily: "Manrope", fontWeight: 800, fontSize: 64, color: "#0A0A0A", letterSpacing: "-0.05em" }}>clips daily.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "22px 30px" }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 130, height: 130, borderRadius: "50%", background: "linear-gradient(135deg,#1F1F1F,#3A3A3A)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 800, fontSize: 70, color: "#FFD60A" }}>?</div>
          {avatarRing > 0 && (
            <div style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "5px solid #FFD60A", opacity: avatarRing, transform: `scale(${1 + 0.03 * Math.sin(f / 8)})`, boxShadow: "0 0 30px rgba(255,214,10,0.6)" }} />
          )}
        </div>
        <div>
          <div style={{ fontSize: 38, fontWeight: 700 }}>Your Channel</div>
          <div style={{ fontSize: 17, color: "#AAA", marginTop: 6 }}>@yourchannel · Shorts + long-form · No face, ever</div>
          <div style={{ display: "inline-block", marginTop: 12, background: "#F1F1F1", color: "#0F0F0F", fontWeight: 600, fontSize: 16, borderRadius: 999, padding: "9px 18px" }}>Subscribe</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 30, padding: "0 30px", fontSize: 17, fontWeight: 600, borderBottom: "1px solid #272727" }}>
        {["Home", "Videos", "Shorts", "Playlists"].map((t) => (
          <div key={t} style={{ padding: "12px 0", color: t === "Shorts" ? "#fff" : "#AAA", borderBottom: t === "Shorts" ? "3px solid #fff" : "3px solid transparent" }}>
            {t}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, padding: "20px 30px 28px" }}>
        {titles.map((t, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ position: "relative", aspectRatio: "9/16", borderRadius: 12, overflow: "hidden" }}>
              <FakeFrame kind={(["city", "podcast", "blocks", "stream", "city", "podcast"] as const)[i]} seed={i} moving={false} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 8, lineHeight: 1.25 }}>{t}</div>
            <div style={{ fontSize: 12, color: "#AAA", marginTop: 3 }}>{views[i]} views</div>
          </div>
        ))}
      </div>
    </div>
  );
};
