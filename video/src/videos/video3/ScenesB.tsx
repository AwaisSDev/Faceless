import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../../components/Camera";
import { Kinetic } from "../../components/KineticText";
import { StackedLines } from "../../components/StackedLines";
import { Chip, Headline } from "../../components/Teaching";
import { Reveal, UICard } from "../../components/UICard";
import { Wordmark } from "../../components/Wordmark";
import { At, Phase, Row } from "../../lib/helpers";
import { clamp, EXPO_OUT, settle } from "../../lib/motion";
import { useCue, useScene } from "../../lib/scene";
import { Icon, ShortsLogo, YouTubeLogo } from "../../mockups/icons";
import { TrackingSheet, TrackRow, WhopSubmit } from "../../mockups/Ops";
import { C, FONT_BODY, FONT_HEAD, gradientText } from "../../theme";

/* ------------------------------------------------------------------ */
/* 7. How Shorts feed long-form: the loop                              */
/* ------------------------------------------------------------------ */
export const V3Loop: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Here's why this works so well.");
  const loop = useCue("It's a loop.");
  const n1 = useCue("Your Shorts get discovered");
  const n2 = useCue("Some of those viewers subscribe.");
  const n3 = useCue("Your subscribers see your long-form videos");
  const n4 = useCue("Those long watch sessions add up");
  const n5 = useCue("And watch hours are what unlock monetization");
  const again = useCue("and the loop runs again.");
  const trailer = useCue("Your Shorts are the trailer.");
  const movie = useCue("Your long-form videos are the movie.");
  const nodes = [
    { at: n1, t: "Shorts get discovered", icon: <ShortsLogo h={44} /> },
    { at: n2, t: "Viewers subscribe", icon: <Icon name="users" size={44} color={C.ink} stroke={2.2} /> },
    { at: n3, t: "Subscribers watch long-form", icon: <YouTubeLogo h={34} word={false} /> },
    { at: n4, t: "Watch hours add up", icon: <Icon name="clock" size={44} color={C.ink} stroke={2.2} /> },
    { at: n5, t: "Monetization unlocked", icon: <Icon name="dollar" size={44} color={C.ink} stroke={2.4} /> },
  ];
  const cx = 960;
  const cy = 500;
  const R = 330;
  const RX = 600;
  const ang = (i: number) => -Math.PI / 2 + (i / nodes.length) * Math.PI * 2;
  const ringP = interpolate(f, [loop, loop + 60], [0, 1], { ...clamp, easing: EXPO_OUT });
  const dotT = f >= again ? ((f - again) / 150) % 1 : -1;
  return (
    <AbsoluteFill>
      <Phase from={0} to={trailer} out={18}>
        <Camera driftAmount={0.5}>
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
            <ellipse cx={cx} cy={cy} rx={RX} ry={R} fill="none" stroke="#ECE9DD" strokeWidth={10} />
            <ellipse
              cx={cx}
              cy={cy}
              rx={RX}
              ry={R}
              fill="none"
              stroke="url(#lg)"
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * Math.sqrt((RX * RX + R * R) / 2)}
              strokeDashoffset={2 * Math.PI * Math.sqrt((RX * RX + R * R) / 2) * (1 - ringP)}
            />
            <defs>
              <linearGradient id="lg" x1="0" x2="1">
                <stop offset="0" stopColor={C.orange} />
                <stop offset="1" stopColor={C.yellow} />
              </linearGradient>
            </defs>
            {dotT >= 0 &&
              [0, 0.33, 0.66].map((o, k) => {
                const a = -Math.PI / 2 + ((dotT + o) % 1) * Math.PI * 2;
                return <circle key={k} cx={cx + Math.cos(a) * RX} cy={cy + Math.sin(a) * R} r={14} fill={C.yellow} style={{ filter: "drop-shadow(0 0 10px rgba(255,214,10,0.9))" }} />;
              })}
          </svg>
          <At x={cx} y={cy} center>
            <div style={{ textAlign: "center" }}>
              <Kinetic text="The *loop*" start={Math.max(intro, loop - 10)} size={110} reflow style={{ width: 600 }} />
              <Reveal at={again}>
                <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 30, color: C.muted }}>gets stronger every day</div>
              </Reveal>
            </div>
          </At>
          {nodes.map((n, i) => {
            const x = cx + Math.cos(ang(i)) * RX;
            const y = cy + Math.sin(ang(i)) * R;
            const p = settle(f, n.at);
            const active = f >= n.at && (i === nodes.length - 1 || f < nodes[i + 1].at);
            if (f < n.at) return null;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: `translate(-50%,-50%) scale(${(0.6 + 0.4 * p) * (active ? 1.08 : 1)})`,
                  opacity: Math.min(1, p * 2),
                  background: "#fff",
                  borderRadius: 28,
                  padding: "20px 26px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: active ? `0 0 0 5px ${C.yellow}, 0 24px 70px rgba(255,170,0,0.35)` : "0 20px 60px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.05)",
                  fontFamily: FONT_HEAD,
                  fontWeight: 800,
                  fontSize: 32,
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {n.icon} {n.t}
              </div>
            );
          })}
        </Camera>
      </Phase>
      <Phase from={trailer} out={0} inF={14}>
        <At x={0} y={420} w={1920}>
          <StackedLines
            size={104}
            lines={[
              { text: "Shorts are the *trailer.*", at: trailer },
              { text: "Long-form is the *movie.*", at: movie },
              { text: "A Short pops? Make the *long version.*", at: movie + 110 },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 8. Submit and track                                                 */
/* ------------------------------------------------------------------ */
export const TRACK_ROWS: TrackRow[] = [
  { date: "Nov 19", hook: "He did NOT expect the cops to do this", moment: "Reaction", yt: 41200, tt: 18300, ig: 6100, paid: "Approved" },
  { date: "Nov 19", hook: "GTA 5 vs GTA 6 cops", moment: "Compare", yt: 12800, tt: 9400, ig: 2200, paid: "Approved" },
  { date: "Nov 20", hook: "Nobody noticed this detail", moment: "Detail", yt: 8300, tt: 4100, ig: 1600, paid: "Pending" },
  { date: "Nov 20", hook: "Wait for his reaction", moment: "Reaction", yt: 36900, tt: 22400, ig: 7300, paid: "Approved" },
  { date: "Nov 21", hook: "This chase went completely wrong", moment: "Chaos", yt: 15600, tt: 11200, ig: 3900, paid: "Pending" },
  { date: "Nov 21", hook: "How to get money fast", moment: "Guide", yt: 3100, tt: 1900, ig: 700, paid: "No campaign" },
  { date: "Nov 22", hook: "The reaction says it all", moment: "Reaction", yt: 28700, tt: 16900, ig: 5200, paid: "Submitted" },
  { date: "Nov 22", hook: "Secret spot on the map", moment: "Secret", yt: 9900, tt: 6600, ig: 2100, paid: "Submitted" },
];

export const V3Track: React.FC = () => {
  const intro = useCue("Block four is Submit and track.");
  const submit = useCue("submit each clip link");
  const sheet = useCue("Then open your tracking sheet.");
  const row = useCue("Every clip gets one row:");
  const valuable = useCue("it's the most valuable part");
  const guessing = useCue("Without numbers, you're guessing.");
  const works = useCue("With numbers, you can see exactly what works.");
  const simple = useCue("Keep the sheet simple.");
  return (
    <AbsoluteFill>
      <Phase from={0} to={sheet} out={16}>
        <Camera driftAmount={0.6}>
          <Row y={100}>
            <Headline text="Block 4: *Submit + track*" at={Math.min(intro, 10)} size={88} kicker="10 to 15 min" />
          </Row>
          <Row y={330} style={{ transform: "scale(1.45)", transformOrigin: "50% 0" }}>
            <WhopSubmit at={submit - 10} submitAt={submit + 120} link="youtube.com/shorts/gta6-cops-reaction" width={900} />
          </Row>
        </Camera>
      </Phase>
      <Phase from={sheet} out={0} inF={14}>
        <Camera driftAmount={0.5}>
          <Row y={70}>
            <Headline text="Your *tracking sheet*" at={sheet} size={80} />
          </Row>
          <At x={135} y={220} style={{ transform: "scale(1.1)", transformOrigin: "0 0" }}>
            <UICard at={sheet + 6} pad={0} radius={18} style={{ background: "transparent", boxShadow: "none" }}>
              <TrackingSheet rows={TRACK_ROWS.slice(0, 6)} rowAt={(i) => row + 20 + i * 26} width={1500} />
            </UICard>
          </At>
          <Row y={830} gap={20}>
            <Reveal at={valuable}>
              <Chip tone="yellow" style={{ fontSize: 28 }}>
                <Icon name="star" size={24} color={C.ink} /> Most valuable minutes of your day
              </Chip>
            </Reveal>
            <Reveal at={guessing}>
              <Chip tone="red" style={{ fontSize: 28 }}>
                No numbers = guessing
              </Chip>
            </Reveal>
            <Reveal at={works}>
              <Chip tone="green" style={{ fontSize: 28 }}>
                Numbers = you see what works
              </Chip>
            </Reveal>
            <Reveal at={simple}>
              <Chip style={{ fontSize: 28 }}>Keep it simple</Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 9. The Sunday review                                                */
/* ------------------------------------------------------------------ */
export const V3Sunday: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Once a week, on Sunday");
  const sort = useCue("Sort your sheet by views.");
  const top = useCue("Look at your top five clips");
  const common = useCue("what do these have in common?");
  const moment = useCue("Maybe it's the same type of moment.");
  const more = useCue("make more of that next week");
  const less = useCue("do less of what's sitting at the bottom.");
  const data = useCue("You'll be learning from real data");
  return (
    <AbsoluteFill>
      <Phase from={0} to={data} out={16}>
        <Camera driftAmount={0.5}>
          <At x={110} y={60} w={1700}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <Headline text="The *Sunday* review" at={Math.min(intro, 10)} size={80} align="left" kicker="Once a week" maxWidth={900} />
              <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                <Reveal at={more}>
                  <Chip tone="green" style={{ fontSize: 28, whiteSpace: "nowrap" }}>
                    <Icon name="plus" size={24} color="#1A7F3C" stroke={3} /> More reactions
                  </Chip>
                </Reveal>
                <Reveal at={less}>
                  <Chip tone="red" style={{ fontSize: 28, whiteSpace: "nowrap" }}>
                    Less guides
                  </Chip>
                </Reveal>
              </div>
            </div>
          </At>
          <At x={150} y={225} style={{ transform: "scale(1.08)", transformOrigin: "0 0" }}>
            <TrackingSheet rows={TRACK_ROWS} rowAt={(i) => Math.min(8, intro) + i * 4} sortAt={sort} topAt={top} tagAt={moment} width={1500} />
          </At>
          <At x={960} y={858} center>
            <Reveal at={common}>
              <Chip tone="yellow" style={{ fontSize: 32 }}>
                <Icon name="search" size={28} color={C.ink} /> What do the top 5 have in common?
              </Chip>
            </Reveal>
          </At>
        </Camera>
      </Phase>
      <Phase from={data} out={0} inF={14}>
        <At x={0} y={420} w={1920}>
          <StackedLines
            size={100}
            lines={[
              { text: "Most people post and *hope.*", at: data },
              { text: "You learn from *real data.*", at: data + 80 },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 10. When to level up (stacked lines)                                */
/* ------------------------------------------------------------------ */
export const V3LevelUp: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("So when do you level up?");
  const l1 = useCue("When your earnings cover the Starter plan");
  const l2 = useCue("When you keep running out of credits");
  const l3 = useCue("When your channel is steady");
  const l4 = useCue("And when you're fast");
  const pays = useCue("Each step pays for the next one.");
  const missing = useCue("notice what's missing from this list");
  const grow = useCue("Grow with what you earn");
  return (
    <AbsoluteFill>
      <Phase from={0} to={missing} out={16}>
        <Camera driftAmount={0.5} pullAt={pays} pullTo={0.92}>
          <Row y={90}>
            <Headline text="When to *level up*" at={Math.min(intro, 10)} size={88} kicker="Follow the numbers" />
          </Row>
          <At x={0} y={460} w={1920}>
            <StackedLines
              size={70}
              pitch={104}
              followNewest={false}
              width={1700}
              lines={[
                { text: "Earnings cover Starter: *upgrade to Starter.*", at: l1 },
                { text: "Out of credits again: *move to Pro.*", at: l2 },
                { text: "Channel is steady: *start a second channel.*", at: l3 },
                { text: "Fast and proven: *sell clipping to creators.*", at: l4 },
              ]}
            />
          </At>
          <Row y={840}>
            <Reveal at={pays}>
              <Chip tone="yellow" style={{ fontSize: 30 }}>
                <Icon name="trend" size={26} color={C.ink} /> Each step pays for the next one
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={missing} out={0} inF={14}>
        <Camera driftAmount={0.5}>
          <Row y={170}>
            <Kinetic text="What's *not* on the list" start={missing} size={90} reflow />
          </Row>
          <Row y={380} gap={22}>
            {["Fancy gear", "Paid ads", "Money you haven't made yet"].map((t, i) => (
              <Reveal key={t} at={missing + 50 + i * 30}>
                <Chip tone="red" style={{ fontSize: 34, padding: "16px 28px", textDecoration: "line-through" }}>
                  <Icon name="x" size={28} color="#C2261B" stroke={3} /> {t}
                </Chip>
              </Reveal>
            ))}
          </Row>
          <Row y={560}>
            {f >= grow && <Kinetic text="Grow with what you *earn.*" start={grow} size={96} reflow />}
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 11. GTA 6 launch week (dark, 3D card flips)                         */
/* ------------------------------------------------------------------ */
export const V3GtaWeek: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Now, GTA 6 launch week");
  const plan = useCue("so here's a plan.");
  const days = [
    { at: useCue("Day one: first impressions."), d: "NOV 19", t: "First impressions", icon: "eye" },
    { at: useCue("Then GTA 5 versus GTA 6 comparisons."), d: "NOV 20, 21", t: "GTA 5 vs GTA 6", icon: "refresh" },
    { at: useCue("Then details people missed."), d: "NOV 22, 23", t: "Details people missed", icon: "search" },
    { at: useCue("Then the funny chaos moments."), d: "NOV 24, 25", t: "Funny chaos", icon: "flame" },
    { at: useCue("Then guides that actually help people."), d: "NOV 26, 27", t: "Guides", icon: "book" },
    { at: useCue("Then secrets and hidden places."), d: "NOV 28, 29", t: "Secrets", icon: "lock" },
    { at: useCue("turn your best moments into a series."), d: "NOV 30", t: "Make it a series", icon: "film" },
  ];
  const rule = useCue("Just remember the rule");
  const speed = useCue("speed wins.");
  const good = useCue("A good clip on day one");
  const clear = useCue("clear your schedule for launch week");
  return (
    <AbsoluteFill>
      <Phase from={0} to={rule} out={16}>
        <Camera driftAmount={0.4} pullAt={days[6].at + 60} pullTo={0.94}>
          <Row y={70}>
            <Kinetic text="GTA 6 *launch week*" start={Math.min(intro, 10)} size={90} dark reflow />
          </Row>
          <Row y={190}>
            <Reveal at={plan}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="calendar" size={26} color={C.yellow} /> November 19 to 30 · the day-by-day plan
              </Chip>
            </Reveal>
          </Row>
          <At x={960} y={540} center>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 380px)", gap: 26, perspective: 1200, justifyContent: "center" }}>
              {days.map((d, i) => {
                const p = interpolate(f, [d.at - 6, d.at + 30], [0, 1], { ...clamp, easing: EXPO_OUT });
                const latest = days.reduce((a, x, k) => (f >= x.at ? k : a), -1);
                return (
                  <div
                    key={i}
                    style={{
                      height: 210,
                      borderRadius: 26,
                      transform: `rotateY(${(1 - p) * -100}deg) translateZ(${(1 - p) * -120}px)`,
                      transformOrigin: "left center",
                      opacity: p > 0.02 ? 1 : 0,
                      background: i === latest ? "linear-gradient(150deg,#2A2208,#141414)" : "#141414",
                      boxShadow: i === latest ? `0 0 0 3px ${C.yellow}, 0 30px 80px rgba(255,170,0,0.3)` : "0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)",
                      padding: "26px 28px",
                      boxSizing: "border-box",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 22, letterSpacing: "0.12em", color: C.yellow }}>{d.d}</span>
                      <Icon name={d.icon} size={34} color="rgba(255,255,255,0.7)" />
                    </div>
                    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 40, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff", marginTop: 22 }}>{d.t}</div>
                  </div>
                );
              })}
            </div>
          </At>
        </Camera>
      </Phase>
      <Phase from={rule} to={good} out={16} inF={14}>
        <Camera driftAmount={0.5}>
          <Row y={210}>
            <UICard at={rule} w={1200} pad={56} dark radius={40} style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 26, letterSpacing: "0.16em", color: C.yellow }}>
                <Icon name="alert" size={30} color={C.yellow} /> THE RULE
              </div>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 68, letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 18 }}>
                No graphic violence in the <span style={{ ...gradientText(true) }}>first 7 seconds</span> or the <span style={{ ...gradientText(true) }}>thumbnail</span>
              </div>
            </UICard>
          </Row>
          <Row y={720}>
            <Reveal at={speed}>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 110, letterSpacing: "-0.04em", ...gradientText(true) }}>Speed wins.</div>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={good} out={0} inF={12}>
        <At x={0} y={420} w={1920}>
          <StackedLines
            size={92}
            dark
            lines={[
              { text: "A good clip on *day one*", at: good },
              { text: "beats a perfect clip on *day ten.*", at: good + 70 },
              { text: "Clear your schedule. *Post more.*", at: clear },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 12. Finale (dark): Find. Edit. Post. Submit. Track.                 */
/* ------------------------------------------------------------------ */
export const V3Finale: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useScene();
  const w = [useCue("Find."), useCue("Edit."), useCue("Post."), useCue("Submit."), useCue("Track.")];
  const every = useCue("Every day, for thirty days.");
  const most = useCue("Most people won't do it.");
  const why = useCue("That's exactly why it works");
  const tools = useCue("You've got the tools");
  const go = useCue("Go build your channel.");
  return (
    <AbsoluteFill>
      <Phase from={0} to={most} out={18}>
        <Camera driftAmount={0.4} pullAt={every} pullTo={0.86}>
          <Row y={330}>
            <Kinetic text="Find. Edit. Post. Submit. *Track.*" start={w[0]} wordStarts={w} size={130} dark reflow maxWidth={1760} />
          </Row>
          <Row y={560}>{f >= every && <Kinetic text="Every day for *30 days.*" start={every} size={96} dark reflow />}</Row>
        </Camera>
      </Phase>
      <Phase from={most} to={go} out={16} inF={12}>
        <At x={0} y={400} w={1920}>
          <StackedLines
            size={100}
            dark
            lines={[
              { text: "Most people *won't.*", at: most },
              { text: "That's why it *works.*", at: why },
              { text: "Tools. System. *Plan.*", at: tools },
            ]}
          />
        </At>
      </Phase>
      <Phase from={go} to={D} out={0} inF={20}>
        <Camera pullAt={go + 40} pullTo={0.9} from={1.04} driftAmount={0.4}>
          <Row y={260}>
            <Wordmark size={240} start={go} />
          </Row>
          <Row y={540}>
            <Kinetic text="Go build your *channel.*" start={go + 40} size={72} dark reflow />
          </Row>
          <Row y={720}>
            <Reveal at={go + 90}>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 28, color: "rgba(255,255,255,0.55)" }}>Results vary. Income figures are examples, not guarantees.</div>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};
