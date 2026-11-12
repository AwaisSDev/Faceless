import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera, CameraDive3D } from "../../components/Camera";
import { CardBurst, ShortCard } from "../../components/CardBurst";
import { CountUp } from "../../components/CountUp";
import { Kinetic } from "../../components/KineticText";
import { StackedLines } from "../../components/StackedLines";
import { Chip, Headline } from "../../components/Teaching";
import { Reveal, UICard } from "../../components/UICard";
import { Wordmark } from "../../components/Wordmark";
import { At, Phase, Row } from "../../lib/helpers";
import { clamp, EXPO_OUT, settle } from "../../lib/motion";
import { useCue, useScene } from "../../lib/scene";
import { FakeFrame } from "../../mockups/FakeFrame";
import { Icon } from "../../mockups/icons";
import { C, FONT_BODY, FONT_HEAD, gradientText } from "../../theme";

/* ------------------------------------------------------------------ */
/* 7. The $2K math (dark)                                              */
/* ------------------------------------------------------------------ */
export const V1Math: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Let's do the math, honestly.");
  const only = useCue("Say you only used Whop.");
  const cents = useCue("about ninety eight cents");
  const goal = useCue("To hit two thousand dollars");
  const twoM = useCue("about two million approved views");
  const day = useCue("about sixty eight thousand views");
  const big = useCue("That's a big number");
  const clear = useCue("I need to be really clear.");
  const vary = useCue("Results vary a lot.");
  const learn = useCue("Your first month is about learning");
  const example = useCue("These are example numbers");
  const measure = useCue("once you understand the math");
  return (
    <AbsoluteFill>
      <Phase from={0} to={clear} out={18}>
        <Camera pullAt={big} pullTo={0.86} driftAmount={0.6}>
          <Row y={120}>
            <Kinetic text="The *$2K* math" start={intro} size={96} dark reflow />
          </Row>
          <Row y={250}>
            <Reveal at={only}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="target" size={26} color={C.yellow} /> Example: Whop only
              </Chip>
            </Reveal>
          </Row>
          <Row y={380} gap={60} style={{ alignItems: "flex-start" }}>
            <div style={{ width: 520 }}>
              <CountUp start={cents} to={0.98} decimals={2} prefix="$" size={150} dark label="per 1,000 views, after fees" />
            </div>
            <div style={{ width: 640 }}>
              <CountUp start={twoM} to={2000000} size={150} dark label="approved views a month" dur={80} />
            </div>
            <div style={{ width: 520 }}>
              <CountUp start={day} to={68000} size={150} dark label="views every day" dur={70} />
            </div>
          </Row>
          <Row y={700}>
            <Reveal at={goal}>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 40, color: "rgba(255,255,255,0.7)" }}>
                Goal: <span style={{ color: C.yellow, fontWeight: 800 }}>$2,000</span> a month
              </div>
            </Reveal>
          </Row>
          <Row y={790}>
            <Reveal at={big + 30}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="plus" size={26} color={C.yellow} stroke={3} /> That's why we stack long-form YouTube on top
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={clear} out={0} inF={14}>
        <Camera driftAmount={0.5}>
          <At x={0} y={360} w={1920}>
            <StackedLines
              size={96}
              dark
              lines={[
                { text: "Results *vary.*", at: vary },
                { text: "Month one is for *learning.*", at: learn },
                { text: "Examples, not a *promise.*", at: example },
                { text: "Know the math. *Track it weekly.*", at: measure },
              ]}
            />
          </At>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 8. Two paths (split screen)                                         */
