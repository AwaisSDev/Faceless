import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera, CameraDive3D } from "../../components/Camera";
import { CardBurst } from "../../components/CardBurst";
import { CountUp } from "../../components/CountUp";
import { CaptionPill, Laptop, Phone } from "../../components/DeviceFrame";
import { Kinetic } from "../../components/KineticText";
import { StackedLines } from "../../components/StackedLines";
import { BulletList, Chip, Connector, Headline } from "../../components/Teaching";
import { Reveal, UICard } from "../../components/UICard";
import { Wordmark } from "../../components/Wordmark";
import { At, Phase, Row } from "../../lib/helpers";
import { clamp, EXPO_OUT, mix, QUINT_OUT, settle } from "../../lib/motion";
import { useCue, useScene } from "../../lib/scene";
import { InstagramLogo, Icon, ShortsLogo, TikTokLogo, WhopLogo, YouTubeLogo } from "../../mockups/icons";
import { ChannelPage, ShortsFeed, StudioEligibility } from "../../mockups/YouTube";
import { WhopCampaignPage } from "../../mockups/Whop";
import { C, FONT_BODY, FONT_HEAD, gradientText } from "../../theme";

/* ------------------------------------------------------------------ */
/* 1. Cold open                                                        */
/* ------------------------------------------------------------------ */
export const V1ColdOpen: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useScene();
  const noFace = useCue("No face.");
  const noCam = useCue("No camera.");
  const sys = useCue("Just a system.");
  const welcome = useCue("Welcome to faceless.");
  const growth = useCue("Short clips for growth.");
  const money = useCue("Longer videos for the real money.");
  const routine = useCue("one simple daily routine");
  const gear = useCue("No fancy gear");
  const laptop = useCue("Just a laptop");
  const go = useCue("Let's get into it.");
  const following = useCue("no big following");
  const course = useCue("In this course,");
  const withoutFace = useCue("without ever showing your face.");
  const noCamera2 = useCue("no showing up on camera.");

  return (
    <AbsoluteFill>
      {/* Kinetic opener, one line at a time with blur-dissolves */}
      <Phase from={noFace} to={welcome - 4} out={16}>
        <Camera pullAt={sys + 40} pullTo={0.86} driftAmount={0.6}>
          <Row y={430}>
            {f < noCam - 2 + 16 && <Kinetic text="No *face.*" start={noFace} size={210} dark reflow exitAt={noCam - 4} />}
          </Row>
          <Row y={430}>{f >= noCam - 4 && f < sys + 12 && <Kinetic text="No *camera.*" start={noCam} size={210} dark reflow exitAt={sys - 4} />}</Row>
          <Row y={430}>{f >= sys - 4 && <Kinetic text="Just a *system.*" start={sys} size={210} dark reflow />}</Row>
        </Camera>
      </Phase>

      {/* Wordmark lands; then it lifts away as your faceless channel dives in (3D) */}
      <Phase from={welcome - 2} to={growth} out={18}>
        <AbsoluteFill
          style={{
            transform: `translateY(${interpolate(f, [course, course + 50], [0, -300], { ...clamp, easing: EXPO_OUT })}px) scale(${interpolate(f, [course, course + 50], [1, 0.5], { ...clamp, easing: EXPO_OUT })})`,
            opacity: interpolate(f, [course + 20, course + 50], [1, 0.0], clamp),
          }}
        >
          <Camera pullAt={welcome + 64} pullTo={0.8} from={1.06} driftAmount={0.5}>
            <Row y={380}>
              <Wordmark size={260} start={welcome} />
            </Row>
            <Row y={700}>
              <Kinetic text="Build a *$2,000/Month* Faceless YouTube Channel" start={welcome + 70} size={64} weight={700} dark stagger={6} maxWidth={1500} />
            </Row>
          </Camera>
        </AbsoluteFill>
        {f >= course - 4 && (
          <CameraDive3D start={course} dur={110} fromRotateX={58} fromRotateY={-10} fromRotateZ={-16} fromX={500} fromY={700} fromZ={-900} motionBlur blurFrames={22}>
            <Camera driftAmount={0.6} pullAt={withoutFace} pullTo={1.08} origin="22% 52%">
              <Row y={130}>
                <ChannelPage width={1320} avatarRing={interpolate(f, [withoutFace, withoutFace + 16], [0, 1], clamp)} />
              </Row>
            </Camera>
          </CameraDive3D>
        )}
        <At x={960} y={70} center>
          <Reveal at={withoutFace + 6}>
            <Chip tone="yellow" style={{ fontSize: 30 }}>
              <Icon name="lock" size={24} color={C.ink} stroke={2.4} /> Never show your face
            </Chip>
          </Reveal>
        </At>
      </Phase>

      {/* Card burst + the system in three lines */}
      <Phase from={growth - 10} to={D} out={0}>
        <AbsoluteFill style={{ opacity: interpolate(f, [growth - 10, growth + 10, gear - 20, gear], [0, 1, 1, 0.35], clamp) }}>
          <CardBurst start={growth - 30} count={34} spawnEvery={8} life={80} cardW={300} />
        </AbsoluteFill>
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(7,7,7,0.82) 0%, rgba(7,7,7,0.35) 55%, transparent 80%)" }} />
        <Phase from={growth} to={gear} out={16}>
          <At x={0} y={540} w={1920}>
            <StackedLines
              size={104}
              dark
              lines={[
                { text: "Short clips: *growth.*", at: growth },
                { text: "Longer videos: *money.*", at: money },
                { text: "One daily *routine.*", at: routine },
              ]}
            />
          </At>
        </Phase>
        <Phase from={gear} to={D} out={0}>
          <Camera pullAt={go} pullTo={0.9} driftAmount={0.5}>
            <Row y={300} gap={26}>
              {[
                ["No fancy gear", gear],
                ["No big following", following],
                ["No camera", noCamera2],
              ].map(([t, at], i) => (
                <Reveal key={i} at={at as number}>
                  <Chip dark style={{ fontSize: 34, padding: "16px 28px" }}>
                    <Icon name="x" size={26} color={C.yellow} stroke={3} /> {t as string}
                  </Chip>
                </Reveal>
              ))}
            </Row>
            <Row y={470}>
              <Kinetic text="A laptop. Two tools. A *plan.*" start={laptop} size={128} dark reflow stagger={14} />
            </Row>
          </Camera>
        </Phase>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 2. What faceless means                                              */
