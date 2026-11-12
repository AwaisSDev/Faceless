import React from "react";

/** App marks drawn as simple SVGs (recreations of the real app icons). */

export const YouTubeLogo: React.FC<{ h?: number; dark?: boolean; word?: boolean }> = ({ h = 40, dark = false, word = true }) => (
  <div style={{ display: "flex", alignItems: "center", gap: h * 0.12 }}>
    <svg width={h * 1.42} height={h} viewBox="0 0 142 100">
      <rect x="0" y="0" width="142" height="100" rx="26" fill="#FF0033" />
      <path d="M57 29 L57 71 L93 50 Z" fill="#fff" />
    </svg>
    {word && (
      <span
        style={{
          fontFamily: "Arial Narrow, Roboto Condensed, Arial, sans-serif",
          fontWeight: 700,
          fontSize: h * 0.82,
          letterSpacing: "-0.06em",
          color: dark ? "#fff" : "#0F0F0F",
          transform: "scaleX(0.92)",
          transformOrigin: "left",
        }}
      >
        YouTube
      </span>
    )}
  </div>
);

export const ShortsLogo: React.FC<{ h?: number }> = ({ h = 40 }) => (
  <svg width={h * 0.82} height={h} viewBox="0 0 82 100">
    <path
      d="M58 4c10-5 22-1 27 9s1 22-9 27l-8 4c7 1 13 5 16 12 5 10 1 22-9 27L34 104c-10 5-22 1-27-9s-1-22 9-27l8-4c-7-1-13-5-16-12-5-10-1-22 9-27z"
      fill="#FF0033"
      transform="scale(0.86) translate(4,-2)"
    />
    <path d="M33 33 L33 65 L58 49 Z" fill="#fff" />
  </svg>
);

export const TikTokLogo: React.FC<{ h?: number; bg?: boolean }> = ({ h = 40, bg = true }) => {
  const note = "M54 10h14c1 9 7 16 17 17v14c-7 0-13-2-17-5v27c0 14-11 25-25 25S18 77 18 63s11-25 25-25c2 0 3 0 5 1v14c-2-1-3-1-5-1-6 0-11 5-11 11s5 11 11 11 11-5 11-11z";
  return (
    <svg width={h} height={h} viewBox="0 0 100 100">
      {bg && <rect width="100" height="100" rx="24" fill="#000" />}
      <g transform="translate(-1,2)">
        <path d={note} fill="#25F4EE" transform="translate(-3,-3)" />
        <path d={note} fill="#FE2C55" transform="translate(3,3)" />
        <path d={note} fill="#fff" />
      </g>
    </svg>
  );
};

export const InstagramLogo: React.FC<{ h?: number }> = ({ h = 40 }) => (
  <svg width={h} height={h} viewBox="0 0 100 100">
    <defs>
      <radialGradient id="igg" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#FDF497" />
        <stop offset="5%" stopColor="#FDF497" />
        <stop offset="45%" stopColor="#FD5949" />
        <stop offset="60%" stopColor="#D6249F" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="100" height="100" rx="24" fill="url(#igg)" />
    <rect x="22" y="22" width="56" height="56" rx="17" fill="none" stroke="#fff" strokeWidth="7" />
    <circle cx="50" cy="50" r="13.5" fill="none" stroke="#fff" strokeWidth="7" />
    <circle cx="67.5" cy="32.5" r="4.5" fill="#fff" />
  </svg>
);

export const WhopLogo: React.FC<{ h?: number; word?: boolean; dark?: boolean }> = ({ h = 36, word = true, dark = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: h * 0.18 }}>
    <svg width={h * 1.45} height={h} viewBox="0 0 145 100">
      <path d="M8 22 Q22 14 32 24 L58 62 L45 82 Z" fill="#FA4616" />
      <path d="M44 22 Q58 14 68 24 L94 62 L81 82 Z" fill="#FA4616" />
      <path d="M86 26 Q104 10 124 22 Q134 28 128 38 L108 70 L92 46 Z" fill="#FA4616" />
    </svg>
    {word && (
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: h * 0.72, letterSpacing: "-0.03em", color: dark ? "#fff" : "#141212" }}>
        Whop
      </span>
    )}
  </div>
);

export const ContentRewardsLogo: React.FC<{ h?: number }> = ({ h = 36 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: h * 0.22 }}>
    <svg width={h} height={h} viewBox="0 0 100 100">
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return <path key={i} d="M0-12 L3.5-3.5 L12 0 L3.5 3.5 L0 12 L-3.5 3.5 L-12 0 L-3.5-3.5Z" fill="#141212" transform={`translate(${50 + Math.cos(a) * 32},${50 + Math.sin(a) * 32})`} />;
      })}
    </svg>
    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: h * 0.4, lineHeight: 0.95, color: "#141212" }}>
      Content
      <br />
      Rewards
    </div>
  </div>
);

