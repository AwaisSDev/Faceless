import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../../components/Camera";
import { CardBurst } from "../../components/CardBurst";
import { FocusCamera, SlotCard } from "../../components/FocusCamera";
import { Kinetic } from "../../components/KineticText";
import { StackedLines } from "../../components/StackedLines";
import { Chip, Connector, Cursor, Headline, HighlightRing } from "../../components/Teaching";
import { Reveal, UICard } from "../../components/UICard";
import { At, Phase, Row } from "../../lib/helpers";
import { clamp, EXPO_OUT, mix, settle } from "../../lib/motion";
import { useCue, useScene } from "../../lib/scene";
import { FakeFrame } from "../../mockups/FakeFrame";
import { CapCutLogo, Icon, InstagramLogo, OpusClipLogo, TikTokLogo, YouTubeLogo } from "../../mockups/icons";
import { OpusClipApp, ScoreBadge } from "../../mockups/OpusClip";
import { DEMO_CAMPAIGN, WhopCampaignPage, WhopDiscoverCard } from "../../mockups/Whop";
import { C, FONT_BODY, FONT_HEAD, gradientText } from "../../theme";
import { SLOT_TEXT } from "./scenes";

/* ------------------------------------------------------------------ */
/* 1. Cold open: one long video in, ten clips out                      */
/* ------------------------------------------------------------------ */
const SplitTimeline: React.FC<{ at: number; splitAt: number }> = ({ at, splitAt }) => {
  const f = useCurrentFrame();
  const appear = settle(f, at);
  const kinds = ["city", "podcast", "stream", "city", "blocks", "podcast", "city", "stream", "podcast", "city"] as const;
  const titles = ["Wait for it...", "He did NOT expect that", "Nobody saw this coming", "The cops though", "Did you notice this?", "Watch the end", "POV: day one", "Best moment ever", "No way this worked", "He actually did it"];
  return (
    <div style={{ position: "relative", width: 1600, height: 420, opacity: appear, transform: `scale(${0.92 + 0.08 * appear})` }}>
      {kinds.map((k, i) => {
        const p = interpolate(f, [splitAt + i * 4, splitAt + i * 4 + 36], [0, 1], { ...clamp, easing: EXPO_OUT });
        const segW = 160;
        const x0 = i * segW;
        const y0 = 150;
        const w = mix(segW, 138, p);
        const h = mix(110, 246, p);
        const x = mix(x0, 10 + i * 158, p);
        const y = mix(y0, 70 + Math.abs(i - 4.5) * 8, p);
        const rot = mix(0, (i - 4.5) * 2.2, p);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: h,
              borderRadius: mix(i === 0 ? 14 : 0, 14, p),
              borderTopRightRadius: mix(i === 9 ? 14 : 0, 14, p),
              borderBottomRightRadius: mix(i === 9 ? 14 : 0, 14, p),
              overflow: "hidden",
              transform: `rotate(${rot}deg)`,
              boxShadow: p > 0.1 ? `0 ${20 * p}px ${50 * p}px rgba(0,0,0,0.5)` : undefined,
              borderRight: p < 0.5 ? "2px solid rgba(0,0,0,0.6)" : undefined,
            }}
          >
            <FakeFrame kind={k} seed={i} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,${0.7 * p}))` }} />
            <div style={{ position: "absolute", left: 8, right: 8, bottom: 46, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 15, color: "#fff", lineHeight: 1.1, opacity: p }}>{titles[i]}</div>
            <div style={{ position: "absolute", left: 8, bottom: 8, opacity: p }}>
              <ScoreBadge score={99 - i * 2} size={0.7} />
            </div>
          </div>
        );
      })}
      {/* waveform under the long video, fades as it splits */}
      <div style={{ position: "absolute", left: 0, top: 272, width: 1600, height: 40, display: "flex", gap: 3, alignItems: "center", opacity: 1 - interpolate(f, [splitAt, splitAt + 20], [0, 1], clamp) }}>
        {new Array(200).fill(0).map((_, i) => (
          <div key={i} style={{ width: 5, height: 6 + 30 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)), background: "rgba(255,214,10,0.6)", borderRadius: 3 }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 112, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 26, color: "rgba(255,255,255,0.7)", opacity: 1 - interpolate(f, [splitAt, splitAt + 16], [0, 1], clamp) }}>
        launch_stream_full.mp4 · 2:58:41
      </div>
    </div>
  );
};

export const V2ColdOpen: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useScene();
  const inC = useCue("One long video in.");
  const outC = useCue("Ten clips out.");
  const today = useCue("That's what we're building today.");
  const byEnd = useCue("By the end of this video");
  const two = useCue("Two tools.");
  const sys = useCue("One simple system.");
  const go = useCue("Let's make your first clip.");
  return (
    <AbsoluteFill>
      <Phase from={0} to={today} out={16}>
        <Row y={330}>{f < outC + 12 && <Kinetic text="One long video *in.*" start={inC} size={170} dark reflow exitAt={outC - 4} />}</Row>
        <Row y={330}>{f >= outC - 4 && <Kinetic text="Ten clips *out.*" start={outC} size={170} dark reflow />}</Row>
      </Phase>
      <Phase from={today - 6} to={two} out={18}>
        <Camera driftAmount={0.5} pullAt={byEnd + 120} pullTo={0.92}>
          <At x={160} y={300}>
            <SplitTimeline at={today} splitAt={byEnd + 30} />
          </At>
          <Row y={130}>
            <Reveal at={byEnd + 50}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="scissors" size={26} color={C.yellow} /> 1 stream → 10 clips, ready to post
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={two - 10} to={D} out={0}>
        <AbsoluteFill style={{ opacity: 0.8 }}>
          <CardBurst start={two - 40} count={36} spawnEvery={7} life={80} />
        </AbsoluteFill>
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.4) 55%, transparent 80%)" }} />
        <At x={0} y={470} w={1920}>
          <StackedLines
            size={110}
            dark
            lines={[
              { text: "Two *tools.*", at: two },
              { text: "One *system.*", at: sys },
              { text: "Your first *clip.*", at: go },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 2. Two tools, one job each + flow diagram                           */
/* ------------------------------------------------------------------ */
const ToolCard: React.FC<{ at: number; from: "left" | "right"; logo: React.ReactNode; role: string; job: string; bg: string; children?: React.ReactNode }> = ({
  at,
  from,
  logo,
  role,
  job,
  bg,
  children,
}) => (
  <UICard at={at} w={720} h={520} pad={46} from={from} tilt={18} radius={36} style={{ background: bg, color: "#fff", boxShadow: "0 40px 120px rgba(0,0,0,0.25)" }}>
    <div style={{ height: 50 }}>{logo}</div>
    <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 24, letterSpacing: "0.14em", color: C.yellow, marginTop: 34 }}>{role}</div>
    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 54, lineHeight: 1.08, letterSpacing: "-0.03em", marginTop: 10 }}>{job}</div>
    <div style={{ marginTop: 34 }}>{children}</div>
  </UICard>
);

export const V2TwoTools: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Here's the whole system");
  const opus = useCue("OpusClip is the AI clipper.");
  const cap = useCue("CapCut is the editor.");
  const flow = useCue("So the flow goes like this.");
  const n1 = useCue("Long video in.");
  const n2 = useCue("The AI clipper finds");
  const n3 = useCue("The editor makes them yours.");
  const n4 = useCue("You post.");
  const n5 = useCue("And you get paid.");
  const paid = useCue("The editing is what gets you paid.");
  const skip = useCue("Most beginners skip");
  const nodes = [
    { at: n1, label: "Long video", icon: <Icon name="film" size={54} color={C.ink} stroke={2} /> },
    { at: n2, label: "AI clipper", icon: <div style={{ background: "#000", borderRadius: 16, padding: "10px 12px" }}><OpusClipLogo h={34} word={false} /></div> },
    { at: n3, label: "Editor", icon: <div style={{ background: "#000", borderRadius: 16, padding: "12px 10px" }}><CapCutLogo h={28} word={false} /></div> },
    { at: n4, label: "Post", icon: <div style={{ display: "flex", gap: 6 }}><YouTubeLogo h={26} word={false} /><TikTokLogo h={34} /><InstagramLogo h={34} /></div> },
    { at: n5, label: "Get paid", icon: <Icon name="dollar" size={54} color={C.ink} stroke={2.2} /> },
  ];
  return (
    <AbsoluteFill>
      <Phase from={0} to={flow} out={18}>
        <Camera driftAmount={0.6}>
          <Row y={70}>
            <Headline text="Two tools. *One job each.*" at={Math.min(intro, 10)} size={84} />
          </Row>
          <Row y={250} gap={60}>
            <ToolCard at={opus} from="left" bg="#050505" logo={<OpusClipLogo h={46} />} role="AI CLIPPER" job="Finds the best moments and cuts them">
              <div style={{ display: "flex", gap: 12 }}>
                {[99, 97, 94, 91].map((s, i) => (
                  <Reveal key={s} at={opus + 40 + i * 6}>
                    <ScoreBadge score={s} size={1.5} />
                  </Reveal>
                ))}
              </div>
            </ToolCard>
            <ToolCard at={cap} from="right" bg="#1A1A1A" logo={<CapCutLogo h={40} />} role="EDITOR" job="Makes every clip yours">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Hook", "Captions", "Zoom", "Your voice"].map((t, i) => (
                  <Reveal key={t} at={cap + 40 + i * 8}>
                    <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 24, padding: "10px 18px", borderRadius: 999, background: "#2C2C2C", color: "#fff", border: "1px solid #3A3A3A" }}>{t}</div>
                  </Reveal>
                ))}
              </div>
            </ToolCard>
          </Row>
        </Camera>
      </Phase>
      <Phase from={flow} out={0}>
        <Camera driftAmount={0.6}>
          <Row y={110}>
            <Headline text="The *whole system*" at={flow} size={84} kicker="Remember this picture" />
          </Row>
          {nodes.map((n, i) => {
            const x = 220 + i * 370;
            const lit = i === 2 && f >= paid;
            return (
              <React.Fragment key={i}>
                {i > 0 && <FlowLink x1={x - 370 + 150} x2={x - 150} y={490} at={n.at - 6} />}
                <At x={x} y={490} center>
                  <UICard at={n.at} w={290} pad={34} style={{ textAlign: "center", boxShadow: lit ? `0 0 0 5px ${C.yellow}, 0 30px 80px rgba(255,170,0,0.35)` : undefined }}>
                    <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(1.25)" }}>{n.icon}</div>
                    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 42, letterSpacing: "-0.02em", marginTop: 18 }}>{n.label}</div>
                  </UICard>
                </At>
              </React.Fragment>
            );
          })}
          <Row y={700} gap={20}>
            <Reveal at={paid}>
              <Chip tone="yellow" style={{ fontSize: 30 }}>
                <Icon name="dollar" size={26} color={C.ink} /> The edit is what gets you paid
              </Chip>
            </Reveal>
            <Reveal at={skip}>
              <Chip tone="red" style={{ fontSize: 30 }}>
                <Icon name="alert" size={26} color="#C2261B" /> Most beginners skip it
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/** Animated connector with dots flowing along it. */
const FlowLink: React.FC<{ x1: number; x2: number; y: number; at: number }> = ({ x1, x2, y, at }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const p = interpolate(f, [at, at + 20], [0, 1], { ...clamp, easing: EXPO_OUT });
  return (
    <>
      <Connector x1={x1} y1={y} x2={x2} y2={y} at={at} color={C.orange} width={5} />
      {p >= 1 &&
        [0, 1].map((k) => {
          const t = ((f - at + k * 30) % 60) / 60;
          return <div key={k} style={{ position: "absolute", left: mix(x1, x2, t) - 7, top: y - 7, width: 14, height: 14, borderRadius: "50%", background: C.yellow, boxShadow: "0 0 12px rgba(255,214,10,0.9)", opacity: Math.sin(t * Math.PI) }} />;
        })}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Getting the source video                                         */
/* ------------------------------------------------------------------ */
export const V2Source: React.FC = () => {
  const f = useCurrentFrame();
  const step = useCue("Step one is getting your source video.");
  const rule = useCue("pick a campaign first, not a creator.");
  const open = useCue("open Content Rewards");
  const rate = useCue("the rate per one thousand views");
  const max = useCue("the max payout per clip");
  const budget = useCue("how much budget is left.");
  const pick = useCue("Pick one that still has budget");
  const own = useCue("record your own GTA 6 gameplay.");
  const ladder = useCue("bottom of the risk ladder.");
  const either = useCue("Either way");
  const P0 = { x: 140, y: 110 };
  // content coords of the regions inside the campaign page (scale 1)
  const R = { rate: { x: 94, y: 432 }, max: { x: 336, y: 432 }, budget: { x: 309, y: 531 } };
  const ring = (k: "rate" | "max" | "budget", w: number, h: number) => ({ x: R[k].x - w / 2, y: R[k].y - h / 2, w, h, r: 12 });
  return (
    <AbsoluteFill>
      <Phase from={0} to={rate - 4} out={16}>
        <Camera driftAmount={0.6}>
          <Row y={100}>
            <Headline text="Pick a *campaign*, not a creator" at={Math.min(step, 10)} size={84} kicker="Step 1: the source video" />
          </Row>
          <Row y={370} gap={36}>
            {[
              { t: "Clip our GTA 6 launch streams", o: "Launch Week Clips", u: "$6.2K", tot: "$20K", p: 0.31, r: "$1.50", k: 0 },
              { t: "Podcast moments, daily", o: "Talk Shop Clips", u: "$9.8K", tot: "$12K", p: 0.82, r: "$1.00", k: 2 },
              { t: "Speedrun highlights", o: "Fast Lane", u: "$1.1K", tot: "$5K", p: 0.22, r: "$2.00", k: 1 },
            ].map((c, i) => (
              <UICard key={i} at={open + i * 10} pad={0} radius={18} style={{ background: "transparent", boxShadow: "none", outline: i === 0 && f >= open + 70 ? `5px solid ${C.yellow}` : "none", outlineOffset: 6, borderRadius: 18 }}>
                <WhopDiscoverCard title={c.t} owner={c.o} used={c.u} total={c.tot} pct={c.p} rate={c.r} kind={c.k} w={460} />
              </UICard>
            ))}
          </Row>
          <Row y={265}>
            <Reveal at={rule}>
              <Chip tone="yellow" style={{ fontSize: 28 }}>
                <Icon name="target" size={24} color={C.ink} /> Whop · Content Rewards
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={rate - 6} to={own - 4} out={16} inF={14}>
        <FocusCamera
          originX={P0.x}
          originY={P0.y}
          screen={{ x: 760, y: 440 }}
          focuses={[
            { at: rate + 6, x: R.rate.x, y: R.rate.y, z: 1.8 },
            { at: max, x: R.max.x, y: R.max.y, z: 1.8 },
            { at: budget, x: R.budget.x, y: R.budget.y, z: 1.5 },
            { at: pick + 30, x: 590, y: 360, z: 1 },
          ]}
        >
          <div style={{ position: "relative", boxShadow: "0 40px 120px rgba(0,0,0,0.16)", borderRadius: 18 }}>
            <WhopCampaignPage c={DEMO_CAMPAIGN} width={1180} />
            <HighlightRing
              targets={[
                { at: rate + 6, ...ring("rate", 128, 70) },
                { at: max, ...ring("max", 128, 70) },
                { at: budget, ...ring("budget", 556, 112) },
              ]}
              until={pick + 30}
            />
          </div>
        </FocusCamera>
        <At x={1440} y={140} w={420} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { at: rate + 10, k: "Rate", v: "per 1,000 views" },
            { at: max + 4, k: "Max payout", v: "per clip" },
            { at: budget + 4, k: "Budget", v: "how much is left" },
            { at: pick, k: "Pick", v: "budget left + you get it" },
          ].map((r, i) => (
            <UICard key={i} at={r.at} pad={22} radius={20} from="right" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 30 }}>{r.k}</span>
              <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 22, color: C.muted }}>{r.v}</span>
            </UICard>
          ))}
        </At>
      </Phase>
      <Phase from={own - 4} out={0} inF={16}>
        <Camera driftAmount={0.6}>
          <Row y={90}>
            <Headline text="Or record your *own gameplay*" at={own} size={84} kicker="The safest option" />
          </Row>
          <Row y={290} gap={60}>
            <UICard at={own + 10} w={760} pad={0} radius={32} from="left" style={{ overflow: "hidden" }}>
              <div style={{ position: "relative", height: 400 }}>
                <FakeFrame kind="city" seed={1} />
                <div style={{ position: "absolute", left: 24, top: 24, display: "flex", alignItems: "center", gap: 10, background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: 999, padding: "8px 16px", fontFamily: FONT_BODY, fontWeight: 700, fontSize: 24 }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#EF4444", opacity: Math.floor(f / 30) % 2 ? 1 : 0.3 }} /> REC · your GTA 6 session
                </div>
              </div>
              <div style={{ padding: "24px 30px", display: "flex", gap: 14 }}>
                {["Original", "Yours", "Low risk"].map((t, i) => (
                  <Reveal key={t} at={own + 40 + i * 14}>
                    <Chip tone={i === 2 ? "green" : "plain"} style={{ fontSize: 26 }}>
                      <Icon name="check" size={22} color={i === 2 ? "#1A7F3C" : C.orange} stroke={3} /> {t}
                    </Chip>
                  </Reveal>
                ))}
              </div>
            </UICard>
            <UICard at={ladder} w={480} pad={34} from="right">
              <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 22, letterSpacing: "0.12em", color: C.orange }}>RISK LADDER</div>
              {[
                ["HIGH", "#EF4444", 0.45],
                ["MEDIUM", "#E7A400", 0.45],
                ["LOW", "#22C55E", 1],
              ].map(([l, c, o], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18, opacity: o as number }}>
                  <div style={{ width: 130, height: 56, borderRadius: 14, background: c as string, color: "#fff", fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>{l as string}</div>
                  {l === "LOW" && <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 28 }}>← you are here</div>}
                </div>
              ))}
            </UICard>
          </Row>
          <Row y={830}>
            <Reveal at={either}>
              <Chip tone="yellow" style={{ fontSize: 30 }}>
                <Icon name="shield" size={26} color={C.ink} /> Know you're allowed before you edit
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Screen-recording slots                                              */
/* ------------------------------------------------------------------ */
export const makeSlot = (id: string, flag: string): React.FC => {
  const Slot: React.FC = () => <SlotCard text={SLOT_TEXT[id]} flag={flag} />;
  return Slot;
};

/* ------------------------------------------------------------------ */
/* 4. Credits explained                                                */
/* ------------------------------------------------------------------ */
export const V2Credits: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("you need to understand credits.");
  const eq = useCue("one credit equals one minute");
  const three = useCue("a three hour stream");
  const c180 = useCue("one hundred and eighty credits.");
  const month = useCue("That's more than a whole month");
  const trim = useCue("Trim first.");
  const best = useCue("find the best thirty to sixty minutes");
  const c45 = useCue("around forty five credits");
  const quarter = useCue("about a quarter of the cost.");
  const marker = useCue("drop a marker");
  const barIn = settle(f, three);
  const trimP = interpolate(f, [best, best + 50], [0, 1], { ...clamp, easing: EXPO_OUT });
  const credits = Math.round(
    f < c180 - 10 ? interpolate(f, [three + 10, c180 - 10], [0, 180], { ...clamp, easing: EXPO_OUT }) : f < c45 ? 180 : interpolate(f, [c45, c45 + 50], [180, 45], { ...clamp, easing: EXPO_OUT }),
  );
  const BAR = 1400;
  const selX = 0.42;
  const selW = 0.25;
  return (
    <Camera driftAmount={0.6}>
      <Row y={90}>
        <Headline text="How *credits* work" at={Math.min(intro, 10)} size={84} kicker="OpusClip" />
      </Row>
      <Row y={250} gap={30}>
        {f >= eq && (
          <>
            <Reveal at={eq}>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 92, letterSpacing: "-0.04em", ...gradientText(false) }}>1 credit</div>
            </Reveal>
            <Reveal at={eq + 14}>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 92, color: C.muted }}>=</div>
            </Reveal>
            <Reveal at={eq + 28}>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 92, letterSpacing: "-0.04em" }}>1 minute</div>
            </Reveal>
          </>
        )}
      </Row>
      {f >= three && (
        <At x={260} y={460} w={BAR}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 28, color: C.muted, marginBottom: 14, opacity: barIn }}>
            <span>3-hour stream</span>
            <span>3:00:00</span>
          </div>
          <div style={{ position: "relative", height: 120, borderRadius: 20, overflow: "hidden", opacity: barIn, transform: `scaleX(${0.6 + 0.4 * barIn})`, transformOrigin: "left", background: "#1A1A1A" }}>
            <div style={{ display: "flex", height: "100%" }}>
              {new Array(14).fill(0).map((_, i) => (
                <div key={i} style={{ flex: 1, position: "relative", borderRight: "1px solid rgba(0,0,0,0.4)" }}>
                  <FakeFrame kind={i % 3 === 0 ? "stream" : "city"} seed={i} moving={false} />
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, background: `rgba(250,250,247,${0.82 * trimP})` }} />
            {trimP > 0 && (
              <div style={{ position: "absolute", left: `${selX * 100}%`, width: `${selW * 100}%`, top: 0, bottom: 0, border: `5px solid ${C.yellow}`, borderRadius: 16, overflow: "hidden", boxShadow: `0 0 0 ${10 * trimP}px rgba(255,214,10,0.25)` }}>
                <div style={{ position: "absolute", inset: 0, display: "flex" }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} style={{ flex: 1, position: "relative" }}>
                      <FakeFrame kind="city" seed={i + 6} moving={false} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {f >= marker &&
              [0.12, 0.31, 0.47, 0.52, 0.58, 0.63, 0.81].map((x, i) => {
                const p = settle(f, marker + i * 8);
                return <div key={i} style={{ position: "absolute", left: `${x * 100}%`, top: -4, width: 8, height: 60 * p, background: C.orange, borderRadius: 4, boxShadow: "0 0 10px rgba(255,138,0,0.8)" }} />;
              })}
          </div>
          {/* Starter month marker */}
          {f >= month && (
            <div style={{ position: "relative", height: 70 }}>
              <div style={{ position: "absolute", left: `${(150 / 180) * 100}%`, top: -150, width: 4, height: 170, background: C.ink, opacity: settle(f, month) * (1 - trimP) }} />
              <div style={{ position: "absolute", left: `${(150 / 180) * 100}%`, top: 26, transform: "translateX(-50%)", opacity: settle(f, month) * (1 - trimP) }}>
                <Chip style={{ fontSize: 24 }}>Starter month = 150 credits</Chip>
              </div>
              {trimP > 0 && (
                <div style={{ position: "absolute", left: `${(selX + selW / 2) * 100}%`, top: 20, transform: "translateX(-50%)", opacity: trimP }}>
                  <Chip tone="yellow" style={{ fontSize: 26 }}>
                    <Icon name="scissors" size={22} color={C.ink} /> Best 30 to 60 min only
                  </Chip>
                </div>
              )}
            </div>
          )}
        </At>
      )}
      {f >= three && (
        <At x={1660} y={330} center>
          <div style={{ textAlign: "center", opacity: barIn }}>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 120, letterSpacing: "-0.05em", lineHeight: 1, fontVariantNumeric: "tabular-nums", ...gradientText(false) }}>{credits}</div>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 28, color: C.muted }}>credits</div>
          </div>
        </At>
      )}
      <Row y={790} gap={20}>
        <Reveal at={trim}>
          <Chip tone="yellow" style={{ fontSize: 30 }}>
            <Icon name="scissors" size={26} color={C.ink} /> Trim first
          </Chip>
        </Reveal>
        <Reveal at={quarter}>
          <Chip style={{ fontSize: 30 }}>About ¼ of the cost</Chip>
        </Reveal>
      </Row>
    </Camera>
  );
};

/* ------------------------------------------------------------------ */
/* 5. OpusClip step by step                                            */
/* ------------------------------------------------------------------ */
export const V2OpusClip: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Now let's run it through OpusClip.");
  const paste = useCue("paste your video link");
  const len = useCue("set the clip length.");
  const sweet = useCue("twenty to forty five seconds");
  const ratio = useCue("set the aspect ratio");
  const get = useCue("Hit get clips");
  const list = useCue("you'll get a list of clips");
  const hint = useCue("The score is a hint, not a decision.");
  const you = useCue("You still watch every single clip");
  // App laid out at (210, 50) at scale 0.94 inside a FocusCamera.
  const S = 0.94;
  const ox = 255;
  const oy = 40;
  const sx = (x: number) => ox + x * S;
  const sy = (y: number) => oy + y * S;
  const resultsAt = list - 10;
  return (
    <AbsoluteFill>
      <Camera driftAmount={0.35}>
        <FocusCamera
          originX={0}
          originY={0}
          screen={{ x: 960, y: 450 }}
          focuses={[
            { at: paste - 10, x: sx(668), y: sy(253), z: 1.45 },
            { at: len, x: sx(878), y: sy(400), z: 1.5 },
            { at: get - 10, x: sx(750), y: sy(330), z: 1.2 },
            { at: resultsAt + 10, x: 960, y: 470, z: 1 },
            { at: hint, x: sx(170), y: sy(480), z: 1.6 },
            { at: you + 40, x: 960, y: 470, z: 1 },
          ]}
        >
          <div style={{ position: "absolute", left: ox, top: oy, transform: `scale(${S})`, transformOrigin: "0 0" }}>
            <Reveal at={0} dist={40}>
              <OpusClipApp
                width={1500}
                height={860}
                link="youtube.com/watch?v=gta6-launch-stream"
                typeAt={paste + 10}
                lengthAt={sweet}
                ratioAt={ratio + 20}
                getAt={get + 6}
                resultsAt={resultsAt}
              />
            </Reveal>
          </div>
          <HighlightRing
            targets={[
              { at: len + 6, x: sx(757), y: sy(362), w: 230 * S, h: 75 * S, r: 14 },
              { at: ratio + 6, x: sx(1001), y: sy(362), w: 230 * S, h: 75 * S, r: 14 },
            ]}
            until={get - 4}
          />
          <HighlightRing targets={[{ at: hint + 6, x: sx(42), y: sy(566), w: 66 * S, h: 58 * S, r: 12 }]} until={you + 30} />
          <Cursor
            path={[
              { at: paste, x: sx(400), y: sy(256), click: true },
              { at: len + 4, x: sx(890), y: sy(405), click: true },
              { at: ratio + 10, x: sx(1134), y: sy(405), click: true },
              { at: get, x: sx(1136), y: sy(256), click: true },
              { at: get + 60, x: sx(1300), y: sy(560) },
            ]}
            until={resultsAt}
          />
        </FocusCamera>
      </Camera>
      <At x={960} y={36} center>
        <Reveal at={Math.min(intro, 8)}>
          <Chip style={{ fontSize: 26 }}>
            {f < len ? "1 · Paste the link" : f < ratio ? "2 · Clip length: 20 to 45 s" : f < get ? "3 · Aspect ratio 9:16" : f < list ? "4 · Get clips" : f < hint ? "5 · Results + scores" : "The score is a hint, not a decision"}
          </Chip>
        </Reveal>
      </At>
      <At x={960} y={860} center>
        <Reveal at={you}>
          <Chip tone="yellow" style={{ fontSize: 30 }}>
            <Icon name="eye" size={26} color={C.ink} /> You watch every clip. You decide.
          </Chip>
        </Reveal>
      </At>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 6. The worth posting checklist                                      */
/* ------------------------------------------------------------------ */
export const V2Checklist: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("So how do you decide?");
  const items = [
    { at: useCue("One: something happens"), t: "Action in the first 2 seconds" },
    { at: useCue("Two: it makes sense"), t: "Makes sense with no context" },
    { at: useCue("Three: it has a clear payoff"), t: "Clear payoff: punchline, reaction, twist" },
    { at: useCue("Four: it's twenty"), t: "20 to 45 seconds long" },
    { at: useCue("Five: you can say the hook"), t: "The hook fits in one line" },
    { at: useCue("And six: it's safe"), t: "Safe on the risk ladder" },
  ];
  const fails = useCue("If a clip fails even one of these");
  const three = useCue("Posting three great clips");
  return (
    <AbsoluteFill>
      <Phase from={0} to={three} out={18}>
        <Camera driftAmount={0.6}>
          <At x={110} y={110} w={700}>
            <Headline text="Worth *posting?*" at={Math.min(intro, 10)} size={96} align="left" kicker="The checklist" />
            <Reveal at={fails}>
              <div style={{ marginTop: 40 }}>
                <Chip tone="red" style={{ fontSize: 32 }}>
                  <Icon name="x" size={28} color="#C2261B" stroke={3} /> Fails one? Skip it.
                </Chip>
              </div>
            </Reveal>
          </At>
          <At x={820} y={90}>
            <UICard at={items[0].at - 20} w={1000} pad={40} radius={36}>
              {items.map((it, i) => {
                const p = settle(f, it.at);
                const checked = f >= it.at + 26;
                const spin = (f * 10) % 360;
                if (f < it.at) return <div key={i} style={{ height: 106 }} />;
                return (
                  <div key={i} style={{ height: 106, display: "flex", alignItems: "center", gap: 26, borderBottom: i < 5 ? "1px solid #F0EEE6" : "none", opacity: Math.min(1, p * 2), transform: `translateX(${(1 - p) * 30}px)` }}>
                    <div style={{ width: 58, height: 58, borderRadius: 18, background: checked ? C.yellow : "#F5F3EA", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                      {checked ? (
                        <Icon name="check" size={34} color={C.ink} stroke={3.2} />
                      ) : (
                        <div style={{ width: 28, height: 28, borderRadius: "50%", border: `4px solid ${C.muted}`, borderTopColor: "transparent", transform: `rotate(${spin}deg)` }} />
                      )}
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 26, color: C.orange, width: 34 }}>{i + 1}</div>
                    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 40, letterSpacing: "-0.02em" }}>{it.t}</div>
                  </div>
                );
              })}
            </UICard>
          </At>
        </Camera>
      </Phase>
      <Phase from={three} out={0} inF={14}>
        <Camera driftAmount={0.6}>
          <Row y={160}>
            <Kinetic text="3 great clips *beat* 10 average ones" start={three} size={84} reflow maxWidth={1700} />
          </Row>
          <Row y={400} gap={80}>
            <div style={{ display: "flex", gap: 18 }}>
              {[0, 1, 2].map((i) => {
                const p = settle(f, three + 40 + i * 8);
                return (
                  <div key={i} style={{ width: 150, height: 266, borderRadius: 16, overflow: "hidden", position: "relative", opacity: p, transform: `translateY(${(1 - p) * 40}px)`, boxShadow: `0 0 0 4px ${C.yellow}, 0 20px 50px rgba(255,170,0,0.35)` }}>
                    <FakeFrame kind="city" seed={i} />
                  </div>
                );
              })}
            </div>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 120, ...gradientText(false), opacity: settle(f, three + 70) }}>{">"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 80px)", gap: 12 }}>
              {new Array(10).fill(0).map((_, i) => {
                const p = settle(f, three + 80 + i * 3);
                return <div key={i} style={{ width: 80, height: 128, borderRadius: 10, background: "#E5E3DB", opacity: p, filter: "grayscale(1)" }} />;
              })}
            </div>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

