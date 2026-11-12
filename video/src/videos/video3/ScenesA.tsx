import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../../components/Camera";
import { CardBurst } from "../../components/CardBurst";
import { Kinetic } from "../../components/KineticText";
import { StackedLines } from "../../components/StackedLines";
import { BulletList, Chip, Headline } from "../../components/Teaching";
import { TypingBar } from "../../components/TypingBar";
import { Reveal, UICard } from "../../components/UICard";
import { At, Phase, Row } from "../../lib/helpers";
import { clamp, EXPO_OUT, settle } from "../../lib/motion";
import { useCue, useScene } from "../../lib/scene";
import { FakeFrame } from "../../mockups/FakeFrame";
import { CapCutLogo, Icon, InstagramLogo, OpusClipLogo, TikTokLogo, YouTubeLogo } from "../../mockups/icons";
import { ScoreBadge } from "../../mockups/OpusClip";
import { ChaptersDescription, LongformCard, PostingSchedule, WhopDashboard } from "../../mockups/Ops";
import { C, FONT_BODY, FONT_HEAD, gradientText } from "../../theme";

/* ------------------------------------------------------------------ */
/* 1. Cold open                                                        */
/* ------------------------------------------------------------------ */
export const V3ColdOpen: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useScene();
  const two = useCue("Two hours a day.");
  const every = useCue("Every day.");
  const secret = useCue("That's the whole secret.");
  const lucky = useCue("Not a lucky viral video.");
  const trick = useCue("Not a secret trick.");
  const routine = useCue("Just a simple routine");
  const show = useCue("In this video");
  const longform = useCue("how long-form videos");
  const gta = useCue("how to win GTA 6 launch week.");
  const build = useCue("Let's build your routine.");
  const clockP = interpolate(f, [routine, routine + 90], [0, 1], { ...clamp, easing: EXPO_OUT });
  return (
    <AbsoluteFill>
      <Phase from={0} to={lucky - 4} out={16}>
        <Camera pullAt={secret + 30} pullTo={0.86} driftAmount={0.5}>
          <Row y={260}>{<Kinetic text="Two hours a *day.*" start={two} size={150} dark reflow exitAt={every - 4} />}</Row>
          <Row y={260}>{f >= every - 4 && <Kinetic text="Every *day.*" start={every} size={150} dark reflow exitAt={secret - 4} />}</Row>
          <Row y={260}>{f >= secret - 4 && <Kinetic text="That's the whole *secret.*" start={secret} size={150} dark reflow />}</Row>
        </Camera>
      </Phase>
      <Phase from={lucky - 4} to={show} out={16}>
        <Camera driftAmount={0.5}>
          <Row y={250} gap={24}>
            {[
              ["A lucky viral video", lucky],
              ["A secret trick", trick],
            ].map(([t, at]) => (
              <Reveal key={t as string} at={at as number}>
                <Chip dark style={{ fontSize: 36, padding: "16px 30px", textDecoration: "line-through", textDecorationColor: C.yellow }}>
                  <Icon name="x" size={30} color={C.yellow} stroke={3} /> {t as string}
                </Chip>
              </Reveal>
            ))}
          </Row>
          <Row y={420}>
            {f >= routine && (
              <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
                <div
                  style={{
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    background: `conic-gradient(${C.yellow} ${clockP * 360}deg, rgba(255,255,255,0.08) 0)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 80px rgba(255,214,10,0.25)",
                  }}
                >
                  <div style={{ width: 210, height: 210, borderRadius: "50%", background: "#0B0B0B", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 84, color: "#fff", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em" }}>
                      {Math.floor(clockP * 2)}:{String(Math.floor((clockP * 120) % 60)).padStart(2, "0")}
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>hours a day</div>
                  </div>
                </div>
                <Kinetic text="A simple *routine.*" start={routine + 10} size={110} dark align="left" style={{ width: 900 }} />
              </div>
            )}
          </Row>
        </Camera>
      </Phase>
      <Phase from={show - 6} to={D} out={0}>
        <AbsoluteFill style={{ opacity: 0.75 }}>
          <CardBurst start={show - 40} count={40} spawnEvery={7} life={85} />
        </AbsoluteFill>
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.4) 55%, transparent 80%)" }} />
        <At x={0} y={430} w={1920}>
          <StackedLines
            size={100}
            dark
            lines={[
              { text: "The daily *routine.*", at: show + 30 },
              { text: "Long-form *money.*", at: longform },
              { text: "GTA 6 *launch week.*", at: gta },
            ]}
          />
        </At>
        <Row y={860}>
          <Reveal at={build}>
            <Chip tone="yellow" style={{ fontSize: 30 }}>
              <Icon name="refresh" size={26} color={C.ink} /> Let's build your routine
            </Chip>
          </Reveal>
        </Row>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 2. The 4 daily blocks (animated timeline)                           */
/* ------------------------------------------------------------------ */
export const V3Blocks: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Your day has four blocks.");
  const b1 = useCue("Block one: Find.");
  const b2 = useCue("Block two: Edit.");
  const b3 = useCue("Block three: Post.");
  const b4 = useCue("Block four: Submit and track.");
  const sum = useCue("Add it all up");
  const order = useCue("Do the blocks in the same order");
  const fixed = useCue("When the routine is fixed");
  const busy = useCue("if you only have one hour");
  const blocks = [
    { at: b1, name: "Find", time: "30 to 45 min", mins: 38, icon: "search", color: "#FFE680" },
    { at: b2, name: "Edit", time: "45 to 60 min", mins: 52, icon: "film", color: "#FFC94A" },
    { at: b3, name: "Post", time: "15 to 20 min", mins: 18, icon: "upload", color: "#FFA733" },
    { at: b4, name: "Submit + track", time: "10 to 15 min", mins: 13, icon: "chart", color: "#FF8A00" },
  ];
  const totalMins = blocks.reduce((a, b) => a + b.mins, 0);
  const BAR = 1640;
  let x = 0;
  return (
    <Camera driftAmount={0.6}>
      <Row y={90}>
        <Headline text="Your *2-hour* day" at={Math.min(intro, 10)} size={92} kicker="4 blocks, same order, every day" />
      </Row>
      <At x={140} y={360} w={BAR}>
        <div style={{ position: "relative", height: 200 }}>
          {blocks.map((b, i) => {
            const w = (b.mins / totalMins) * BAR;
            const left = x;
            x += w;
            const p = interpolate(f, [b.at, b.at + 40], [0, 1], { ...clamp, easing: EXPO_OUT });
            if (f < b.at) return null;
            return (
              <div key={i} style={{ position: "absolute", left, top: 0, width: w - 10, height: 200 }}>
                <div style={{ width: `${p * 100}%`, height: 200, borderRadius: 28, background: b.color, boxShadow: "0 20px 60px rgba(255,150,0,0.2)", overflow: "hidden", padding: "26px 26px", boxSizing: "border-box" }}>
                  <div style={{ opacity: p, display: "flex", flexDirection: "column", gap: 6, whiteSpace: "nowrap" }}>
                    <Icon name={b.icon} size={40} color={C.ink} stroke={2.4} />
                    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: i === 3 ? 30 : 44, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.ink, whiteSpace: i === 3 ? "normal" : "nowrap", width: i === 3 ? 140 : undefined }}>{b.name}</div>
                    <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 24, color: "rgba(10,10,10,0.65)" }}>{b.time}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 24, color: C.muted, marginTop: 18, opacity: interpolate(f, [b1, b1 + 20], [0, 1], clamp) }}>
          <span>0:00</span>
          <span>0:30</span>
          <span>1:00</span>
          <span>1:30</span>
          <span>2:00</span>
        </div>
      </At>
      <Row y={720} gap={20}>
        <Reveal at={sum}>
          <Chip tone="yellow" style={{ fontSize: 32 }}>
            <Icon name="clock" size={28} color={C.ink} /> About 2 hours
          </Chip>
        </Reveal>
        <Reveal at={order}>
          <Chip style={{ fontSize: 32 }}>Same order · same time</Chip>
        </Reveal>
        <Reveal at={fixed}>
          <Chip style={{ fontSize: 32 }}>No deciding, just start</Chip>
        </Reveal>
      </Row>
      <Row y={820}>
        <Reveal at={busy}>
          <Chip tone="red" style={{ fontSize: 28 }}>
            Busy day? Do a 1-hour version. Never skip completely.
          </Chip>
        </Reveal>
      </Row>
    </Camera>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Find                                                             */
/* ------------------------------------------------------------------ */
export const V3Find: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Block one is Find.");
  const check = useCue("Start by checking your campaigns.");
  const budget = useCue("Is there still budget left?");
  const rate = useCue("Has the rate changed?");
  const rules = useCue("Did the creator update the rules?");
  const grab = useCue("Then grab your footage");
  const trim = useCue("Trim it down");
  const upload = useCue("upload it to OpusClip.");
  const tip = useCue("keep a list of creators");
  const hl = f >= grab ? null : f >= rules ? "rules" : f >= rate ? "rate" : f >= budget ? "budget" : null;
  return (
    <AbsoluteFill>
      <Phase from={0} to={grab} out={16}>
        <Camera driftAmount={0.5}>
          <At x={110} y={90} w={600}>
            <Headline text="Block 1: *Find*" at={Math.min(intro, 10)} size={88} align="left" kicker="30 to 45 min" />
            <div style={{ marginTop: 40 }}>
              <BulletList
                check
                size={40}
                width={560}
                items={[
                  { text: "Budget left?", at: budget },
                  { text: "Rate changed?", at: rate },
                  { text: "Rules updated?", at: rules },
                ]}
              />
            </div>
          </At>
          <At x={740} y={200} style={{ transform: "scale(1.06)", transformOrigin: "0 0" }}>
            <UICard at={check} pad={0} radius={18} from="right" style={{ background: "transparent", boxShadow: "none" }}>
              <WhopDashboard
                width={1100}
                at={check + 6}
                hl={hl as "budget" | "rate" | "rules" | null}
                rows={[
                  { name: "Clip our GTA 6 launch streams", owner: "Launch Week Clips", rate: "$1.50", left: 0.69, status: "Active", rulesUpdated: true },
                  { name: "Podcast moments, daily", owner: "Talk Shop Clips", rate: "$1.00", left: 0.12, status: "Low budget" },
                  { name: "Speedrun highlights", owner: "Fast Lane", rate: "$2.00", left: 0.78, status: "Active" },
                  { name: "Story time clips", owner: "Block Tales", rate: "$1.25", left: 0, status: "Ended" },
                ]}
              />
            </UICard>
          </At>
        </Camera>
      </Phase>
      <Phase from={grab} out={0} inF={14}>
        <Camera driftAmount={0.6}>
          <Row y={120}>
            <Headline text="Grab · trim · *upload*" at={grab} size={84} />
          </Row>
          <Row y={330} gap={40}>
            {[
              { at: grab + 10, t: "Grab footage", s: "campaign or your gameplay", vis: <FakeFrame kind="stream" seed={2} /> },
              { at: trim, t: "Trim to the best part", s: "30 to 60 min", vis: <FakeFrame kind="city" seed={1} /> },
              { at: upload, t: "Upload to OpusClip", s: "processes while you prep", vis: <div style={{ position: "absolute", inset: 0, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}><OpusClipLogo h={50} /></div> },
            ].map((s, i) => (
              <UICard key={i} at={s.at} w={480} pad={0} radius={30} style={{ overflow: "hidden" }}>
                <div style={{ position: "relative", height: 240 }}>{s.vis}</div>
                <div style={{ padding: "22px 28px" }}>
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 22, color: C.orange }}>STEP {i + 1}</div>
                  <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 40, letterSpacing: "-0.03em" }}>{s.t}</div>
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 24, color: C.muted, marginTop: 4 }}>{s.s}</div>
                </div>
              </UICard>
            ))}
          </Row>
          <Row y={820}>
            <Reveal at={tip}>
              <Chip tone="yellow" style={{ fontSize: 30 }}>
                <Icon name="bookmark" size={26} color={C.ink} /> Keep a list of creators + campaigns you like
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 4. Edit                                                             */
/* ------------------------------------------------------------------ */
export const V3Edit: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Block two is Edit.");
  const pick = useCue("pick the best three to five.");
  const checklist = useCue("Run the checklist");
  const steps = useCue("Then take every clip through");
  const saver = useCue("Here's the big time saver.");
  const template = useCue("Build a template in CapCut once");
  const recognize = useCue("so people recognize your channel.");
  const scores = [99, 97, 94, 91, 88, 84, 79, 72];
  const picked = (i: number) => i < 4 && f >= pick + 20 + i * 8;
  const failed = (i: number) => i === 3 && f >= checklist + 30;
  return (
    <AbsoluteFill>
      <Phase from={0} to={saver} out={16}>
        <Camera driftAmount={0.6}>
          <Row y={80}>
            <Headline text="Block 2: *Edit*" at={Math.min(intro, 10)} size={88} kicker="45 to 60 min" />
          </Row>
          <Row y={280} gap={18}>
            {scores.map((s, i) => {
              const p = settle(f, intro + 30 + i * 5);
              const on = picked(i) && !failed(i);
              return (
                <div
                  key={i}
                  style={{
                    width: 180,
                    height: 320,
                    borderRadius: 18,
                    overflow: "hidden",
                    position: "relative",
                    opacity: Math.min(1, p * 2) * (f >= pick + 20 && !on ? 0.35 : 1),
                    transform: `translateY(${(1 - p) * 30 - (on ? 16 : 0)}px)`,
                    boxShadow: on ? `0 0 0 5px ${C.yellow}, 0 24px 60px rgba(255,170,0,0.35)` : "0 16px 40px rgba(0,0,0,0.12)",
                    filter: f >= pick + 20 && !on ? "grayscale(1)" : undefined,
                  }}
                >
                  <FakeFrame kind={(["city", "stream", "podcast", "city"] as const)[i % 4]} seed={i} moving={false} />
                  <div style={{ position: "absolute", left: 10, bottom: 10 }}>
                    <ScoreBadge score={s} size={1.1} />
                  </div>
                  {failed(i) && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(239,68,68,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="x" size={80} color="#fff" stroke={4} />
                    </div>
                  )}
                </div>
              );
            })}
          </Row>
          <Row y={680} gap={14}>
            {["Tighten the start", "Hook", "Captions", "One edit", "End on the payoff"].map((t, i) => (
              <Reveal key={t} at={steps + i * 14}>
                <Chip style={{ fontSize: 28 }}>
                  <span style={{ ...gradientText(false), fontWeight: 800 }}>{i + 1}</span> {t}
                </Chip>
              </Reveal>
            ))}
          </Row>
          <Row y={790}>
            <Reveal at={checklist}>
              <Chip tone="yellow" style={{ fontSize: 28 }}>
                <Icon name="check" size={24} color={C.ink} stroke={3} /> Checklist on each. Fails one? Skip it.
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={saver} out={0} inF={14}>
        <Camera driftAmount={0.6}>
          <At x={110} y={260} w={700}>
            <Kinetic text="The big *time saver*" start={saver} size={84} align="left" maxWidth={700} />
            <Reveal at={template + 20}>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 36, color: C.muted, lineHeight: 1.4, marginTop: 30 }}>
                Build a CapCut template <b style={{ color: C.ink }}>once.</b>
                <br />
                Reuse it <b style={{ color: C.ink }}>every day.</b>
              </div>
            </Reveal>
            <Reveal at={recognize}>
              <div style={{ marginTop: 30 }}>
                <Chip tone="yellow" style={{ fontSize: 28 }}>
                  <Icon name="eye" size={24} color={C.ink} /> People start to recognize your style
                </Chip>
              </div>
            </Reveal>
          </At>
          <At x={900} y={210}>
            <UICard at={template} w={900} pad={0} radius={26} from="right" dark style={{ background: "#1F1F1F", overflow: "hidden" }}>
              <div style={{ height: 56, background: "#141414", display: "flex", alignItems: "center", padding: "0 20px", gap: 14 }}>
                <CapCutLogo h={22} />
                <span style={{ fontFamily: "Inter", fontSize: 16, color: "#9DA5AB" }}>Templates</span>
              </div>
              <div style={{ display: "flex", gap: 24, padding: 26 }}>
                <div style={{ width: 230, aspectRatio: "9/16", borderRadius: 14, overflow: "hidden", position: "relative" }}>
                  <FakeFrame kind="city" seed={3} />
                  <div style={{ position: "absolute", top: "12%", left: "8%", right: "8%", textAlign: "center" }}>
                    <span style={{ background: C.yellow, color: "#000", fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 17, padding: "3px 8px", borderRadius: 6 }}>YOUR HOOK HERE</span>
                  </div>
                  <div style={{ position: "absolute", top: "58%", left: "8%", right: "16%", textAlign: "center", fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 22, color: "#fff", WebkitTextStroke: "1px #000" }}>
                    CAPTION <span style={{ color: C.yellow }}>STYLE</span>
                  </div>
                </div>
                <div style={{ flex: 1, fontFamily: "Inter", color: "#E6E6E6" }}>
                  <div style={{ fontSize: 30, fontWeight: 700 }}>My clip template</div>
                  {[
                    ["Hook box", "Yellow, Manrope 800"],
                    ["Captions", "Yellow pop, big"],
                    ["Safe zone", "On"],
                    ["Zoom preset", "Punch-in 120%"],
                    ["Export", "1080 x 1920"],
                  ].map(([k, v], i) => (
                    <Reveal key={k} at={template + 30 + i * 10}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, padding: "14px 0", borderBottom: "1px solid #2E2E2E" }}>
                        <span style={{ color: "#9DA5AB" }}>{k}</span>
                        <span style={{ fontWeight: 600 }}>{v}</span>
                      </div>
                    </Reveal>
                  ))}
                  <Reveal at={template + 90}>
                    <div style={{ marginTop: 18, background: "#04BED1", color: "#fff", borderRadius: 10, padding: "12px 0", textAlign: "center", fontWeight: 700, fontSize: 20 }}>Use template</div>
                  </Reveal>
                </div>
              </div>
            </UICard>
          </At>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 5. Post everywhere                                                  */
/* ------------------------------------------------------------------ */
export const V3Post: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Block three is Post.");
  const three = useCue("One clip goes to three platforms");
  const space = useCue("Space them out");
  const titles = useCue("Keep your titles under sixty characters.");
  const tags = useCue("Use two to four hashtags");
  const credit = useCue("credit the creator in the caption.");
  const sched = useCue("A simple posting schedule");
  const tiktok = useCue("TikTok's Creator Rewards");
  const ig = useCue("Instagram's creator bonuses");
  const reach = useCue("treat those two as extra reach");
  const title = "He did NOT expect the cops to do this";
  return (
    <AbsoluteFill>
      <Phase from={0} to={tiktok} out={16}>
        <Camera driftAmount={0.5}>
          <At x={110} y={110} w={760}>
            <Headline text="Block 3: *Post*" at={Math.min(intro, 10)} size={88} align="left" kicker="15 to 20 min" />
          </At>
          <At x={110} y={330}>
            <Reveal at={three}>
              <div style={{ display: "flex", gap: 16 }}>
                {[
                  [<YouTubeLogo key="y" h={34} word={false} />, "Shorts"],
                  [<TikTokLogo key="t" h={44} />, "TikTok"],
                  [<InstagramLogo key="i" h={44} />, "Reels"],
                ].map(([l, n], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 18, padding: "14px 20px", boxShadow: "0 10px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)", fontFamily: FONT_BODY, fontWeight: 700, fontSize: 26 }}>
                    {l} {n as string}
                  </div>
                ))}
              </div>
            </Reveal>
          </At>
          <At x={110} y={470} w={760} style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <Reveal at={titles}>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 24, color: C.muted, marginBottom: 8 }}>TITLE · under 60 characters</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <TypingBar text={title} start={titles + 10} width={640} height={70} fontSize={24} placeholder="Add a title" />
                <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 26, color: "#1A7F3C" }}>{Math.min(title.length, Math.max(0, Math.floor((f - titles - 10) * 0.45)))}/60</div>
              </div>
            </Reveal>
            <Reveal at={tags}>
              <div style={{ display: "flex", gap: 12 }}>
                {["#gta6", "#gaming", "#shorts"].map((t) => (
                  <Chip key={t} style={{ fontSize: 26 }}>
                    {t}
                  </Chip>
                ))}
                <Chip tone="green" style={{ fontSize: 24 }}>
                  2 to 4 tags
                </Chip>
              </div>
            </Reveal>
            <Reveal at={credit}>
              <Chip tone="yellow" style={{ fontSize: 26 }}>
                <Icon name="users" size={24} color={C.ink} /> Credit: clip from @creatorname
              </Chip>
            </Reveal>
          </At>
          <At x={920} y={150}>
            <PostingSchedule at={Math.min(space - 30, sched)} width={900} slotsAt={[space - 20, space + 20, space + 60]} />
          </At>
        </Camera>
      </Phase>
      <Phase from={tiktok} out={0} inF={14}>
        <Camera driftAmount={0.5}>
          <Row y={130}>
            <Headline text="Extra reach, *not main income* (yet)" at={tiktok} size={76} />
          </Row>
          <Row y={330} gap={50}>
            <UICard at={tiktok + 10} w={640} pad={44} from="left">
              <TikTokLogo h={70} />
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 48, letterSpacing: "-0.03em", marginTop: 20 }}>Creator Rewards</div>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 30, color: C.muted, marginTop: 14, lineHeight: 1.4 }}>
                10,000 followers
                <br />
                Original videos over 1 minute
              </div>
            </UICard>
            <UICard at={ig} w={640} pad={44} from="right">
              <InstagramLogo h={70} />
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 48, letterSpacing: "-0.03em", marginTop: 20 }}>Creator bonuses</div>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 30, color: C.muted, marginTop: 14, lineHeight: 1.4 }}>
                Invite only
                <br />
                Can't count on it
              </div>
            </UICard>
          </Row>
          <Row y={800}>
            <Reveal at={reach}>
              <Chip tone="yellow" style={{ fontSize: 30 }}>
                <Icon name="trend" size={26} color={C.ink} /> Same clips, extra reach
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 6. Long-form formats + thumbnails + chapters                        */
/* ------------------------------------------------------------------ */
export const V3Longform: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Now, long-form.");
  const f1 = useCue("Format one: GTA 6 videos.");
  const cut = useCue("cut it down into an eight to fifteen minute video");
  const f2 = useCue("Format two: weekly compilations.");
  const f3 = useCue("Format three: long Roblox story videos");
  const thumbs = useCue("For thumbnails, keep it simple.");
  const subject = useCue("One big subject");
  const words = useCue("three words max");
  const colors = useCue("and bright colors.");
  const chapters = useCue("always add chapters");
  return (
    <AbsoluteFill>
      <Phase from={0} to={thumbs} out={16}>
        <Camera driftAmount={0.6}>
          <Row y={70}>
            <Headline text="Long-form: the *money engine*" at={Math.min(intro, 10)} size={84} kicker="3 formats that work" />
          </Row>
          <Row y={290} gap={40} style={{ alignItems: "flex-start" }}>
            {[
              { at: f1, title: "Every secret I found in GTA 6", dur: "12:04", kind: "city" as const, thumb: "SECRET ISLAND?!", tag: "1 to 2 h gameplay → 8 to 15 min", seed: 1 },
              { at: f2, title: "Best clips of the week #12 (with commentary)", dur: "9:41", kind: "stream" as const, thumb: "WEEK 12", tag: "Your best Shorts + commentary", seed: 2 },
              { at: f3, title: "The poor kid who became the richest in town", dur: "14:18", kind: "blocks" as const, thumb: "POOR TO RICH", tag: "Path B: long Roblox stories", seed: 0 },
            ].map((c, i) => (
              <UICard key={i} at={c.at} w={540} pad={22} radius={30}>
                <LongformCard title={c.title} dur={c.dur} kind={c.kind} thumbText={c.thumb} w={496} seed={c.seed} />
                <div style={{ marginTop: 16 }}>
                  <Chip tone={i === 0 && f >= cut ? "yellow" : "plain"} style={{ fontSize: 22 }}>
                    {c.tag}
                  </Chip>
                </div>
              </UICard>
            ))}
          </Row>
        </Camera>
      </Phase>
      <Phase from={thumbs} out={0} inF={14}>
        <Camera driftAmount={0.6}>
          <At x={110} y={90} w={700}>
            <Headline text="Thumbnails + *chapters*" at={thumbs} size={80} align="left" maxWidth={720} />
            <div style={{ marginTop: 30 }}>
              <BulletList
                check
                size={38}
                width={680}
                items={[
                  { text: "One big subject", at: subject },
                  { text: "3 words max", at: words },
                  { text: "Bright colors", at: colors },
                  { text: "Chapters in the description", at: chapters },
                ]}
              />
            </div>
          </At>
          <At x={860} y={90}>
            <UICard at={thumbs + 10} w={940} pad={0} radius={28} style={{ overflow: "hidden" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", background: "linear-gradient(135deg,#FFD60A,#FF5E3A)" }}>
                <div style={{ position: "absolute", left: "48%", bottom: 0, width: 420, height: 440, borderRadius: "48% 48% 0 0", background: "linear-gradient(180deg,#1C1C1C,#000)", transform: `scale(${0.9 + 0.1 * settle(f, subject)})`, transformOrigin: "bottom" }} />
                <div style={{ position: "absolute", left: 40, top: 60, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 108, lineHeight: 0.92, color: "#fff", WebkitTextStroke: "4px #000", textShadow: "0 8px 0 #000", letterSpacing: "-0.04em", opacity: settle(f, words) }}>
                  SECRET
                  <br />
                  ISLAND
                  <br />
                  FOUND
                </div>
                <div style={{ position: "absolute", right: 16, bottom: 16, background: "rgba(0,0,0,0.8)", color: "#fff", fontFamily: "Inter", fontWeight: 600, fontSize: 20, borderRadius: 8, padding: "4px 10px" }}>12:04</div>
              </div>
            </UICard>
          </At>
          <At x={1180} y={640}>
            {f >= chapters && <ChaptersDescription at={chapters + 10} width={620} />}
          </At>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};
