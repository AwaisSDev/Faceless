import React from "react";
import { AbsoluteFill, Audio, CalculateMetadataFunction, Sequence, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { Captions } from "../components/Captions";
import { GlowBackground } from "../components/GlowBackground";
import { SceneDissolve } from "../components/Camera";
import { SceneProvider } from "./scene";
import {
  chunkWords,
  estimatedSpeechFrames,
  LEAD_FRAMES,
  SceneDef,
  sceneFramesFromSpeech,
  SceneTiming,
  timeWords,
} from "./timing";
import { FPS } from "../theme";

export type SceneVisual = React.FC;

export type VideoDef = {
  id: "video1" | "video2" | "video3";
  scenes: SceneDef[];
  visuals: Record<string, SceneVisual>;
  /** Per-scene transition overrides. */
  transitions?: Record<string, { enter?: "dissolve" | "pull" | "none"; exit?: "dissolve" | "push" | "none" }>;
};

export type VideoProps = {
  timings: SceneTiming[];
};

export const audioPath = (videoId: string, sceneId: string) => `audio/${videoId}/${sceneId}.mp3`;

/** Does public/<path> exist? (works in Studio and during render) */
const exists = async (path: string): Promise<boolean> => {
  try {
    const res = await fetch(staticFile(path), { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
};

/**
 * Durations are computed from word count (150 wpm). If
 * public/audio/<video>/<sceneId>.mp3 exists, its real length is used instead
 * and the scene stretches to match; captions re-time automatically.
 */
export const makeCalculateMetadata =
  (def: VideoDef): CalculateMetadataFunction<VideoProps> =>
  async () => {
    const timings: SceneTiming[] = [];
    for (const s of def.scenes) {
      const p = audioPath(def.id, s.id);
      let audioSeconds: number | null = null;
      if (await exists(p)) {
        try {
          audioSeconds = await getAudioDurationInSeconds(staticFile(p));
        } catch {
          audioSeconds = null;
        }
      }
      const speech = audioSeconds !== null ? Math.round(audioSeconds * FPS) : estimatedSpeechFrames(s.vo);
      timings.push({
        id: s.id,
        durationInFrames: sceneFramesFromSpeech(speech, s.minSeconds, s.holdSeconds),
        hasAudio: audioSeconds !== null,
        audioSeconds,
      });
    }
    const total = timings.reduce((a, t) => a + t.durationInFrames, 0);
    return { durationInFrames: Math.max(1, total), props: { timings } };
  };

/** Fallback timings (used before calculateMetadata runs, e.g. in tests). */
export const estimateTimings = (def: VideoDef): SceneTiming[] =>
  def.scenes.map((s) => ({
    id: s.id,
    durationInFrames: sceneFramesFromSpeech(estimatedSpeechFrames(s.vo), s.minSeconds, s.holdSeconds),
    hasAudio: false,
    audioSeconds: null,
  }));

export const makeVideo = (def: VideoDef): React.FC<VideoProps> => {
  const Comp: React.FC<VideoProps> = ({ timings }) => {
    const t = timings.length ? timings : estimateTimings(def);
    let from = 0;
    return (
      <AbsoluteFill style={{ background: "#000" }}>
        {def.scenes.map((s) => {
          const timing = t.find((x) => x.id === s.id);
          if (!timing) return null;
          const dur = timing.durationInFrames;
          const speech = timing.audioSeconds !== null ? Math.round(timing.audioSeconds * FPS) : estimatedSpeechFrames(s.vo);
          const words = timeWords(s.vo, speech);
          const chunks = chunkWords(words);
          const Visual = def.visuals[s.id];
          const tr = def.transitions?.[s.id] ?? {};
          const seq = (
            <Sequence key={s.id} from={from} durationInFrames={dur} name={s.id}>
              <SceneProvider value={{ id: s.id, dark: !!s.dark, durationInFrames: dur, words, chunks }}>
                <GlowBackground dark={!!s.dark} variant={from % 7} />
                <SceneDissolve durationInFrames={dur} enter={tr.enter} exit={tr.exit}>
                  {Visual ? <Visual /> : null}
                </SceneDissolve>
                <Captions />
                {timing.hasAudio && (
                  <Sequence from={LEAD_FRAMES} name={`${s.id} audio`}>
                    <Audio src={staticFile(audioPath(def.id, s.id))} />
                  </Sequence>
                )}
              </SceneProvider>
            </Sequence>
          );
          from += dur;
          return seq;
        })}
      </AbsoluteFill>
    );
  };
  return Comp;
};
