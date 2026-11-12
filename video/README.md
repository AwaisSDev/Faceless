# faceless. course videos (Remotion)

Three lesson videos for the **"Build a $2,000/Month Faceless YouTube Channel"** course, built as motion graphics in [Remotion](https://www.remotion.dev) (React to MP4).

| Composition | Lesson | Script |
|---|---|---|
| `Video1` | Welcome. How faceless YouTube actually makes money | `scripts/video1.md` |
| `Video2` | Make your first clip: the OpusClip + CapCut system | `scripts/video2.md` |
| `Video3` | The daily routine, long-form, and GTA 6 launch week | `scripts/video3.md` |

All three are 1920x1080 at 60 fps, 8 to 10 minutes each, with burned-in captions. There is **no audio yet**: the voiceover gets made in ElevenLabs and dropped in later (see below).

## Setup (once)

You need Node.js 18 or newer.

```bash
cd video
npm install
```

`npm install` downloads Remotion and the npm packages (around 150 MB, into `video/node_modules`). The first render also downloads Remotion's headless Chrome (around 100 MB, into `node_modules/.remotion`). The fonts (Manrope and Inter, from Google Fonts) are bundled in `public/fonts`, so rendering works offline.

## Preview and render

```bash
npm run studio          # opens Remotion Studio in your browser to scrub through the videos
npm run render:v1       # renders out/video1.mp4
npm run render:v2       # renders out/video2.mp4
npm run render:v3       # renders out/video3.mp4
```

A full render takes a while: about 12 frames per second on a 4-core machine, so roughly 45 minutes per 9-minute video. Add `--concurrency=8` (or your CPU core count) to speed it up.

## Adding the ElevenLabs voiceover

Every scene has an id like `v1-03-misconception`. Each scene is voiced as **its own audio file**, and the video stretches each scene to fit its file.

1. Open `scripts/video1.md` (or `video2.md` / `video3.md`). Each scene is listed with its id, its text, and the exact file name to use.
2. In ElevenLabs, paste one scene's text, generate it, and download the MP3.
3. Save it to `public/audio/video1/<sceneId>.mp3`, for example `public/audio/video1/v1-03-misconception.mp3`. The file name must match the scene id exactly.
4. Repeat for every scene. You can do them one at a time: scenes without a file keep their estimated length.
5. Render again (`npm run render:v1`), or reload Remotion Studio.

When it renders, `calculateMetadata` checks every scene for an MP3. If one exists, it:
- reads the file's real length and sets the scene's duration to *0.35 s lead-in + audio length + 0.75 s tail*;
- plays the file with `<Audio>`, starting 0.35 s into the scene;
- re-times the captions and every on-screen animation cue to the real audio length, so nothing needs to be edited by hand.

Tips:
- Keep each ElevenLabs file trimmed: no long silence at the start or end.
- Use the same voice and settings for every scene so the levels match.
- A scene that runs long or short in ElevenLabs is fine. The whole video re-flows around it.

## Editing the script

The voiceover lives in `src/videos/videoN/scenes.ts` (`vo` field per scene). Change the text there, then run:

```bash
npm run scripts         # re-exports scripts/video1.md, video2.md, video3.md
```

Durations come from the word count (150 words per minute) until real audio exists. On-screen animations are tied to **phrases in the voiceover** (for example `useCue("Part two:")` in `ScenesA.tsx`). If you reword a phrase that a cue uses, the render stops with a message like `Cue "Part two:" not found in scene "v1-04-model"`. Update that one string in the scene file to the new wording.

## Optional screen-recording slots (Video 2)

Video 2 has three clearly marked placeholder cards ("SCREEN RECORDING: ...") where a real recording could go later. They are controlled by flags at the top of `src/videos/video2/scenes.ts`. Set a flag to `false` to remove that slot from the video entirely; the timing re-flows automatically.

## Project layout

```
video/
  public/
    audio/video1|video2|video3/   <- drop ElevenLabs MP3s here
    fonts/                        <- Manrope + Inter (bundled)
  scripts/                        <- exported voiceover scripts (one section per scene)
  src/
    components/   KineticText, StackedLines, CountUp, CardBurst, TypingBar, UICard,
                  DeviceFrame (Phone, Laptop, CaptionPill), Camera (CameraDive3D,
                  scene dissolves), Captions, GlowBackground, Wordmark, Teaching
                  (BulletList, Headline, HighlightRing, Cursor, Chip, Connector)
    mockups/      recreations of the real app screens: YouTube Shorts player,
                  YouTube channel + watch page, YouTube Studio (Earn), Whop
                  Content Rewards campaign page, TikTok, Instagram Reels,
                  OpusClip, CapCut
    lib/          timing engine (word timing, caption chunking, cues),
                  composition builder (audio detection, calculateMetadata)
    videos/       video1, video2, video3: scenes.ts (script data) + scene visuals
  tools/          export-scripts.mjs, stills.mjs (batch still renders)
```

## Style notes

- Palette: off-white `#FAFAF7` (teaching scenes), black `#070707` with a yellow glow (intro, section breaks, outro), ink `#0A0A0A`, muted `#8A8A8A`, yellow `#FFD60A`, warm keyword gradient `#FF8A00` to `#FFB800`.
- Motion language studied frame by frame from the reference launch videos: words rise about 36 px and de-blur over 18 frames, 11 frames apart; lines reflow with a 30-frame expo ease-out; springs are near-critical (`damping 26, stiffness 180`), with no bounce.
- Text rules: no em dashes anywhere; the income figures shown are the course's stated examples, and every video ends with "Results vary. Income figures are examples, not guarantees."
- App screens are recreations of each app's real interface, built from screenshots of the official sites and help centers. They are drawn in code (no screenshots are embedded), and all names, channels, campaigns and numbers inside them are placeholders.
