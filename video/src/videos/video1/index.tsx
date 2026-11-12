import { makeCalculateMetadata, makeVideo, VideoDef } from "../../lib/VideoComposition";
import { video1Scenes } from "./scenes";
import { V1ColdOpen, V1Misconception, V1Model, V1WhatFaceless, V1Whop, V1WhyLongform } from "./ScenesA";
import { V1CourseOrder, V1Gta, V1Math, V1OneRule, V1Risk, V1TwoPaths } from "./ScenesB";

export const video1: VideoDef = {
  id: "video1",
  scenes: video1Scenes,
  visuals: {
    "v1-01-cold-open": V1ColdOpen,
    "v1-02-what-faceless": V1WhatFaceless,
    "v1-03-misconception": V1Misconception,
    "v1-04-model": V1Model,
    "v1-05-why-longform": V1WhyLongform,
    "v1-06-whop": V1Whop,
    "v1-07-math": V1Math,
    "v1-08-two-paths": V1TwoPaths,
    "v1-09-risk": V1Risk,
    "v1-10-gta6": V1Gta,
    "v1-11-course-order": V1CourseOrder,
    "v1-12-one-rule": V1OneRule,
  },
  transitions: {
    "v1-01-cold-open": { enter: "none", exit: "push" },
    "v1-06-whop": { exit: "push" },
    "v1-07-math": { enter: "pull" },
    "v1-09-risk": { exit: "push" },
    "v1-10-gta6": { enter: "pull" },
    "v1-12-one-rule": { enter: "pull", exit: "none" },
  },
};

export const Video1 = makeVideo(video1);
export const calculateVideo1 = makeCalculateMetadata(video1);