/* ------------------------------------------------------------------ */
const PathCard: React.FC<{
  at: number;
  from: "left" | "right";
  tag: string;
  title: string;
  items: { t: string; at: number }[];
  visual: React.ReactNode;
  glow: boolean;
}> = ({ at, from, tag, title, items, visual, glow }) => {
  const f = useCurrentFrame();
  return (
    <UICard at={at} w={780} h={700} pad={0} from={from} tilt={20} radius={36} style={{ overflow: "hidden", boxShadow: glow ? `0 0 0 5px ${C.yellow}, 0 30px 90px rgba(255,170,0,0.35)` : undefined }}>
      <div style={{ height: 300, position: "relative", overflow: "hidden" }}>{visual}</div>
      <div style={{ padding: "30px 40px" }}>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 24, letterSpacing: "0.14em", color: C.orange }}>{tag}</div>
        <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 60, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 6 }}>{title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
          {items.map((it, i) => {
            const p = settle(f, it.at);
            if (f < it.at) return null;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 30, opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
                <Icon name="check" size={28} color={C.orange} stroke={3} /> {it.t}
              </div>
            );
          })}
        </div>
      </div>
    </UICard>
  );
};

export const V1TwoPaths: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("There are two paths");
  const a = useCue("Path A is clipping.");
  const fast = useCue("It's fast to start");
  const b = useCue("Path B is Roblox story channels.");
  const yours = useCue("but it's fully yours");
  const lf = useCue("it works great for long-form.");
  const pick = useCue("Pick the one that sounds more fun");
  const both = useCue("Both paths use the same daily routine");
  const split = interpolate(f, [a + 30, a + 70], [0, 1], { ...clamp, easing: EXPO_OUT });
  return (
    <Camera driftAmount={0.6} pullAt={pick} pullTo={0.93}>
      <Row y={70}>
        <Headline text="Pick your *path*" at={intro} size={84} />
      </Row>
      <Row y={220} gap={70}>
        <PathCard
          at={a}
          from="left"
          tag="PATH A"
          title="Clipping"
          glow={f >= pick && f < pick + 60}
          items={[
            { t: "Long videos into short clips", at: a + 30 },
            { t: "Fast to start", at: fast },
            { t: "Pairs perfectly with Whop", at: fast + 50 },
          ]}
          visual={
            <div style={{ position: "absolute", inset: 0, background: "#141414" }}>
              <div style={{ position: "absolute", left: 40, right: 40, top: 40, height: 70, borderRadius: 12, overflow: "hidden", opacity: 1 - split }}>
                <FakeFrame kind="podcast" seed={1} />
              </div>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ position: "absolute", left: 90 + i * 160, top: 40 + split * 10, transform: `scale(${0.3 + 0.7 * split}) rotate(${(i - 1.5) * 4 * split}deg)`, transformOrigin: "top center", opacity: split }}>
                  <ShortCard i={i} w={130} />
                </div>
              ))}
            </div>
          }
        />
        <PathCard
          at={b}
          from="right"
          tag="PATH B"
          title="Roblox story channels"
          glow={f >= pick + 30 && f < pick + 90}
          items={[
            { t: "Original story videos + voiceover", at: b + 30 },
            { t: "Slower start, fully yours", at: yours },
            { t: "Great for long-form", at: lf },
          ]}
          visual={<FakeFrame kind="blocks" seed={1} />}
        />
      </Row>
      <Row y={950 - 40}>
        <Reveal at={both}>
          <Chip tone="yellow" style={{ fontSize: 30 }}>
            <Icon name="refresh" size={26} color={C.ink} /> Same daily routine for both
          </Chip>
        </Reveal>
      </Row>
    </Camera>
  );
};