/* ------------------------------------------------------------------ */
const TypeCard: React.FC<{ at: number; icon: string; title: string; desc: string; active: boolean }> = ({ at, icon, title, desc, active }) => (
  <UICard at={at} w={860} pad={28} from="left" style={{ display: "flex", alignItems: "center", gap: 28, opacity: undefined, outline: active ? `4px solid ${C.yellow}` : "none", outlineOffset: 4 }}>
    <div style={{ width: 92, height: 92, borderRadius: 26, background: "linear-gradient(135deg,#FFE680,#FFB800)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
      <Icon name={icon} size={50} color={C.ink} stroke={2.2} />
    </div>
    <div>
      <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 46, letterSpacing: "-0.03em" }}>{title}</div>
      <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 28, color: C.muted, marginTop: 4 }}>{desc}</div>
    </div>
  </UICard>
);

export const V1WhatFaceless: React.FC = () => {
  const f = useCurrentFrame();
  const q = useCue("So, what does faceless");
  const star = useCue("the content is the star");
  const clip = useCue("First, clip channels.");
  const game = useCue("Second, gameplay channels.");
  const story = useCue("Third, story videos");
  const scroll = useCue("Scroll any Shorts feed");
  const nobody = useCue("Nobody knows who's behind");
  const priv = useCue("stay completely private");
  const active = f >= story ? 2 : f >= game ? 1 : f >= clip ? 0 : -1;
  return (
    <Camera driftAmount={0.7}>
      <At x={110} y={110} w={980}>
        <Headline text="What *faceless* means" at={Math.min(q, 10)} size={92} align="left" kicker="The idea" />
      </At>
      <At x={110} y={262} w={980}>
        <Reveal at={star}>
          <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 40, color: C.ink, letterSpacing: "-0.02em" }}>
            The content is the star. <span style={{ color: C.muted }}>Not you.</span>
          </div>
        </Reveal>
      </At>
      <At x={110} y={360} w={900} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <TypeCard at={clip} icon="scissors" title="Clip channels" desc="Best moments from streams, podcasts, videos" active={active === 0} />
        <TypeCard at={game} icon="gamepad" title="Gameplay channels" desc="Your own gameplay: funny, wild, useful" active={active === 1} />
        <TypeCard at={story} icon="book" title="Story videos" desc="Roblox stories: visuals + a voiceover" active={active === 2} />
      </At>
      <At x={1180} y={40}>
        <Reveal at={6} dist={60}>
          <div style={{ transform: `rotate(${mix(4, -2, settle(f, 6))}deg) translateY(${10 * Math.sin(f / 50)}px)` }}>
            <Phone w={380}>
              <ShortsFeed start={20} every={f >= scroll ? 140 : 140} />
            </Phone>
          </div>
        </Reveal>
      </At>
      <At x={1370} y={800} center>
        <CaptionPill text="Nobody sees your face" at={nobody} size={40} />
      </At>
      <At x={1370} y={160} center>
        <Reveal at={priv}>
          <Chip tone="yellow" style={{ fontSize: 30 }}>
            <Icon name="lock" size={24} color={C.ink} stroke={2.4} /> 100% private
          </Chip>
        </Reveal>
      </At>
    </Camera>
  );
};

