# Perplexity "Introducing teammates" launch video: motion analysis

Source: `perplexity_ai_2118389256930660352.mp4`, 1920x1080, 30 fps, 71.0 s (2129 frames).
Method: I read all 71 grids (30 frames each). I then re-extracted full-res frames and checked crops of every UI transition frame by frame (`ref/pplx_full`, `ref/pplx_crop/*.jpg`).
Notation: **f** = source frame at 30 fps. **@60** = the frame count converted for a 60 fps Remotion comp (x2). Pixel values are measured at 1080p, ±10%.

Overall structure: live-action vignettes, each a single static-camera shot of one person in a monochrome set, with a **floating dark-glass UI panel as a screen-space HUD** in the empty wall area. A glossy 3D "teammate token" (a coloured blob or flower) is the connecting device. It flies from one scene's UI, across the cut, into the next scene's UI. There is **no mouse cursor, no clicks, no zoom into a screenshot, and no device frame**. The product is shown entirely as panel state changes: input → typed → submitted → agent message → chat → working checklist → done.

---

## 1. Shot-by-shot timeline

| # | Time (s) | Frames | Background / set | Layout | Content |
|---|---|---|---|---|---|
| 0 | 0.00–3.30 | f0–99 | Burnt-orange store scene (`#6a3314`), heavily defocused behind **fluted (reeded) glass**: vertical ribs about 10–14 px wide | Centred serif title. Ring of 8 glossy shapes around it | "Introducing / teammates" fades in, shapes orbit and expand outward, then the camera pushes *through* the title into the store |
| 1 | 3.33–16.90 | f100–507 | Same store, sharp (`#6a3314` wall, orange cabinets). Woman on the left-centre | UI panel **top-right**: x≈1183–1863 (≈680 w), top≈150 | "Create teammate" card → type "Store manager" → morph to agent greeting → user reply → agent reply → collapse to pill → working checklist with spinners |
| 2 | 16.93–26.10 | f508–783 | Pale teal studio (`#3d655d`). Man in a lounge chair. Slow dolly-in from wide to medium over about 6 s | UI top-right | Lime "Engineer" token flies in → pill → message → handoff to the "QA" pill (stacked below) → QA message → QA token flies out bottom-right |
| 3 | 26.13–32.47 | f784–974 | Olive-green office (`#2b3a19`), man at a wooden desk, pendant lamps. Static | UI top-right, lower (top≈250) because of the lamps | QA token re-enters from the left, arcs to the pill → "QA teammate" message streams in |
| 4 | 32.50–42.97 | f975–1288 | **Hard cut to a flat charcoal UI stage** (`#141517`–`#1b1c1e`). Huge blurred neon **outline** of the agent's shape behind the card | Centred card ≈880 w, top≈300. Next agent's pill waits at bottom-centre (y≈1000) | Vertical "conveyor" of 4 agents: Ads Manager (orange ring) → E-comm Manager (red 4-lobe) → Customer Support (blue triangle) → Engineer (lime double-circle). Each about 2.7 s with an auto-scrolling activity log |
| 5 | 43.00–52.03 | f1289–1561 | Mustard-yellow studio (`#44341d` shadow to `#e0be64` floor). Man at a long table | UI **top-left** (x≈98–772) because the subject is on the right | Yellow orb flies in from the left → "Ads Manager" message → "Emmanuel / Brand Director" reply → stack scrolls → agent reply "Got it…" → orb flies out to the right and across the cut |
| 6 | 52.07–63.97 | f1562–1919 | Periwinkle/violet (`#463f75`), woman at a glass desk. Very slow push-out | UI top-right | Orb enters from the left → Slack-style "#legal" thread card → Dana (Legal) reply → stack exits up → Dana's new instruction card → "Legal teammate" checklist: spinners → checkmarks → purple token leaves bottom-right |
| 7 | 64.00–66.83 | f1920–2005 | Pure black `#000` | Centred serif 2-line title, shapes orbiting | "Teammates / work for you." word-by-word reveal. Shapes orbit, then exit |
| 8 | 66.87–71.00 | f2006–2128 | Black | Centred logo lock-up | Single stroke unfolds into the Perplexity mark, "perplexity" wordmark fades in, hold about 3.4 s |

