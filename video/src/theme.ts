import { continueRender, delayRender, Easing, staticFile } from "remotion";

/**
 * Fonts: Manrope (headlines) and Inter (body/captions), the same Google Fonts
 * files, bundled in public/fonts so renders work offline and never depend on
 * a network font fetch.
 */
export const FONT_HEAD = "Manrope";
export const FONT_BODY = "Inter";

const loadLocalFont = async (family: string, file: string, weight: string) => {
  if (typeof document === "undefined") return;
  const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)}) format("woff2")`, { weight, style: "normal" });
  await face.load();
  (document.fonts as unknown as { add: (f: FontFace) => void }).add(face);
};

const fontHandle = typeof document !== "undefined" ? delayRender("Loading Manrope + Inter") : null;
export const fontsReady: Promise<unknown> = Promise.all([
  loadLocalFont(FONT_HEAD, "Manrope-latin-var.woff2", "200 800"),
  loadLocalFont(FONT_BODY, "Inter-latin-var.woff2", "100 900"),
])
  .then(() => {
    if (fontHandle !== null) continueRender(fontHandle);
  })
  .catch((e) => {
    console.error("Font loading failed", e);
    if (fontHandle !== null) continueRender(fontHandle);
  });

export const C = {
  bg: "#FAFAF7",
  bgDark: "#070707",
  ink: "#0A0A0A",
  muted: "#8A8A8A",
  yellow: "#FFD60A",
  orange: "#FF8A00",
  amber: "#FFB800",
  line: "rgba(10,10,10,0.08)",
  green: "#22C55E",
  red: "#EF4444",
};

/** Warm gradient used for keywords on light backgrounds. */
export const WARM_GRADIENT = `linear-gradient(92deg, ${C.orange} 0%, ${C.amber} 100%)`;
/** Yellow gradient used for keywords on dark backgrounds. */
export const YELLOW_GRADIENT = `linear-gradient(92deg, ${C.amber} 0%, ${C.yellow} 60%, #FFE867 100%)`;

export const gradientText = (dark: boolean): React.CSSProperties => ({
  backgroundImage: dark ? YELLOW_GRADIENT : WARM_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
});

/** Signature ease-out used across the piece: cubic-bezier(0.16, 1, 0.3, 1). */
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN = Easing.bezier(0.5, 0, 0.75, 0);

export const FPS = 60;
export const W = 1920;
export const H = 1080;
