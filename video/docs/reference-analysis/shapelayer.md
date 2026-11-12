# "Ren by Nectar" (@shapelayer): frame-by-frame motion analysis

Source: `ref/shapelayer_2119836251192705024.mp4`. It is 3840x2160 at 30 fps and runs 51.8 s (1553 frames).
I studied all 52 contact-sheet grids (g_0001 to g_0052, every frame), then checked 31 full-resolution stills (`ref/full_shapelayer/s_t_*.jpg`, downscaled to 1080p) to take measurements.
All pixel values are given at **1920x1080**. Source frame numbers are **@30**. Remotion frame counts are **@60**, so @60 = 2 x @30.

Conventions: "f123" means source frame 123 at 30 fps. "cap" means cap height in px. Font size is roughly cap / 0.72.

---

## 0. The motion language in one paragraph

The whole video is close to **one continuous virtual camera**. There are only two or three true hard cuts.
Everything sits on an off-white void (#FDFDFD). Type is near-black (#121013), set in a tight geometric grotesk at medium weight, with **one keyword per line in a pastel gradient** (pink #F693D6 to peach #F8B477, magenta, or green).

New words don't simply fade in. Each one **rises about 35 px, scales from about 1.08 to 1, de-blurs from about 8 px to 0 and changes colour from keyword-pink to black** in a left-to-right sweep.
The existing line **reflows live**: it slides sideways while the new word lands, with peak speed at the moment of entry.

Scene changes ride on camera moves: a smash pull-back, a 3D swoop along a UI object, a vertical whip, a zoom through text into a photo, a bloom whiteout, or a blur-dissolve.
The mascot (a glossy peach/pink sphere with two eyes) acts as the **transition carrier**. It flies through frame with a long soft smear, then becomes an inline emoji, a chat avatar or a tunnel centre.

There is constant secondary motion. Gradients drift on keywords, glow segments travel around the input pill, the clock fast-forwards and the lighting shifts in a time-lapse. Nothing ever sits fully still.

---

## 1. Shot-by-shot timeline

| # | Time (s) | Src frames | On screen | Background / layout |
|---|---|---|---|---|
| 1 | 0.00–0.73 | f0–f21 | **Mascot on a horizon.** A glossy blob (about 270 px across) sits half-sunk behind a 1 px grey horizon line at y≈64% of frame height, with a pink-fading reflection below. f0–f11: idle wobble. f12–f20: the blob **rolls back about 90°** (eyes slide to its right edge and disappear, pink underside comes up) while the **camera tilts up**: the horizon drops from 64% to 87% of frame height in 9 frames. f21–f23: the blob **launches up out of frame** with a vertical smear about 2x its height. | Off-white void, centred |
| 2 | 0.73–2.20 | f22–f65 | **"Meet"** is already fully on screen at f22, revealed behind the blob's smear: a wipe by the character, not a fade. Hero size: cap 210 px (19% of height), centred at x≈47%. From f24 the line drifts left. At f33 **"Ren"** (pink) plus the **blob emoji** fly in from the right; the line slides left fast to make room (reflow, see §2.2). The blob lands as an inline glyph and settles with a roll; its eyes come back at f36–f48. As "Meet" nears the left edge it **gets progressively blurred and greyed**: left-to-right blur ramp of about 12 px down to 0 and opacity of about 45% up to 100%, like an edge depth-of-field. | Single line, vertically centred |
| 3 | 2.20 | f65→f66 | **Smash pull-back (hard cut).** The scale drops 2.8x between two frames: cap goes from 210 px to about 70 px. | |
| 4 | 2.20–3.00 | f66–f89 | **Sentence build**: "Meet Ren [blob], Nectar's AI agent". Word stagger: ", Nectar's" f67, "AI" f73, "agent" f79 (**6 frames @30 = 0.2 s**). Each word lands from about 35 px to the right (you can see the gap close in 2–3 frames). The whole line drifts left about 75 px over 0.6 s to stay optically centred. At f84 (2.80 s) the subtitle appears: "Available exclusively on **nectar**[peach logo]" (grey #707072, cap about 33 px, 120 px below the main baseline). | Centred, 2 lines |
| 5 | 3.00–4.45 | f90–f133 | **Accelerating pull-back.** Line width goes 231 tile-px at 3.0 s, 197 at 4.0, 172 at 4.2, 104 at 4.37 and about 60 at 4.43. That is scale 1.00, 0.85, 0.74, 0.45, 0.26: an exponential ease-in. From f127 the text blurs (0 to about 8 px) and fades to 0 by f134 (4.47 s). "Ren" colour drifts peach to pink to peach. | |
| 6 | 4.20–5.40 | f126–f162 | **3D dive/whip onto a UI object.** A huge chat input pill rises from the bottom (overlapping the fading title) in steep perspective. You see its pink send button and mic, and "Ren" written on its surface. The foreground blob is DOF-blurred (about 8 px). The camera **swoops over the pill**, which recedes to the top-right as a long white plane. Its bottom edge becomes a thin diagonal line at about 35–40°. Pink glow under the pill; an orange smear enters from the left at f146. | White void |
| 7 | 5.40–6.33 | f162–f190 | **Camera travels along the pill to its left end.** The placeholder "Chat with Ren" slides in from the left (f163). The pill **un-rotates**: about −25° (f162), −9° (5.8 s), −3° (6.0 s), 0° (6.4 s). That is an expo-out over about 1 s. Pink/orange glow capsules hug the edges (blur about 20 px). | Pill cap ≈ 75 px |
| 8 | 6.33–10.10 | f190–f303 | **Typing.** At f190 the cursor appears before the placeholder; at f191 the placeholder is replaced by "L". Typed: "Launch day is here. Keep us on top of every comment, DM and creator post." at about 25–30 chars/s, with micro-holds at spaces. **Per-character colour trail:** fresh characters are pink and decay to black over the last ~12 characters (about 0.4 s). The camera **pans right with the cursor**: a slow drift, plus catch-up whips (f246–f251: about 550 px in 5 frames). The cursor disappears at f304. | Pill height about 320 px, fully rounded |
| 9 | 10.10–10.47 | f303–f315 | **Vertical whip / exit.** The pill accelerates up and out (y: 86, 80, 71, 57, 45, 19, −5 tile-px; ease-in over about 0.37 s) as the camera moves down. "Every" rises in from below at f314: same camera move, no cut. | |
| 10 | 10.47–11.3 | f314–f342 | **Kinetic word reveal**, left-aligned at x≈19%: "Every" f314, "AI" f319, "is" f324, "smart." f333. Stagger 5, 5, 9 frames @30. Each word enters lower (about 35 px) and slightly larger, with blur of about 4–8 px, in pink, then goes dark left to right. Cap ≈ 122 px (font ≈ 170 px). | |
| 11 | 11.3–12.2 | f338–f366 | **Mascot fly-through + pull-back + 2nd line.** The blob enters from the bottom-left, **huge (about 700 px), DOF-blurred about 6 px**, with a soft peach/pink smear trail (blur about 80 px, length about 1.5x its diameter) and sparkle dots. It crosses the text (occluding it), shrinks to about 280 px and parks right of "smart." Meanwhile the **camera pulls back** (line width 191 to 122 tile-px, scale 1 to 0.64 over about 0.57 s; the fastest part is f344–f345). The second line "Only Ren has context" enters word by word (Only f345, Ren ~f350, has f355, context f359). | 2 lines, centred |
| 12 | 12.2–12.6 | f366–f378 | The blob **dissolves into peach dust/sparkles** in about 0.4 s. Leftover "context" letters finish their pink-to-black sweep. | |
| 13 | 12.6–13.2 | f378–f396 | Hold: "Every AI is smart. / Only Ren has context". Cap 62 px, baseline-to-baseline 83 px (line-height 0.97). "Ren" stays magenta-pink. | Centred block |
| 14 | 13.2–14.33 | f396–f430 | **Zoom through text into a photo.** Accelerating push-in: scale 1.0 (13.2 s), 1.3 (13.5), 2.2 (13.8), about 6 (14.15), with zoom/motion blur up to about 20 px. At f418 (13.93 s) a **1 px-tall slit opens between the two lines** and grows into a photo (laptop on a sunny desk). The photo is wide (aspect about 2.6:1) at first, then opens vertically to full bleed by f429–f430 (14.3 s). Photo blur is about 6 px while moving. | Photo, full bleed |
| 15 | 14.33–16.4 | f430–f492 | **Slow push-in** on the laptop (decelerating). The screen shows the chat with the typed message as a blue bubble. **The mascot pops up from below the screen** (15.0 s): a bounce with overshoot. It floats up-left inside the screen and shrinks (about 150 to 90 px), looks around, sheds sparkles. | Laptop scene |
| 16 | 16.4–16.9 | f492–f506 | **Bloom transition.** The camera pulls back (laptop width 235 to 170 tile-px) while the blob grows toward the camera (45 to 75 tile-px). A **warm radial light** (white core, peach/pink rays) floods the frame and becomes the tunnel. | |
| 17 | 16.9–19.2 | f506–f575 | **Card tunnel/burst.** A radial "box tunnel" background: white centre, then peach (#F7D7AE / #F6CB98) and pink (#F6BBDB) walls. The blob (about 245–460 px) sits at the vanishing point and blinks. UGC photo cards, comment cards, pink "346→350 mentions" tags (count-up, 1 unit every 2–3 frames), "87% positive" and "54→55 new this week" **fly in from the frame edges toward the centre while receding into depth**. They have random 3D tilt (rotateY ±30–40°, rotateZ ±5–20°) and each lives about 0.8–1.0 s. New cards spawn about every 0.2–0.3 s from alternating sides. The tunnel slowly rolls. | Saturated pastel tunnel |
| 18 | 19.1–19.25 | f573–f577 | **Whiteout:** the white core expands to fill the frame in about 4 frames. The blob drifts to the top-left. | |
| 19 | 19.23–23.0 | f577–f690 | **Agent reply UI.** The blob shrinks into the **chat avatar** (about 90 px). Text streams at about 120 chars/s (3–5 chars per frame): "I found 9 creators…". A grid of creator cards (235x295 px, radius about 16 px) pops in at 2–3 frame stagger. The right columns are **progressively blurred** (col 4 about 12 px at 50% opacity, col 5 about 20 px at 25%). A "Done" card slides up 58 px (f602–f606). There is a constant slow pull-back. At 22.8–23.0 s everything except the blob zooms out and fades out over about 0.2 s. | White, timestamp pill on top |
| 20 | 23.0–24.6 | f690–f738 | The blob arcs from top-left to centre-right, then **grows toward camera to about 380 px**, parking on the top-right corner of an **Instagram post card** that rises from the bottom-right with a pink under-glow. The card keeps scrolling up (decelerating). | |
| 21 | 24.6–26.0 | f738–f780 | **Moderation beat.** Spam comments **lift** (white, sharp, slight scale-up, shadow) while normal comments blur (about 4 px) and grey out. A **pink wipe** (#EBA6C4, feathered leading edge about 350 px) sweeps left to right across each spam row in about 6 frames, holds, then reveals a blurred green-tinted row with a "Hidden" chip. Stagger is about 6 frames (0.2 s) per row. | |
| 22 | 26.0–27.2 | f780–f816 | **Lateral truck:** the post card slides out to the right (the blob is *behind* it in z, so it gets occluded), then the blob is revealed on the left with a horizontal smear and decelerates. | |
| 23 | 27.2–30.2 | f816–f906 | Chat "Monday · 7:45 AM". Three spam-comment notification cards (480x220 px, radius 32 px, 1 px border plus soft shadow) pop in at 7/6-frame stagger (about 0.22 s), each rising about 25 px. Reply streams: "I hid 38 comments…". Very slow pull-back. | |
| 24 | 30.2–30.6 | f906–f918 | **Time-lapse cut-through.** The clock ticks about 22 minutes per frame (7:45 to 12:06 PM). Old content blur-dissolves (blur about 0 to 20 px while fading). The camera **pulls back** (about 1.15 to 1.0 scale in 0.2 s) to reveal the laptop bezel. | Laptop in a room |
| 25 | 30.6–34.0 | f918–f1020 | "4,700 people asked your competitors…". Scanned-account chips appear one by one, and 3 product cards (1,900 / 1,600 / 1,200 asks) arrive at **11-frame stagger (0.37 s)**. Glow segments orbit the input pill. | |
| 26 | 34.0–35.0 | f1020–f1050 | **Time-lapse + lighting crossfade:** the clock runs 3:14 to 5:45 PM while the room goes from cool daylight to golden hour (striped orange shadows) over about 0.6 s. Content blur-dissolves. A **frosted caption pill** fades in (34.1–34.25 s) and its words land: "Ren" f1028 (34.27), "works" f1037 (34.57), "24/7" f1047 (34.90). | Caption pill 840x200 px at bottom-centre |
| 27 | 35.0–39.6 | f1050–f1188 | "Your used-gear drop got 350 comments…". The post thumbnail, reply thread and a "$8K" chart card arrive at about 9-frame stagger. The caption's "Ren" gradient breathes pink to orange on a cycle of about 1.5 s. | |
| 28 | 39.6–40.0 | f1188–f1200 | Time-lapse to 7:10 PM, lighting goes to dusk blue (lamp glow lower right), blur-dissolve. | |
| 29 | 40.0–43.7 | f1200–f1312 | "I searched the web for today's coverage…" with three press cards and a green chip. Hold. | Night |
| 30 | 43.7–44.2 | f1312–f1326 | **Screen bloom:** the screen overexposes, and white light spills beyond the bezel and floods the frame (about 0.4 s). The blob emerges from the screen centre, growing. | |
| 31 | 44.2–46.3 | f1326–f1388 | **Orbit cloud.** A giant blob (about 490 px), slightly left of centre, is surrounded by a ring of small UI fragments (thumbnails 60–120 px, pink count tags, labels "Product Analytics", "Brand Analytics", "Dynamic Actions"). They expand radially and drift; each has its own DOF blur (0–4 px). Count tags tick (for example 320 mentions upward). | White |
| 32 | 46.3–47.0 | f1388–f1409 | **Blur-dissolve with a pink wash.** Global blur ramps 0 to about 40 px, a pink wash (#F3D3D8) creeps in from the right, then the left, and opacity fades. "Catches" de-blurs in on top (f1408). | |
| 33 | 47.0–48.5 | f1409–f1455 | "Catches the trends". "the" at f1412, "trends" at f1414 (blurred, about 5% larger and higher, then settles). "trends" uses a red-pink to magenta gradient (#E8457A to #E040C8). Then a **pull-back** (width 213, 179, 162, 148, 143 tile-px over 1 s, expo-out). **Two glossy bullet dots** (about 30 px) appear left and right of the line (f1422). The keyword gradient drifts to orange. | Centred |
| 34 | 48.5–51.75 | f1455–f1552 | **Stacked-lines finale.** The old line moves up and **dims to about 45% grey**; its keyword stays pastel at about 55%. A new line lands centred: "Watches the competition" (f1458), then "Acts on it **all**" (f1501, green #2BA753 to #46CA65). The bullet dots **ride down to the active line**, stretching into about 180 px capsule smears and recolouring (peach to green). A slow pull-back continues (scale 1 to about 0.75 over 3 s). The video ends on this frame (no logo card). | Centred stack |

Real hard cuts: f65→f66 (smash pull-back) and the slit-photo reveal. Everything else is a continuous move or a dissolve.

---

## 2. Animation mechanics

### 2.1 Kinetic word entrance (the core move)
- **Translate:** from +30 to +40 px on Y (it enters from below), or +35 px on X (enters from the right) when appended to a running line.
- **Scale:** 1.06–1.10 down to 1.00. Over that time the transform origin sits on the left baseline.
- **Blur:** 6–10 px down to 0 (measured about 4 px on "AI" at the midpoint).
- **Opacity:** 0 to 1 over the first ~40% of the move.
- **Colour:** the word arrives in keyword pink (#F693D6). A **left-to-right per-character sweep** then turns it near-black (#121013). The trailing characters stay pink-mauve for about 0.4–0.5 s ("Every" at 10.75 s: E is #9B5A72 mauve-dark, y is pink). Keywords ("Ren", "smart.", "trends", "all") stay coloured.
- **Duration:** about 0.30 s for position and blur (9 @30 = **18 @60**). The colour sweep takes about 0.5 s (**30 @60**).
- **Easing:** strong ease-out with no overshoot. The final 10% decays over the last ~40% of the time (easeOutQuint-like).
- **Stagger:** 5–6 @30 between words = **10–12 @60** (about 0.17–0.2 s). The punch word gets an extra gap of about 4 frames: "smart." came 9 frames after "is".
- **Motion blur:** none on single words. The blur reads as a focus pull, not a smear.

### 2.2 Live layout reflow
- When a word is appended to a centred line, **existing words slide** by about half the new word's width (plus spacing). The slide doesn't snap.
- Measured on "Meet" as Ren entered (x positions @30 in 1080p px): about 15 px/frame before entry, **about 80 px/frame peak at the entry frame**, then decaying to about 10 px/frame over about 0.5 s. That is an ease-out with peak velocity at t=0 (expo-out, about 0.5 s = **30 @60**).
- In the sentence build (scene 4) the line was laid out near final centre, and each append shifted it only about 20–25 px over 3–4 frames. Net drift was 75 px over 0.6 s.
- The new word also closes its own gap: it starts about 35 px right of its slot and settles in 2–3 @30 (**5 @60**).

### 2.3 Camera pull-backs (scale-outs)
- **Slow settling pull-back** (after a reveal): scale 1.0 to 0.64 in about 0.57 s (scene 11), 1.0 to 0.67 in 1 s (scene 33). Expo-out: about 50% of the travel happens in the first 15% of the time.
- **Accelerating exit pull-back** (scene 5): scale 1, 0.85, 0.74, 0.45, 0.26 over 1.43 s. Pure ease-in (exponential), plus blur 0 to 8 px and opacity to 0 in the last 0.25 s.
- **Ambient drift pull-back:** about 5–10% scale per second, linear, almost always running under holds (scenes 19, 23, 34).
- **Smash pull-back:** an instant 2.8x scale change on a cut.

### 2.4 Push-in through text (scene 14)
- Exponential scale: 1, 1.3, 2.2, about 6 over 0.95 s (ease-in, roughly scale = e^(k·t) with k≈1.9/s, then steeper).
- Zoom blur grows with speed, up to about 20 px at the end.
- The photo starts as a **1 px horizontal slit centred between lines** about 0.4 s before the text exits. It grows to about 2.6:1, then to full frame. The slit's height opens faster than its width: it is a mask (inset) reveal plus scale, not a cross-fade. No radius, no shadow.

### 2.5 3D dive/whip onto the input pill (scenes 6–7)
- The object is a long white pill (length much greater than the frame, height about 320 px, fully rounded), with the send button at the far right end.
- Entrance pose: it appears from below with **rotateX ≈ 65–75°** (lying almost flat away from the camera), **rotateZ ≈ −30°**, perspective about 900–1100 px. The near part is blurred (DOF about 8 px), the far end is sharp.
- The camera dollies along the pill's length toward its left end over about 1.2 s, while the pill rotates back to its rest pose (rotateX 0, rotateZ about −9° at 5.8 s and 0° at 6.4 s). Total settle is about 2 s, expo-out (fast first 0.5 s, long tail).
- The bottom edge reads as a thin 1 px grey line, and a pink/orange glow streak whooshes by (motion blur about 40 px horizontally).

### 2.6 Typing bar with cursor and camera pan (scene 8)
- Typing rate is about 25–30 chars/s (about 1 char per frame @30 = **2 @60**). Spaces sometimes hold an extra frame, and punctuation holds 2–3 frames.
- The cursor is a 4 px-wide near-black bar about 1.1x cap height. It stays solid (no blinking) while typing and disappears 1 frame after the last character.
- The placeholder (#8A8A8A) is replaced in one frame when the first character lands.
- Colour trail: the newest character is #F08CB4 (pink). It interpolates to #121212 across the last ~10–14 characters, giving a gradient tail ("Launch" black, "day" dark mauve, "is" mauve, "here." pink).
- Camera pan: the cursor is allowed to drift right from about 45% to about 85% of frame width. A catch-up whip then re-centres it to about 45–50%, shifting about 500–550 px in 5 @30 (**10 @60**, ease-in-out, peak about 150 px per 30fps frame). There is also slow continuous drift.
- DOF: elements far from the focus (the "+" icon) are blurred about 3 px.
- Glow: pink (#F4DDF1 to #E9B8E8) capsule segments about 40 px thick hug the pill edges with blur about 25–30 px, offset outward about 20 px. They travel along the border (orange variant #F7D7AE).

### 2.7 Mascot fly-through/carrier
- In flight it is always DOF-blurred when near the camera (about 6–8 px at 700 px diameter), with a trail: a stretched, heavily blurred (60–80 px) peach to pink smear about 1.2–1.8x its diameter behind it, plus 3–6 tiny sparkle dots (3–6 px) left behind.
- Arcs are curved (bezier), and the blob scales while moving (perspective): 700 to 280 px over 0.7 s, or 25 to 380 px when coming toward the camera.
- Pop-up into the laptop (scene 15): it rises from below the frame with overshoot (about 8% above its rest point, one bounce).
- It blinks (eyes close for 3–5 frames) and does idle eye-darts.
- Dissolve: it shrinks about 30% while blurring into a soft cloud and sparkles over about 0.4 s.

### 2.8 Card tunnel/burst (scene 17)
- Background: a radial white core (about 30% of frame width, soft edge) plus 4–6 pastel "walls" (alternating pink #F6BBDB, peach #F6CB98, salmon #F4B3A3) converging on the centre, like a box tunnel with blurred edges (blur about 60 px). It slowly rolls (about 5–10°/s).
- Cards travel from outside the frame edge toward the vanishing point: z from about +300 to −2500 px, linear in z, so the on-screen scale decays roughly as 1/z (fast at first). Each card lives 0.8–1.0 s (**48–60 @60**). There is an independent 3D tilt per card (rotateY ±25–40°, rotateZ ±5–20°, rotateX ±10°). Spawn interval is 6–9 @30 (**12–18 @60**) from alternating sides.
- Card radius is about 16–20 px at about 450 px width (about 4%). There is no drop shadow; the cards are crisp against the soft background.
- Pink stat labels (#EE3E9E background, white medium text): numbers tick +1 every 2–3 @30 frames (count-up), and the labels are skewed by the 3D tilt.

### 2.9 Blur-dissolve transition (scenes 24, 26, 28, 32)
- Outgoing content: blur 0 to 20–40 px and opacity 1 to 0 over about 0.25–0.5 s, with a slight scale (±3%).
- A colour wash (pink #F3D3D8 or white bloom) may cross-fade in.
- Incoming text starts at blur about 10 px and opacity 0, 2–4 frames before the outgoing content finishes (overlap about 0.1 s).

### 2.10 Bloom/whiteout (scenes 16, 18, 30)
- A white radial gradient grows from the source (screen centre or tunnel core), going from about 20% to 150% of the frame diagonal in about 0.3–0.4 s, with ease-in. Under it, the content brightens (CSS `brightness(1.0→1.6)`) and loses contrast.

### 2.11 UI card entrance (scenes 19, 23, 25)
- Each card rises 20–30 px, with opacity 0 to 1 and blur 8 to 0 px, over about 0.25 s (**15 @60**), ease-out with no overshoot.
- Stagger is 2–3 @30 for grid tiles (**5 @60**) and 6–11 @30 for big cards (**12–22 @60**).
- Ambient rack focus: tiles further right are permanently blurred (12 px, then 20 px) and faded (50%, then 25%), giving infinite-depth focus falloff.

### 2.12 Highlight wipe → "Hidden" (scene 21)
- The target row lifts: scale 1.03, a white card, shadow `0 12px 40px rgba(0,0,0,.08)`.
- Its siblings blur about 4 px and drop to 70% opacity.
- A pink fill (#EBA6C4 to #F3BDD4) sweeps left to right with a 350 px feathered leading edge in about 0.2 s (**12 @60**). It holds about 0.2 s, then fades to reveal a blurred row with a centred "Hidden" chip on a pale green tint (#E8F4EA).

### 2.13 Time-lapse
- The clock string changes every frame (+22 min per frame @30), together with a lighting LUT crossfade of the background photo (day to golden hour to dusk) over about 0.5–0.6 s, a content blur-dissolve and a small camera pull.

### 2.14 Stacked-lines finale (scene 34)
- The active line sits centred. When the next one arrives, the old stack moves up by one line pitch (about 106–125 px) in about 3 @30 (**6–8 @60**). That is fast expo-out (the last 20% decays over about 0.2 s).
- The old line's text goes to opacity about 0.45 (#9A9A9A), and its keyword to about 55% (pastel).
- The new line enters with the word reveal, but with less translation (about 15 px) and blur about 6 px.
- Bullet dots: glossy spheres about 28–32 px (same material as the mascot) sit about 40 px outside the line ends. They travel down to the new line and stretch horizontally while moving (capsule about 180x30 px, translucent, motion smear). They recolour to the new keyword's hue and re-spread to the new line's width. Duration is about 0.3 s (**18 @60**).
- An ambient pull-back runs under the whole sequence (scale 1 to about 0.75 over 3.3 s, linear-ish).
- The keyword gradients slowly shift hue (trends: magenta to orange; competition: pink to orange to pink; cycle about 1.5–2 s).

### 2.15 Count-up numbers
- The tags tick by +1 every 2–3 @30 frames (about 12 per second) over small ranges (346 to 350). They work as "alive" indicators rather than big reveals.
- The big stat cards (1,900 / $8K) appear at their final value with the card. The impact comes from the card's stagger entrance, not from counting.
- If you want a big count-up anyway: run for about 0.8–1.0 s with easeOutExpo, using tabular numerals.

---

## 3. Typography
- **Family:** a neutral geometric grotesk with a double-storey a, single-storey g, slanted-cut t and straight-leg R. It is close to **Inter Display / Satoshi / General Sans**. Use **Inter Display 500** (or Satoshi Medium).
- **Weight:** medium (500) for all headline type. The chat UI body is 500 too. Only the stat numbers are bold (700).
- **Letter-spacing:** tight, −0.02 to −0.03 em on headlines and −0.01 em on UI text.
- **Line-height:** 0.97–1.0 for two-line statements ("Every AI is smart. / Only Ren has context": cap 62 px, baseline pitch 83 px). About 1.35–1.4 for the finale stack.
- **Sizes (1080p):**
  - Hero single word: cap 210 px, font about 290 px (27% of height).
  - Sentence: cap 70 px, about 97 px (9%). Subtitle about 46 px (4.3%), grey.
  - Statement while entering: about 170 px (16%). After the pull-back: about 86 px (8%).
  - Typed text in the pill: about 100 px.
  - Caption pill: about 105 px.
  - Finale: about 130 px for the first line, settling to about 80 px.
  - Chat UI body: about 36–40 px. Timestamp pill: about 32 px.
- **Alignment:** centred for statements. The kinetic reveal starts left-aligned at x≈19% (it builds left to right) and reads centred after the pull-back.
- **Keyword treatment:** exactly one keyword per line, in a pastel gradient fill (`background-clip:text`):
  - Ren: #F693D6 pink, or peach #F5B49A to pink #F391D9 horizontally.
  - trends: #E8457A to #E040C8.
  - competition: pink to peach.
  - all: #46CA65 to #2BA753.

  The gradient drifts over time (background-position animation, about 1.5–2 s cycle). The other words are #121013. Inactive or previous lines are about 45% grey.

## 4. Colour, glow, background
- **Base background:** #FDFDFD flat, no texture. A very faint grey vignette appears only in bloom scenes (corners about #F0F0F0).
- **Palette:** ink #121013, grey #707072 / #9A9A9A, pink #F693D6 / #EE3E9E (labels), peach #F8B477 / #F6CB98, green #2DBE5B (Top Performer borders), UI blue #5B7CF0 (user bubble), send-button gradient #F07AB8 to #E2549A.
- **Glows:** always **outside and below** UI objects, never as a halo all around. They are blurred capsules (blur 25–40 px) offset 15–40 px down or outward, coloured #F4DDF1 (pink) or #F7E1C4 (peach), at opacity 0.6–0.9. On the input pill they are 2–3 segments that travel along the border (about 1.5 s per lap).
- **Mascot material:** a sphere with a peach (#F8B477) top fading to a pink (#F68FD8) bottom-inner glow. It has a white specular highlight crescent top-right, a thin bright rim, black pill-shaped eyes (about 9% of diameter wide, 22% tall) with white catchlights, and pink blush ovals.
- **DOF:** used everywhere for depth. Foreground fly-bys are 6–8 px blurred, background tiles 12–20 px.

## 5. UI mockups
- **Corner radius:**
  - Big cards (Done, notification, comment): about 24–32 px at 450–480 px width (5–7%).
  - Creator tiles: about 16 px at 235 px (7%).
  - Input pill and caption pill: fully rounded (radius = height/2).
  - Timestamp pill: fully rounded, about 60 px tall.
- **Shadows:** very soft and low, e.g. `0 8px 32px rgba(0,0,0,.06)` plus a 1 px border #ECECEC. The black CTA button has a slightly stronger shadow. On the laptop screen everything sits on #EEEEEE.
- **Caption pill:** frosted glass. White at about 85% opacity, backdrop blur about 20 px, an inner bottom shade (gradient to #ACACAC at the very bottom edge, which gives a 3D glass lip) and a top highlight. 840x200 px, centred about 120 px from the bottom, overlapping the laptop.
- **Entrances:** UI cards rise and de-blur (§2.11). Big hero UI objects enter in 3D (the pill dive, the tunnel cards with tilt). The IG post card rises from the bottom-right and keeps scrolling.
- **Device frame:** a photographic laptop in a real room photo. The UI is composited flat on the screen, and the camera pushes in and pulls out on the photo plate (scale 1.0 to 1.25 over about 2 s). The lighting changes via crossfaded room plates.

## 6. Cuts vs continuous camera
| Hand-off | Technique |
|---|---|
| Blob intro → "Meet" | The character exits upward and reveals the text behind its smear: a wipe by object |
| "Meet Ren" hero → sentence | **Hard cut** with a 2.8x scale drop (smash pull-back) |
| Sentence → input pill | Accelerating pull-back + fade, overlapped by the 3D pill rising in front (about 0.25 s overlap) |
| Pill → statement | Vertical whip: the pill exits up while the text enters from below, same camera |
| Statement → photo | Push-in through text + slit mask reveal |
| Laptop → tunnel | Pull-back + mascot comes forward + bloom wash |
| Tunnel → chat UI | Whiteout; the mascot becomes the avatar |
| Chat → IG card | Zoom-out fade; the mascot is the only survivor and carries the transition |
| IG card → notifications | Lateral truck; the card exits right and the mascot decelerates into place |
| Chat blocks on the laptop | Time-lapse: clock spin + lighting crossfade + blur-dissolve |
| Laptop → orbit cloud | Screen bloom → whiteout |
| Orbit → finale | Blur-dissolve with a pink wash |

**Rule:** at every hand-off, at least one element (the mascot, the pill, the white bloom or the camera vector) persists across it.

---

## 7. Remotion recipes (60 fps, 1920x1080)

Shared helpers:
```ts
import {interpolate, spring, Easing} from 'remotion';
const EXPO_OUT = Easing.bezier(0.16, 1, 0.3, 1);     // reflow, settle, pull-back
const QUINT_OUT = Easing.bezier(0.22, 1, 0.36, 1);   // word/card entrance
const EXPO_IN  = Easing.bezier(0.7, 0, 0.84, 0);     // exits, push-throughs
const IN_OUT   = Easing.bezier(0.65, 0, 0.35, 1);    // camera whip pans
const SETTLE = {damping: 26, stiffness: 180, mass: 1}; // ζ≈0.97, no visible overshoot, ~0.4 s
const POP    = {damping: 12, stiffness: 160, mass: 1}; // ζ≈0.47, one bounce (~8% overshoot)
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
```

### 7.1 Kinetic word reveal with blur + colour sweep
```ts
const STAGGER = 11;              // 10–12 @60; add +8 before the punch word
const local = frame - (start + i * STAGGER);
const p = interpolate(local, [0, 18], [0, 1], {...clamp, easing: QUINT_OUT});
const y = (1 - p) * 36;          // px
const scale = 1.08 - 0.08 * p;   // transformOrigin: 'left bottom'
const blur = (1 - p) * 9;        // px
const opacity = interpolate(local, [0, 8], [0, 1], clamp);
// per-character colour: char k of n turns dark after a left→right sweep
const sweep = interpolate(local, [6, 36], [0, n + 4], clamp);        // chars
const ink = interpolate(sweep - k, [0, 4], [0, 1], clamp);           // 0 = pink, 1 = black
// color = mix('#F693D6', '#121013', ink); keywords skip the sweep and keep the gradient
```

### 7.2 Live layout reflow
- Measure word widths once (`measureText` from `@remotion/layout-utils`).
- For each frame, compute the centred x-offset of the line *as it would be* with the currently-entered words: `targetOffset(n)`.
- Animate between targets with an expo-out from each word's start: `offset = prevTarget + (nextTarget - prevTarget) * interpolate(frame - wordStart, [0, 30], [0, 1], {...clamp, easing: EXPO_OUT})`. That is 30 frames, with peak velocity at the entry frame.
- The new word additionally starts +36 px right and closes in 10 frames (QUINT_OUT).
- An optional constant drift adds `-0.4 px/frame` to the line x during holds.

### 7.3 Camera pull-back / push-in
- **Settle pull-back:** `scale = interpolate(f, [0, 36], [1, 0.64], {easing: EXPO_OUT})`, about 0.6 s.
- **Exit pull-back:** `scale = Math.pow(0.26, interpolate(f, [0, 86], [0, 1], {easing: Easing.in(Easing.cubic)}))`, with blur `interpolate(f, [70, 86], [0, 8])` and opacity `[70, 88] → [1, 0]`.
- **Push-through:** `scale = Math.exp(interpolate(f, [0, 57], [0, Math.log(6)], {easing: EXPO_IN}))`, with motion blur `min(20, dScale * 120)` px.
- Ambient drift: `scale *= 1 - 0.0012 * f`.
- Apply everything to a single `<Camera>` wrapper (transform-origin at the frame centre or the focus point) so the whole scene moves together.

### 7.4 Slit photo reveal (text → photo)
```ts
const t = frame - revealStart;                                   // revealStart ≈ 24 frames before text exits
const h = interpolate(t, [0, 12, 30], [2, 410, 1080], {...clamp, easing: EXPO_IN});
const w = interpolate(t, [0, 30], [960, 1920], {...clamp, easing: EXPO_IN});
// <div style={{position:'absolute', left:'50%', top:'50%', width:w, height:h,
//   transform:'translate(-50%,-50%)', overflow:'hidden'}}><Img style={{filter:`blur(${t<30?6:0}px)`, scale: 1.25 - 0.25*(t/30)}}/></div>
```
Place it between the two text lines in z (behind the text; the text keeps scaling past the camera).

### 7.5 3D dive/whip onto a UI object
- Wrapper: `perspective: 1000px`. The object is the pill (a 4000x320 px plane).
- Over 0 to 120 frames (2 s) with EXPO_OUT:
  - rotateX 70° to 0°
  - rotateZ −32° to 0°
  - translateZ −300 to 0
  - translateX +1400 to 0 (the camera travels toward the left end)
  - translateY +700 to 0 over the first 30 frames
- DOF: near-camera children get `blur(interpolate(rx, [0, 70], [0, 8]))`.
- Add one horizontal light streak (peach capsule 600x40, blur 30) crossing at frames 40–70.
- If you want parallax, use a real 3D transform stack per element, not 2D skew.

### 7.6 Typing bar with cursor + camera pan
```ts
const CPS = 27;                                       // chars per second
const typed = Math.floor(Math.max(0, frame - start) * CPS / 60); // add +2 frame holds at '.' via a lookup table
const trail = 12;                                     // chars in the pink→black tail
// char k colour: mix(pink, ink, clamp((typed - k) / trail))
// cursor: 4x(1.1·cap) px #121212, visible while typing, hidden 2 frames after the last char
// camera pan: let cursorX = measured; if cursorX - camX > 0.85·W start a whip:
//   camX += (target - camX) * interpolate(f - whipStart, [0, 10], [0, 1], {easing: IN_OUT}) with target = cursorX - 0.47·W
//   plus a slow follow camX += (cursorX - 0.6·W - camX) * 0.04 each frame (precompute deterministically)
```
Glow segments: 3 blurred capsules (`filter: blur(28px)`, 40 px thick) whose position along the pill perimeter = `(frame / 90) % 1` (one lap = 1.5 s).

### 7.7 UI card entrance
`spring({frame: frame - start - i * 5, fps: 60, config: SETTLE})` drives: y 26 to 0, opacity 0 to 1, blur 8 to 0, scale 0.98 to 1.
- Stagger 5 frames for grid tiles, 14–22 frames for big cards.
- Done/CTA card: a 58 px rise over 10 frames (QUINT_OUT).
- Permanent focus falloff on tile columns: `blur = [0, 0, 0, 12, 20][col]`, `opacity = [1, 1, 1, .5, .25][col]`.

### 7.8 Device frame + caption pill
- Laptop plate: a full-bleed photo with the UI composited into the screen quad. Use a CSS matrix3d/perspective if the screen is angled; here it is front-on, so a scaled div works. The screen colour is #EEEEEE.
- Camera on the plate: scale 1.0 to 1.18 over 120–150 frames (EXPO_OUT). A pull-back on transitions is 1.15 to 1.0 over 12 frames.
- Time-lapse: the clock text changes every frame for 24–30 frames. Cross-fade between lighting plates (day, golden, dusk) over 36 frames, and blur the old UI 0 to 20 px with fade over 15 frames.
- Caption pill: 840x200, radius 100, `background: rgba(255,255,255,.85)`, `backdrop-filter: blur(20px)`, `box-shadow: inset 0 -18px 30px rgba(0,0,0,.10), inset 0 6px 12px rgba(255,255,255,.9), 0 10px 40px rgba(0,0,0,.08)`.
  - The pill fades in (0 to 1) with scale 0.96 to 1 over 10 frames.
  - Its words use 7.1 with stagger **18 frames** (0.3 s).
  - Font about 105 px, 500 weight. "Ren" gets a gradient #F07FCF to #F5A06A with `backgroundPosition` cycling over 90 frames.

### 7.9 Card burst/tunnel
- Background: a `radial-gradient(circle at 50% 45%, #fff 0 14%, transparent 34%)` over a `conic-gradient(from 0deg, #F6BBDB, #F6CB98, #F4B3A3, #F7D7AE, #F6BBDB)`, blurred 60 px. Rotate it by `frame * 0.12` deg.
- Each card i: `spawn = i * 15`, `life = 54`, `u = (frame - spawn) / life`.
  - `z = interpolate(u, [0, 1], [300, -2600])`.
  - The start (x, y) is on a ring of radius 1100 px at angle θ_i (alternating sides). It travels to (0, 0) linearly in x/y, with a perspective of 900 px at the vanishing point.
  - Rotation: rotateY ±35°, rotateZ ±12° (random per card, seeded with `random(i)`).
  - Opacity: 0 to 1 over the first 6 frames; it fades at u > 0.85.
- Count tags: `Math.floor(interpolate(frame, [a, a + 30], [346, 350]))`.
- The mascot sits fixed at the centre and blinks every 1.2–1.8 s (eyes scaleY 1, 0.1, 1 over 8 frames).

### 7.10 Stacked-lines finale
```ts
// lines[] with start frames s0, s1, s2 (≈ 0, 90, 176 @60)
const pitch = 118;                                    // px at font 88 (≈1.35)
const shift = lines.reduce((acc, L, j) => j === 0 ? acc :
  acc + interpolate(frame - L.start, [0, 8], [0, pitch], {...clamp, easing: EXPO_OUT}), 0);
// stack translateY = -shift + pitch*(nActive-1)/2 to keep the active line centred
// inactive: opacity 0.45 (text), keyword opacity 0.55, transition over 8 frames
// dots: x = activeLineHalfWidth + 40, y follows the active line; while moving (8–18 frames) scaleX = 1 + 5*velocityNorm, blur 4px, colour lerp to the keyword hue
// ambient camera scale: interpolate(frame, [0, 200], [1, 0.75])
```

### 7.11 Big count-up numbers
`value = Math.round(interpolate(frame - s, [0, 54], [0, target], {...clamp, easing: EXPO_OUT}))`, with `fontVariantNumeric: 'tabular-nums'`, font 700, -0.03 em.
Pair it with a card entrance (7.7). For small live counters, tick +1 every 5 frames @60.

### 7.12 Blur-dissolve transition
- Outgoing: over 0 to 24 frames, `blur 0 → 36px`, `opacity 1 → 0` (starting at frame 8), `scale 1 → 1.03`, plus an optional colour wash `rgba(243,211,216,0 → .6)` from one edge.
- Incoming text starts at frame 18 using 7.1 with initial blur 12 px.

### 7.13 Mascot carrier (fly-through, pop, dissolve)
- **Path:** a quadratic bezier P0 to P1 to P2 over 40 frames (EXPO_OUT on t). Diameter goes 700 to 280 px, and blur is `interpolate(diameter, [280, 700], [0, 7])`.
- **Trail:** 6 copies sampled at t−0.03k, with opacity `0.25·(1−k/6)` and blur 40–80 px, or a single stretched ellipse aligned to the velocity (length = 1.5·d·speedNorm) with `blur(70px)` and a peach-to-pink gradient.
- **Pop-up:** `spring({config: POP})` on y (+260 to 0).
- **Dissolve:** scale 1 to 0.7 and blur 0 to 14 px over 24 frames, while 12 sparkle dots (3–6 px, #F6B885 / #F68FD8) drift outward 40–120 px and fade.

### 7.14 Whiteout bloom
- `radial-gradient(circle at P, rgba(255,255,255,1) 0, rgba(255,255,255,0) R)` with R = `interpolate(f, [0, 24], [200, 2600], {easing: EXPO_IN})`.
- Content underneath: `filter: brightness(1 → 1.5) contrast(1 → .7)`.

### 7.15 Highlight wipe → Hidden
- Row lift: spring SETTLE (scale 1 to 1.03, shadow in).
- Wipe: `linear-gradient(90deg, #EBA6C4 0, #EBA6C4 ${x}px, rgba(235,166,196,0) ${x + 350}px)` with x = `interpolate(f, [0, 12], [-350, rowW], {easing: QUINT_OUT})`.
- Hold 12 frames, then cross-fade (12 frames) to the blurred row plus the "Hidden" chip.
- Stagger 12 frames per row.

---

## 8. Timing cheat-sheet (@60)
| Thing | Frames @60 |
|---|---|
| Word stagger | 10–12 (+8 before the punch word) |
| Word settle (position/blur) | 18 |
| Word colour sweep | 30 |
| Reflow slide | 30 (expo-out, peak velocity at entry) |
| Line pitch shift (finale) | 8 |
| Card/tile stagger | 5 (tiles), 14–22 (big cards) |
| Card settle | about 24 (spring SETTLE) |
| Whip pan | 10 |
| Settle pull-back | 36 |
| Exit pull-back | 86 |
| Push-through | 57 |
| 3D pill dive full settle | 120 |
| Blur-dissolve | 24 |
| Bloom/whiteout | 24 |
| Typing | about 2.2 frames per char |
| Text streaming (agent replies) | 2 chars per frame |
| Glow-segment lap | 90 |
| Keyword gradient cycle | 90–120 |
| Mascot blink | 8 frames, every 72–108 |