Cuts: all scene changes are **hard cuts**. The only exceptions are the intro (push-through with defocus) and the end (hard cut to black). Continuity across cuts comes from the **flying token**, which exits frame in scene A and enters from the opposite edge in scene B within about 4–8 frames.

---

## 2. Animation mechanics (measured)

### 2.1 Intro title push-through (f0–103)
- **Title fade-in:** f6–15 (0.3 s). Opacity 0→1, blur ≈8→0 px.
- **Ring of shapes:** 8 glossy blobs on a ring centred on the title. The ring spawns small at f3 (radius ≈350 px) and grows to ≈560 px by f18, ≈765 px by f50 and ≈880 px by f60. Shapes are off-screen by f74.
  - The ring rotates **counter-clockwise ≈85°/s**: the yellow shape goes from top (f18) to left (f50).
  - Each shape also spins and squashes on its own axis.
  - Expansion accelerates (ease-in).
- **Title scale (dolly-in):** "Introducing" width is 735 px at f15 and 765 px at f60, so it drifts slowly. Then it ramps hard: 950 (f74) → 1194 (f82) → 1440 (f86) → 1910 (f90) → about 5x (f94).
  - That is ≈1.0→1.3→1.6→2.0→2.6→5 over f60–94: an **exponential ease-in of ≈34 frames (1.13 s)**.
  - The last 6 frames add blur of about 20 px.
- **Exit:** at f98 the frame is only fluted glass plus defocused scene. Over f98–100 (2–3 frames) the glass and defocus snap away to the sharp scene (hard dissolve).

### 2.2 Panel entrance from blur ("Create teammate", f112–130)
- f114: ghost of the card, blur ≈20 px, opacity ≈0.25.
- f116: blur ≈5 px, opacity ≈0.55, scale ≈0.82.
- f118: sharp, opacity ≈0.85.
- Card width by frame: 472 (f118) → 512 (f120) → 540 (f122) → 558 (f124) → 571 (f126) → 577 (f128) → 579 (f130).
  - That is **scale 0.82→1.0 over ≈14 frames (0.47 s), strong ease-out**. The anchor is the **top-left**: left/top move by only about 10 px.
- Blur and opacity resolve within the first ≈6 frames (front-loaded). Scale keeps settling for 8 more.
- Card styling: top-half warm gradient (`rgba(255,120,80,0.25)` → transparent), dark glass body, radius ≈20 px, soft drop shadow (≈0 20px 60px rgba(0,0,0,0.35)).

### 2.3 Token fly-in into a UI slot
- **Scene 1 flower (f118–130):** enters from lower-left at ≈(1294, 723), ≈350 px. Lands at the card centre (1460, 337), ≈145 px, by f128–130.
  - Duration **≈10 frames (0.33 s)**, ease-out, scale ×0.4.
  - Afterwards it idles: bobs ±4 px and rotates slowly.
- **Scene 2 lime token (f510–536):**
  - Path: enters from bottom-centre (940, 990), ≈470 px. Swings right to (1620, 600). Curves up-left into the pill icon slot at (1265, 153), ≈30 px.
  - Per-4-frame travel: 460, 210, 195, 200, 270, 135 px. So it bursts in, travels roughly linearly, then decelerates into the slot.
  - Total **≈24 frames (0.8 s)**, scale ×0.065. It tumbles (rotates about 360°) on the way.
  - **The target pill starts spawning ≈8 frames before the token arrives** (f524 skeleton → f532 pill). The token lands in it, and the pill label fades in on the next 4 frames.
- **Cross-cut carry (f760–812):**
  - The QA icon pops out of the pill (f760), arcs down-right and leaves the bottom-right corner (f778).
  - Hard cut at f784. The token re-enters at the left edge (f788, y≈760), arcs up-right over the subject's head (f804), and lands in the newly spawned pill (f812).
  - In-scene flight ≈24 frames.