/* ------------------------------------------------------------------ */
/* 9. The risk ladder                                                  */
/* ------------------------------------------------------------------ */
export const V1Risk: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Before you clip anything");
  const low = useCue("Low risk:");
  const med = useCue("Medium risk:");
  const high = useCue("High risk:");
  const cid = useCue("Content ID claims");
  const strikes = useCue("three strikes deletes your channel.");
  const policy = useCue("YouTube's inauthentic content policy");
  const reused = useCue("reused content means");
  const touch = useCue("always add your own touch.");
  const stay = useCue("Stay low on the ladder");
  const bars = [
    { at: high, label: "HIGH", color: "#EF4444", bg: "#FFE9E7", t: "Big creators, no permission", sub: "Claims send the money to them. Strikes." },
    { at: med, label: "MEDIUM", color: "#E7A400", bg: "#FFF5D1", t: "Creators who publicly allow clipping", sub: "Check their rules first" },
    { at: low, label: "LOW", color: "#22C55E", bg: "#E5F8EB", t: "Your gameplay, Whop campaigns, original stories", sub: "Start here" },
  ];
  const strikeN = Math.floor(interpolate(f, [strikes - 30, strikes + 12], [0, 3], clamp));
  return (
    <Camera driftAmount={0.6}>
      <At x={110} y={90} w={1000}>
        <Headline text="The *risk ladder*" at={intro} size={92} align="left" kicker="Before you clip" />
      </At>
      <At x={110} y={290} w={1020} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {bars.map((b, i) => {
          const p = settle(f, b.at);
          const glow = b.label === "LOW" && f >= stay;
          if (f < b.at) return <div key={i} style={{ height: 150 }} />;
          return (
            <div
              key={i}
              style={{
                height: 150,
                borderRadius: 28,
                background: "#fff",
                boxShadow: glow ? `0 0 0 5px ${b.color}, 0 20px 60px rgba(34,197,94,0.3)` : "0 20px 60px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                opacity: Math.min(1, p * 2),
                transform: `translateX(${(1 - p) * -80}px) scaleX(${0.9 + 0.1 * p})`,
                transformOrigin: "left",
                filter: p < 0.99 ? `blur(${(1 - p) * 10}px)` : undefined,
              }}
            >
              <div style={{ width: 200, alignSelf: "stretch", background: b.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 34, color: "#fff", letterSpacing: "0.04em" }}>
                {b.label}
              </div>
              <div style={{ padding: "0 34px", flex: 1 }}>
                <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{b.t}</div>
                <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 26, color: C.muted, marginTop: 6 }}>{b.sub}</div>
              </div>
              {b.label === "HIGH" && f >= cid && (
                <div style={{ marginRight: 28, display: "flex", gap: 10 }}>
                  {[0, 1, 2].map((k) => (
                    <div key={k} style={{ width: 46, height: 46, borderRadius: 12, background: k < strikeN ? "#EF4444" : "#F3F3F3", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${k < strikeN ? 1 : 0.85})` }}>
                      <Icon name="x" size={28} color={k < strikeN ? "#fff" : "#CCC"} stroke={3} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </At>
      <At x={110} y={810}>
        <Reveal at={strikes}>
          <Chip tone="red" style={{ fontSize: 28 }}>
            <Icon name="alert" size={24} color="#C2261B" /> 3 copyright strikes = channel deleted
          </Chip>
        </Reveal>
      </At>
      <At x={1210} y={250}>
        <UICard at={policy} w={600} pad={38} from="right">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Icon name="shield" size={40} color={C.orange} stroke={2.2} />
            <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 24, letterSpacing: "0.12em", color: C.orange }}>YOUTUBE POLICY</div>
          </div>
          <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 44, letterSpacing: "-0.03em", marginTop: 18 }}>Inauthentic content</div>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 28, color: C.muted, marginTop: 8, lineHeight: 1.35 }}>Mass-produced, repetitive, low-effort videos.</div>
          {f >= reused && (
            <Reveal at={reused}>
              <div style={{ height: 1, background: "#EEE", margin: "24px 0" }} />
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 44, letterSpacing: "-0.03em" }}>Reused content</div>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 28, color: C.muted, marginTop: 8, lineHeight: 1.35 }}>Others' content with no meaningful changes.</div>
            </Reveal>
          )}
          {f >= touch && (
            <Reveal at={touch}>
              <div style={{ marginTop: 24 }}>
                <Chip tone="yellow" style={{ fontSize: 28 }}>
                  <Icon name="sparkles" size={24} color={C.ink} /> Always add your own touch
                </Chip>
              </div>
            </Reveal>
          )}
        </UICard>
      </At>
    </Camera>
  );
};

/* ------------------------------------------------------------------ */
/* 10. GTA 6 drops November 19 (dark, 3D dive)                         */
/* ------------------------------------------------------------------ */
export const V1Gta: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useScene();
  const timing = useCue("let's talk about timing.");
  const rel = useCue("GTA 6 releases on November nineteenth");
  const ps5 = useCue("on PS5");
  const millions = useCue("millions of people will be searching");
  const own = useCue("If you record your own gameplay");
  const wave = useCue("The channels that post on day one");
  const rule = useCue("no graphic violence");
  const thumb = useCue("or in the thumbnail");
  const good = useCue("A good clip on day one");
  const ready = useCue("be ready the moment it drops.");
  const sevenP = interpolate(f, [rule + 10, rule + 60], [0, 1], { ...clamp, easing: EXPO_OUT });
  return (
    <AbsoluteFill>
      <Phase from={0} to={rel - 4} out={14}>
        <Row y={420}>
          <Kinetic text="Now, *timing.*" start={timing} size={150} dark reflow />
        </Row>
      </Phase>
      <Phase from={rel - 6} to={rule - 4} out={18}>
        <AbsoluteFill style={{ opacity: interpolate(f, [millions - 10, millions + 20, own + 60, own + 100], [0, 0.85, 0.85, 0.25], clamp) }}>
          <CardBurst start={millions - 40} count={60} spawnEvery={4} life={90} cardW={240} />
        </AbsoluteFill>
        <CameraDive3D start={rel - 6} dur={100} fromRotateX={70} fromRotateY={-18} fromRotateZ={-28} fromX={-300} fromY={600} fromZ={-1400} motionBlur blurFrames={24}>
          <Camera pullAt={own} pullTo={0.8} driftAmount={0.6} origin="50% 40%">
            <Row y={120}>
              <div
                style={{
                  width: 900,
                  borderRadius: 48,
                  padding: "50px 60px 56px",
                  background: "linear-gradient(160deg,#1A1A1A,#0C0C0C)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 120px rgba(255,170,0,0.25)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 30, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)" }}>GTA 6 RELEASE</div>
                <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 250, lineHeight: 1, letterSpacing: "-0.06em", marginTop: 10, ...gradientText(true) }}>NOV 19</div>
                <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 74, color: "#fff", letterSpacing: "-0.03em" }}>2026</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 26 }}>
                  {["PS5", "Xbox Series X|S"].map((t, i) => (
                    <Reveal key={t} at={ps5 + i * 12}>
                      <Chip dark style={{ fontSize: 30 }}>
                        <Icon name="gamepad" size={28} color={C.yellow} /> {t}
                      </Chip>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Row>
          </Camera>
        </CameraDive3D>
        <Row y={830}>
          {f >= wave && <Kinetic text="Day one *rides the wave.*" start={wave} size={70} dark reflow />}
        </Row>
      </Phase>
      <Phase from={rule - 4} to={good - 4} out={16}>
        <Camera driftAmount={0.6}>
          <Row y={140}>
            <Reveal at={rule}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="alert" size={26} color={C.yellow} /> The GTA rule
              </Chip>
            </Reveal>
          </Row>
          <Row y={240}>
            <Kinetic text="No graphic violence in the *first 7 seconds.*" start={rule + 4} size={76} dark maxWidth={1700} />
          </Row>
          <Row y={420}>
            <div style={{ width: 1400, height: 120, borderRadius: 24, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(7 / 60) * 100 * sevenP}%`, minWidth: sevenP > 0 ? 8 : 0, background: "linear-gradient(90deg,#FFB800,#FFD60A)" }} />
              {[0, 7, 15, 30, 45, 60].map((s) => (
                <div key={s} style={{ position: "absolute", left: `${(s / 60) * 100}%`, bottom: 10, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 22, color: "rgba(255,255,255,0.6)", transform: "translateX(6px)" }}>
                  0:{String(s).padStart(2, "0")}
                </div>
              ))}
              <div style={{ position: "absolute", left: 20, top: 16, fontFamily: FONT_BODY, fontWeight: 800, fontSize: 30, color: C.ink, opacity: sevenP }}>Keep it clean</div>
            </div>
          </Row>
          <Row y={600} gap={22}>
            <Reveal at={thumb}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="grid" size={26} color={C.yellow} /> Thumbnail too
              </Chip>
            </Reveal>
            <Reveal at={thumb + 30}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="alert" size={26} color={C.yellow} /> Or ads get limited
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={good - 4} to={D} out={0}>
        <At x={0} y={420} w={1920}>
          <StackedLines
            size={92}
            dark
            lines={[
              { text: "A good clip on *day one*", at: good },
              { text: "beats a perfect clip on *day ten.*", at: good + 70 },
              { text: "Get set up *now.*", at: ready - 40 },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 11. How to go through the course                                    */
/* ------------------------------------------------------------------ */
export const V1CourseOrder: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Here's how to go through this course.");
  const cues = [
    useCue("First, the Start Here page."),
    useCue("Then read PDF one."),
    useCue("Then PDF two."),
    useCue("Then watch video two"),
    useCue("Then read PDFs three and four."),
    useCue("Then watch video three"),
    useCue("And finally, the Playbook."),
  ];
  const order = useCue("Do them in this order.");
  const lost = useCue("If you ever feel lost");
  const items = [
    { t: "Start Here", s: "the welcome page", icon: "star" },
    { t: "PDF 01", s: "read", icon: "book" },
    { t: "PDF 02", s: "read", icon: "book" },
    { t: "Video 2", s: "make your first clip", icon: "play" },
    { t: "PDFs 03 + 04", s: "read", icon: "book" },
    { t: "Video 3", s: "the daily routine", icon: "play" },
    { t: "The Playbook", s: "your daily reference", icon: "target" },
  ];
  const active = cues.reduce((a, c, i) => (f >= c ? i : a), -1);
  const lineP = active <= 0 ? 0 : interpolate(f, [cues[active], cues[active] + 24], [(active - 1) / 6, active / 6], { ...clamp, easing: EXPO_OUT });
  return (
    <Camera driftAmount={0.6} pullAt={order} pullTo={0.95}>
      <At x={110} y={110} w={760}>
        <Headline text="Your *route* through the course" at={intro} size={84} align="left" kicker="Do it in this order" maxWidth={780} />
        <Reveal at={order + 20}>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 34, color: C.muted, marginTop: 30, lineHeight: 1.4, maxWidth: 640 }}>
            Each step builds on the one before it. <b style={{ color: C.ink }}>Don't skip ahead.</b>
          </div>
        </Reveal>
        <Reveal at={lost}>
          <div style={{ marginTop: 26 }}>
            <Chip tone="yellow" style={{ fontSize: 28 }}>
              <Icon name="refresh" size={24} color={C.ink} /> Lost? Come back to this list.
            </Chip>
          </div>
        </Reveal>
      </At>
      <At x={1000} y={80} w={820} style={{ position: "absolute" }}>
        <div style={{ position: "absolute", left: 38, top: 40, width: 6, height: 6 * 120, borderRadius: 3, background: "#ECEAE2" }} />
        <div style={{ position: "absolute", left: 38, top: 40, width: 6, height: 6 * 120 * Math.max(0, lineP), borderRadius: 3, background: `linear-gradient(180deg, ${C.amber}, ${C.orange})` }} />
        {items.map((it, i) => {
          const at = cues[i];
          const p = settle(f, at);
          if (f < at) return null;
          const isActive = i === active;
          const done = i < active;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                top: i * 120,
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: Math.min(1, p * 2) * (done ? 0.5 : 1),
                transform: `translateX(${(1 - p) * 40}px)`,
                filter: p < 0.99 ? `blur(${(1 - p) * 10}px)` : undefined,
              }}
            >
              <div
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: "50%",
                  background: isActive ? `radial-gradient(circle at 35% 30%, #FFF3A6, ${C.yellow} 55%, ${C.amber})` : done ? "#F1EFE7" : "#fff",
                  boxShadow: isActive ? "0 0 0 10px rgba(255,214,10,0.25)" : "0 6px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_HEAD,
                  fontWeight: 800,
                  fontSize: 34,
                  color: C.ink,
                }}
              >
                {done ? <Icon name="check" size={36} color={C.ink} stroke={3} /> : i + 1}
              </div>
              <div>
                <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 50, letterSpacing: "-0.03em", lineHeight: 1, ...(isActive ? gradientText(false) : { color: C.ink }) }}>{it.t}</div>
                <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 26, color: C.muted, marginTop: 6 }}>{it.s}</div>
              </div>
            </div>
          );
        })}
      </At>
    </Camera>
  );
};

