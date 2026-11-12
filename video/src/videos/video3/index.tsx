import { makeCalculateMetadata, makeVideo, VideoDef } from "../../lib/VideoComposition";
import { video3Scenes } from "./scenes";
import { V3Blocks, V3ColdOpen, V3Edit, V3Find, V3Longform, V3Post } from "./ScenesA";
import { V3Finale, V3GtaWeek, V3LevelUp, V3Loop, V3Sunday, V3Track } from "./ScenesB";

export const video3: VideoDef = {
  id: "video3",
  scenes: video3Scenes,
  visuals: {
    "v3-01-cold-open": V3ColdOpen,
    "v3-02-blocks": V3Blocks,
    "v3-03-find": V3Find,
    "v3-04-edit": V3Edit,
    "v3-05-post": V3Post,
    "v3-06-longform": V3Longform,
    "v3-07-loop": V3Loop,
    "v3-08-track": V3Track,
    "v3-09-sunday": V3Sunday,
    "v3-10-level-up": V3LevelUp,
    "v3-11-gta-week": V3GtaWeek,
    "v3-12-finale": V3Finale,
  },
  transitions: {
    "v3-01-cold-open": { enter: "none", exit: "push" },
    "v3-06-longform": { exit: "push" },
    "v3-07-loop": { enter: "pull" },
    "v3-11-gta-week": { enter: "pull", exit: "push" },
    "v3-12-finale": { enter: "pull", exit: "none" },
  },
};

export const Video3 = makeVideo(video3);
export const calculateVideo3 = makeCalculateMetadata(video3);