- Same grammar in scene 5→6: the yellow orb leaves at f1536, cuts at f1561, enters at f1565 and lands at f1590. The purple token exits at f1890–1919.

### 2.4 Typing into an input (f120–200)
- Field: label "Name or role" left, counter "0/80" right. Input box ≈1px border `rgba(255,255,255,0.12)`, fill slightly darker than the card, refresh icon on the right.
- **Caret:** 2 px white bar. It blinks while idle (visible at f120, hidden at f130: ≈0.5 s phase) and stays solid while typing.
- **Typing rate:** "S" at f140 (1/80), "Stor" at f150 (4/80), "Store m" at f160 (7/80), "Store manager" by ≈f178 (13/80).
  - That is **≈3.3 frames per character (≈9 chars/s), constant cadence, no jitter**.
  - The counter increments with every character.
- **Submit:** about 0.7 s hold after the last char, then the caret disappears (f200). There is no button press and no cursor. The panel immediately morphs (2.5).

### 2.5 Panel morph: input card → agent message card (f202–228, layout/FLIP morph)
- Container: width 603→680 px, height 408→330 px over **f202–212 (10 frames, 0.33 s), ease-in-out**. The radius is unchanged and the top-left anchor stays fixed.
- The gradient highlight fades out with the old content.
- **Old content out:** f204–210. Opacity →0, blur ≈6 px, slight scale-down toward top-left.
- **Token as avatar:** the 145 px flower shrinks to a 33 px avatar and travels to the header slot at top-left (1209, 177) during the same 10 frames.
- **New content streams in line by line (f214–228):**
  - Header "Store manager **teammate**" (name white, role 50% white) appears first, then the mono meta line "SHOPIFY · GMAIL CONNECTED".
  - Then 4 body lines. **Each line: blur ≈8→0 px, opacity 0→1, translateY ≈+8→0 px over ≈6 frames (0.2 s), stagger ≈3 frames (0.1 s)**.
  - Lines show partial mid-states (front half sharper than the back), so this reads as an AI "streaming" effect without per-character typing.

### 2.6 Chat bubble spawn (user reply, f276–292; same in scenes 5 and 6)
- f276: **skeleton bar** appears below the previous card (gap ≈24 px). It is ≈325×30 px, card-colour fill, no text.
- f280: grows to ≈560 w, header text "Kelly **Owner**" fading in.
- f284: full width (≈680) and pill height ≈80 px, with the header crisp.
- f288–292: height extends, and the body line "Let's start with inventory and reorders." blurs in (≈6 frames).
- Total **≈16 frames (0.53 s)**: bar → pill → card, each stage ≈4–6 frames.
- Growth is from the **left/top anchor**, with overflow hidden. Text in a still-narrow pill is **clipped, not squeezed** ("QA teamma…" at f620 is a mask reveal).

### 2.7 Stack scroll and exit of the oldest message (f318–336)
- The whole stack translates up ≈325 px over **≈15 frames (0.5 s), ease-in-out**: 3→8→…→large mid-frames→settle.
- The card leaving through the top fades and blurs (opacity 1→0, blur 0→8 px) over its last ≈8 frames. It is **not** hard-clipped by a mask edge.
- New bubble: a tiny pill appears at f330. It grows from width ≈110 tile to full by f344 (≈10 frames), and the body streams in f344–352.
- Yellow scene (f1448–1456): same move, 8–10 frames for the oldest card's exit.

### 2.8 Collapse to pill + expand into working checklist (f396–440)
- The agent message card **collapses to a header-only pill**: body fades out (f400), height animates down (f400–404), and the stack scrolls up (f404–412). The pill stays as a "breadcrumb" at the top (y≈110, w≈410, h≈72).
- New pill spawns below (f412 dot → f416 pill w≈410 → f420 crisp).
- The pill then **expands downward into a list card** (f424 h≈160 → f436 h≈325; w 410→545). That is **≈12 frames (0.4 s), ease-out**.
- **Checklist rows:** each is a spinner + grey text, row pitch ≈38 px, font ≈22 px. They appear one by one (blur-fade, ≈4–6 frames each) with a **stagger ≈4 frames (0.13 s)**. Six rows finish by f446.
- Spinners: an open ring (≈270° arc, 1.5 px stroke, ≈14 px diameter) rotating about 1 rev/s, each row phase-offset.
- The header icon switches to a **"working" variant**: the token splits into 5 petals that pulse and rotate.