/* ------------------------------------------------------------------ */
/* 3. The big misconception                                            */
/* ------------------------------------------------------------------ */
export const V1Misconception: React.FC = () => {
  const f = useCurrentFrame();
  const think = useCue("They think YouTube pays them");
  const truth = useCue("Here's the truth.");
  const low = useCue("Shorts ad pay is very low");
  const million = useCue("So a million Shorts views");
  const feb = useCue("From February first, 2027");
  const tenM = useCue("ten million qualified Shorts views");
  const monthly = useCue("YouTube checks that every month.");
  const newCh = useCue("New channels joining");
  const subs = useCue("one thousand subscribers");
  const hours = useCue("eight thousand watch hours");
  const twentyM = useCue("twenty million Shorts views");
  const what = useCue("So if Shorts views alone");
  const strike = interpolate(f, [truth, truth + 18], [0, 1], { ...clamp, easing: EXPO_OUT });
  return (
    <AbsoluteFill>
      <Phase from={0} to={low} out={16}>
        <Camera pullAt={truth + 20} pullTo={0.8}>
          <Row y={330}>
            <Chip style={{ fontSize: 30 }}>
              <Icon name="alert" size={26} color={C.orange} /> The #1 beginner myth
            </Chip>
          </Row>
          <Row y={430}>
            <div style={{ position: "relative", width: 1700 }}>
              <Kinetic text="“YouTube pays me for *Shorts views.*”" start={think} size={104} maxWidth={1660} />
              <div
                style={{
                  position: "absolute",
                  left: 70,
                  right: 70,
                  top: 64,
                  height: 10,
                  borderRadius: 6,
                  background: C.red,
                  transform: `scaleX(${strike})`,
                  transformOrigin: "left",
                  opacity: strike > 0 ? 1 : 0,
                }}
              />
            </div>
          </Row>
        </Camera>
      </Phase>

      <Phase from={low} to={feb} out={16}>
        <Camera pullAt={million} pullTo={0.86} origin="50% 30%">
          <Row y={170}>
            <Kinetic text="Shorts ad pay is *very low.*" start={low} size={78} reflow />
          </Row>
          <Row y={290} gap={36}>
            <CountUp start={low + 40} to={0.07} decimals={2} prefix="$" size={210} />
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 150, color: C.muted, opacity: interpolate(f, [low + 50, low + 70], [0, 1], clamp) }}>to</div>
            <CountUp start={low + 60} to={0.2} decimals={2} prefix="$" size={210} />
          </Row>
          <Row y={560}>
            <Reveal at={low + 80}>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 40, color: C.muted }}>per 1,000 Shorts views</div>
            </Reveal>
          </Row>
          <Row y={680}>
            <UICard at={million} pad={30} style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em" }}>1,000,000 views</div>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 56, color: C.muted }}>≈</div>
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em", ...gradientText(false) }}>$70 to $200</div>
            </UICard>
          </Row>
        </Camera>
      </Phase>

      <Phase from={feb} to={what} out={16}>
        <Camera driftAmount={0.6}>
          <At x={110} y={150} w={760}>
            <Reveal at={feb}>
              <Chip tone="yellow" style={{ fontSize: 32 }}>
                <Icon name="calendar" size={28} color={C.ink} /> From Feb 1, 2027
              </Chip>
            </Reveal>
          </At>
          <At x={110} y={250} w={760}>
            <Kinetic text="To keep earning from *Shorts:*" start={feb + 10} size={68} align="left" maxWidth={760} />
          </At>
          <At x={110} y={390} w={760}>
            <BulletList
              check
              size={50}
              width={760}
              items={[
                { text: "10M qualified Shorts views", sub: "in the last 90 days", at: tenM },
                { text: "Checked every month", sub: "fall below and Shorts ad pay stops", at: monthly },
              ]}
            />
          </At>
          <At x={930} y={110} style={{ transform: "scale(1.12)", transformOrigin: "0 0" }}>
            <UICard at={newCh - 10} pad={0} radius={18} from="right" style={{ background: "transparent", boxShadow: "none" }}>
              <StudioEligibility
                start={newCh}
                width={800}
                title="Join YouTube Partner Program"
                subtitle="New channels need 1,000 subscribers plus one of these"
                rows={[
                  { label: "Subscribers", sub: "required", value: "1,000", at: subs, pct: 0.62 },
                  { label: "Public watch hours", sub: "last 12 months", value: "8,000", at: hours, pct: 0.18 },
                  { label: "Shorts views", sub: "last 90 days", value: "20M", at: twentyM, pct: 0.08, or: true },
                ]}
              />
            </UICard>
          </At>
        </Camera>
      </Phase>

      <Phase from={what} out={0}>
        <Row y={400}>
          <Kinetic text="So what *does* pay?" start={what + 6} size={150} reflow />
        </Row>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 4. The YouTube-first model                                          */
