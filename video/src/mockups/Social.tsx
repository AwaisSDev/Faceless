import React from "react";
import { FakeFrame } from "./FakeFrame";
import { Icon } from "./icons";

const SYS = "Inter, -apple-system, Arial, sans-serif";

/** TikTok For You feed screen (mobile). */
export const TikTokScreen: React.FC<{ title?: string; user?: string; kind?: "city" | "podcast" | "blocks" | "stream"; seed?: number }> = ({
  title = "Wait for his reaction #gaming #fyp",
  user = "nightdrive.clips",
  kind = "city",
  seed = 1,
}) => (
  <div style={{ position: "absolute", inset: 0, background: "#000", fontFamily: SYS, color: "#fff" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: "14%", bottom: "20%" }}>
      <FakeFrame kind={kind} seed={seed} />
    </div>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0.4),transparent 16%,transparent 64%,rgba(0,0,0,0.7) 92%)" }} />
    <div style={{ position: "absolute", top: 54, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22, fontSize: 16, fontWeight: 600 }}>
      <span style={{ opacity: 0.6 }}>Following</span>
      <span style={{ borderBottom: "3px solid #fff", paddingBottom: 6 }}>For You</span>
    </div>
    <div style={{ position: "absolute", right: 10, bottom: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, fontSize: 12, fontWeight: 600 }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#FFD60A,#FF8A00)", border: "2px solid #fff", position: "relative" }}>
        <div style={{ position: "absolute", bottom: -9, left: "50%", transform: "translateX(-50%)", width: 18, height: 18, borderRadius: "50%", background: "#FE2C55", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="plus" size={12} stroke={3} />
        </div>
      </div>
      {[
        ["heart", "88.4K"],
        ["comment", "1,204"],
        ["bookmark", "9,312"],
        ["share", "4,870"],
      ].map(([ic, n]) => (
        <div key={ic} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Icon name={ic} size={34} fill="#fff" stroke={0} />
          {n}
        </div>
      ))}
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "conic-gradient(#333,#111,#333)", border: "8px solid #222" }} />
    </div>
    <div style={{ position: "absolute", left: 12, right: 70, bottom: 92 }}>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{user}</div>
      <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 13, marginTop: 8, display: "flex", gap: 6, alignItems: "center", opacity: 0.9 }}>
        <Icon name="music" size={14} /> original sound
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 74, background: "#000", display: "flex", justifyContent: "space-around", alignItems: "center", fontSize: 10, color: "#fff" }}>
      {["Home", "Friends", "+", "Inbox", "Profile"].map((t) =>
        t === "+" ? (
          <div key={t} style={{ width: 46, height: 30, borderRadius: 9, background: "#fff", boxShadow: "-3px 0 0 #25F4EE, 3px 0 0 #FE2C55", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="plus" size={18} color="#000" stroke={3} />
          </div>
        ) : (
          <div key={t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: t === "Home" ? 1 : 0.7 }}>
            <Icon name={t === "Home" ? "home" : t === "Friends" ? "users" : t === "Inbox" ? "comment" : "users"} size={22} />
            {t}
          </div>
        ),
      )}
    </div>
  </div>
);

/** Instagram Reels screen (mobile). */
export const ReelsScreen: React.FC<{ caption?: string; user?: string; kind?: "city" | "podcast" | "blocks" | "stream"; seed?: number }> = ({
  caption = "Nobody expected this ... more",
  user = "nightdrive.clips",
  kind = "podcast",
  seed = 2,
}) => (
  <div style={{ position: "absolute", inset: 0, background: "#000", fontFamily: SYS, color: "#fff" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: "12%", bottom: "16%" }}>
      <FakeFrame kind={kind} seed={seed} />
    </div>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0.35),transparent 15%,transparent 62%,rgba(0,0,0,0.75) 92%)" }} />
    <div style={{ position: "absolute", top: 52, left: 18, right: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 22, fontWeight: 700 }}>Reels</span>
      <Icon name="search" size={22} />
    </div>
    <div style={{ position: "absolute", right: 12, bottom: 110, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, fontSize: 12, fontWeight: 600 }}>
      {[
        ["heart", "21.7K"],
        ["comment", "394"],
        ["send", ""],
        ["more", ""],
      ].map(([ic, n]) => (
        <div key={ic} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Icon name={ic} size={28} stroke={2} />
          {n}
        </div>
      ))}
      <div style={{ width: 30, height: 30, borderRadius: 7, border: "2px solid #fff", background: "linear-gradient(135deg,#FFD60A,#FF8A00)" }} />
    </div>
    <div style={{ position: "absolute", left: 14, right: 70, bottom: 86 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#FFD60A,#FF8A00)" }} />
        {user}
        <span style={{ border: "1px solid rgba(255,255,255,0.7)", borderRadius: 8, padding: "4px 10px", fontSize: 13 }}>Follow</span>
      </div>
      <div style={{ fontSize: 14, marginTop: 10 }}>{caption}</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 66, background: "#000", borderTop: "1px solid #222", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      {["home", "send", "film", "search", "users"].map((ic) => (
        <Icon key={ic} name={ic} size={26} stroke={ic === "film" ? 2.6 : 2} />
      ))}
    </div>
  </div>
);