### 2.9 Agent-to-agent handoff in one panel (Engineer → QA, f600–690)
- The Engineer card collapses to its pill: body fades with blur (f604–612), width 680→≈400, height →pill (≈12 frames).
- The QA pill spawns below at left: a narrow capsule at f616, width-reveal with clipped label at f620, full at f624 (**8 frames**).
- The QA icon "works" (petals pulse) for about 1.5 s (f624–670).
- The QA pill expands into a card: width first (f670), then height with the body blurring in (f676–690). **≈20 frames**.
- The live-action camera keeps dollying the whole time. The HUD is **not tracked to the scene**.

### 2.10 Done state: checklist resolves (f1846–1870)
- Spinners dim (f1852). Then each flips to a **checkmark**: the ring collapses to a dot and the check draws.
- Rows cascade top-down with a **≈2–3 frame stagger**. All 4 are done by f1870 (0.8 s total).
- The header icon morphs from "working" petals into the final 5-point flower/star (f1840–1846).

### 2.11 Thread clear-out → new instruction (f1718–1745)
- The whole old thread card moves up ≈80–100 px, blurs 0→≈12 px and fades to 0 over **≈9 frames (0.3 s), ease-in**.
- In parallel, at the same anchor: skeleton bar (f1727) → pill (f1730) → card (f1733), each step ≈3 frames.
- "Dana **Legal**" header, then 3 body lines blur-stream in (f1736–1745, 3-frame stagger).

### 2.12 Dark-stage conveyor (f975–1288)
- **Entrance (f977–990):**
  - The pill rises from below the bottom edge (top y 1040 → 880 → 794 → 706 → 618 → 500 → 459 → 430 → 382 → 341 → 330). That is **≈13 frames (0.43 s), expo ease-out**.
  - It enters at **≈2x scale** and settles to 1x while expanding into the card (w 765→880).
  - It then keeps drifting up about 1 px per frame for the rest of its life (a slow "alive" drift).
- **Glow outline:** the agent's shape as a soft-edged stroke (≈6 px core, ≈30–40 px glow), diameter larger than frame height, about 40% opacity. It fades in over f981–990 and scales up very slowly.
- **Activity log ticker:**
  - Rows are `HH:MM` monospace grey timestamp + white text, row pitch ≈48 px, font ≈24 px.
  - A new row arrives about every 10–12 frames (0.35–0.4 s). The list scrolls up **one row per arrival with ease-out (≈10 frames)**.
  - The top row fades to about 20% before leaving, and the incoming bottom row starts at about 20%. The ellipsis row ("Suggesting budget for new campaign…") is the in-progress one.
  - The "Live" badge's dot turns grey→green (f990–1012).
- **Handoff (f1048–1072):**
  - The current card moves up ≈300 px and off the top with fade and blur (≈10 frames, ease-in).
  - The next agent's pill, waiting at bottom-centre (y≈968), rises to y≈386 (**≈24 frames, ease-out**) and expands pill→card (width 60→147 tile ≈ 270→670 px).
  - The background outline crossfades to the new shape (≈4–6 frames), and a new waiting pill rises from below to bottom-centre.

### 2.13 End title + logo
- **Word-by-word reveal:** "Teammates" f1921→1928, "work" f1925→, "for" f1929→, "you." f1933→1938.
  - Each word: opacity 0→1 with grey→white, blur ≈10→0 px, rising ≈10–20 px, over ≈7 frames, **stagger 4 frames (0.13 s)**.
  - Whole block: slow push-out, scale 1.0→0.86 over 2 s.
  - Shapes orbit the text (ring radius ≈600 px) and then fly off-frame (f1992–2005).
- **Logo:** a single 110 px white stroke (f2006) unfolds like fanned book pages (a 3D Y-rotation of 6–8 page copies) into the mark by f2021 (**15 frames, 0.5 s**).
  - The wordmark then fades in place (f2022–2027, 6 frames), with no translate.
  - Hold 3.4 s, no further motion.

