import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EXPO_OUT, QUINT_OUT, settle } from "../lib/motion";
import { FakeFrame } from "./FakeFrame";
import { CapCutLogo, Icon } from "./icons";

const INTER = "Inter, Arial, sans-serif";
const CYAN = "#04BED1";
const PANEL = "#262626";
const GAP = "#131313";
const TEXT_CLIP = "#9F5A42";
const VIDEO_CLIP = "#0D5C64";

export type CapCutTimes = {
  trim: number;
  hook: number;
  captions: number;
  zoom: number;
  voice: number;
  payoff: number;
  export: number;
};

const on = (f: number, at: number, d = 16) => interpolate(f, [at, at + d], [0, 1], { ...clamp, easing: EXPO_OUT });

/**
 * CapCut desktop editor (dark): top bar with Export, tool tabs, left panel,
 * 9:16 player, right properties panel, timeline with text / video / audio
 * tracks. Each editing step appears at its frame in `t`.
 */
export const CapCutEditor: React.FC<{ t: CapCutTimes; width?: number; showSafeZone?: boolean }> = ({ t, width = 1600, showSafeZone = true }) => {
  const f = useCurrentFrame();
  const W = 1600;
  const H = 900;
  const s = width / W;
  const trimP = on(f, t.trim, 26);
  const hookP = on(f, t.hook);
  const capP = on(f, t.captions);
  const zoomP = on(f, t.zoom, 30);
  const voiceP = on(f, t.voice);
  const endP = on(f, t.payoff, 26);
  const tab = f >= t.voice ? "Audio" : f >= t.captions ? "Captions" : f >= t.hook ? "Text" : "Media";
  const safe = showSafeZone && f >= t.captions + 20 && f < t.zoom - 10 ? on(f, t.captions + 20) : 0;
  // Video clip in the timeline: starts at x=0..., trim cuts first 18% then ripple left; payoff trims tail.
  const clipStart = 0;
  const clipW = 760 * (1 - 0.16 * trimP - 0.12 * endP);
  const zoomScale = 1 + 0.32 * zoomP * Math.min(1, interpolate(f, [t.zoom + 30, t.zoom + 90], [1, 1], clamp));
  return (
    <div style={{ width: W * s, height: H * s, position: "relative" }}>
      <div
        style={{
          width: W,
          height: H,
          transform: `scale(${s})`,
          transformOrigin: "0 0",
          background: GAP,
          borderRadius: 16,
          overflow: "hidden",
          fontFamily: INTER,
          color: "#E6E6E6",
          position: "relative",
          boxShadow: "0 50px 140px rgba(0,0,0,0.35)",
        }}
      >
        {/* top bar */}
        <div style={{ height: 46, background: "#141414", display: "flex", alignItems: "center", padding: "0 14px", gap: 14, fontSize: 14 }}>
          <CapCutLogo h={20} />
          <div style={{ background: "#2A2A2A", borderRadius: 6, padding: "5px 10px", fontSize: 13 }}>Menu ▾</div>
          <div style={{ color: "#9DA5AB", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#3BC47A", display: "inline-block" }} /> Auto saved
          </div>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 14, fontWeight: 600 }}>gta6-clip-01</div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: "#2A2A2A", borderRadius: 6, padding: "6px 12px", fontSize: 13 }}>Share</div>
            <div style={{ background: CYAN, color: "#fff", borderRadius: 6, padding: "6px 16px", fontSize: 13, fontWeight: 700, display: "flex", gap: 6, alignItems: "center", boxShadow: f >= t.export - 20 && f < t.export + 10 ? "0 0 0 4px rgba(4,190,209,0.35)" : undefined }}>
              <Icon name="upload" size={14} stroke={2.4} /> Export
            </div>
          </div>
        </div>
        {/* body */}
        <div style={{ position: "absolute", top: 50, left: 4, right: 4, height: 520, display: "flex", gap: 4 }}>
          {/* left: tabs + panel */}
          <div style={{ width: 470, background: PANEL, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 2, padding: "8px 8px 6px", borderBottom: "1px solid #1C1C1C" }}>
              {[
                ["Media", "film"],
                ["Audio", "music"],
                ["Text", "type"],
                ["Stickers", "star"],
                ["Effects", "sparkles"],
                ["Captions", "comment"],
                ["Filters", "eye"],
              ].map(([n, ic]) => (
                <div key={n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 11, color: tab === n ? CYAN : "#CFCFCF", padding: "4px 0" }}>
                  <Icon name={ic} size={18} color={tab === n ? CYAN : "#CFCFCF"} />
                  {n}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ width: 120, padding: 8, display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5 }}>
                {(tab === "Captions"
                  ? ["Auto captions", "Templates", "Add captions"]
                  : tab === "Text"
                    ? ["Add text", "Text templates", "Auto captions"]
                    : tab === "Audio"
                      ? ["Record voice", "Music", "Sound effects"]
                      : ["Import", "Library", "Stock"]
                ).map((x, i) => (
                  <div key={x} style={{ padding: "8px 10px", borderRadius: 6, background: i === 0 ? "#363636" : "transparent", color: i === 0 ? CYAN : "#CFCFCF" }}>
                    {x}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, padding: 12 }}>
                {tab === "Media" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} style={{ position: "relative", aspectRatio: "9/16", borderRadius: 8, overflow: "hidden", border: i === 0 ? `2px solid ${CYAN}` : "none" }}>
                        <FakeFrame kind={i % 2 ? "stream" : "city"} seed={i} moving={false} />
                      </div>
                    ))}
                  </div>
                )}
                {tab === "Text" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ background: "#333", borderRadius: 8, padding: "26px 14px", textAlign: "center", fontWeight: 800, fontSize: 18 }}>Default text</div>
                    {["HOOK BOLD", "Outline pop", "Yellow box"].map((x, i) => (
                      <div key={x} style={{ background: "#1E1E1E", borderRadius: 8, padding: "14px", textAlign: "center", fontWeight: 900, fontSize: 16, color: i === 2 ? "#000" : "#fff" }}>
                        <span style={{ background: i === 2 ? "#FFD60A" : "transparent", padding: "2px 6px", WebkitTextStroke: i === 1 ? "1px #000" : undefined }}>{x}</span>
                      </div>
                    ))}
                  </div>
                )}
                {tab === "Captions" && (
                  <div style={{ fontSize: 13 }}>
                    <div style={{ color: "#BDBDBD" }}>Spoken language</div>
                    <div style={{ background: "#333237", borderRadius: 6, padding: "8px 10px", marginTop: 6 }}>English ▾</div>
                    <div style={{ marginTop: 12, color: "#BDBDBD" }}>Style</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
                      {["Bold white", "Yellow pop", "Boxed", "Outline"].map((x, i) => (
                        <div key={x} style={{ background: "#1C1C1C", borderRadius: 8, padding: "14px 6px", textAlign: "center", fontWeight: 900, fontSize: 14, border: i === 1 ? `2px solid ${CYAN}` : "1px solid #333", color: i === 1 ? "#FFD60A" : "#fff" }}>
                          {x}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 14, background: CYAN, borderRadius: 6, padding: "8px 0", textAlign: "center", color: "#fff", fontWeight: 700 }}>Generate</div>
                  </div>
                )}
                {tab === "Audio" && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, paddingTop: 30 }}>
                    <div style={{ width: 86, height: 86, borderRadius: "50%", background: "#E64545", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 ${8 + 6 * Math.abs(Math.sin(f / 10))}px rgba(230,69,69,0.25)` }}>
                      <Icon name="mic" size={40} stroke={2.2} />
                    </div>
                    <div style={{ fontSize: 14 }}>Recording voiceover... 0:0{Math.min(8, Math.max(0, Math.floor((f - t.voice) / 60)))}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* player */}
          <div style={{ flex: 1, background: PANEL, borderRadius: 8, position: "relative" }}>
            <div style={{ height: 40, display: "flex", alignItems: "center", padding: "0 14px", fontSize: 14 }}>Player</div>
            <div style={{ position: "absolute", top: 46, bottom: 46, left: "50%", transform: "translateX(-50%)", aspectRatio: "9/16", overflow: "hidden", background: "#000" }}>
              <div style={{ position: "absolute", inset: 0, transform: `scale(${zoomScale})` }}>
                <FakeFrame kind="city" seed={1} />
              </div>
              {/* hook text */}
              <div style={{ position: "absolute", top: "13%", left: "8%", right: "8%", textAlign: "center", opacity: hookP, transform: `scale(${0.8 + 0.2 * hookP})` }}>
                <span style={{ background: "#FFD60A", color: "#000", fontWeight: 900, fontSize: 19, padding: "4px 8px", borderRadius: 6, lineHeight: 1.5, boxDecorationBreak: "clone" }}>He did NOT expect the cops to do this</span>
              </div>
              {/* captions: default vs styled */}
              <div style={{ position: "absolute", left: "8%", right: "14%", top: capP > 0 ? "58%" : "84%", textAlign: "center", fontWeight: capP > 0 ? 900 : 500, fontSize: capP > 0 ? 22 : 13, color: "#fff", textShadow: capP > 0 ? "0 2px 0 #000, 0 0 8px rgba(0,0,0,0.8)" : "none", WebkitTextStroke: capP > 0 ? "1px #000" : undefined }}>
                {capP > 0 ? (
                  <>
                    WAIT FOR <span style={{ color: "#FFD60A" }}>IT</span>
                  </>
                ) : (
                  "wait for it, wait for it"
                )}
              </div>
              {/* safe zone */}
              {safe > 0 && (
                <>
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "20%", background: "repeating-linear-gradient(135deg, rgba(239,68,68,0.45) 0 6px, rgba(239,68,68,0.15) 6px 12px)", opacity: safe }} />
                  <div style={{ position: "absolute", top: "30%", bottom: "20%", right: 0, width: "16%", background: "repeating-linear-gradient(135deg, rgba(239,68,68,0.45) 0 6px, rgba(239,68,68,0.15) 6px 12px)", opacity: safe }} />
                  <div style={{ position: "absolute", left: "6%", right: "18%", top: "10%", bottom: "22%", border: "2px dashed #22C55E", borderRadius: 8, opacity: safe }} />
                </>
              )}
              {/* voice indicator */}
              {voiceP > 0 && (
                <div style={{ position: "absolute", left: 10, top: 10, display: "flex", alignItems: "center", gap: 5, background: "rgba(0,0,0,0.6)", borderRadius: 999, padding: "4px 8px", fontSize: 11, opacity: voiceP }}>
                  <Icon name="mic" size={12} color="#FFD60A" /> your voice
                </div>
              )}
            </div>
            <div style={{ position: "absolute", bottom: 10, left: 14, right: 14, display: "flex", alignItems: "center", fontSize: 13 }}>
              <span style={{ color: CYAN }}>00:00:0{Math.floor(f / 60) % 10}:12</span>
              <span style={{ color: "#888", marginLeft: 8 }}>/ 00:00:3{endP > 0.5 ? 1 : 8}:20</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 10, color: "#BBB" }}>
                <span style={{ border: "1px solid #666", borderRadius: 3, padding: "0 4px" }}>9:16</span>
                <Icon name="play" size={16} color="#ddd" fill="#ddd" stroke={0} />
              </div>
            </div>
          </div>
          {/* right panel */}
          <div style={{ width: 380, background: PANEL, borderRadius: 8, padding: 14, fontSize: 13 }}>
            <div style={{ display: "flex", gap: 18, fontSize: 14, borderBottom: "1px solid #1C1C1C", paddingBottom: 10 }}>
              {["Video", "Animation", "Speed", "Adjust"].map((x, i) => (
                <span key={x} style={{ color: i === 0 ? CYAN : "#CFCFCF" }}>{x}</span>
              ))}
            </div>
            {[
              ["Scale", `${Math.round(100 * zoomScale)}%`],
              ["Position", "X 0   Y 0"],
              ["Rotate", "0°"],
              ["Opacity", "100%"],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, color: i === 0 && zoomP > 0 ? "#fff" : "#BDBDBD" }}>
                <span>{k}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ background: "#333237", borderRadius: 5, padding: "5px 10px", minWidth: 70, textAlign: "center", border: i === 0 && zoomP > 0 ? `1px solid ${CYAN}` : "1px solid transparent" }}>{v}</span>
                  <span style={{ color: i === 0 && zoomP > 0 ? CYAN : "#666" }}>◆</span>
                </span>
              </div>
            ))}
            <div style={{ marginTop: 22, color: "#BDBDBD" }}>Keyframes</div>
            <div style={{ marginTop: 8, height: 30, background: "#1E1E1E", borderRadius: 6, position: "relative" }}>
              {zoomP > 0 &&
                [0.3, 0.55].map((x, i) => (
                  <span key={i} style={{ position: "absolute", left: `${x * 100}%`, top: 6, color: CYAN, opacity: on(f, t.zoom + i * 14) }}>
                    ◆
                  </span>
                ))}
            </div>
          </div>
        </div>
        {/* timeline */}
        <div style={{ position: "absolute", top: 574, left: 4, right: 4, bottom: 4, background: PANEL, borderRadius: 8 }}>
          <div style={{ height: 38, display: "flex", alignItems: "center", gap: 18, padding: "0 14px", color: "#CFCFCF", borderBottom: "1px solid #1C1C1C" }}>
            <Icon name="scissors" size={18} color={f >= t.trim && f < t.trim + 40 ? CYAN : "#CFCFCF"} />
            <Icon name="refresh" size={18} color="#CFCFCF" />
            <Icon name="x" size={18} color="#CFCFCF" />
            <div style={{ marginLeft: "auto", display: "flex", gap: 14, alignItems: "center", fontSize: 12 }}>
              <Icon name="mic" size={18} color={voiceP > 0 ? "#E64545" : "#CFCFCF"} />
              <Icon name="zoom" size={18} color="#CFCFCF" />
            </div>
          </div>
          {/* ruler */}
          <div style={{ position: "relative", height: 26, marginLeft: 120, color: "#777", fontSize: 11 }}>
            {[0, 5, 10, 15, 20, 25, 30, 35].map((x, i) => (
              <span key={x} style={{ position: "absolute", left: i * 140, top: 6 }}>
                |00:{String(x).padStart(2, "0")}
              </span>
            ))}
          </div>
          {/* tracks */}
          <div style={{ position: "relative", marginLeft: 120, height: 220 }}>
            {/* hook text track */}
            <div style={{ position: "absolute", left: 0, top: 8, height: 30, width: 420, background: TEXT_CLIP, borderRadius: 5, fontSize: 12, padding: "7px 10px", opacity: hookP, transform: `scaleX(${0.5 + 0.5 * hookP})`, transformOrigin: "left", whiteSpace: "nowrap", overflow: "hidden" }}>
              T  He did NOT expect the cops to do this
            </div>
            {/* captions track */}
            <div style={{ position: "absolute", left: 0, top: 44, height: 30, display: "flex", gap: 3, opacity: capP }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{ width: 98, background: "#8A6A2B", borderRadius: 5, fontSize: 11, padding: "7px 6px", whiteSpace: "nowrap", overflow: "hidden" }}>
                  Caption {i + 1}
                </div>
              ))}
            </div>
            {/* video track */}
            <div style={{ position: "absolute", left: clipStart, top: 82, height: 70, width: clipW, background: VIDEO_CLIP, borderRadius: 6, overflow: "hidden", border: `2px solid ${f >= t.trim && f < t.trim + 40 ? "#fff" : "transparent"}` }}>
              <div style={{ height: 18, fontSize: 11, padding: "2px 8px", background: "rgba(0,0,0,0.25)", whiteSpace: "nowrap" }}>gta6_launch_clip_opus_99.mp4</div>
              <div style={{ display: "flex", height: 52 }}>
                {new Array(14).fill(0).map((_, i) => (
                  <div key={i} style={{ width: 54, height: 52, position: "relative", flex: "0 0 auto", borderRight: "1px solid rgba(0,0,0,0.3)" }}>
                    <FakeFrame kind="city" seed={i} moving={false} />
                  </div>
                ))}
              </div>
              {zoomP > 0 && (
                <div style={{ position: "absolute", left: "38%", top: 22, color: CYAN, fontSize: 16, textShadow: "0 0 6px #000" }}>
                  ◆ <span style={{ fontSize: 11 }}>zoom</span>
                </div>
              )}
            </div>
            {/* cut-away piece flying out during trim */}
            {f >= t.trim && f < t.trim + 30 && (
              <div style={{ position: "absolute", left: -10, top: 82 - 60 * trimP, height: 70, width: 760 * 0.16, background: "#4A2222", borderRadius: 6, opacity: 1 - trimP, border: "2px dashed #E64545" }} />
            )}
            {/* voice track */}
            <div style={{ position: "absolute", left: 40, top: 160, height: 40, width: 360 * voiceP, background: "#2F4FA8", borderRadius: 5, overflow: "hidden", display: voiceP > 0.01 ? "flex" : "none", alignItems: "center", gap: 2, padding: "0 6px", boxSizing: "border-box" }}>
              {new Array(60).fill(0).map((_, i) => (
                <div key={i} style={{ width: 3, height: 6 + 22 * Math.abs(Math.sin(i * 1.7)), background: "#9DB4FF", borderRadius: 2 }} />
              ))}
            </div>
            {/* playhead */}
            <div style={{ position: "absolute", left: 140 + ((f / 2) % 500), top: -26, width: 2, height: 250, background: "#fff" }}>
              <div style={{ position: "absolute", top: -2, left: -6, width: 14, height: 12, background: "#fff", borderRadius: "3px 3px 6px 6px" }} />
            </div>
          </div>
          <div style={{ position: "absolute", left: 14, top: 112, display: "flex", flexDirection: "column", gap: 22, color: "#888", fontSize: 12 }}>
            <span>T  text</span>
            <span>▤  captions</span>
            <span style={{ marginTop: 16 }}>▶  main</span>
            <span style={{ marginTop: 22 }}>♪  voice</span>
          </div>
        </div>
        {/* export dialog */}
        {f >= t.export && <ExportDialog at={t.export} />}
      </div>
    </div>
  );
};

const ExportDialog: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const p = settle(f, at);
  const press = f >= at + 70 && f < at + 78;
  const prog = interpolate(f, [at + 80, at + 170], [0, 1], { ...clamp, easing: QUINT_OUT });
  return (
    <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${0.55 * p})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 760, background: "#2B2B2B", borderRadius: 12, padding: 24, transform: `scale(${0.94 + 0.06 * p})`, opacity: p, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Export</div>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ width: 150, aspectRatio: "9/16", borderRadius: 8, overflow: "hidden", position: "relative" }}>
            <FakeFrame kind="city" seed={1} moving={false} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
            {[
              ["Name", "gta6-clip-01"],
              ["Export to", "Desktop / clips"],
              ["Resolution", "1080 x 1920"],
              ["Bit rate", "Recommended"],
              ["Codec", "H.264"],
              ["Format", "MP4"],
              ["Frame rate", "60fps"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#AAA" }}>{k}</span>
                <span style={{ background: "#3A3A3A", borderRadius: 5, padding: "6px 12px", minWidth: 200, border: k === "Resolution" ? `1px solid ${CYAN}` : "1px solid transparent", color: k === "Resolution" ? "#fff" : "#DDD", fontWeight: k === "Resolution" ? 700 : 500 }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, marginTop: 20 }}>
          {prog > 0 && (
            <div style={{ flex: 1, height: 6, background: "#444", borderRadius: 9, overflow: "hidden" }}>
              <div style={{ width: `${prog * 100}%`, height: "100%", background: CYAN }} />
            </div>
          )}
          <div style={{ background: "#3A3A3A", borderRadius: 6, padding: "8px 18px", fontSize: 14 }}>Cancel</div>
          <div style={{ background: CYAN, borderRadius: 6, padding: "8px 22px", fontSize: 14, fontWeight: 700, transform: `scale(${press ? 0.93 : 1})` }}>{prog >= 1 ? "Done" : "Export"}</div>
        </div>
      </div>
    </div>
  );
};