export const OpusClipLogo: React.FC<{ h?: number; word?: boolean }> = ({ h = 34, word = true }) => (
  <div style={{ display: "flex", alignItems: "center", gap: h * 0.22 }}>
    <svg width={h} height={h} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeWidth="16" />
      <path d="M50 10 A40 40 0 0 1 90 50" fill="none" stroke="#000" strokeWidth="18" />
      <circle cx="78" cy="22" r="10" fill="#fff" />
    </svg>
    {word && <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: h * 0.62, color: "#fff", letterSpacing: "-0.02em" }}>OpusClip</span>}
  </div>
);

export const CapCutLogo: React.FC<{ h?: number; word?: boolean; color?: string }> = ({ h = 30, word = true, color = "#fff" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: h * 0.18 }}>
    <svg width={h * 1.2} height={h} viewBox="0 0 120 100">
      <path d="M10 18 H58 L72 32 L58 46 H24 V54 H58 L72 68 L58 82 H10 Z" fill="none" stroke={color} strokeWidth="9" strokeLinejoin="round" />
      <path d="M110 18 H62 L48 32 L62 46 H96 V54 H62 L48 68 L62 82 H110 Z" fill="none" stroke={color} strokeWidth="9" strokeLinejoin="round" />
    </svg>
    {word && <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: h * 0.62, color, letterSpacing: "-0.02em" }}>CapCut</span>}
  </div>
);

/** Generic line icons (Material/Lucide-like). */
export const Icon: React.FC<{ name: string; size?: number; color?: string; fill?: string; stroke?: number }> = ({
  name,
  size = 32,
  color = "#fff",
  fill = "none",
  stroke = 2,
}) => {
  const p: Record<string, React.ReactNode> = {
    like: <path d="M7 10v11H3V10h4zm2 11h9.2a2 2 0 0 0 2-1.6l1.3-7A2 2 0 0 0 19.5 10H14l1-4.5A2 2 0 0 0 13 3L9 10v11z" />,
    dislike: <path d="M17 14V3h4v11h-4zm-2-11H5.8a2 2 0 0 0-2 1.6l-1.3 7A2 2 0 0 0 4.5 14H10l-1 4.5A2 2 0 0 0 11 21l4-7V3z" />,
    comment: <path d="M4 4h16v12H8l-4 4V4z" />,
    share: <path d="M14 5l7 7-7 7v-4c-6 0-9 2-11 5 1-6 4-10 11-11V5z" />,
    remix: <path d="M4 7h11l-3-3M20 17H9l3 3M18 4v6M6 14v6" />,
    heart: <path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z" />,
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3z" />,
    send: <path d="M21 3L3 10l7 3 3 7 8-17zM10 13l4-4" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </>
    ),
    more: (
      <>
        <circle cx="12" cy="5" r="1.4" fill={color} />
        <circle cx="12" cy="12" r="1.4" fill={color} />
        <circle cx="12" cy="19" r="1.4" fill={color} />
      </>
    ),
    home: <path d="M3 11l9-8 9 8v10h-6v-6H9v6H3V11z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    music: <path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm11-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />,
    play: <path d="M7 4l13 8-13 8V4z" />,
    check: <path d="M4 12.5l5 5L20 6.5" />,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
    upload: <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    dollar: <path d="M12 2v20M17 6.5C16 5 14.3 4.5 12 4.5c-3 0-5 1.4-5 3.5 0 5 10 2.5 10 8 0 2.2-2.2 3.5-5 3.5-2.4 0-4.4-.8-5.3-2.5" />,
    users: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21c0-4 3-6 7-6s7 2 7 6M16 4a4 4 0 0 1 0 8M22 21c0-3-2-5-4-5.5" />
      </>
    ),
    scissors: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" />
      </>
    ),
    film: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4" />
      </>
    ),
    sparkles: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />,
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </>
    ),
    gamepad: (
      <>
        <rect x="2" y="7" width="20" height="11" rx="5" />
        <path d="M7 11v4M5 13h4M15.5 12h.01M18 14h.01" />
      </>
    ),
    book: <path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4zm16 0h-4a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h5V4z" />,
    shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />,
    alert: <path d="M12 3l10 18H2L12 3zM12 10v5M12 18h.01" />,
    trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
    pause: <path d="M8 5v14M16 5v14" />,
    bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2zM10 21h4" />,
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    flame: <path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-4 5-4 7-1-1-2-2-2-4-2 2-3 5-3 9 0 4 3 7 7 7z" />,
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
    refresh: <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4" />,
    zoom: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4M8 11h6M11 8v6" />
      </>
    ),
    type: <path d="M4 7V4h16v3M9 20h6M12 4v16" />,
    download: <path d="M12 4v12M7 11l5 5 5-5M4 20h16" />,
    star: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      {p[name] ?? null}
    </svg>
  );
};