---

## 3. How the product UI is demonstrated

1. **No cursor, no clicks, no screen recording.** The UI is a re-built, simplified "hero component": one floating panel, about 35% of frame width, in the wall space opposite the subject. Interaction is implied by state changes. The user's own messages appear as chat bubbles labelled with name + role ("Kelly Owner").
2. **Input:** an empty field with blinking caret, then deterministic typing at about 9 chars/s with a live counter. Submit is shown by the caret vanishing plus an immediate panel morph. No button.
3. **One panel morphs in place.** Every step reuses the same anchored container: input card → message card → pill → list card. The eye never has to search for the next state. Anchor: the top-left corner of the panel (top-right panels) or the top edge.
4. **Spawning order is always skeleton → pill (header) → card (body).** Identity (who is speaking) is readable before content.
5. **Results stream line-by-line** (blur + fade + 8 px rise, 0.1 s stagger), not character-by-character. Agent work is shown as checklist rows with spinners that later cascade to checkmarks.
6. **History is compressed, not deleted.** Finished messages collapse to a one-line pill that stays above as a breadcrumb. Older items leave by scrolling up with fade and blur.
7. **Focus and highlight are done with brightness, not boxes.** Active text is white, metadata and roles about 50% white, in-progress or leaving rows about 20–30%. The coloured token icon marks "who". A "Live" badge with a green dot marks the running state. On the dark stage, a huge glowing outline of the agent's shape focuses the eye on the centred card.
8. **Camera:** no zoom or pan into the UI. The live-action plate may dolly while the HUD stays fixed. The "zoom" energy is reserved for the title push-through.
9. **Screen-to-screen handoff:**
   - Within a scene: collapse to pill, then a new pill spawns below.
   - Across scenes: the token physically flies out of the UI, across the cut, and into the new UI.
   - On the dark stage: a vertical conveyor, where the next agent waits at the bottom and rises in as the current card leaves upward.

---

## 4. Typography, colour, background

- **Headline:** high-contrast transitional serif (Tiempos- or Editorial-like), regular weight, tight leading (≈1.0), centred.
  - Intro: ≈90 px rising to huge.
  - End: ≈120 px, 2 lines. Off-white `#f2efe8` on black or orange.
- **UI sans:** neo-grotesk (FK Grotesk / Inter-like).
  - Card title ≈30 px (Create teammate). Header name ≈26 px, regular. Body ≈27 px with line-height ≈41 px (1.5). Checklist and log ≈22–24 px.
  - Name `#f2f2f2`. Role suffix ("teammate", "Owner", "Legal") same size at about 50% white.
- **Mono (meta):** uppercase, letter-spaced 0.04em, ≈18–20 px, about 55% white. Examples: "SHOPIFY · GMAIL CONNECTED", "AD CAMPAIGNS", "TICKETS · 214 FROM YESTERDAY", timestamps.
- **Panel:** dark glass, about `rgba(22,20,18,0.62–0.72)` + `backdrop-filter: blur(24px)`. It picks up the scene hue: `#30241a` on orange, `#303f3c` on teal, `#282834` on violet.
  - Radius ≈18–20 px. No visible border, or 1 px `rgba(255,255,255,0.06)`. Shadow ≈`0 20px 60px rgba(0,0,0,.35)`. Padding ≈30 px. Vertical gap between stacked cards ≈24–28 px.
- **Pill:** same glass, height ≈64–72 px, radius ≈14 px, 20 px icon + name + role.
- **Token colours (glossy 3D: radial highlight top-left plus rim light):**
  - Coral/red flower `#ff5a3c` (Store / E-comm)
  - Lime double-circle `#b8f03a` (Engineer)
  - Green capsule `#2ee86a` (QA)
  - Yellow sphere `#ffc21a` (Ads)
  - Blue triangle `#3aa0ff` (Support)
  - Purple flower `#b06bff` (Legal)
  - Also cyan, magenta, pink.
