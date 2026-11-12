import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Stylised stand-in "footage" for players and thumbnails (no real footage):
 * - city: sunset skyline + road (open-world gameplay vibe)
 * - podcast: two people at mics against a studio wall
 * - blocks: blocky story-game scene
 * - stream: gamer cam + game screen
 */
export const FakeFrame: React.FC<{ kind?: "city" | "podcast" | "blocks" | "stream"; seed?: number; style?: React.CSSProperties; moving?: boolean }> = ({
  kind = "city",
  seed = 0,
  style,
  moving = true,
}) => {
  const f = useCurrentFrame();
  const t = moving ? f : 0;
  const base: React.CSSProperties = { position: "absolute", inset: 0, overflow: "hidden", ...style };
  if (kind === "podcast") {
    const hue = [28, 200, 340, 160][seed % 4];
    return (
      <div style={{ ...base, background: `linear-gradient(160deg, hsl(${hue},30%,22%), hsl(${hue + 20},35%,10%))` }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 40px, transparent 40px 80px)" }} />
        {[0.3, 0.7].map((x, i) => (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: `${x * 100}%`, bottom: "8%", width: "30%", height: "52%", transform: "translateX(-50%)", borderRadius: "45% 45% 8% 8%", background: i ? "#3B3B46" : "#5B4636" }} />
            <div style={{ position: "absolute", left: `${x * 100}%`, bottom: "52%", width: "15%", height: "22%", transform: `translateX(-50%) rotate(${Math.sin(t / 30 + i) * 3}deg)`, borderRadius: "50%", background: i ? "#C99A7A" : "#E0B08E" }} />
            <div style={{ position: "absolute", left: `${(x + (i ? -0.12 : 0.12)) * 100}%`, bottom: "30%", width: "4%", height: "20%", background: "#111", borderRadius: 8 }} />
          </React.Fragment>
        ))}
      </div>
    );
  }
  if (kind === "blocks") {
    return (
      <div style={{ ...base, background: "linear-gradient(180deg,#7EC8FF 0%,#BFE6FF 55%,#5DBB4A 55%,#3E9A35 100%)" }}>
        <div style={{ position: "absolute", left: "8%", top: "18%", width: "20%", height: "8%", borderRadius: 40, background: "#fff", opacity: 0.85, transform: `translateX(${(t * 0.3) % 400}px)` }} />
        {[0.32, 0.62].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: `${x * 100}%`, bottom: "30%", width: "13%", transform: `translateY(${Math.abs(Math.sin(t / 14 + i)) * -12}px)` }}>
            <div style={{ width: "70%", margin: "0 auto", aspectRatio: "1", background: "#F5CD5B", borderRadius: 6 }} />
            <div style={{ width: "100%", aspectRatio: "1/1.1", background: i ? "#E64B4B" : "#2E7BE6", borderRadius: 4 }} />
            <div style={{ display: "flex", gap: "8%" }}>
              <div style={{ flex: 1, aspectRatio: "1/2", background: "#2B3A55" }} />
              <div style={{ flex: 1, aspectRatio: "1/2", background: "#2B3A55" }} />
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", right: "8%", bottom: "40%", width: "18%", height: "26%", background: "#8B5A2B", borderTop: "14px solid #B23A3A" }} />
      </div>
    );
  }
  if (kind === "stream") {
    return (
      <div style={{ ...base }}>
        <FakeFrame kind="city" seed={seed} />
        <div style={{ position: "absolute", right: "4%", bottom: "6%", width: "26%", aspectRatio: "16/10", borderRadius: 8, background: "linear-gradient(160deg,#2C2C3A,#121218)", border: "3px solid #8B5CF6", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", bottom: 0, width: "46%", height: "60%", transform: "translateX(-50%)", borderRadius: "45% 45% 0 0", background: "#3D3D52" }} />
          <div style={{ position: "absolute", left: "50%", bottom: "48%", width: "26%", height: "38%", transform: "translateX(-50%)", borderRadius: "50%", background: "#D7A889" }} />
        </div>
      </div>
    );
  }
  // city
  const sky = [
    ["#FF7A59", "#FFC46B", "#5B2A86"],
    ["#F35B9A", "#FFB36B", "#2B1B5A"],
    ["#FF8A3D", "#FFD36B", "#1E3A6A"],
  ][seed % 3];
  return (
    <div style={{ ...base, background: `linear-gradient(180deg, ${sky[2]} 0%, ${sky[0]} 45%, ${sky[1]} 62%, #2A1E3A 62%, #15101F 100%)` }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", width: "22%", aspectRatio: "1", borderRadius: "50%", transform: "translate(-50%,-60%)", background: "radial-gradient(circle, #FFE8A3, #FFB35C 60%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: "38%", height: "24%", display: "flex", alignItems: "flex-end", gap: "1.2%", padding: "0 2%" }}>
        {[38, 70, 52, 90, 60, 40, 76, 56, 84, 46, 64, 36].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: "#24183A", borderRadius: "3px 3px 0 0", opacity: 0.92 }} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: "-20%",
          right: "-20%",
          bottom: 0,
          height: "38%",
          background: "linear-gradient(180deg,#2A2440,#100C18)",
          clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: "1.4%",
          height: "38%",
          transform: "translateX(-50%)",
          background: `repeating-linear-gradient(180deg, #FFD60A 0 18px, transparent 18px 40px)`,
          backgroundPositionY: `${t * 6}px`,
          clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
        }}
      />
      <div style={{ position: "absolute", left: "50%", bottom: "7%", width: "16%", height: "9%", transform: `translateX(calc(-50% + ${Math.sin(t / 25 + seed) * 20}px))`, background: "#E8344A", borderRadius: "30% 30% 12% 12%", boxShadow: "0 6px 0 #111" }} />
    </div>
  );
};