/* ------------------------------------------------------------------ */
/* 12. The one rule + end card (dark)                                  */
/* ------------------------------------------------------------------ */
export const V1OneRule: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useScene();
  const intro = useCue("And if you remember one thing");
  const post = useCue("Post every day.");
  const thirty = useCue("For thirty days.");
  const judge = useCue("Before you judge anything.");
  const not10 = useCue("Not ten days.");
  const quit = useCue("Most people quit");
  const normal = useCue("Early numbers are supposed to be small.");
  const stick = useCue("So stick with it.");
  const see = useCue("I'll see you in the next video");
  return (
    <AbsoluteFill>
      <Phase from={0} to={post - 4} out={12}>
        <Row y={430}>
          <Kinetic text="The *one rule.*" start={intro + 10} size={150} dark reflow />
        </Row>
      </Phase>
      <Phase from={post - 4} to={quit} out={18}>
        <Camera driftAmount={0.5} pullAt={judge + 40} pullTo={0.85}>
          <At x={0} y={380} w={1920}>
            <StackedLines
              size={110}
              dark
              lines={[
                { text: "Post *every day.*", at: post },
                { text: "For *30 days.*", at: thirty },
                { text: "Before you judge *anything.*", at: judge },
              ]}
            />
          </At>
          <Row y={820} gap={20}>
            {[
              ["10 days", not10],
              ["2 weeks", not10 + 40],
            ].map(([t, at]) => (
              <Reveal key={t as string} at={at as number}>
                <Chip dark style={{ fontSize: 30, textDecoration: "line-through", opacity: 0.8 }}>
                  {t as string}
                </Chip>
              </Reveal>
            ))}
            <Reveal at={not10 + 80}>
              <Chip tone="yellow" style={{ fontSize: 30 }}>
                30 days
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={quit} to={see} out={16}>
        <Camera driftAmount={0.5}>
          <Row y={300}>
            <Kinetic text="Most people quit *too early.*" start={quit} size={100} dark reflow />
          </Row>
          <Row y={480}>
            {f >= normal && <Kinetic text="Small early numbers are *normal.*" start={normal} size={70} dark weight={700} reflow />}
          </Row>
          <Row y={620}>{f >= stick && <Kinetic text="Stick with it." start={stick} size={70} dark weight={700} reflow />}</Row>
        </Camera>
      </Phase>
      <Phase from={see} to={D} out={0} inF={20}>
        <Camera pullAt={see + 40} pullTo={0.9} from={1.04} driftAmount={0.4}>
          <Row y={300}>
            <Wordmark size={220} start={see} />
          </Row>
          <Row y={560}>
            <Reveal at={see + 50}>
              <Chip dark style={{ fontSize: 32 }}>
                <Icon name="play" size={26} color={C.yellow} fill={C.yellow} stroke={0} /> Next: Video 2 · Make your first clip
              </Chip>
            </Reveal>
          </Row>
          <Row y={700}>
            <Reveal at={see + 80}>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 28, color: "rgba(255,255,255,0.55)" }}>
                Results vary. Income figures are examples, not guarantees.
              </div>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