- **Backgrounds:** every live-action scene is one saturated monochrome set (orange `#6a3314`, teal `#3d655d`, olive `#2b3a19`, mustard `#b58a2c`, violet `#463f75`). The UI stage is `#141517`; the end card is `#000`.

---

## 5. Recipes for Remotion (1920×1080, 60 fps): stepping through an app UI

All frame counts are @60. Define `E = Easing.bezier`. These recipes complement the primary-style reference; they cover the "UI walkthrough" layer.

```ts
const EASE_OUT   = Easing.bezier(0.16, 1, 0.3, 1);     // expo-out: entrances, settles
const EASE_INOUT = Easing.bezier(0.65, 0, 0.35, 1);    // layout morphs, scrolls
const EASE_IN    = Easing.bezier(0.55, 0, 1, 0.45);    // exits
const SPRING_PANEL = { mass: 1, damping: 26, stiffness: 180 }; // ≈ 28f settle, no visible overshoot
const SPRING_POP   = { mass: 0.6, damping: 14, stiffness: 220 }; // icon landing, ~6% overshoot
```

### R1 Panel entrance from blur (first appearance of the app UI)
- Duration 28f. transform-origin: top left.
- scale 0.82→1 with `SPRING_PANEL` (or EASE_OUT over 28f).
- opacity 0→1 over **f0–12**, filter blur 20→0 px over **f0–12** (EASE_OUT).
- Optional: translateY 12→0.

### R2 Skeleton → pill → card spawn (any new message, step or result)
- One container with `overflow:hidden`. Content is laid out at final width and revealed by the clip, never scaled.
- f0–8: bar appears. width 0.45W→0.8W, height 30 px, opacity 0→1.
- f6–14: width →W (or pill width), height →64–72 px (pill). Header row fades in f8–16 (opacity, blur 6→0).
- f16–34: height →card height (EASE_OUT). Body lines start at f18 (R3).
- Total ≈34f (0.57 s). A pill-only spawn (no body) ends at f16.

### R3 Line-by-line streaming text (AI output, step descriptions)
- Per line i, start = s0 + i*6f, duration 12f, EASE_OUT.
- opacity 0→1, `filter: blur(8px→0)`, translateY 8→0 px.
- Header first, meta line +4f, body +8f.
- Optional "partial" look: also animate a horizontal mask (`linear-gradient(90deg, #000 x%, transparent x+30%)`) from x=-30%→100% over the same 12f.

### R4 Typing into an input
- Cadence **6–7f per char** (≈9 cps), no randomness. Use `text.slice(0, Math.floor((f - start)/6.5))`.
- Counter `${n}/80` updates per char.
- Caret: 2×28 px bar. Solid while typing. When idle, blink 30f on / 30f off (start in the "on" phase).
- Pre-roll ≈36f of blinking caret before the first char. Post-roll ≈40f after the last char, then the caret disappears (instant) = "submit".
- Optional for tutorials: add a key-press tick (scale 0.98→1 on the field, 4f) on submit.

### R5 Container morph between screens (FLIP)
- Duration 20f, EASE_INOUT. Interpolate width, height, (x,y) of the same container. Radius fixed.
- Old content: opacity 1→0, blur 0→6 px, scale 1→0.98 over f0–12 (EASE_IN).
- New content: R3 starting at f24.
- Shared element (avatar/icon): interpolate its position and size from old to new slot over the full 20f (EASE_INOUT).

### R6 Stack append + scroll
- New item: R2 below the last card (gap 24 px).
- When the stack exceeds the panel's max height: translateY -(h_new + 24) over **30f, EASE_INOUT**.
- The topmost item exiting: opacity 1→0 and blur 0→8 px over the last 16f of the scroll. Do not hard-clip it.

### R7 Collapse to pill (keep context while moving on)
- Body opacity 1→0 + blur 6 px over f0–10.
- Height card→72 px and width →pill width over f4–24 (EASE_INOUT).
- Then R6 scroll so the pill sits at the panel top as a breadcrumb.