/* ------------------------------------------------------------------ */
const ModelNode: React.FC<{ at: number; logo: React.ReactNode; label: string; word: string; desc: string; dim: boolean }> = ({ at, logo, label, word, desc, dim }) => (
  <UICard at={at} w={480} pad={34} style={{ textAlign: "center", opacity: dim ? 0.55 : undefined }}>
    <div style={{ height: 70, display: "flex", justifyContent: "center", alignItems: "center" }}>{logo}</div>
    <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 30, color: C.muted, marginTop: 16 }}>{label}</div>
    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 82, letterSpacing: "-0.04em", lineHeight: 1.05, ...gradientText(false) }}>{word}</div>
    <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 26, color: C.muted, marginTop: 8 }}>{desc}</div>
  </UICard>
);

export const V1Model: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("This is the model");
  const p1 = useCue("Part one:");
  const p2 = useCue("Part two:");
  const p3 = useCue("Part three:");
  const tt = useCue("And TikTok and Instagram?");
  const once = useCue("You make a clip once");
  const core = useCue("That's the core");
  const cur = f >= p3 ? 2 : f >= p2 ? 1 : 0;
  const nodeDim = (i: number) => f >= p1 && f < tt && cur !== i && f > p2;
  return (
    <AbsoluteFill>
      <Phase from={0} to={once} out={18}>
        <Camera pullAt={tt} pullTo={0.84} origin="50% 20%">
          <Row y={90}>
            <Headline text="The *YouTube-first* model" at={intro} size={92} kicker="How the money works" />
          </Row>
          <Row y={330} gap={44}>
            <ModelNode at={p1} logo={<ShortsLogo h={66} />} label="YouTube Shorts" word="Growth" desc="discovered fast, every day" dim={nodeDim(0)} />
            <ModelNode at={p2} logo={<YouTubeLogo h={56} word={false} />} label="Long-form videos" word="Money" desc="where real ad revenue lives" dim={nodeDim(1)} />
            <ModelNode at={p3} logo={<WhopLogo h={50} word={false} />} label="Whop campaigns" word="Bonus" desc="cash while you grow" dim={nodeDim(2)} />
          </Row>
          <Connector x1={505} y1={760} x2={505} y2={840} at={tt + 6} color={C.muted} dashed />
          <At x={300} y={850}>
            <Reveal at={tt + 14}>
              <Chip style={{ fontSize: 30 }}>
                <TikTokLogo h={34} /> <InstagramLogo h={34} /> Same clips, extra reach
              </Chip>
            </Reveal>
          </At>
        </Camera>
      </Phase>

      <Phase from={once} out={0} inF={16}>
        <Camera driftAmount={0.8}>
          <HubSpoke at={once} />
          <Row y={830}>
            <Kinetic text="One piece of work. *Four chances.*" start={core + 20} size={62} reflow />
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

/** Hub-and-spoke: 1 clip in the middle, 4 places around, dots flowing out. */
const HubSpoke: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const cx = 960;
  const cy = 430;
  const nodes = [
    { x: cx - 560, y: cy - 150, logo: <ShortsLogo h={52} />, label: "YouTube Shorts" },
    { x: cx + 560, y: cy - 150, logo: <TikTokLogo h={56} />, label: "TikTok" },
    { x: cx - 560, y: cy + 190, logo: <InstagramLogo h={56} />, label: "Instagram Reels" },
    { x: cx + 560, y: cy + 190, logo: <WhopLogo h={44} word={false} />, label: "Whop campaign" },
  ];
  const hub = settle(f, at);
  return (
    <AbsoluteFill>
      {nodes.map((n, i) => {
        const t0 = at + 20 + i * 10;
        const p = interpolate(f, [t0, t0 + 24], [0, 1], { ...clamp, easing: QUINT_OUT });
        const x = mix(cx, n.x, p);
        const y = mix(cy, n.y, p);
        return (
          <React.Fragment key={i}>
            <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1920} height={1080}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={C.orange} strokeWidth={4} strokeDasharray="2 14" strokeLinecap="round" opacity={p} />
              {p >= 1 &&
                [0, 1, 2].map((k) => {
                  const t = ((f - t0 + k * 22) % 66) / 66;
                  return <circle key={k} cx={mix(cx, n.x, t)} cy={mix(cy, n.y, t)} r={8} fill={C.yellow} opacity={Math.sin(t * Math.PI)} />;
                })}
            </svg>
            <div
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * p})`,
                opacity: p,
                background: "#fff",
                borderRadius: 28,
                padding: "22px 30px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontFamily: FONT_BODY,
                fontWeight: 700,
                fontSize: 34,
                whiteSpace: "nowrap",
              }}
            >
              {n.logo} {n.label}
            </div>
          </React.Fragment>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: `translate(-50%,-50%) scale(${hub})`,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #FFF3A6, ${C.yellow} 50%, ${C.amber})`,
          boxShadow: `0 0 0 ${16 + 6 * Math.sin(f / 10)}px rgba(255,214,10,0.25), 0 30px 80px rgba(255,160,0,0.35)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_HEAD,
          fontWeight: 800,
          color: C.ink,
        }}
      >
        <div style={{ fontSize: 96, lineHeight: 0.9, letterSpacing: "-0.05em" }}>1</div>
        <div style={{ fontSize: 36 }}>clip</div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 5. Why long-form                                                    */
/* ------------------------------------------------------------------ */
export const V1WhyLongform: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Let's talk about why long-form");
  const r1 = useCue("Reason one:");
  const r2 = useCue("Reason two:");
  const lot = useCue("A lot more.");
  const connect = useCue("So here's how the pieces connect.");
  const s1 = useCue("Your Shorts get discovered");
  const s2 = useCue("Some of those people subscribe.");
  const s3 = useCue("Your subscribers then watch");
  const s4 = useCue("Those longer videos build");
  const house = useCue("Think of it like a house.");
  const door = useCue("Shorts are the front door.");
  const room = useCue("Long-form is the living room");
  const money = useCue("And that's where the money is.");
  const tall = interpolate(f, [lot, lot + 40], [0.55, 1], { ...clamp, easing: EXPO_OUT });
  const barIn = settle(f, r2 + 20);
  const steps = [
    { at: s1, icon: "eye", t: "Shorts get discovered" },
    { at: s2, icon: "users", t: "Viewers subscribe" },
    { at: s3, icon: "play", t: "Subscribers watch long-form" },
    { at: s4, icon: "dollar", t: "Watch hours + ad money" },
  ];
  return (
    <AbsoluteFill>
      <Phase from={0} to={connect} out={16}>
        <Camera driftAmount={0.7}>
          <Row y={100}>
            <Headline text="Why *long-form* matters" at={intro} size={92} kicker="The money engine" />
          </Row>
          <Row y={330} gap={50}>
            <UICard at={r1} w={720} h={460} pad={44}>
              <Icon name="clock" size={64} color={C.orange} stroke={2.2} />
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 76, letterSpacing: "-0.04em", marginTop: 24 }}>Watch hours</div>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 36, color: C.muted, marginTop: 10, lineHeight: 1.3 }}>
                Long-form watch hours are what get a channel <b style={{ color: C.ink }}>monetized.</b>
              </div>
            </UICard>
            <UICard at={r2} w={720} h={460} pad={44}>
              <Icon name="dollar" size={64} color={C.orange} stroke={2.2} />
              <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 76, letterSpacing: "-0.04em", marginTop: 24 }}>Far more per view</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: 150, marginTop: 20 }}>
                {[
                  { l: "Shorts", h: 0.12, c: "#E7E5DD" },
                  { l: "Long-form", h: tall, c: "linear-gradient(180deg,#FFB800,#FF8A00)" },
                ].map((b) => (
                  <div key={b.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 150, height: 120 * b.h * barIn + 6, borderRadius: 14, background: b.c }} />
                    <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 26, color: C.muted }}>{b.l}</div>
                  </div>
                ))}
              </div>
            </UICard>
          </Row>
        </Camera>
      </Phase>

      <Phase from={connect} to={house} out={16}>
        <Camera driftAmount={0.6}>
          <Row y={120}>
            <Headline text="How the pieces *connect*" at={connect} size={84} />
          </Row>
          {steps.map((s, i) => {
            const x = 270 + i * 460;
            return (
              <React.Fragment key={i}>
                {i > 0 && <Connector x1={x - 460 + 175} y1={520} x2={x - 185} y2={520} at={s.at - 6} color={C.orange} width={5} />}
                <At x={x} y={520} center>
                  <UICard at={s.at} w={330} pad={30} style={{ textAlign: "center" }}>
                    <div style={{ width: 96, height: 96, margin: "0 auto", borderRadius: 30, background: i === 3 ? "linear-gradient(135deg,#FFE680,#FFB800)" : "#FFF6D6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={s.icon} size={50} color={C.ink} stroke={2.2} />
                    </div>
                    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 36, letterSpacing: "-0.02em", marginTop: 18, lineHeight: 1.12 }}>{s.t}</div>
                  </UICard>
                </At>
              </React.Fragment>
            );
          })}
          <Row y={720}>
            <Reveal at={s4 + 30}>
              <Chip tone="yellow" style={{ fontSize: 30 }}>
                <Icon name="refresh" size={26} color={C.ink} /> Shorts feed long-form, every day
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>

      <Phase from={house} out={0}>
        <At x={0} y={420} w={1920}>
          <StackedLines
            size={100}
            lines={[
              { text: "Shorts are the *front door.*", at: door },
              { text: "Long-form is the *living room.*", at: room },
              { text: "That's where the *money* is.", at: money },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 6. Whop: the bonus                                                  */
/* ------------------------------------------------------------------ */
export const V1Whop: React.FC = () => {
  const f = useCurrentFrame();
  const now = useCue("Whop can pay you right now.");
  const fund = useCue("A creator or a brand funds");
  const clip = useCue("You clip their content");
  const paid = useCue("Then you get paid");
  const most = useCue("Most campaigns pay");
  const median = useCue("the median is about");
  const fee = useCue("Whop takes about ten percent.");
  const watch = useCue("two things to watch.");
  const max = useCue("max payout per clip");
  const budget = useCue("and a total budget.");
  const runs = useCue("When the budget runs out");
  const terms = useCue("always read the campaign terms");
  const used = interpolate(f, [runs, runs + 90], [6200, 20000], { ...clamp, easing: EXPO_OUT });
  const hl = f >= terms ? "req" : f >= budget ? "budget" : f >= max ? "max" : f >= most ? "rate" : null;
  const steps = [
    { at: fund, icon: "dollar", t: "Creator funds a campaign" },
    { at: clip, icon: "scissors", t: "You clip, post, submit" },
    { at: paid, icon: "eye", t: "Paid per 1,000 views" },
  ];
  return (
    <AbsoluteFill>
      <Phase from={0} to={most - 6} out={18}>
        <Camera driftAmount={0.7}>
          <Row y={130}>
            <Headline text="Whop: *bonus cash* while you grow" at={now} size={84} kicker="Content Rewards" />
          </Row>
          {steps.map((s, i) => {
            const x = 420 + i * 540;
            return (
              <React.Fragment key={i}>
                {i > 0 && <Connector x1={x - 540 + 215} y1={540} x2={x - 225} y2={540} at={s.at - 6} color={C.orange} width={5} />}
                <At x={x} y={540} center>
                  <UICard at={s.at} w={400} pad={34} style={{ textAlign: "center" }}>
                    <div style={{ width: 104, height: 104, margin: "0 auto", borderRadius: 32, background: "linear-gradient(135deg,#FFE680,#FFB800)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={s.icon} size={54} color={C.ink} stroke={2.2} />
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 24, color: C.muted, marginTop: 18 }}>Step {i + 1}</div>
                    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 40, letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 4 }}>{s.t}</div>
                  </UICard>
                </At>
              </React.Fragment>
            );
          })}
        </Camera>
      </Phase>

      <Phase from={most - 6} out={0}>
        <CameraDive3D start={most - 6} dur={80} fromRotateX={48} fromRotateZ={-14} fromX={700} fromY={420} fromZ={-700} motionBlur blurFrames={20}>
          <Camera driftAmount={0.5}>
            <HighlightedCampaign
              hl={hl}
              used={used}
              seq={[
                { at: most + 10, key: "rate" },
                { at: max, key: "max" },
                { at: budget, key: "budget" },
                { at: terms, key: "req" },
              ]}
            />
          </Camera>
        </CameraDive3D>
        <At x={1340} y={110} w={500} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { at: most + 20, k: "Most campaigns", v: "$1 to $5 / 1K" },
            { at: median, k: "Median", v: "about $1.09 / 1K" },
            { at: fee, k: "Whop fee", v: "about 10%" },
            { at: max, k: "Max payout", v: "per clip cap" },
            { at: budget, k: "Total budget", v: "runs out = stops" },
          ].map((r, i) => (
            <UICard key={i} at={r.at} pad={24} radius={22} from="right" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 26, color: C.muted }}>{r.k}</span>
              <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em" }}>{r.v}</span>
            </UICard>
          ))}
          {f >= watch && f < max && (
            <Reveal at={watch}>
              <Chip tone="yellow">2 things to watch</Chip>
            </Reveal>
          )}
        </At>
        <At x={1590} y={790} center>
          <Reveal at={terms}>
            <Chip tone="yellow" style={{ fontSize: 30 }}>
              <Icon name="book" size={26} color={C.ink} /> Always read the terms
            </Chip>
          </Reveal>
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/** Campaign page with a focus camera that punches in on what's being explained. */
const REGIONS: Record<string, { x: number; y: number; w: number; h: number; z: number }> = {
  all: { x: 590, y: 360, w: 0, h: 0, z: 1 },
  rate: { x: 34, y: 399, w: 121, h: 66, z: 1.75 },
  max: { x: 276, y: 399, w: 121, h: 66, z: 1.75 },
  budget: { x: 34, y: 477, w: 550, h: 108, z: 1.55 },
  req: { x: 596, y: 477, w: 550, h: 108, z: 1.5 },
};

const HighlightedCampaign: React.FC<{ hl: string | null; used: number; seq: { at: number; key: string }[] }> = ({ hl, used, seq }) => {
  const f = useCurrentFrame();
  // Page sits at (70, 60). Focus target screen point:
  const P0 = { x: 70, y: 60 };
  const S = { x: 640, y: 470 };
  const cam = (key: string) => {
    const r = REGIONS[key];
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    if (key === "all") return { tx: 0, ty: 0, z: 1 };
    return { tx: S.x - r.z * (P0.x + cx), ty: S.y - r.z * (P0.y + cy), z: r.z };
  };
  let cur = cam("all");
  seq.forEach((st, i) => {
    if (f < st.at) return;
    const prev = i === 0 ? cam("all") : cam(seq[i - 1].key);
    const next = cam(st.key);
    const p = interpolate(f, [st.at, st.at + 42], [0, 1], { ...clamp, easing: EXPO_OUT });
    cur = { tx: mix(prev.tx, next.tx, p), ty: mix(prev.ty, next.ty, p), z: mix(prev.z, next.z, p) };
  });
  const r = hl ? REGIONS[hl] : null;
  const pulse = 1 + 0.02 * Math.sin(f / 9);
  const ringIn = hl ? interpolate(f, [seq.find((x) => x.key === hl)?.at ?? 0, (seq.find((x) => x.key === hl)?.at ?? 0) + 16], [0, 1], clamp) : 0;
  return (
    <AbsoluteFill style={{ transform: `translate(${cur.tx}px, ${cur.ty}px) scale(${cur.z})`, transformOrigin: "0 0" }}>
      <div style={{ position: "absolute", left: P0.x, top: P0.y, boxShadow: "0 40px 120px rgba(0,0,0,0.16)", borderRadius: 18 }}>
        <WhopCampaignPage width={1180} used={used} />
        {r && (
          <div
            style={{
              position: "absolute",
              left: r.x - 8,
              top: r.y - 8,
              width: r.w + 16,
              height: r.h + 16,
              borderRadius: 14,
              border: `4px solid ${C.yellow}`,
              boxShadow: `0 0 0 8px rgba(255,214,10,0.25), 0 0 30px rgba(255,184,0,0.6)`,
              transform: `scale(${pulse * (0.9 + 0.1 * ringIn)})`,
              opacity: ringIn,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
