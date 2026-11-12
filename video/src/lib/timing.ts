import { FPS } from "../theme";

/**
 * One scene of a lesson video. Everything about timing is derived from `vo`
 * (the voiceover text) or, once it exists, from public/audio/<video>/<id>.mp3.
 */
export type SceneDef = {
  /** Stable id. Also the audio file name: public/audio/<video>/<id>.mp3 */
  id: string;
  /** Short human title used in the exported script. */
  title: string;
  /** Spoken voiceover text. Captions are generated from this. */
  vo: string;
  /** Dark (black + yellow glow) scene, used for intro, section breaks, outro. */
  dark?: boolean;
  /** Never shorter than this many seconds (useful for visual-only beats). */
  minSeconds?: number;
  /** Extra seconds held after the voiceover ends (e.g. an end card). */
  holdSeconds?: number;
  /**
   * Optional "SCREEN RECORDING" placeholder slot (Video 2). Removed from the
   * video when the matching flag in the scenes file is false.
   */
  slot?: boolean;
};

export type WordTiming = {
  text: string;
  /** Normalised (lowercase, no punctuation) for cue lookup. */
  norm: string;
  idx: number;
  /** Frames relative to the scene start. */
  start: number;
  end: number;
};

export type CaptionChunk = {
  words: WordTiming[];
  start: number;
  end: number;
};

export type SceneTiming = {
  id: string;
  durationInFrames: number;
  hasAudio: boolean;
  /** Seconds of real audio, when present. */
  audioSeconds: number | null;
};

/** Narration speed used until real audio exists. */
export const WORDS_PER_MINUTE = 150;
/** Silence before the first word of every scene. */
export const LEAD_FRAMES = Math.round(0.35 * FPS);
/** Breathing room after the last word of every scene. */
export const TAIL_FRAMES = Math.round(0.75 * FPS);

export const splitWords = (vo: string): string[] =>
  vo
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

export const normWord = (w: string) =>
  w
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9$.%]/g, "")
    .replace(/\.$/, "")
    .replace(/\.(?=\D|$)/g, "");

export const wordCount = (vo: string) => splitWords(vo).length;

/** Speaking time in frames, estimated from word count. */
export const estimatedSpeechFrames = (vo: string) =>
  Math.round((wordCount(vo) / WORDS_PER_MINUTE) * 60 * FPS);

export const sceneFramesFromSpeech = (speechFrames: number, minSeconds = 0, holdSeconds = 0) =>
  Math.max(Math.round(minSeconds * FPS), LEAD_FRAMES + speechFrames + TAIL_FRAMES + Math.round(holdSeconds * FPS));

/**
 * Distribute words over the speaking window. Longer words and punctuation
 * pauses get more time, which tracks real narration closely enough that
 * captions and cues stay in sync, and they re-time automatically when the
 * real audio length is known.
 */
export const timeWords = (vo: string, speechFrames: number): WordTiming[] => {
  const words = splitWords(vo);
  const weights = words.map((w) => {
    const letters = w.replace(/[^A-Za-z0-9$]/g, "").length;
    const speak = 0.62 + 0.075 * letters + (/\d/.test(w) ? 0.35 : 0);
    let pause = 0;
    if (/[.!?]["”]?$/.test(w)) pause = 0.85;
    else if (/[,;:]$/.test(w)) pause = 0.45;
    return { speak, pause };
  });
  const total = weights.reduce((a, b) => a + b.speak + b.pause, 0) || 1;
  const k = speechFrames / total;
  let t = LEAD_FRAMES;
  return words.map((text, idx) => {
    const start = t;
    const end = t + weights[idx].speak * k;
    t = end + weights[idx].pause * k;
    return { text, norm: normWord(text), idx, start, end };
  });
};

const MAX_WORDS = 8;
const MAX_CHARS = 46;

/** Split words into natural caption phrases (max 8 words, 2 short lines). */
export const chunkWords = (words: WordTiming[]): CaptionChunk[] => {
  const chunks: WordTiming[][] = [];
  let cur: WordTiming[] = [];
  const chars = (ws: WordTiming[]) => ws.reduce((a, w) => a + w.text.length + 1, 0);
  words.forEach((w, i) => {
    cur.push(w);
    const next = words[i + 1];
    const endsSentence = /[.!?]["”]?$/.test(w.text);
    const endsClause = /[,;:]$/.test(w.text);
    const remaining = words.length - 1 - i;
    let close = false;
    if (!next) close = true;
    else if (endsSentence && cur.length >= 2) close = true;
    else if (endsClause && cur.length >= 4) close = true;
    else if (cur.length >= MAX_WORDS || chars(cur) + next.text.length > MAX_CHARS) {
      close = true;
      // Keep a sentence's last 1-2 words with it instead of orphaning them.
      const n2 = words[i + 2];
      const endsSoon = /[.!?]["”]?$/.test(next.text) || (n2 && /[.!?]["”]?$/.test(n2.text) && cur.length <= MAX_WORDS - 1);
      if (endsSoon && cur.length <= MAX_WORDS) close = false;
    }
    else if (cur.length >= 5 && remaining > 2 && /^(and|but|so|because|which|then|or|that|when|if|while|until)$/i.test(next.text))
      close = true;
    // Don't end a caption on a weak word ("a", "the", "per", "one"...) if we can carry it.
    const weak = /^(a|an|the|to|of|for|per|and|or|in|on|at|with|your|my|our|their|is|are|be|one|two|that|from|by|as|but|so)$/i;
    if (close && next && !endsSentence && !endsClause && weak.test(w.text.replace(/[^A-Za-z]/g, "")) && cur.length < MAX_WORDS + 2) {
      close = false;
    }
    if (close) {
      // Avoid a lonely 1-word orphan at the very end of a sentence.
      if (cur.length === 1 && chunks.length > 0 && !/[.!?]$/.test(chunks[chunks.length - 1].slice(-1)[0].text)) {
        const prev = chunks[chunks.length - 1];
        if (prev.length < MAX_WORDS) {
          prev.push(...cur);
          cur = [];
          return;
        }
      }
      chunks.push(cur);
      cur = [];
    }
  });
  return chunks.map((ws, i) => {
    const nextChunk = chunks[i + 1];
    const start = Math.max(0, ws[0].start - 3);
    const lastEnd = ws[ws.length - 1].end;
    const end = nextChunk ? Math.min(nextChunk[0].start - 3, lastEnd + 40) : lastEnd + 30;
    return { words: ws, start, end: Math.max(end, start + 12) };
  });
};

/** Find the first word index matching a phrase (case and punctuation insensitive). */
export const findPhrase = (words: WordTiming[], phrase: string, nth = 1): number => {
  const target = splitWords(phrase).map(normWord);
  let seen = 0;
  for (let i = 0; i <= words.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) {
      if (words[i + j].norm !== target[j]) {
        ok = false;
        break;
      }
    }
    if (ok) {
      seen++;
      if (seen === nth) return i;
    }
  }
  return -1;
};