### R8 Working checklist (steps an agent or the viewer performs)
- List container: R2 with height animated over 24f.
- Row i: spawn at f = 8*i. 12f blur-fade (R3 values). Row pitch 38 px.
- Spinner: SVG circle r=7, stroke 1.5, `strokeDasharray` for a 270° arc, `rotate = (f*6 + i*40) % 360` (≈1 rev/s).
- Completion cascade, row i at f = c0 + 5*i:
  - Spinner arc collapses (dash length →0) over 6f.
  - Then a check path draws (`strokeDashoffset` len→0) over 8f, EASE_OUT.
  - Text goes from 60% to 100% white.
- Header icon: crossfade "working" variant → final variant with `SPRING_POP` scale 0.8→1.

### R9 Token fly-in (connect scenes or point at a UI slot; use instead of a cursor for "this is where it goes")
- Duration 44–48f. Position along a cubic Bézier: P0 off-frame entry, P1 swing point (≈60% across, mid-height), P2 near target, P3 slot centre.
- Progress t = EASE_INOUT for long flights, EASE_OUT for short ones (20f).
- scale: 470/30 → 1 (≈15x→1), log-interpolated. rotate 0→300°.
- Optional motion blur: Remotion `<CameraMotionBlur shutterAngle={180} samples={8}>` or a 2-copy trail at 30% opacity.
- **Start R2 for the target pill 16f before the token lands.**
- On landing: icon `SPRING_POP` 1.15→1, then fade in the pill label over 8f.
- Cross-cut carry: exit on a straight line to the frame edge (24f, EASE_IN) → hard cut → enter from the opposite edge within 8f.

### R10 Dark "feature stage" conveyor (overview of N features or steps)
- Background `#141517`. Behind the card, a huge SVG outline of the feature's icon: stroke 6 px, `filter: blur(18px)` duplicate + sharp copy at 40% opacity, scale 1.0→1.04 over the segment.
- Incoming: translateY +650→0 and scale 2.0→1.0 over **26f, EASE_OUT** (or spring `{damping: 30, stiffness: 120}`). Pill→card expansion runs in parallel (R2 widths).
- Idle drift: translateY -0.5 px/frame.
- Outgoing: translateY 0→-300, opacity →0, blur →12 px over **20f, EASE_IN**. The next item's rise starts at the same frame.
- Outline crossfade: 10f.
- Segment length ≈160f (2.7 s). The next item's pill waits at bottom-centre (y≈1000, 70% opacity).

### R11 Auto-scrolling activity log
- Row pitch 48 px. New row every 22f. Each arrival scrolls by one pitch over **20f EASE_OUT**.
- Mask: `linear-gradient(to bottom, transparent 0, #000 20%, #000 80%, transparent 100%)` on the list viewport.
- Monospace timestamp at 45% white, text at 92% white. The in-progress row ends with "…" at 50% white.
- "Live" badge dot: grey→`#3ddc84` over 12f.

### R12 Title push-through (chapter intro) / word reveal (chapter outro)
- **Push-through:** scale = `Math.pow(5, Easing.in(Easing.exp)(t))` over 68f.
  - Last 12f: blur 0→20 px and fade.
  - Behind it, a fluted-glass layer: repeating-linear-gradient 12 px ribs with an `feDisplacementMap` on a heavily blurred plate. Remove it over 4–6f to "arrive" in the scene.
- **Word reveal:** per word stagger 8f, each 14f, opacity 0→1, blur 10→0, translateY 16→0, colour `#777`→`#f2efe8`. Block scale 1→0.86 over 120f (slow push-out).
- **Orbiting shapes:** radius r(t) = 350→900 px (ease-in), angle = -1.4°/frame (counter-clockwise).

### Layout rules to copy
- Panel width ≈680 px (35% of frame). Margin 60–100 px from the side edge, top ≈150 px.
- Put the panel on the side opposite the subject or focal content.
- Max ≈3 stacked items visible. Everything older collapses to pills or scrolls off.
- Never more than one thing animating "in" at a time. Stagger 0.1–0.13 s between related elements and 0.3–0.6 s between steps. Each step holds ≥1.2 s after its content settles (the reference holds 1.5–3 s).
