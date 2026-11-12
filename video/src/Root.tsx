import React from "react";
import { Composition } from "remotion";
import { estimateTimings } from "./lib/VideoComposition";
import { calculateVideo1, Video1, video1 } from "./videos/video1";
import { FPS, H, W } from "./theme";

export const RemotionRoot: React.FC = () => {
  const t1 = estimateTimings(video1);
  return (
    <>
      <Composition
        id="Video1"
        component={Video1}
        width={W}
        height={H}
        fps={FPS}
        durationInFrames={t1.reduce((a, t) => a + t.durationInFrames, 0)}
        defaultProps={{ timings: [] }}
        calculateMetadata={calculateVideo1}
      />
    </>
  );
};
