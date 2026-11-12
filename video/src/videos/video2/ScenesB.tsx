import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../../components/Camera";
import { Phone } from "../../components/DeviceFrame";
import { FocusCamera } from "../../components/FocusCamera";
import { Kinetic } from "../../components/KineticText";
import { StackedLines } from "../../components/StackedLines";
import { Chip, Headline } from "../../components/Teaching";
import { Reveal, UICard } from "../../components/UICard";
import { Wordmark } from "../../components/Wordmark";
import { At, Phase, Row } from "../../lib/helpers";
import { clamp, EXPO_OUT, mix, settle } from "../../lib/motion";
import { useCue, useScene } from "../../lib/scene";
import { CapCutEditor } from "../../mockups/CapCut";
import { FakeFrame } from "../../mockups/FakeFrame";
import { Icon, OpusClipLogo } from "../../mockups/icons";
import { OpusPlanCard, ScoreBadge } from "../../mockups/OpusClip";
import { C, FONT_BODY, FONT_HEAD, gradientText } from "../../theme";

/* ------------------------------------------------------------------ */
/* 7. Never post AI output raw (dark)                                  */
/* ------------------------------------------------------------------ */
export const V2NeverRaw: React.FC = () => {
  const f = useCurrentFrame();
  const mistake = useCue("the biggest mistake new clippers make.");
  const raw = useCue("post them raw.");
  const everyone = useCue("Everyone in a campaign uploads");
  const same = useCue("same AI picks.");
  const fifty = useCue("Imagine fifty clippers");
  const nobody = useCue("Nobody stands out");
  const policy = useCue("YouTube's inauthentic content policy.");
  const exactly = useCue("Raw AI clips are exactly that.");
  const never = useCue("So never post them raw.");
  const yours = useCue("Always make them yours.");
  const capcut = useCue("That's what CapCut is for.");
  const gray = interpolate(f, [nobody, nobody + 30], [0, 1], clamp);
  const lift = settle(f, yours);
  return (
    <AbsoluteFill>
      <Phase from={0} to={everyone} out={16}>
        <Row y={330}>
          <Kinetic text="The #1 *mistake.*" start={mistake} size={130} dark reflow exitAt={raw - 4} />
        </Row>
        <Row y={330}>{f >= raw - 4 && <Kinetic text="Posting AI clips *raw.*" start={raw} size={130} dark reflow />}</Row>
      </Phase>
      <Phase from={everyone - 4} to={policy} out={18}>
        <Camera driftAmount={0.4} pullAt={fifty} pullTo={0.78} from={1.25}>
          <Row y={70}>
            <Reveal at={everyone}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="users" size={26} color={C.yellow} /> Same video, same tool, same picks
              </Chip>
            </Reveal>
          </Row>
          <At x={960} y={560} center>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 150px)", gap: 14 }}>
              {new Array(50).fill(0).map((_, i) => {
                const row = Math.floor(i / 10);
                const col = i % 10;
                const p = settle(f, (i < 10 ? same : fifty) + (Math.abs(col - 4.5) + row) * 2);
                const isYours = i === 24;
                const l = isYours ? lift : 0;
                return (
                  <div
                    key={i}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 14,
                      overflow: "hidden",
                      position: "relative",
                      opacity: Math.min(1, p * 2),
                      transform: `translateY(${(1 - p) * 30}px) scale(${1 + l * 0.4}) translateZ(0)`,
                      zIndex: isYours ? 5 : 1,
                      filter: isYours && l > 0 ? undefined : `grayscale(${gray}) brightness(${1 - 0.4 * gray})`,
                      boxShadow: l > 0 ? `0 0 0 ${5 * l}px ${C.yellow}, 0 30px 80px rgba(255,214,10,${0.5 * l})` : undefined,
                    }}
                  >
                    <FakeFrame kind="podcast" seed={1} moving={false} />
                    <div style={{ position: "absolute", left: 6, bottom: 6 }}>
                      <ScoreBadge score={99} size={0.8} />
                    </div>
                  </div>
                );
              })}
            </div>
          </At>
          <Row y={960 - 80}>
            <Reveal at={nobody}>
              <Chip dark style={{ fontSize: 30 }}>
                <Icon name="x" size={26} color={C.yellow} stroke={3} /> 50 identical clips. Nobody stands out.
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={policy} to={never} out={16} inF={14}>
        <Row y={220}>
          <UICard at={policy} w={1100} pad={56} dark radius={40} style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 26, letterSpacing: "0.16em", color: C.yellow }}>
              <Icon name="shield" size={30} color={C.yellow} /> YOUTUBE POLICY
            </div>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 84, letterSpacing: "-0.04em", marginTop: 18 }}>Inauthentic content</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 30 }}>
              {["Mass-produced", "Repetitive", "Low-effort"].map((t, i) => (
                <Reveal key={t} at={policy + 40 + i * 12}>
                  <Chip dark style={{ fontSize: 32 }}>
                    {t}
                  </Chip>
                </Reveal>
              ))}
            </div>
            <Reveal at={exactly}>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 40, color: "rgba(255,255,255,0.75)", marginTop: 34 }}>
                Raw AI clips are <span style={{ color: C.yellow }}>exactly that.</span>
              </div>
            </Reveal>
          </UICard>
        </Row>
      </Phase>
      <Phase from={never} out={0} inF={12}>
        <At x={0} y={420} w={1920}>
          <StackedLines
            size={120}
            dark
            lines={[
              { text: "Never post them *raw.*", at: never },
              { text: "Make them *yours.*", at: yours },
              { text: "That's what *CapCut* is for.", at: capcut },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 8. Editor step by step (CapCut)                                     */
/* ------------------------------------------------------------------ */
export const V2Editor: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Here's the editing routine in CapCut");
  const trim = useCue("First, tighten the start.");
  const hook = useCue("Second, add your hook text");
  const caps = useCue("Third, restyle the captions.");
  const safe = useCue("keep them in the safe zone");
  const zoom = useCue("Fourth, add one edit");
  const voice = useCue("Fifth, if you can");
  const payoff = useCue("Sixth, end right on the payoff.");
  const exp = useCue("And finally, export");
  const S = 0.9;
  const ox = (1920 - 1600 * S) / 2;
  const oy = 96;
  // editor content coords -> screen
  const P = (x: number, y: number) => ({ x: ox + x * S, y: oy + y * S });
  const steps = [
    { at: trim, t: "Tighten the start" },
    { at: hook, t: "Add the hook text" },
    { at: caps, t: "Restyle captions (safe zone)" },
    { at: zoom, t: "One edit: punch-in zoom" },
    { at: voice, t: "3 to 10 s of your voice" },
    { at: payoff, t: "End on the payoff" },
    { at: exp, t: "Export 1080 x 1920" },
  ];
  const cur = steps.reduce((a, s, i) => (f >= s.at ? i : a), -1);
  const player = P(990, 300);
  const timeline = P(520, 720);
  return (
    <AbsoluteFill>
      <Camera driftAmount={0.3}>
        <FocusCamera
          originX={0}
          originY={0}
          screen={{ x: 960, y: 470 }}
          focuses={[
            { at: trim + 10, x: timeline.x, y: timeline.y, z: 1.55 },
            { at: hook + 10, x: player.x, y: player.y + 20, z: 1.5 },
            { at: zoom + 6, x: P(1150, 300).x, y: P(1150, 300).y, z: 1.25 },
            { at: voice + 6, x: P(400, 520).x, y: P(400, 520).y, z: 1.3 },
            { at: payoff + 6, x: timeline.x, y: timeline.y, z: 1.55 },
            { at: exp - 4, x: 960, y: 500, z: 1 },
          ]}
        >
          <div style={{ position: "absolute", left: ox, top: oy }}>
            <Reveal at={0} dist={50}>
              <CapCutEditor width={1600 * S} t={{ trim: trim + 20, hook: hook + 30, captions: caps + 20, zoom: zoom + 40, voice: voice + 40, payoff: payoff + 20, export: exp + 30 }} />
            </Reveal>
          </div>
        </FocusCamera>
      </Camera>
      <At x={960} y={46} center>
        <Reveal at={Math.min(intro, 8)}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 999, padding: "12px 24px", boxShadow: "0 12px 40px rgba(0,0,0,0.1)", fontFamily: FONT_BODY, fontWeight: 700, fontSize: 28 }}>
            <span style={{ ...gradientText(false), fontFamily: FONT_HEAD, fontWeight: 800 }}>{cur < 0 ? "CapCut" : `Step ${cur + 1}/7`}</span>
            <span>{cur < 0 ? "the editing routine" : steps[cur].t}</span>
            <div style={{ display: "flex", gap: 6, marginLeft: 6 }}>
              {steps.map((_, i) => (
                <div key={i} style={{ width: i === cur ? 26 : 10, height: 10, borderRadius: 5, background: i <= cur ? C.amber : "#E5E3DB" }} />
              ))}
            </div>
          </div>
        </Reveal>
      </At>
      {f >= safe && f < zoom && (
        <At x={1620} y={300} center>
          <Reveal at={safe}>
            <Chip tone="green" style={{ fontSize: 26 }}>
              <Icon name="check" size={22} color="#1A7F3C" stroke={3} /> Safe zone
            </Chip>
            <div style={{ height: 12 }} />
            <Chip tone="red" style={{ fontSize: 26 }}>
              <Icon name="x" size={22} color="#C2261B" stroke={3} /> Bottom + right edge
            </Chip>
          </Reveal>
        </At>
      )}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 9. Before vs after                                                  */
/* ------------------------------------------------------------------ */
const ClipScreen: React.FC<{ finished: boolean }> = ({ finished }) => {
  const f = useCurrentFrame();
  const z = finished ? 1 + 0.14 * Math.max(0, Math.sin(((f % 240) / 240) * Math.PI)) : 1;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: finished ? 0 : "18%", bottom: finished ? 0 : "18%", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${finished ? 1.3 * z : 1})` }}>
          <FakeFrame kind="city" seed={1} />
        </div>
      </div>
      {finished ? (
        <>
          <div style={{ position: "absolute", top: "12%", left: "8%", right: "8%", textAlign: "center" }}>
            <span style={{ background: C.yellow, color: "#000", fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 26, padding: "4px 10px", borderRadius: 8, lineHeight: 1.5, boxDecorationBreak: "clone" }}>He did NOT expect the cops to do this</span>
          </div>
          <div style={{ position: "absolute", top: "56%", left: "8%", right: "18%", textAlign: "center", fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 34, color: "#fff", WebkitTextStroke: "1.5px #000", textShadow: "0 3px 0 #000" }}>
            WAIT FOR <span style={{ color: C.yellow }}>IT</span>
          </div>
          <div style={{ position: "absolute", left: 14, top: 60, display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.6)", borderRadius: 999, padding: "5px 10px", fontFamily: FONT_BODY, fontSize: 14, color: "#fff" }}>
            <Icon name="mic" size={14} color={C.yellow} /> your voice
          </div>
        </>
      ) : (
        <div style={{ position: "absolute", bottom: "7%", left: "6%", right: "6%", textAlign: "center", fontFamily: FONT_BODY, fontSize: 16, color: "#fff" }}>so yeah and then we were driving and</div>
      )}
      <div style={{ position: "absolute", right: 10, bottom: 80, display: "flex", flexDirection: "column", gap: 14, opacity: 0.85 }}>
        {["like", "comment", "share"].map((ic) => (
          <Icon key={ic} name={ic} size={26} fill="#fff" stroke={ic === "share" ? 2 : 0} />
        ))}
      </div>
    </div>
  );
};

export const V2BeforeAfter: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Now look at the difference.");
  const left = useCue("On the left, the raw AI clip.");
  const slow = useCue("A slow start");
  const right = useCue("On the right, the finished clip.");
  const action = useCue("It starts on the action");
  const hookC = useCue("a hook at the top");
  const capsC = useCue("captions you styled yourself");
  const zoomC = useCue("a zoom on the big moment");
  const voiceC = useCue("your own voice.");
  const same = useCue("Same footage.");
  const sig = useCue("Your edit is your signature");
  const bad = [
    { at: slow, t: "Slow start" },
    { at: slow + 40, t: "Default captions" },
    { at: slow + 80, t: "No hook" },
    { at: slow + 120, t: "Same as 50 others" },
  ];
  const good = [
    { at: action, t: "Starts on the action" },
    { at: hookC, t: "Hook at the top" },
    { at: capsC, t: "Your caption style" },
    { at: zoomC, t: "Punch-in zoom" },
    { at: voiceC, t: "Your own voice" },
  ];
  return (
    <AbsoluteFill>
      <Phase from={0} to={sig} out={16}>
        <Camera driftAmount={0.6} pullAt={same} pullTo={0.94}>
          <Row y={40}>
            <Headline text="Raw vs *finished*" at={Math.min(intro, 10)} size={80} />
          </Row>
          <At x={110} y={160}>
            <Reveal at={left} dx={-60} dist={0}>
              <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
                <div style={{ filter: "grayscale(0.6)" }}>
                  <Phone w={350}>
                    <ClipScreen finished={false} />
                  </Phone>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 28, letterSpacing: "0.14em", color: C.muted }}>RAW AI CLIP</div>
                  {bad.map((b) => (
                    <Reveal key={b.t} at={b.at}>
                      <Chip tone="red" style={{ fontSize: 30 }}>
                        <Icon name="x" size={24} color="#C2261B" stroke={3} /> {b.t}
                      </Chip>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </At>
          <At x={990} y={160}>
            <Reveal at={right} dx={60} dist={0}>
              <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
                <div style={{ boxShadow: `0 0 0 6px ${C.yellow}, 0 30px 90px rgba(255,170,0,0.4)`, borderRadius: 54 }}>
                  <Phone w={350}>
                    <ClipScreen finished />
                  </Phone>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 28, letterSpacing: "0.14em", color: C.orange }}>FINISHED CLIP</div>
                  {good.map((b) => (
                    <Reveal key={b.t} at={b.at}>
                      <Chip tone="green" style={{ fontSize: 30 }}>
                        <Icon name="check" size={24} color="#1A7F3C" stroke={3} /> {b.t}
                      </Chip>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </At>
        </Camera>
      </Phase>
      <Phase from={sig - 2} out={0} inF={12}>
        <At x={0} y={420} w={1920}>
          <StackedLines
            size={100}
            lines={[
              { text: "Same *footage.*", at: sig },
              { text: "A completely different *clip.*", at: sig + 70 },
              { text: "Your edit is your *signature.*", at: sig + 150 },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 10. Hook formulas                                                   */
/* ------------------------------------------------------------------ */
export const V2Hooks: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Your hook is the most important line");
  const hooks = [
    { at: useCue("Wait for his reaction."), t: "Wait for his *reaction.*" },
    { at: useCue("Nobody expected this."), t: "Nobody *expected* this." },
    { at: useCue("Did you notice this?"), t: "Did you *notice* this?" },
    { at: useCue("GTA 5 versus GTA 6 cops."), t: "GTA 5 vs GTA 6 *cops.*" },
    { at: useCue("POV: you just bought"), t: "POV: you just bought *GTA 6*" },
    { at: useCue("He wasn't supposed to do that."), t: "He wasn't *supposed* to do that." },
    { at: useCue("This is the best moment"), t: "The *best moment* of the stream" },
    { at: useCue("Watch until the end."), t: "Watch until the *end.*" },
  ];
  const dont = useCue("Don't copy these word for word.");
  const good = useCue("A good hook is short");
  const question = useCue("it creates a question");
  const answers = useCue("the clip answers it.");
  const active = hooks.reduce((a, h, i) => (f >= h.at ? i : a), -1);
  const slots = [
    { x: 300, y: 150 },
    { x: 1620, y: 160 },
    { x: 260, y: 760 },
    { x: 1640, y: 770 },
    { x: 960, y: 120 },
    { x: 960, y: 820 },
    { x: 330, y: 460 },
    { x: 1600, y: 470 },
  ];
  return (
    <AbsoluteFill>
      <Phase from={0} to={dont} out={18}>
        <Camera driftAmount={0.7}>
          {active < 0 && (
            <Row y={420}>
              <Kinetic text="Hook *formulas*" start={Math.min(intro, 10)} size={140} reflow />
            </Row>
          )}
          {hooks.map((h, i) => {
            if (i > active) return null;
            const isCur = i === active;
            const next = hooks[i + 1]?.at ?? 1e9;
            const toChip = interpolate(f, [next, next + 30], [0, 1], { ...clamp, easing: EXPO_OUT });
            if (isCur) {
              return (
                <Row key={i} y={420}>
                  <Kinetic text={h.t} start={h.at} size={110} reflow maxWidth={1300} />
                </Row>
              );
            }
            const s = slots[i];
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: mix(960, s.x, toChip),
                  top: mix(470, s.y, toChip),
                  transform: `translate(-50%,-50%) scale(${mix(1.6, 1, toChip)})`,
                  opacity: 0.4 + 0.6 * toChip,
                  filter: toChip < 1 ? `blur(${(1 - toChip) * 8}px)` : undefined,
                }}
              >
                <Chip style={{ fontSize: 30, whiteSpace: "nowrap", fontWeight: 700 }}>{h.t.replace(/\*/g, "")}</Chip>
              </div>
            );
          })}
        </Camera>
      </Phase>
      <Phase from={dont} out={0} inF={12}>
        <Row y={180}>
          <Reveal at={dont}>
            <Chip tone="yellow" style={{ fontSize: 30 }}>
              <Icon name="sparkles" size={26} color={C.ink} /> Starting points, not scripts
            </Chip>
          </Reveal>
        </Row>
        <At x={0} y={420} w={1920}>
          <StackedLines
            size={96}
            lines={[
              { text: "Keep it *short.*", at: good },
              { text: "Create a *question.*", at: question },
              { text: "The clip *answers it.*", at: answers },
            ]}
          />
        </At>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 11. OpusClip plans                                                  */
/* ------------------------------------------------------------------ */
export const V2Plans: React.FC = () => {
  const f = useCurrentFrame();
  const intro = useCue("Let's talk about OpusClip plans.");
  const trial = useCue("There's a free trial");
  const starter = useCue("Starter is about");
  const s150 = useCue("one hundred and fifty credits.");
  const pro = useCue("Pro is about");
  const p300 = useCue("three hundred credits");
  const roll = useCue("with rollover");
  const six = useCue("six social accounts");
  const sched = useCue("and a scheduler.");
  const rule = useCue("only upgrade when your earnings cover it.");
  const path = useCue("Start on the trial");
  const tools = useCue("Tools should pay for themselves.");
  return (
    <AbsoluteFill>
      <Phase from={0} to={rule} out={18}>
        <Camera driftAmount={0.6}>
          <Row y={70} gap={20}>
            <Reveal at={Math.min(intro, 8)}>
              <div style={{ background: "#000", borderRadius: 18, padding: "12px 18px" }}>
                <OpusClipLogo h={36} />
              </div>
            </Reveal>
            <Kinetic text="*plans*" start={Math.min(intro, 8) + 10} size={84} align="left" style={{ width: 260 }} />
          </Row>
          <Row y={190}>
            <Reveal at={trial}>
              <Chip tone="yellow" style={{ fontSize: 30 }}>
                <Icon name="star" size={26} color={C.ink} /> Free trial · no card needed
              </Chip>
            </Reveal>
          </Row>
          <Row y={290} gap={60} style={{ alignItems: "flex-start" }}>
            <UICard at={starter} pad={0} radius={22} from="left" style={{ background: "transparent", boxShadow: "none" }}>
              <OpusPlanCard name="Starter" tagline="For individual creators" price="$12 to $15" at={starter} items={[{ t: "150 credits / month", at: s150 }, { t: "AI clipping + virality score", at: s150 + 30 }, { t: "Free trial first", at: s150 + 50 }]} />
            </UICard>
            <UICard at={pro} pad={0} radius={22} from="right" style={{ background: "transparent", boxShadow: "none" }}>
              <OpusPlanCard
                name="Pro"
                tagline="When the money is coming in"
                price="$23 to $29"
                highlight
                at={pro}
                items={[
                  { t: "300 credits / month", at: p300 },
                  { t: "Unused credits roll over", at: roll },
                  { t: "6 social accounts", at: six },
                  { t: "Scheduler", at: sched },
                ]}
              />
            </UICard>
          </Row>
        </Camera>
      </Phase>
      <Phase from={rule} out={0} inF={12}>
        <Row y={230}>
          <Kinetic text="Upgrade when your *earnings cover it.*" start={rule} size={84} reflow maxWidth={1700} />
        </Row>
        <Row y={450} gap={26}>
          {[
            ["Free trial", path],
            ["Starter", path + 40],
            ["Pro", path + 100],
          ].map(([t, at], i) => (
            <React.Fragment key={t as string}>
              {i > 0 && (
                <Reveal at={(at as number) - 6}>
                  <Icon name="share" size={40} color={C.muted} />
                </Reveal>
              )}
              <Reveal at={at as number}>
                <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", padding: "20px 40px", borderRadius: 28, background: i === 2 ? "#0A0A0A" : "#fff", color: i === 2 ? "#fff" : C.ink, boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)" }}>
                  {t as string}
                </div>
              </Reveal>
            </React.Fragment>
          ))}
        </Row>
        <Row y={640}>
          <Reveal at={path + 140}>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 34, color: C.muted }}>Pro only when you keep running out of credits</div>
          </Reveal>
        </Row>
        <Row y={760}>
          <Reveal at={tools}>
            <Chip tone="yellow" style={{ fontSize: 30 }}>
              <Icon name="dollar" size={26} color={C.ink} /> Tools should pay for themselves
            </Chip>
          </Reveal>
        </Row>
      </Phase>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 12. Homework + outro (dark)                                         */
/* ------------------------------------------------------------------ */
export const V2Homework: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useScene();
  const hw = useCue("Here's your homework.");
  const three = useCue("Make three clips today.");
  const pick = useCue("Pick a campaign");
  const run = useCue("run it through OpusClip");
  const check = useCue("check every clip");
  const edit = useCue("edit your best three");
  const time = useCue("And time yourself.");
  const first = useCue("Your first clip will probably take");
  const thirty = useCue("By clip thirty");
  const reps = useCue("Speed comes from reps");
  const finish = useCue("Just finish all three");
  const next = useCue("In the next video");
  return (
    <AbsoluteFill>
      <Phase from={0} to={time} out={16}>
        <Camera driftAmount={0.5}>
          <Row y={170}>
            <Kinetic text="Homework: *3 clips* today" start={Math.max(hw, three - 30)} size={110} dark reflow />
          </Row>
          <Row y={430} gap={22}>
            {[
              { at: pick, t: "Campaign or your gameplay", ic: "target" },
              { at: run, t: "OpusClip", ic: "scissors" },
              { at: check, t: "Checklist", ic: "check" },
              { at: edit, t: "Edit the best 3 in CapCut", ic: "film" },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <Reveal at={s.at - 4}>
                    <div style={{ width: 40, height: 4, background: "rgba(255,214,10,0.6)", borderRadius: 2 }} />
                  </Reveal>
                )}
                <Reveal at={s.at}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "22px 28px", borderRadius: 26, background: "rgba(255,255,255,0.06)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)", fontFamily: FONT_BODY, fontWeight: 700, fontSize: 30, color: "#fff" }}>
                    <Icon name={s.ic} size={30} color={C.yellow} stroke={2.4} /> {s.t}
                  </div>
                </Reveal>
              </React.Fragment>
            ))}
          </Row>
        </Camera>
      </Phase>
      <Phase from={time} to={next} out={16} inF={12}>
        <Camera driftAmount={0.5}>
          <Row y={130}>
            <Kinetic text="Time *yourself.*" start={time} size={110} dark reflow />
          </Row>
          <At x={360} y={360} w={1200}>
            {[
              { at: first, label: "Clip 1", mins: 20, txt: "about 20 min" },
              { at: thirty, label: "Clip 30", mins: 9, txt: "under 10 min" },
            ].map((b, i) => {
              const p = interpolate(f, [b.at, b.at + 50], [0, 1], { ...clamp, easing: EXPO_OUT });
              if (f < b.at) return <div key={i} style={{ height: 150 }} />;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 30, height: 150 }}>
                  <div style={{ width: 170, fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 48, color: "#fff" }}>{b.label}</div>
                  <div style={{ height: 80, width: (b.mins / 20) * 760 * p, borderRadius: 20, background: i === 0 ? "rgba(255,255,255,0.18)" : "linear-gradient(90deg,#FFB800,#FFD60A)" }} />
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 36, color: i === 0 ? "rgba(255,255,255,0.7)" : C.yellow, opacity: p, whiteSpace: "nowrap" }}>{b.txt}</div>
                </div>
              );
            })}
          </At>
          <Row y={720} gap={20}>
            <Reveal at={reps}>
              <Chip dark style={{ fontSize: 32 }}>
                <Icon name="refresh" size={28} color={C.yellow} /> Speed comes from reps, not talent
              </Chip>
            </Reveal>
            <Reveal at={finish}>
              <Chip tone="yellow" style={{ fontSize: 32 }}>
                Finish 3 · post · start your tracking sheet
              </Chip>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
      <Phase from={next} to={D} out={0} inF={20}>
        <Camera pullAt={next + 40} pullTo={0.9} from={1.04} driftAmount={0.4}>
          <Row y={300}>
            <Wordmark size={220} start={next} />
          </Row>
          <Row y={560}>
            <Reveal at={next + 50}>
              <Chip dark style={{ fontSize: 32 }}>
                <Icon name="play" size={26} color={C.yellow} fill={C.yellow} stroke={0} /> Next: Video 3 · The daily routine
              </Chip>
            </Reveal>
          </Row>
          <Row y={700}>
            <Reveal at={next + 80}>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 28, color: "rgba(255,255,255,0.55)" }}>Results vary. Income figures are examples, not guarantees.</div>
            </Reveal>
          </Row>
        </Camera>
      </Phase>
    </AbsoluteFill>
  );
};

