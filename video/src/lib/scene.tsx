import React, { createContext, useContext } from "react";
import { CaptionChunk, findPhrase, WordTiming } from "./timing";

export type SceneInfo = {
  id: string;
  dark: boolean;
  durationInFrames: number;
  words: WordTiming[];
  chunks: CaptionChunk[];
};

const Ctx = createContext<SceneInfo | null>(null);

export const SceneProvider: React.FC<{ value: SceneInfo; children: React.ReactNode }> = ({ value, children }) => (
  <Ctx.Provider value={value}>{children}</Ctx.Provider>
);

export const useScene = (): SceneInfo => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useScene() used outside a scene");
  return v;
};

/**
 * Frame (relative to the scene) at which a phrase is spoken in the voiceover.
 * Visuals sync to the voice with this, so they re-time automatically when the
 * real ElevenLabs audio is dropped in.
 */
export const useCue = (phrase: string, opts: { nth?: number; offset?: number; end?: boolean } = {}): number => {
  const { words, id } = useScene();
  const i = findPhrase(words, phrase, opts.nth ?? 1);
  if (i < 0) {
    throw new Error(`Cue "${phrase}" not found in scene "${id}"`);
  }
  const n = phrase.trim().split(/\s+/).length;
  const f = opts.end ? words[i + n - 1].end : words[i].start;
  return Math.round(f + (opts.offset ?? 0));
};

/** Multiple cues at once. */
export const useCues = (phrases: string[], offset = 0): number[] => {
  const { words, id } = useScene();
  return phrases.map((p) => {
    const i = findPhrase(words, p);
    if (i < 0) throw new Error(`Cue "${p}" not found in scene "${id}"`);
    return Math.round(words[i].start + offset);
  });
};
