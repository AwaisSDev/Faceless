import { makeCalculateMetadata, makeVideo, VideoDef } from "../../lib/VideoComposition";
import { video2Scenes } from "./scenes";
import { makeSlot, V2Checklist, V2ColdOpen, V2Credits, V2OpusClip, V2Source, V2TwoTools } from "./ScenesA";
import { V2BeforeAfter, V2Editor, V2Homework, V2Hooks, V2NeverRaw, V2Plans } from "./ScenesB";

export const video2: VideoDef = {
  id: "video2",
  scenes: video2Scenes,
  visuals: {
    "v2-01-cold-open": V2ColdOpen,
    "v2-02-two-tools": V2TwoTools,
    "v2-03-source": V2Source,
    "v2-slot-whop": makeSlot("v2-slot-whop", "whopCampaign"),
    "v2-04-credits": V2Credits,
    "v2-05-opusclip": V2OpusClip,
    "v2-slot-opusclip": makeSlot("v2-slot-opusclip", "opusclipRun"),
    "v2-06-checklist": V2Checklist,
    "v2-07-never-raw": V2NeverRaw,
    "v2-08-editor": V2Editor,
    "v2-slot-capcut": makeSlot("v2-slot-capcut", "capcutEdit"),
    "v2-09-before-after": V2BeforeAfter,
    "v2-10-hooks": V2Hooks,
    "v2-11-plans": V2Plans,
    "v2-12-homework": V2Homework,
  },
  transitions: {
    "v2-01-cold-open": { enter: "none", exit: "push" },
    "v2-07-never-raw": { enter: "pull", exit: "push" },
    "v2-slot-whop": { enter: "pull" },
    "v2-slot-opusclip": { enter: "pull" },
    "v2-slot-capcut": { enter: "pull" },
    "v2-12-homework": { enter: "pull", exit: "none" },
  },
};

export const Video2 = makeVideo(video2);
export const calculateVideo2 = makeCalculateMetadata(video2);
